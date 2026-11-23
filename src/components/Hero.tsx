import React from 'react';
import { ArrowDown, ShieldCheck, Zap, UserCheck, AudioLines, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToConverter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToConverter }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold shadow-inner mb-6 backdrop-blur-sm animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]"></span>
          <span>Free Online Audio Converter</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Extract Audio From{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
            Your Videos.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#9aa5ba] leading-relaxed mb-8">
          Convert, trim and download high-quality audio. Everything happens directly inside your browser—no uploads, no quality loss, no limits.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onScrollToConverter}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/45 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Sparkles className="w-5 h-5 text-purple-200" />
            Start Converting
            <ArrowDown className="w-4 h-4 ml-1" />
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-[#9aa5ba] hover:text-white bg-[#111625] hover:bg-[#171e30] border border-[#283148] transition-all"
          >
            How It Works
          </a>
        </div>

        {/* Key Feature Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-[#283148]/50">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-300 bg-[#111625]/60 py-2.5 px-3 rounded-lg border border-[#283148]/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-300 bg-[#111625]/60 py-2.5 px-3 rounded-lg border border-[#283148]/40">
            <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-300 bg-[#111625]/60 py-2.5 px-3 rounded-lg border border-[#283148]/40">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>High-Speed Transcoding</span>
          </div>
        </div>

        {/* Sound Wave Graphic */}
        <div className="mt-12 flex items-center justify-center gap-1.5 opacity-60">
          <AudioLines className="w-6 h-6 text-purple-400" />
          <span className="text-xs uppercase tracking-wider text-purple-300/80 font-mono">
            Direct MP4 • MKV • WebM Audio Demuxing
          </span>
        </div>
      </div>
    </section>
  );
};
