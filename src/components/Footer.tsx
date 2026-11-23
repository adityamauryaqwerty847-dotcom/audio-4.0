import React from 'react';
import { Music, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateSection,
}) => {
  return (
    <footer className="border-t border-[#283148] bg-[#080b14] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#283148]/60">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Audio<span className="text-purple-400">Extract</span>
              </span>
            </button>
            <p className="text-sm text-[#9aa5ba] max-w-sm">
              Simple audio extraction. Made for everyone. Fast, private and browser-based.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#9aa5ba]">
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => onNavigateSection('converter'), 50);
              }}
              className="hover:text-white transition-colors"
            >
              Converter
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => onNavigateSection('features'), 50);
              }}
              className="hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => onNavigateSection('faq'), 50);
              }}
              className="hover:text-white transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={onNavigatePrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onNavigateTerms}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <a
              href="mailto:contact@audioextract.app"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77839b]">
          <p>© 2026 AudioExtract. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
