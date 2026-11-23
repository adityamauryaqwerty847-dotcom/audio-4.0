import React from 'react';
import { Loader2, Music, XCircle } from 'lucide-react';
import { BatchProgress } from '../../types';

interface ConversionProgressProps {
  progress: BatchProgress;
  onCancel?: () => void;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({
  progress,
  onCancel,
}) => {
  return (
    <div id="progressSection" className="p-6 rounded-2xl bg-[#171e30] border border-purple-500/30 space-y-4">
      {/* Top indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h4 id="progressText" className="text-sm font-bold text-white">
              {progress.statusText || 'Converting your audio...'}
            </h4>
            {progress.totalFiles > 1 && (
              <p className="text-xs text-[#9aa5ba]">
                File {progress.currentFileIndex} of {progress.totalFiles} • {progress.currentFileName}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span id="progressPercent" className="text-lg font-extrabold text-purple-400">
            {progress.overallPercent}%
          </span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Cancel conversion"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#111625] h-3 rounded-full overflow-hidden border border-[#283148]">
        <div
          id="progressFill"
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress.overallPercent}%` }}
        />
      </div>

      {/* Note */}
      <div className="flex items-center justify-between text-xs text-[#77839b]">
        <span id="progressNote" className="flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-purple-400" />
          Processing locally inside your browser via WebAssembly.
        </span>
        <span>Do not close this tab</span>
      </div>
    </div>
  );
};
