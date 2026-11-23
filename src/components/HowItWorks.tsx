import React from 'react';
import { UploadCloud, Sliders, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: <UploadCloud className="w-6 h-6 text-purple-400" />,
      title: 'Upload your MP4 video',
      description: 'Drag and drop one or multiple MP4 video files up to 500 MB into the converter.',
    },
    {
      step: '02',
      icon: <Sliders className="w-6 h-6 text-indigo-400" />,
      title: 'Select format & customize',
      description: 'Choose MP3, WAV, AAC or FLAC. Set your desired bitrate and optional start/end trim timestamps.',
    },
    {
      step: '03',
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      title: 'Convert, preview & download',
      description: 'Click Convert Audio. Play the audio preview immediately and download single files or a ZIP archive.',
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-28 py-16 sm:py-24 border-t border-[#283148]/50 bg-[#0b0e1b]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-base text-[#9aa5ba]">
            Extract studio-grade audio from your video in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-[#111625] border border-[#283148] hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-indigo-400/40 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9aa5ba] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
