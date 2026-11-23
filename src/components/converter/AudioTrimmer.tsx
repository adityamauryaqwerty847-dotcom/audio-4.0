import React from 'react';
import { Scissors, RotateCcw, AlertTriangle } from 'lucide-react';
import { TrimSettings } from '../../types';

interface AudioTrimmerProps {
  trim: TrimSettings;
  onChange: (trim: TrimSettings) => void;
  maxDuration?: number;
  disabled?: boolean;
}

export const AudioTrimmer: React.FC<AudioTrimmerProps> = ({
  trim,
  onChange,
  maxDuration,
  disabled,
}) => {
  const handleStartTimeChange = (val: string) => {
    const num = parseFloat(val);
    const startTime = isNaN(num) || num < 0 ? 0 : num;
    onChange({
      ...trim,
      enabled: startTime > 0 || trim.endTime > 0,
      startTime,
    });
  };

  const handleEndTimeChange = (val: string) => {
    const num = parseFloat(val);
    const endTime = isNaN(num) || num < 0 ? 0 : num;
    onChange({
      ...trim,
      enabled: trim.startTime > 0 || endTime > 0,
      endTime,
    });
  };

  const handleClearTrim = () => {
    onChange({
      enabled: false,
      startTime: 0,
      endTime: 0,
    });
  };

  const hasInvalidRange = trim.endTime > 0 && trim.endTime <= trim.startTime;
  const exceedsDuration = maxDuration && trim.endTime > maxDuration;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#171e30] border border-[#283148] space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            Audio Trimming
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Optional
          </span>
          {trim.enabled && !disabled && (
            <button
              type="button"
              onClick={handleClearTrim}
              className="text-xs text-[#9aa5ba] hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#9aa5ba]">
        Choose which part of your video you want to extract. Leave blank to convert the entire file.
      </p>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-xs font-semibold text-gray-300 mb-2">
            Start time (seconds)
          </label>
          <input
            id="startTime"
            type="number"
            min="0"
            step="0.1"
            placeholder="0"
            disabled={disabled}
            value={trim.startTime || ''}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#111625] border border-[#283148] text-white text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-xs font-semibold text-gray-300 mb-2">
            End time (seconds)
          </label>
          <input
            id="endTime"
            type="number"
            min="0"
            step="0.1"
            placeholder={maxDuration ? `${maxDuration.toFixed(1)}s (End)` : 'End of video'}
            disabled={disabled}
            value={trim.endTime || ''}
            onChange={(e) => handleEndTimeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#111625] border border-[#283148] text-white text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {/* Validation warning */}
      {hasInvalidRange && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>End time must be greater than start time.</span>
        </div>
      )}

      {exceedsDuration && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>End time exceeds the video duration ({maxDuration?.toFixed(1)}s).</span>
        </div>
      )}

      <small className="block text-xs text-[#77839b]">
        Leave both fields empty to extract the complete audio.
      </small>
    </div>
  );
};
