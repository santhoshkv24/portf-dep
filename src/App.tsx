import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { useLenis } from './hooks/useLenis';
import { HeaderHUD } from './components/HeaderHUD';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { TechnicalMatrix } from './components/TechnicalMatrix';
import { ResumeDrawer } from './components/ResumeDrawer';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="min-h-screen bg-obsidian text-chalk selection:bg-cadmium selection:text-white relative flex flex-col font-sans">
      {/* Global Navigation Header */}
      <HeaderHUD
        onOpenResume={() => setIsResumeOpen(true)}
        enableKeyboardNav={true}
      />

      {/* Main Narrative Flow */}
      <main className="flex-1 w-full" id="main-content">
        {/* 01. Hero / Editorial Monolith */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          enableKeyboardNav={false}
        />

        {/* 02. Selected Work / 4 Marquee Case Studies */}
        <SelectedWork />

        {/* 03. Production Trajectory / Experience */}
        <Experience />

        {/* 04. Systems Architecture & Capabilities */}
        <TechnicalMatrix />
      </main>

      {/* 05. Contact & Colophon */}
      <Footer />

      {/* Slide-Over Interactive Resume Drawer */}
      <ResumeDrawer
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CursorProvider>
      <AppContent />
    </CursorProvider>
  );
};

export default App;
