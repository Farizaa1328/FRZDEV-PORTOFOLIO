import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Download,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  Terminal,
} from 'lucide-react';
import { sfx } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { CvPreviewModal } from '../components/CvPreviewModal';

export const Hero: React.FC = () => {
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    sfx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050508] text-slate-900 dark:text-white overflow-hidden select-none transition-colors duration-500"
    >
      {/* 1. Dramatic Central Crimson Spotlight (Static & Centered behind Fariza) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[650px] sm:h-[950px] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.18)_0%,rgba(244,63,94,0.1)_35%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.48)_0%,rgba(159,18,57,0.28)_35%,rgba(76,5,25,0.1)_55%,transparent_72%)] blur-[55px] pointer-events-none -z-10 animate-pulse-subtle transition-colors duration-500" />

      {/* Subtle Dust Particle Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] dark:bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:32px_32px] opacity-15 dark:opacity-10 pointer-events-none" />

      {/* 2. Top Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-20 mb-2 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300 backdrop-blur-md shadow-sm dark:shadow-2xl transition-colors duration-300"
      >
        <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping" />
        <span>{t.hero.statusBadge}</span>
        <span className="text-crimson-600 dark:text-crimson-400 font-bold">{t.hero.openForWork}</span>
      </motion.div>

      {/* 3. Centerpiece Composition: Fariza Cutout in Front (z-10) with Static Typography Firmly Behind (z-0) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[580px] lg:min-h-[660px]">
        
        {/* BACKGROUND TYPOGRAPHY LAYER: Strictly BEHIND Fariza (z-0) - DIAM / STATIC (No cursor movement) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-0">
          
          {/* Top Line: FARIZA (Solid, Commanding & Anchored Directly Behind Head & Shoulders) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] xl:text-[14rem] tracking-tighter uppercase leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] opacity-95 transition-colors duration-500"
          >
            FARIZA
          </motion.div>

          {/* Bottom Line: ARLISTIANA (Solid & Anchored Directly Behind Fariza's Torso) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] tracking-tighter uppercase leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-crimson-600 via-rose-600 to-crimson-800 dark:from-slate-200 dark:via-rose-300/80 dark:to-crimson-800 drop-shadow-[0_4px_16px_rgba(225,29,72,0.25)] dark:drop-shadow-[0_15px_40px_rgba(225,29,72,0.5)] opacity-90 -mt-2 sm:-mt-6 lg:-mt-10 transition-colors duration-500"
          >
            ARLISTIANA
          </motion.div>
        </div>

        {/* FOREGROUND PORTRAIT: Fariza in Black Suit (Strictly IN FRONT of text z-10, 100% Crisp, Steady & Unobstructed!) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex justify-center items-end mt-2 sm:mt-6 pointer-events-none"
        >
          <div className="relative w-72 sm:w-88 md:w-96 lg:w-[480px] h-[400px] sm:h-[480px] lg:h-[550px] flex items-end justify-center overflow-visible">
            {/* Fariza's Authentic Cutout Portrait in Black Suit, White Shirt & Tie */}
            <img
              src="/images/profile-cutout.png"
              alt="Fariza Arlistiana - Software Engineer"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-500"
              style={{
                maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
              }}
              loading="eager"
            />

            {/* Bottom Subtle Studio Vignette Fade so suit melts into the canvas at the waist */}
            <div className="absolute -bottom-1 left-0 right-0 h-14 bg-gradient-to-t from-slate-50 dark:from-[#050508] to-transparent pointer-events-none transition-colors duration-500" />
          </div>
        </motion.div>

      </div>

      {/* 4. University Badge: Placed Cleanly BELOW the Portrait with Full Whitespace (Zero Overlap with Photo!) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="z-20 mt-4 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#0E0E14] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-xl transition-all duration-300"
      >
        <div className="w-6 h-6 rounded-lg bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 flex items-center justify-center">
          <GraduationCap size={15} />
        </div>
        <span>{t.hero.studentBadge}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </motion.div>

      {/* 5. Action Buttons Strip */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="z-20 mt-8 flex flex-wrap items-center justify-center gap-4 px-4"
      >
        {/* Button 1: Explore Projects */}
        <button
          onClick={() => scrollToSection('proyek')}
          onMouseEnter={() => sfx.playHover()}
          className="btn-3d px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-600 text-white font-mono font-bold text-xs tracking-[0.15em] uppercase shadow-[0_0_25px_rgba(225,29,72,0.35)] dark:shadow-[0_0_25px_rgba(225,29,72,0.45)] hover:shadow-[0_0_35px_rgba(225,29,72,0.7)] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer"
        >
          <span>{t.hero.exploreBtn}</span>
          <ArrowDown size={14} />
        </button>

        {/* Button 2: Download / Preview CV */}
        <button
          type="button"
          onClick={() => {
            sfx.playClick();
            setIsCvOpen(true);
          }}
          onMouseEnter={() => sfx.playHover()}
          className="btn-3d px-7 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-crimson-600 dark:hover:white border border-slate-200 dark:border-white/15 hover:border-crimson-500/70 font-mono font-bold text-xs tracking-[0.15em] uppercase shadow-sm dark:shadow-lg transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer"
        >
          <Download size={14} className="text-crimson-600 dark:text-crimson-400" />
          <span>{t.hero.downloadCvBtn}</span>
        </button>

        {/* Button 3: View Certificates */}
        <button
          onClick={() => scrollToSection('sertifikat')}
          onMouseEnter={() => sfx.playHover()}
          className="btn-3d px-7 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-crimson-600 dark:hover:white border border-slate-200 dark:border-white/15 hover:border-crimson-500/70 font-mono font-bold text-xs tracking-[0.15em] uppercase shadow-sm dark:shadow-lg transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer"
        >
          <ShieldCheck size={14} className="text-rose-600 dark:text-rose-400" />
          <span>{t.hero.certificatesBtn}</span>
        </button>

        {/* Button 4: Interactive Developer Terminal Mode */}
        <button
          type="button"
          onClick={() => {
            sfx.playClick();
            window.dispatchEvent(new CustomEvent('open-terminal'));
          }}
          onMouseEnter={() => sfx.playHover()}
          className="btn-3d px-7 py-3.5 rounded-xl bg-slate-900 dark:bg-black/80 hover:bg-black text-white hover:text-white border border-crimson-500/50 hover:border-crimson-400 font-mono font-bold text-xs tracking-[0.15em] uppercase shadow-glow-crimson transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer hover:scale-105"
          title="Buka Developer Terminal CLI (Ctrl + `)"
        >
          <Terminal size={14} className="text-crimson-500 animate-pulse" />
          <span>{t.hero.terminalBtn}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-crimson-500/20 text-crimson-400 border border-crimson-500/30 font-bold">
            &gt;_
          </span>
        </button>
      </motion.div>

      {/* 6. Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('tentang')}
        onMouseEnter={() => sfx.playHover()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-20 mt-10 flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors cursor-pointer group"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase">{t.hero.scrollDown}</span>
        <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform animate-bounce" />
      </motion.button>

      {/* CV Interactive Preview & Download Modal */}
      <CvPreviewModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
};
