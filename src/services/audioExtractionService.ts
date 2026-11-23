import { 
  VideoFile, 
  ConversionOptions, 
  ConversionResult, 
  BatchProgress 
} from '../types';
import { ffmpegService } from './ffmpegService';
import { extractAudioViaWebAudio } from './webAudioFallback';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${formattedMins}:${formattedSecs}`;
}

export function sanitizeFileName(name: string): string {
  return name.replace(/\.[^/.]+$/, '').replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').trim() || 'audio';
}

export async function extractVideoMetadata(file: File): Promise<{ duration: number; thumbnailUrl?: string }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const url = URL.createObjectURL(file);
    video.src = url;

    let resolved = false;

    const cleanup = () => {
      URL.revokeObjectURL(url);
    };

    video.onloadedmetadata = () => {
      const duration = video.duration || 0;
      
      // Capture thumbnail snapshot
      video.currentTime = Math.min(1.0, duration / 2);
    };

    video.onseeked = () => {
      if (resolved) return;
      resolved = true;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.6);
          cleanup();
          resolve({ duration: video.duration || 0, thumbnailUrl });
          return;
        }
      } catch {
        // Thumbnail generation from canvas might fail on some codecs; fallback gracefully
      }
      cleanup();
      resolve({ duration: video.duration || 0 });
    };

    video.onerror = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({ duration: 0 });
      }
    };

    // Safety timeout in case video metadata never fires
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({ duration: 0 });
      }
    }, 4000);
  });
}

export async function processBatchConversion(
  videos: VideoFile[],
  options: ConversionOptions,
  onProgress: (progress: BatchProgress) => void,
  abortSignal?: { aborted: boolean }
): Promise<ConversionResult[]> {
  const results: ConversionResult[] = [];
  const total = videos.length;

  if (total === 0) return results;

  // Initialize FFmpeg if needed
  onProgress({
    currentFileIndex: 0,
    totalFiles: total,
    currentFileName: videos[0].name,
    overallPercent: 5,
    filePercent: 0,
    statusText: 'Preparing conversion engine...',
    phase: 'loading-engine',
  });

  let engineReady = false;
  try {
    await ffmpegService.load((status) => {
      onProgress({
        currentFileIndex: 0,
        totalFiles: total,
        currentFileName: videos[0].name,
        overallPercent: 10,
        filePercent: 0,
        statusText: status,
        phase: 'loading-engine',
      });
    });
    engineReady = true;
  } catch (err) {
    console.warn('FFmpeg engine load failed; will use Web Audio fallback:', err);
  }

  for (let i = 0; i < total; i++) {
    if (abortSignal?.aborted) {
      throw new Error('Conversion cancelled by user.');
    }

    const video = videos[i];
    const baseProgress = Math.round((i / total) * 100);

    onProgress({
      currentFileIndex: i + 1,
      totalFiles: total,
      currentFileName: video.name,
      overallPercent: baseProgress,
      filePercent: 0,
      statusText: `Processing ${video.name}...`,
      phase: 'processing',
    });

    // Setup per-file progress updates
    ffmpegService.setProgressCallback((filePercent) => {
      const stepSlice = 100 / total;
      const calculatedOverall = Math.round(baseProgress + (filePercent / 100) * stepSlice);
      onProgress({
        currentFileIndex: i + 1,
        totalFiles: total,
        currentFileName: video.name,
        overallPercent: Math.min(99, calculatedOverall),
        filePercent,
        statusText: `Extracting audio (${filePercent}%)...`,
        phase: 'processing',
      });
    });

    let convertedBlob: Blob;
    let convertedDuration = 0;

    try {
      if (engineReady) {
        const res = await ffmpegService.convert(
          video.file,
          options,
          (status) => {
            onProgress({
              currentFileIndex: i + 1,
              totalFiles: total,
              currentFileName: video.name,
              overallPercent: Math.min(98, baseProgress + 5),
              filePercent: 5,
              statusText: status,
              phase: 'processing',
            });
          }
        );
        convertedBlob = res.blob;
        convertedDuration = res.duration || video.duration || 0;
      } else {
        // Fallback to Web Audio API
        const res = await extractAudioViaWebAudio(
          video.file,
          options,
          (status) => {
            onProgress({
              currentFileIndex: i + 1,
              totalFiles: total,
              currentFileName: video.name,
              overallPercent: Math.min(98, baseProgress + 10),
              filePercent: 50,
              statusText: status,
              phase: 'processing',
            });
          }
        );
        convertedBlob = res.blob;
        convertedDuration = res.duration || video.duration || 0;
      }
    } catch (conversionError) {
      console.warn(`Primary conversion failed for ${video.name}, trying Web Audio API:`, conversionError);
      // Secondary fallback attempt
      const res = await extractAudioViaWebAudio(video.file, options);
      convertedBlob = res.blob;
      convertedDuration = res.duration || video.duration || 0;
    }

    const cleanBaseName = sanitizeFileName(video.name);
    let extension: string = options.format;
    if (options.format === 'aac') extension = 'm4a';
    const audioFileName = `${cleanBaseName}.${extension}`;
    const audioUrl = URL.createObjectURL(convertedBlob);

    results.push({
      id: `result_${Date.now()}_${i}`,
      originalFileName: video.name,
      originalSize: video.size,
      audioFileName,
      audioBlob: convertedBlob,
      audioUrl,
      format: options.format,
      bitrate: options.bitrate,
      duration: convertedDuration,
      formattedDuration: formatDuration(convertedDuration),
      size: convertedBlob.size,
      formattedSize: formatFileSize(convertedBlob.size),
      timestamp: Date.now(),
    });
  }

  onProgress({
    currentFileIndex: total,
    totalFiles: total,
    currentFileName: '',
    overallPercent: 100,
    filePercent: 100,
    statusText: 'All conversions successfully completed!',
    phase: 'completed',
  });

  return results;
}
