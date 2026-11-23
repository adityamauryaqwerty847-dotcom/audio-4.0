import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Client-Side Privacy Guarantee
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#9aa5ba] mt-2">
              Last updated: November 2026
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#171e30] border border-[#283148] space-y-2">
              <ServerOff className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Zero Server Uploads</h3>
              <p className="text-xs text-[#9aa5ba]">Videos are processed locally in your browser memory.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#171e30] border border-[#283148] space-y-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">No Data Collection</h3>
              <p className="text-xs text-[#9aa5ba]">We do not collect names, emails, IPs, or video contents.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#171e30] border border-[#283148] space-y-2">
              <EyeOff className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Instant Disposal</h3>
              <p className="text-xs text-[#9aa5ba]">All file data is cleared when you close or reload the tab.</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#9aa5ba] leading-relaxed border-t border-[#283148] pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Introduction</h2>
              <p>
                At AudioExtract, we believe privacy is a fundamental human right. Our web application was purposely built from the ground up to operate without backends, external database servers, or server-side media processors.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. How File Processing Works</h2>
              <p>
                When you drag and drop or browse video files on AudioExtract:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your file stays completely within your device's local memory (RAM).</li>
                <li>Audio decoding, conversion, and trimming are performed by client-side WebAssembly (FFmpeg.wasm) and browser Web Audio APIs.</li>
                <li>At no point in time is any byte of your video or converted audio transmitted over the internet to our servers or any third-party server.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Cookies and Tracking</h2>
              <p>
                AudioExtract does not use tracking cookies, analytics identifiers, advertising pixels, or cross-site fingerprinting scripts.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Local Storage and Object URLs</h2>
              <p>
                Converted audio outputs are held temporarily in browser memory using transient Blob URLs (<code className="text-purple-300">blob:</code>). These URLs are automatically discarded as soon as you clear the results or close your browser tab.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Contact Information</h2>
              <p>
                If you have any questions regarding this Privacy Policy or the security of our application, please contact us at <a href="mailto:privacy@audioextract.app" className="text-purple-400 hover:underline">privacy@audioextract.app</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
