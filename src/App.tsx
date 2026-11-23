import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import { ParticleCanvas3D } from './components/ParticleCanvas3D';
import { TelemetryBar } from './components/TelemetryBar';
import { LeftSocialRail } from './components/LeftSocialRail';
import { CommandPalette } from './components/CommandPalette';
import { DeveloperTerminal } from './components/DeveloperTerminal';
import { CvPreviewModal } from './components/CvPreviewModal';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { PwaProvider } from './context/PwaContext';
import { PwaInstallModal } from './components/PwaInstallModal';

// Scroll to top or to hash anchor when route changes
const ScrollManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return null;
};

export const App: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      // Toggle terminal on Ctrl + ` (backtick) or Cmd + `
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    const handleOpenPalette = () => setIsPaletteOpen(true);
    const handleOpenTerminal = () => setIsTerminalOpen(true);
    const handleOpenCv = () => setIsCvOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenPalette);
    window.addEventListener('open-terminal', handleOpenTerminal);
    window.addEventListener('open-cv-modal', handleOpenCv);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenPalette);
      window.removeEventListener('open-terminal', handleOpenTerminal);
      window.removeEventListener('open-cv-modal', handleOpenCv);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <PwaProvider>
          <BrowserRouter>
            <ScrollManager />
            <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-onyx-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-300 selection:bg-crimson-600 selection:text-white">
              {/* Interactive 3D Particle & Constellation Background */}
              <ParticleCanvas3D />

              <Navbar />
              {/* Left Vertical Sticky Social Rail matching Reference Image */}
              <LeftSocialRail />
              <div className="flex-grow relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/proyek/:id" element={<ProjectDetail />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              {/* Cybernetic Telemetry Dock with Real-Time WIB Telemetry & Haptic SFX */}
              <TelemetryBar />

              {/* Global Interactive Command Palette (Ctrl + K) */}
              <CommandPalette
                isOpen={isPaletteOpen}
                onClose={() => setIsPaletteOpen(false)}
                onOpenCv={() => setIsCvOpen(true)}
              />

              {/* Global Interactive Developer Terminal CLI (Ctrl + `) */}
              <DeveloperTerminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                onOpenCv={() => setIsCvOpen(true)}
              />

              {/* Global CV Preview Modal */}
              <CvPreviewModal
                isOpen={isCvOpen}
                onClose={() => setIsCvOpen(false)}
              />

              {/* Global PWA Install Guidance Modal */}
              <PwaInstallModal />
            </div>
          </BrowserRouter>
        </PwaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
