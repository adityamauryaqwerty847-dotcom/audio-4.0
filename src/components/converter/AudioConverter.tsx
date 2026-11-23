import React, { useState, useRef } from 'react';
import { Music, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { 
  VideoFile, 
  AudioFormat, 
  AudioBitrate, 
  TrimSettings, 
  ConversionResult, 
  BatchProgress 
} from '../../types';
import { FileUploader } from './FileUploader';
import { SelectedFilesList } from './SelectedFilesList';
import { FormatSelector } from './FormatSelector';
import { BitrateSelector } from './BitrateSelector';
import { AudioTrimmer } from './AudioTrimmer';
import { ConversionProgress } from './ConversionProgress';
import { ConversionResults } from './ConversionResults';
import { processBatchConversion } from '../../services/audioExtractionService';

export const AudioConverter: React.FC = () => {
  const [selectedVideos, setSelectedVideos] = useState<VideoFile[]>([]);
  const [format, setFormat] = useState<AudioFormat>('mp3');
  const [bitrate, setBitrate] = useState<AudioBitrate>('192k');
  const [trim, setTrim] = useState<TrimSettings>({
    enabled: false,
    startTime: 0,
    endTime: 0,
  });

  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<BatchProgress | null>(null);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<{ aborted: boolean }>({ aborted: false });

  const handleFilesSelected = (newFiles: VideoFile[]) => {
    setSelectedVideos((prev) => [...prev, ...newFiles]);
    setErrorMessage(null);
  };

  const handleRemoveFile = (id: string) => {
    setSelectedVideos((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAll = () => {
    setSelectedVideos([]);
  };

  const handleStartConversion = async () => {
    if (selectedVideos.length === 0 || isConverting) return;

    // Validate trim range
    if (trim.enabled && trim.endTime > 0 && trim.endTime <= trim.startTime) {
      setErrorMessage('End time must be greater than start time for audio trimming.');
      return;
    }

    setErrorMessage(null);
    setIsConverting(true);
    abortControllerRef.current = { aborted: false };

    try {
      const conversionResults = await processBatchConversion(
        selectedVideos,
        { format, bitrate, trim },
        (p) => setProgress(p),
        abortControllerRef.current
      );

      setResults((prev) => [...conversionResults, ...prev]);
      // Optional: keep files or clear selected videos
      setSelectedVideos([]);
    } catch (err) {
      console.error('Conversion process error:', err);
      const msg = err instanceof Error ? err.message : 'An error occurred during audio extraction.';
      setErrorMessage(msg);
    } finally {
      setIsConverting(false);
      setProgress(null);
    }
  };

  const handleCancelConversion = () => {
    if (isConverting) {
      abortControllerRef.current.aborted = true;
      setIsConverting(false);
      setProgress(null);
      setErrorMessage('Conversion was cancelled by user.');
    }
  };

  const handleRemoveResult = (id: string) => {
    setResults((prev) => {
      const target = prev.find((r) => r.id === id);
      if (target?.audioUrl) {
        URL.revokeObjectURL(target.audioUrl);
      }
      return prev.filter((r) => r.id !== id);
    });
  };

  const handleClearAllResults = () => {
    results.forEach((r) => {
      if (r.audioUrl) URL.revokeObjectURL(r.audioUrl);
    });
    setResults([]);
  };

  // Duration reference from the first selected file
  const maxDuration = selectedVideos.length > 0 ? selectedVideos[0].duration : undefined;

  return (
    <section id="converter" className="scroll-mt-28 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[#111625] border border-[#283148] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Card Header */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#283148]/60">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Audio Converter
              </h2>
              <p className="text-sm text-[#9aa5ba] mt-1">
                Upload one or multiple MP4 videos to extract pure audio.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Music className="w-6 h-6" />
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div
              id="errorMessage"
              className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Notice</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Main Work Area */}
          <div className="space-y-6">
            {/* File Uploader Dropzone */}
            <FileUploader
              onFilesSelected={handleFilesSelected}
              disabled={isConverting}
            />

            {/* Selected Files List */}
            <SelectedFilesList
              files={selectedVideos}
              onRemoveFile={handleRemoveFile}
              onClearAll={handleClearAll}
              disabled={isConverting}
            />

            {/* Conversion Settings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <FormatSelector
                value={format}
                onChange={setFormat}
                disabled={isConverting}
              />
              <BitrateSelector
                format={format}
                value={bitrate}
                onChange={setBitrate}
                disabled={isConverting}
              />
            </div>

            {/* Audio Trimmer Controls */}
            <AudioTrimmer
              trim={trim}
              onChange={setTrim}
              maxDuration={maxDuration}
              disabled={isConverting}
            />

            {/* Convert Audio CTA Button */}
            <div>
              <button
                id="convertBtn"
                type="button"
                disabled={selectedVideos.length === 0 || isConverting}
                onClick={handleStartConversion}
                className="w-full py-4 px-6 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all flex items-center justify-center gap-3 transform active:scale-[0.99]"
              >
                <Sparkles className="w-5 h-5 text-purple-200" />
                {isConverting ? 'Processing Conversion...' : '♫ Convert Audio'}
                {!isConverting && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>

            {/* Dynamic Progress Feedback */}
            {isConverting && progress && (
              <ConversionProgress
                progress={progress}
                onCancel={handleCancelConversion}
              />
            )}

            {/* Conversion Results Display */}
            <ConversionResults
              results={results}
              onRemoveResult={handleRemoveResult}
              onClearAllResults={handleClearAllResults}
            />

          </div>
        </div>
      </div>
    </section>
  );
};
