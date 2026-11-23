import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Is AudioExtract free?',
      answer: 'Yes, AudioExtract is 100% free with no hidden fees, subscriptions, or file extraction quotas. You can convert as many videos as you want.',
    },
    {
      question: 'Which audio formats are supported?',
      answer: 'We support outputting to MP3 (.mp3), uncompressed WAV (.wav), AAC (.m4a), and lossless FLAC (.flac) with selectable bitrates up to 320 kbps.',
    },
    {
      question: 'Are my videos uploaded to a server?',
      answer: 'No. Never. AudioExtract uses WebAssembly (FFmpeg.wasm) and client-side Web Audio API to process videos directly inside your browser sandbox. Your videos never leave your computer or phone.',
    },
    {
      question: 'Can I convert multiple videos?',
      answer: 'Yes! You can drag and drop multiple MP4 video files at once. Our batch processor converts them sequentially and allows you to download each individually or bundled into a ZIP file.',
    },
    {
      question: 'Can I trim audio before downloading?',
      answer: 'Yes. Enter the start time and end time in seconds in the Audio Trimming section. If left blank, AudioExtract will extract the full audio track from your video.',
    },
    {
      question: 'Does it work on mobile?',
      answer: 'Yes. AudioExtract works seamlessly on modern mobile browsers such as Chrome, Safari, and Firefox on iOS and Android devices.',
    },
    {
      question: 'What is the maximum supported file size?',
      answer: 'You can upload files up to 500 MB per video. Because processing takes place entirely in browser memory, 500 MB provides maximum stability without exhausting device RAM.',
    },
    {
      question: 'Why might conversion fail?',
      answer: 'Conversion can occasionally fail if the MP4 video has a corrupted audio stream, an unsupported proprietary codec, or if your device memory is constrained. Try closing heavy background apps or converting one video at a time.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-28 py-16 sm:py-24 border-t border-[#283148]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#9aa5ba]">
            Learn more about how our client-side audio extractor works.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#111625] border border-[#283148] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-white hover:text-purple-300 transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9aa5ba] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#9aa5ba] leading-relaxed border-t border-[#283148]/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
