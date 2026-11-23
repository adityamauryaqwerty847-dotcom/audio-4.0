import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { AudioFormat, AudioBitrate, TrimSettings } from '../types';

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private isLoaded = false;
  private isLoading = false;
  private progressCallback: ((percent: number) => void) | null = null;

  public async load(onProgress?: (progressText: string) => void): Promise<void> {
    if (this.isLoaded && this.ffmpeg) {
      return;
    }

    if (this.isLoading) {
      // Wait for existing loading promise
      while (this.isLoading) {
        await new Promise((res) => setTimeout(res, 100));
      }
      return;
    }

    this.isLoading = true;

    try {
      if (onProgress) onProgress('Initializing FFmpeg WebAssembly engine...');
      this.ffmpeg = new FFmpeg();

      this.ffmpeg.on('progress', ({ progress }) => {
        const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
        if (this.progressCallback) {
          this.progressCallback(percent);
        }
      });

      this.ffmpeg.on('log', ({ message }) => {
        // Helpful for debugging conversion in console
        if (import.meta.env.DEV) {
          console.debug('[FFmpeg]', message);
        }
      });

      // Load single-thread core to support wide browser compatibility
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      if (onProgress) onProgress('Downloading audio processing modules...');

      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

      await this.ffmpeg.load({
        coreURL,
        wasmURL,
      });

      this.isLoaded = true;
      if (onProgress) onProgress('FFmpeg engine ready.');
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      this.isLoaded = false;
      this.ffmpeg = null;
      throw new Error(
        `Failed to initialize audio conversion engine: ${error instanceof Error ? error.message : 'Unknown error'}. Please check internet connection.`
      );
    } finally {
      this.isLoading = false;
    }
  }

  public setProgressCallback(cb: ((percent: number) => void) | null) {
    this.progressCallback = cb;
  }

  public async convert(
    file: File,
    options: {
      format: AudioFormat;
      bitrate: AudioBitrate;
      trim: TrimSettings;
    },
    onStatusUpdate?: (status: string) => void
  ): Promise<{ blob: Blob; duration: number }> {
    if (!this.isLoaded || !this.ffmpeg) {
      await this.load(onStatusUpdate);
    }

    const ffmpeg = this.ffmpeg;
    if (!ffmpeg) {
      throw new Error('FFmpeg is not available.');
    }

    const { format, bitrate, trim } = options;
    const inputExt = file.name.substring(file.name.lastIndexOf('.')) || '.mp4';
    const inputName = `input_${Date.now()}${inputExt}`;
    
    // Choose output extension and codec
    let outputExt: string = format;
    if (format === 'aac') outputExt = 'm4a';
    const outputName = `output_${Date.now()}.${outputExt}`;

    try {
      if (onStatusUpdate) onStatusUpdate('Reading video data...');
      const fileData = await fetchFile(file);
      await ffmpeg.writeFile(inputName, fileData);

      // Build FFmpeg command arguments
      const args: string[] = ['-i', inputName];

      // Handle trimming if enabled
      if (trim.enabled) {
        if (trim.startTime > 0) {
          args.push('-ss', trim.startTime.toString());
        }
        if (trim.endTime > 0 && trim.endTime > trim.startTime) {
          args.push('-to', trim.endTime.toString());
        }
      }

      // Disable video stream
      args.push('-vn');

      // Audio codec & quality settings
      switch (format) {
        case 'mp3':
          args.push('-c:a', 'libmp3lame', '-b:a', bitrate || '192k');
          break;
        case 'wav':
          args.push('-c:a', 'pcm_s16le');
          break;
        case 'aac':
          args.push('-c:a', 'aac', '-b:a', bitrate || '192k');
          break;
        case 'flac':
          args.push('-c:a', 'flac');
          break;
        default:
          args.push('-c:a', 'libmp3lame', '-b:a', '192k');
      }

      args.push(outputName);

      if (onStatusUpdate) onStatusUpdate(`Extracting and converting to ${format.toUpperCase()}...`);
      const exitCode = await ffmpeg.exec(args);

      if (exitCode !== 0) {
        throw new Error(`FFmpeg exited with error code ${exitCode}`);
      }

      if (onStatusUpdate) onStatusUpdate('Finalizing audio file...');
      const outputData = await ffmpeg.readFile(outputName);
      
      const mimeTypes: Record<AudioFormat, string> = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        aac: 'audio/mp4',
        flac: 'audio/flac',
      };

      const uint8 = outputData instanceof Uint8Array 
        ? outputData 
        : new Uint8Array(outputData as unknown as ArrayBuffer);
      // Ensure clean non-shared ArrayBuffer for Blob constructor
      const copy = new Uint8Array(uint8.byteLength);
      copy.set(uint8);
      const blob = new Blob([copy.buffer], { type: mimeTypes[format] || 'audio/mpeg' });

      // Calculate approximate or extracted duration
      let duration = 0;
      try {
        duration = await this.getAudioDuration(blob);
      } catch (err) {
        console.warn('Could not determine audio duration directly:', err);
      }

      return { blob, duration };
    } finally {
      // Safe cleanup of virtual filesystem files
      try {
        await ffmpeg.deleteFile(inputName);
      } catch {
        // ignore cleanup error
      }
      try {
        await ffmpeg.deleteFile(outputName);
      } catch {
        // ignore cleanup error
      }
    }
  }

  private getAudioDuration(blob: Blob): Promise<number> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.preload = 'metadata';
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(audio.duration || 0);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(0);
      };
    });
  }

  public isEngineReady(): boolean {
    return this.isLoaded;
  }
}

export const ffmpegService = new FFmpegService();
