import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, Search, Volume2, VolumeX, Globe, Smartphone, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { usePwa } from '../context/PwaContext';
import { sfx } from '../utils/sound';

const NAV_ITEMS = [
  { id: 'beranda', label: 'HOME' },
  { id: 'tentang', label: 'ABOUT' },
  { id: 'keahlian', label: 'SKILLS' },
  { id: 'proyek', label: 'PROJECTS' },
  { id: 'sertifikat', label: 'CERTIFICATES' },
  { id: 'pengalaman', label: 'EXPERIENCE' },
  { id: 'kontak', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('beranda');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const { isInstalled, promptInstall } = usePwa();
  const [soundOn, setSoundOn] = useState<boolean>(sfx.enabled);

  const navItems = [
    { id: 'beranda', label: t.nav.home },
    { id: 'tentang', label: t.nav.about },
    { id: 'keahlian', label: t.nav.skills },
    { id: 'proyek', label: t.nav.projects },
    { id: 'sertifikat', label: t.nav.certificates },
    { id: 'pengalaman', label: t.nav.experience },
    { id: 'kontak', label: t.nav.contact },
  ];

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleSfxChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.enabled === 'boolean') {
        setSoundOn(customEvent.detail.enabled);
      } else {
        setSoundOn(sfx.enabled);
      }
    };
    window.addEventListener('frz-sfx-toggle', handleSfxChange);
    return () => window.removeEventListener('frz-sfx-toggle', handleSfxChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const scrollPosition = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (id: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);

    if (!isHomePage) {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#050508]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-4 shadow-md dark:shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Logo matching MFRDHN reference styling */}
          <button
            onClick={() => handleNavClick('beranda')}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            aria-label="FRZ.DEV Beranda"
          >
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white uppercase group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors">
              FRZ<span className="text-crimson-600 dark:text-crimson-500">.DEV</span>
            </span>
          </button>

          {/* Center Navigation Links (Clean, Spaced Uppercase) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`text-[11px] font-mono tracking-[0.25em] uppercase font-bold transition-all duration-300 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-crimson-500 rounded-full shadow-[0_0_8px_#E11D48]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Search (Cmd+K), Theme Switcher & Red Pill Contact Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Command Palette Search Button */}
            <button
              onClick={() => {
                sfx.playClick();
                window.dispatchEvent(new CustomEvent('open-command-palette'));
              }}
              onMouseEnter={() => sfx.playHover()}
              aria-label="Buka Command Palette (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-crimson-500/50 hover:bg-crimson-500/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-mono group cursor-pointer"
              title="Buka Command Palette (Ctrl + K)"
            >
              <Search size={14} className="group-hover:text-crimson-500 transition-colors" />
              <span className="hidden xl:inline text-[11px] font-sans">Cari...</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-black/50 border border-slate-200 dark:border-white/15 rounded text-slate-600 dark:text-slate-300 group-hover:border-crimson-500/40">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </button>

            {/* PWA Install Button (Desktop) */}
            {!isInstalled && (
              <button
                onClick={() => promptInstall()}
                onMouseEnter={() => sfx.playHover()}
                aria-label="Pasang Aplikasi FRZ.DEV"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-crimson-500/50 hover:bg-crimson-500/5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Pasang Aplikasi FRZ.DEV (PWA)"
              >
                <Smartphone size={13} className="text-crimson-500 animate-pulse" />
                <span>App</span>
              </button>
            )}

            {/* Language Switcher (ID | EN) */}
            <button
              onClick={() => {
                sfx.playSwitch();
                toggleLang();
              }}
              onMouseEnter={() => sfx.playHover()}
              aria-label="Switch Language (ID/EN)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-crimson-500/50 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              title={lang === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
            >
              <Globe size={13} className="text-crimson-500" />
              <span className={lang === 'id' ? 'text-crimson-600 dark:text-crimson-400 font-extrabold' : 'text-slate-400'}>
                ID
              </span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className={lang === 'en' ? 'text-crimson-600 dark:text-crimson-400 font-extrabold' : 'text-slate-400'}>
                EN
              </span>
            </button>

            {/* Audio SFX Toggle */}
            <button
              onClick={() => {
                const next = sfx.toggleSound();
                setSoundOn(next);
              }}
              onMouseEnter={() => sfx.playHover()}
              aria-label={soundOn ? 'Nonaktifkan Efek Suara Haptic' : 'Aktifkan Efek Suara Haptic'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                soundOn
                  ? 'text-crimson-600 dark:text-crimson-400 bg-crimson-500/10 hover:bg-crimson-500/20'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
              title={soundOn ? 'Audio SFX: Aktif (Klik untuk Mute)' : 'Audio SFX: Nonaktif (Klik untuk Nyalakan)'}
            >
              {soundOn ? (
                <Volume2 size={17} className="text-crimson-500 animate-pulse" />
              ) : (
                <VolumeX size={17} />
              )}
            </button>

            <button
              onClick={() => {
                sfx.playSwitch();
                toggleTheme();
              }}
              onMouseEnter={() => sfx.playHover()}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400 animate-spin-slow" />
              ) : (
                <Moon size={17} className="text-crimson-600" />
              )}
            </button>

            {/* Red Action Button matching Reference */}
            <button
              onClick={() => handleNavClick('kontak')}
              onMouseEnter={() => sfx.playHover()}
              className="px-6 py-2.5 rounded-lg bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] cursor-pointer"
            >
              {t.nav.contactBtn}
            </button>
          </div>

          {/* Mobile Hamburger, SFX, Search, Language & Theme */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Mobile Lang Toggle */}
            <button
              onClick={() => {
                sfx.playSwitch();
                toggleLang();
              }}
              aria-label="Switch Language (ID/EN)"
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300"
              title={lang === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
            >
              <span className={lang === 'id' ? 'text-crimson-500 font-extrabold' : 'text-slate-400'}>ID</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className={lang === 'en' ? 'text-crimson-500 font-extrabold' : 'text-slate-400'}>EN</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                window.dispatchEvent(new CustomEvent('open-command-palette'));
              }}
              aria-label="Buka Pencarian Cepat"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              title="Cari Cepat"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => {
                const next = sfx.toggleSound();
                setSoundOn(next);
              }}
              aria-label="Toggle Audio SFX"
              className={`p-2 rounded-lg ${
                soundOn ? 'text-crimson-600 dark:text-crimson-400' : 'text-slate-400'
              }`}
              title={soundOn ? 'Audio SFX ON' : 'Audio SFX OFF'}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => {
                sfx.playSwitch();
                toggleTheme();
              }}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-crimson-600" />}
            </button>
            <button
              onClick={() => {
                sfx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg text-slate-900 dark:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-white dark:bg-[#08080C] border-l border-slate-200 dark:border-white/10 p-7 flex flex-col justify-between shadow-2xl transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
                  <span className="font-black text-xl text-slate-900 dark:text-white">
                    FRZ<span className="text-crimson-600 dark:text-crimson-500">.DEV</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="text-left py-2.5 px-3 rounded-lg text-xs font-mono font-bold tracking-widest uppercase text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 space-y-3">
                  {/* PWA Install in Drawer */}
                  {!isInstalled && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Smartphone size={13} className="text-crimson-500" />
                        Aplikasi / PWA
                      </span>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          promptInstall();
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30 shadow-xs cursor-pointer"
                      >
                        <Download size={13} />
                        <span>Install</span>
                      </button>
                    </div>
                  )}

                  {/* Language Switcher in Drawer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Globe size={13} className="text-crimson-500" />
                      Bahasa / Language
                    </span>
                    <button
                      onClick={() => {
                        sfx.playSwitch();
                        toggleLang();
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                    >
                      <span className={lang === 'id' ? 'text-crimson-500 font-extrabold' : 'text-slate-400'}>ID</span>
                      <span>/</span>
                      <span className={lang === 'en' ? 'text-crimson-500 font-extrabold' : 'text-slate-400'}>EN</span>
                    </button>
                  </div>

                  {/* Audio SFX in Drawer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      Audio Haptic SFX
                    </span>
                    <button
                      onClick={() => {
                        const next = sfx.toggleSound();
                        setSoundOn(next);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        soundOn
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                      }`}
                    >
                      {soundOn ? <Volume2 size={14} className="text-crimson-500 animate-pulse" /> : <VolumeX size={14} />}
                      <span>{soundOn ? 'SFX: ON' : 'SFX: OFF'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('kontak')}
                className="w-full py-3 rounded-lg bg-crimson-600 text-white font-mono font-bold text-xs tracking-widest uppercase shadow-glow-crimson"
              >
                {t.nav.contactBtn}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
