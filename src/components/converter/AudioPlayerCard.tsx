import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, VolumeX, Trash2, Music } from 'lucide-react';
import { ConversionResult } from '../../types';
import { formatDuration } from '../../services/audioExtractionService';

interface AudioPlayerCardProps {
  result: ConversionResult;
  onRemove: (id: string) => void;
}

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({ result, onRemove }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(result.duration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [result.audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = result.audioUrl;
    a.download = result.audioFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#171e30] border border-[#283148] hover:border-purple-500/40 transition-all space-y-4 shadow-lg shadow-black/20">
      <audio ref={audioRef} src={result.audioUrl} preload="metadata" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0">
            <Music className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate" title={result.audioFileName}>
              {result.audioFileName}
            </h4>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#9aa5ba]">
              <span className="uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 font-bold text-[10px]">
                {result.format}
              </span>
              <span>{result.formattedSize}</span>
              <span>•</span>
              <span className="truncate">From {result.originalFileName}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onRemove(result.id)}
          className="text-gray-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors shrink-0"
          title="Remove result"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Audio Playback Controls */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-600/30 transition-transform active:scale-95 shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#111625] rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#9aa5ba]">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#111625] transition-colors shrink-0"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Action Download */}
      <div className="pt-2 border-t border-[#283148]/60 flex items-center justify-end">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 hover:border-purple-500 text-purple-200 transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          Download Audio
        </button>
      </div>
    </div>
  );
};
