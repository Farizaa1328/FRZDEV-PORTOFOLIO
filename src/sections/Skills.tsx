import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';
import { skills, skillCategories } from '../data/skills';
import { SkillCard } from '../components/SkillCard';
import { ProductionCodeViewer } from '../components/ProductionCodeViewer';
import { useLanguage } from '../context/LanguageContext';

export const Skills: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const filteredSkills =
    activeCategory === 'Semua'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="keahlian" className="py-28 bg-white dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300">
      {/* 3D Ambient Light Background */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-crimson-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
          >
            <Cpu size={13} className="text-crimson-500" />
            <span>{t.skills.tag}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
          >
            {t.skills.heading1} <span className="text-gradient-crimson">{t.skills.heading2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
          >
            {t.skills.subheading}
          </motion.p>
          <div className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 rounded-full mx-auto mt-4 shadow-glow-crimson" />
        </div>

        {/* 3D Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 p-1.5 bg-slate-100 dark:bg-onyx-900/90 rounded-2xl border border-slate-200 dark:border-onyx-800 max-w-2xl mx-auto backdrop-blur-md">
          {skillCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors duration-200 z-10 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="techSkillPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-crimson-600 to-rose-600 rounded-xl shadow-glow-crimson -z-10"
                  />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Skills Perspective Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 perspective-1200"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- LIVE PRODUCTION CODE QUALITY SHOWCASE --- */}
        <div className="mt-20 pt-16 border-t border-slate-200 dark:border-onyx-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Terminal size={13} className="text-crimson-500" />
              <span>LIVE CODE QUALITY &amp; CLEAN ARCHITECTURE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {t.skills.codeShowcaseTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {t.skills.codeShowcaseSubtitle}
            </p>
          </div>

          <ProductionCodeViewer projectId="bps-system" />
        </div>
      </div>
    </section>
  );
};
