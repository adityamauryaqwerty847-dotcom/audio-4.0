import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudioConverter } from './components/converter/AudioConverter';
import { FeatureSection } from './components/FeatureSection';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');

  useEffect(() => {
    // Handle browser back/forward or hash
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') setCurrentPage('privacy');
      else if (hash === '#terms') setCurrentPage('terms');
      else setCurrentPage('home');
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'privacy' | 'terms') => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b14] text-[#f5f7ff] relative selection:bg-purple-600/30 selection:text-purple-200">
      <Navbar
        onNavigateHome={() => navigateTo('home')}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero onScrollToConverter={() => scrollToSection('converter')} />
            <AudioConverter />
            <FeatureSection />
            <HowItWorks />
            <FAQ />
          </>
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy onBack={() => navigateTo('home')} />
        )}

        {currentPage === 'terms' && (
          <TermsOfUse onBack={() => navigateTo('home')} />
        )}
      </main>

      <Footer
        onNavigateHome={() => navigateTo('home')}
        onNavigatePrivacy={() => navigateTo('privacy')}
        onNavigateTerms={() => navigateTo('terms')}
        onNavigateSection={scrollToSection}
      />
    </div>
  );
};

export default App;
