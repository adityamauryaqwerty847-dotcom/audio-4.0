import React, { useRef, useState } from 'react';
import { Upload, Video, AlertCircle } from 'lucide-react';
import { VideoFile } from '../../types';
import { formatFileSize, extractVideoMetadata } from '../../services/audioExtractionService';

interface FileUploaderProps {
  onFilesSelected: (files: VideoFile[]) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFileList = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || disabled) return;
    setErrorMessage(null);

    const validFiles: VideoFile[] = [];
    const errors: string[] = [];

    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      const isMp4 = file.name.toLowerCase().endsWith('.mp4') || file.type === 'video/mp4' || file.type === 'application/octet-stream';
      
      if (!isMp4) {
        errors.push(`${file.name}: Invalid format (only MP4 is supported).`);
        continue;
      }

      if (file.size === 0) {
        errors.push(`${file.name}: File is empty.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Exceeds maximum 500 MB limit.`);
        continue;
      }

      // Extract duration and thumbnail
      let duration: number | undefined;
      let thumbnailUrl: string | undefined;

      try {
        const metadata = await extractVideoMetadata(file);
        duration = metadata.duration;
        thumbnailUrl = metadata.thumbnailUrl;
      } catch (err) {
        console.warn('Metadata extraction error for', file.name, err);
      }

      const formattedDuration = duration && duration > 0 
        ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
        : undefined;

      validFiles.push({
        id: `file_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        file,
        name: file.name,
        size: file.size,
        formattedSize: formatFileSize(file.size),
        duration,
        formattedDuration,
        thumbnailUrl,
      });
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' '));
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    processFileList(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`group relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-purple-500 bg-purple-500/10 scale-[1.01]'
            : 'border-[#283148] hover:border-purple-500/60 bg-[#111625]/60 hover:bg-[#171e30]/80'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp4,video/mp4"
          multiple
          disabled={disabled}
          onChange={(e) => processFileList(e.target.files)}
          className="hidden"
        />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-400/60 transition-all shadow-lg shadow-purple-600/10">
          <Upload className="w-7 h-7" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
          Drop your videos here
        </h3>
        <p className="text-sm text-[#9aa5ba] mb-6">
          or browse files from your device
        </p>

        <button
          type="button"
          disabled={disabled}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/25 transition-all"
        >
          Choose Videos
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#77839b]">
          <Video className="w-3.5 h-3.5" />
          <span>MP4 format only · Maximum 500 MB per video</span>
        </div>
      </div>
    </div>
  );
};
