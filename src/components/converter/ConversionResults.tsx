import React, { useEffect, useState } from 'react';
import { CheckCircle2, Archive, Trash2, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';
import { ConversionResult } from '../../types';
import { AudioPlayerCard } from './AudioPlayerCard';

interface ConversionResultsProps {
  results: ConversionResult[];
  onRemoveResult: (id: string) => void;
  onClearAllResults: () => void;
}

export const ConversionResults: React.FC<ConversionResultsProps> = ({
  results,
  onRemoveResult,
  onClearAllResults,
}) => {
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#6366f1', '#a78bfa', '#22c55e'],
        });
      } catch {
        // Safe fallback if canvas-confetti is not loaded
      }
    }
  }, [results.length]);

  if (results.length === 0) return null;

  const handleDownloadAllZip = async () => {
    if (results.length === 0) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();

      for (const res of results) {
        zip.file(res.audioFileName, res.audioBlob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);

      const a = document.createElement('a');
      a.href = url;
      a.download = `AudioExtract_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create ZIP package:', err);
      alert('Failed to package files into ZIP. Please download them individually.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div id="resultSection" className="p-6 rounded-2xl bg-[#111625] border border-emerald-500/30 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#283148]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 id="resultSummary" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Conversion Completed!
              <Sparkles className="w-4 h-4 text-purple-400" />
            </h3>
            <p className="text-xs text-[#9aa5ba]">
              {results.length} {results.length === 1 ? 'audio file is' : 'audio files are'} ready for preview & download.
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2.5">
          {results.length > 1 && (
            <button
              onClick={handleDownloadAllZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50"
            >
              {isZipping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Zipping Files...
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4" />
                  Download All (.ZIP)
                </>
              )}
            </button>
          )}

          <button
            onClick={onClearAllResults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            title="Clear all converted results"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Results</span>
          </button>
        </div>
      </div>

      {/* Results List */}
      <div id="resultList" className="space-y-4">
        {results.map((result) => (
          <AudioPlayerCard
            key={result.id}
            result={result}
            onRemove={onRemoveResult}
          />
        ))}
      </div>
    </div>
  );
};
