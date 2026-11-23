import React from 'react';
import { Music, Scissors, Layers, ShieldCheck, Headphones, Smartphone } from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Music className="w-6 h-6 text-purple-400" />,
      title: 'Multiple Formats',
      description: 'Convert videos to MP3, uncompressed WAV, high-efficiency AAC or audiophile FLAC.',
    },
    {
      icon: <Scissors className="w-6 h-6 text-indigo-400" />,
      title: 'Audio Trimming',
      description: 'Extract only the precise section you need by specifying start and end timestamps.',
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: 'Batch Conversion',
      description: 'Upload and convert multiple videos sequentially in a single automated session.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Privacy Focused',
      description: 'Your videos never leave your computer or phone. Processing runs 100% locally.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: 'Audio Preview',
      description: 'Built-in audio player lets you listen, inspect fidelity and scrub before downloading.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      title: 'Mobile Friendly',
      description: 'Fully responsive modern design works smoothly across desktop, tablet and phone.',
    },
  ];

  return (
    <section id="features" className="scroll-mt-28 py-16 sm:py-24 border-t border-[#283148]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Everything You Need
          </h2>
          <p className="text-base text-[#9aa5ba]">
            Simple, fast and convenient audio conversion engineered directly into your browser.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#111625] border border-[#283148] hover:border-purple-500/50 hover:bg-[#171e30] transition-all group duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#171e30] border border-[#283148] group-hover:border-purple-500/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-[#9aa5ba] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
