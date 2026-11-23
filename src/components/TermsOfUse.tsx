import React from 'react';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-semibold mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Converter
        </button>

        <div className="rounded-3xl bg-[#111625] border border-[#283148] p-8 sm:p-12 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 mb-4">
              <FileText className="w-3.5 h-3.5" />
              Legal Terms
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terms of Use
            </h1>
            <p className="text-sm text-[#9aa5ba] mt-2">
              Last updated: November 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#9aa5ba] leading-relaxed border-t border-[#283148] pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using AudioExtract, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this tool.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Permitted Use</h2>
              <p>
                AudioExtract is provided as a utility for personal and commercial audio extraction. You agree to use the service only for videos and content that you own or have obtained legitimate authorization to convert.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 mt-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You retain 100% intellectual property ownership of all your media files.</span>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Disclaimers and Limitations</h2>
              <p>
                AudioExtract is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, regarding uninterrupted operation, conversion accuracy across non-standard media streams, or hardware compatibility.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Modifications to the Service</h2>
              <p>
                We reserve the right to modify or discontinue any feature of AudioExtract at any time without notice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with standard international software licensing principles.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
