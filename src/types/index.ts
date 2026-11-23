export type AudioFormat = 'mp3' | 'wav' | 'aac' | 'flac';

export type AudioBitrate = '128k' | '192k' | '256k' | '320k';

export interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
  formattedSize: string;
  duration?: number;
  formattedDuration?: string;
  thumbnailUrl?: string;
}

export interface TrimSettings {
  enabled: boolean;
  startTime: number;
  endTime: number;
}

export interface ConversionOptions {
  format: AudioFormat;
  bitrate: AudioBitrate;
  trim: TrimSettings;
}

export interface ConversionResult {
  id: string;
  originalFileName: string;
  originalSize: number;
  audioFileName: string;
  audioBlob: Blob;
  audioUrl: string;
  format: AudioFormat;
  bitrate?: AudioBitrate;
  duration: number;
  formattedDuration: string;
  size: number;
  formattedSize: string;
  timestamp: number;
}

export interface BatchProgress {
  currentFileIndex: number;
  totalFiles: number;
  currentFileName: string;
  overallPercent: number;
  filePercent: number;
  statusText: string;
  phase: 'idle' | 'loading-engine' | 'processing' | 'finishing' | 'completed' | 'error';
  errorMessage?: string;
}
