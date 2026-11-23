import React from 'react';
import { Video, Trash2, Clock, HardDrive, X } from 'lucide-react';
import { VideoFile } from '../../types';
import { formatFileSize } from '../../services/audioExtractionService';

interface SelectedFilesListProps {
  files: VideoFile[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
  disabled?: boolean;
}

export const SelectedFilesList: React.FC<SelectedFilesListProps> = ({
  files,
  onRemoveFile,
  onClearAll,
  disabled,
}) => {
  if (files.length === 0) return null;

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="space-y-3 pt-2">
      {/* Header bar */}
      <div className="flex items-center justify-between px-1 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {files.length} {files.length === 1 ? 'video' : 'videos'} selected
          </span>
          <span className="text-[#9aa5ba]">({formatFileSize(totalSize)} total)</span>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Files list */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {files.map((file) => (
          <div
            key={file.id}
            className="group flex items-center gap-3 p-3 rounded-xl bg-[#171e30] border border-[#283148] hover:border-purple-500/40 transition-all"
          >
            {/* Thumbnail / Video Icon */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-purple-500/10 border border-purple-500/20 shrink-0 flex items-center justify-center text-purple-300">
              {file.thumbnailUrl ? (
                <img
                  src={file.thumbnailUrl}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Video className="w-5 h-5 text-purple-400" />
              )}
            </div>

            {/* File details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-purple-200 transition-colors">
                {file.name}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#9aa5ba]">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-gray-500" />
                  {file.formattedSize}
                </span>
                {file.formattedDuration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" />
                    {file.formattedDuration}
                  </span>
                )}
              </div>
            </div>

            {/* Remove button */}
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Remove video"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
