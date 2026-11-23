import React from 'react';
import { AudioBitrate, AudioFormat } from '../../types';

interface BitrateSelectorProps {
  format: AudioFormat;
  value: AudioBitrate;
  onChange: (bitrate: AudioBitrate) => void;
  disabled?: boolean;
}

export const BitrateSelector: React.FC<BitrateSelectorProps> = ({
  format,
  value,
  onChange,
  disabled,
}) => {
  const isLossless = format === 'wav' || format === 'flac';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="quality"
          id="qualityLabel"
          className="block text-sm font-semibold text-white"
        >
          {isLossless ? 'Audio Bitrate (not applicable)' : 'Audio Bitrate'}
        </label>
        {isLossless && (
          <span className="text-xs text-purple-400 font-medium">Lossless Audio</span>
        )}
      </div>

      <div className="relative">
        <select
          id="quality"
          value={value}
          disabled={disabled || isLossless}
          onChange={(e) => onChange(e.target.value as AudioBitrate)}
          className="w-full px-4 py-3.5 rounded-xl bg-[#171e30] border border-[#283148] text-white text-sm font-medium focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
        >
          <option value="128k">128 kbps – Standard (Smaller file)</option>
          <option value="192k">192 kbps – High (Recommended balance)</option>
          <option value="256k">256 kbps – Very High (Near CD quality)</option>
          <option value="320k">320 kbps – Maximum (Best fidelity)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9aa5ba]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {isLossless && (
        <p className="text-xs text-[#77839b]">
          {format.toUpperCase()} preserves the full uncompressed dynamic range; fixed bitrates do not apply.
        </p>
      )}
    </div>
  );
};
