import React, { useState } from 'react';
import { Music, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateHome();
    setTimeout(() => {
      onNavigateSection(id);
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080b14]/85 border-b border-[#283148]/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Audio<span className="text-purple-400">Extract</span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleLinkClick('converter')}
            className="text-sm font-medium text-[#9aa5ba] hover:text-white transition-colors"
          >
            Converter
          </button>
          <button
            onClick={() => handleLinkClick('features')}
            className="text-sm font-medium text-[#9aa5ba] hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick('how-it-works')}
            className="text-sm font-medium text-[#9aa5ba] hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleLinkClick('faq')}
            className="text-sm font-medium text-[#9aa5ba] hover:text-white transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Action button & Badges */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            FREE AUDIO TOOL
          </span>
          <button
            onClick={() => handleLinkClick('converter')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/20 hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#171e30] transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#283148] bg-[#111625]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleLinkClick('converter')}
              className="px-3 py-2 rounded-lg text-left text-base font-medium text-gray-300 hover:text-white hover:bg-[#171e30]"
            >
              Converter
            </button>
            <button
              onClick={() => handleLinkClick('features')}
              className="px-3 py-2 rounded-lg text-left text-base font-medium text-gray-300 hover:text-white hover:bg-[#171e30]"
            >
              Features
            </button>
            <button
              onClick={() => handleLinkClick('how-it-works')}
              className="px-3 py-2 rounded-lg text-left text-base font-medium text-gray-300 hover:text-white hover:bg-[#171e30]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="px-3 py-2 rounded-lg text-left text-base font-medium text-gray-300 hover:text-white hover:bg-[#171e30]"
            >
              FAQ
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('converter')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30"
            >
              Start Converting Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
