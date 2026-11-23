import React from 'react';
import { AudioFormat } from '../../types';

interface FormatSelectorProps {
  value: AudioFormat;
  onChange: (format: AudioFormat) => void;
  disabled?: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="format" className="block text-sm font-semibold text-white">
        Output Audio Format
      </label>
      <div className="relative">
        <select
          id="format"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value as AudioFormat)}
          className="w-full px-4 py-3.5 rounded-xl bg-[#171e30] border border-[#283148] text-white text-sm font-medium focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
        >
          <option value="mp3">MP3 (.mp3) – Universal compatibility</option>
          <option value="wav">WAV (.wav) – Uncompressed lossless studio quality</option>
          <option value="aac">AAC (.m4a) – High quality, Apple & mobile optimized</option>
          <option value="flac">FLAC (.flac) – Lossless compression</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9aa5ba]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
