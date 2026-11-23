import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  Code2,
  Layers,
  Search,
  X,
  RotateCcw,
  Sparkles,
  Filter,
  Check,
} from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { sfx } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeTech, setActiveTech] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua',
    'Enterprise System',
    'Final Year Project',
    'Web Application',
    'Coursework',
  ] as const;

  const techStacks = [
    { id: 'Semua', label: 'Semua Stack', color: 'from-crimson-600 to-rose-600' },
    { id: 'Node.js / Express', label: 'Node.js & Express', color: 'from-emerald-600 to-teal-600' },
    { id: 'React.js', label: 'React.js', color: 'from-sky-600 to-blue-600' },
    { id: 'MySQL', label: 'MySQL / Database', color: 'from-amber-600 to-orange-600' },
    { id: 'PHP / Laravel', label: 'PHP & Laravel', color: 'from-rose-600 to-red-600' },
    { id: 'Socket.io', label: 'Socket.io Real-Time', color: 'from-violet-600 to-purple-600' },
    { id: 'TypeScript', label: 'TypeScript', color: 'from-blue-600 to-indigo-600' },
  ];

  // Helper count for each tech stack
  const getTechCount = (techId: string) => {
    if (techId === 'Semua') return projects.length;
    return projects.filter((p) => {
      if (techId === 'Node.js / Express')
        return p.technologies.some((t) => t.includes('Node') || t.includes('Express'));
      if (techId === 'React.js') return p.technologies.some((t) => t.includes('React'));
      if (techId === 'MySQL')
        return p.technologies.some((t) => t.includes('MySQL') || t.includes('Sequelize'));
      if (techId === 'PHP / Laravel')
        return p.technologies.some((t) => t.includes('PHP') || t.includes('Laravel'));
      if (techId === 'Socket.io')
        return p.technologies.some((t) => t.toLowerCase().includes('socket'));
      if (techId === 'TypeScript')
        return p.technologies.some((t) => t.includes('TypeScript'));
      return true;
    }).length;
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'Semua') return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Category filter
      const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;

      // 2. Tech filter
      let matchTech = true;
      if (activeTech === 'Node.js / Express') {
        matchTech = p.technologies.some((t) => t.includes('Node') || t.includes('Express'));
      } else if (activeTech === 'React.js') {
        matchTech = p.technologies.some((t) => t.includes('React'));
      } else if (activeTech === 'MySQL') {
        matchTech = p.technologies.some((t) => t.includes('MySQL') || t.includes('Sequelize'));
      } else if (activeTech === 'PHP / Laravel') {
        matchTech = p.technologies.some((t) => t.includes('PHP') || t.includes('Laravel'));
      } else if (activeTech === 'Socket.io') {
        matchTech = p.technologies.some((t) => t.toLowerCase().includes('socket'));
      } else if (activeTech === 'TypeScript') {
        matchTech = p.technologies.some((t) => t.includes('TypeScript'));
      }

      // 3. Search query
      let matchQuery = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const text = `${p.title} ${p.shortDescription} ${p.category} ${p.technologies.join(' ')}`.toLowerCase();
        matchQuery = text.includes(q);
      }

      return matchCategory && matchTech && matchQuery;
    });
  }, [activeCategory, activeTech, searchQuery]);

  const hasActiveFilters = activeCategory !== 'Semua' || activeTech !== 'Semua' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    sfx.playClick();
    setActiveCategory('Semua');
    setActiveTech('Semua');
    setSearchQuery('');
  };

  return (
    <section
      id="proyek"
      className="py-28 bg-slate-50 dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300"
    >
      {/* 3D Ambient Light Mesh */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
          >
            <FolderGit2 size={13} className="text-crimson-500" />
            <span>{t.projects.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
          >
            {t.projects.heading1} <span className="text-gradient-crimson">{t.projects.heading2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
          >
            {t.projects.subheading}
          </motion.p>
          <div className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 rounded-full mx-auto mt-4 shadow-glow-crimson" />
        </div>

        {/* --- DUAL INTERACTIVE FILTER TOOLBAR --- */}
        <div className="mb-10 space-y-4 max-w-4xl mx-auto">
          {/* Row 1: Category Filter Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-white dark:bg-onyx-900/90 rounded-2xl border border-slate-200 dark:border-onyx-800 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto p-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-2 shrink-0 hidden md:inline">
                {t.projects.categoryLabel}
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sfx.playClick();
                      setActiveCategory(cat);
                    }}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-gradient-to-r from-crimson-600 to-rose-600 rounded-xl shadow-glow-crimson -z-10"
                      />
                    )}
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-black/30 text-white'
                          : 'bg-slate-100 dark:bg-onyx-950 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Text Filter Input */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari keyword proyek..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-crimson-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Tech Stack Multi-Tag Strip */}
          <div className="p-3 bg-white/70 dark:bg-onyx-900/60 rounded-2xl border border-slate-200 dark:border-onyx-800 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Code2 size={13} className="text-crimson-500" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t.projects.techFilterLabel}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {lang === 'id' ? '(Klik tag untuk menyaring keahlian spesifik)' : '(Click tags to filter by specific skills)'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {techStacks.map((tech) => {
                const isActive = activeTech === tech.id;
                const count = getTechCount(tech.id);

                return (
                  <button
                    key={tech.id}
                    onClick={() => {
                      sfx.playClick();
                      setActiveTech(tech.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-crimson-600 text-white shadow-glow-crimson font-bold border border-crimson-500'
                        : 'bg-slate-100 dark:bg-onyx-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-onyx-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{tech.id === 'Semua' ? (lang === 'id' ? 'Semua' : 'All') : tech.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                        isActive
                          ? 'bg-black/30 text-white font-bold'
                          : 'bg-white dark:bg-white/5 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* Reset Button (visible when filters are applied) */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                  title={t.projects.resetFilter}
                >
                  <RotateCcw size={12} />
                  <span>{t.projects.resetFilter}</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Status Bar */}
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {t.projects.showing}{' '}
                <strong className="text-slate-900 dark:text-white font-bold">
                  {filteredProjects.length}
                </strong>{' '}
                {t.projects.of} {projects.length} {t.projects.projectsWord}
              </span>
              {activeTech !== 'Semua' && (
                <span className="px-2 py-0.5 rounded bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20 text-[10px] font-bold">
                  Stack: {activeTech}
                </span>
              )}
              {activeCategory !== 'Semua' && (
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-onyx-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-onyx-700 text-[10px] font-bold">
                  Kategori: {activeCategory}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {lang === 'id'
                  ? 'Filter aktif • Klik kartu untuk membuka detail arsitektur'
                  : 'Active filters • Click card to inspect architecture details'}
              </span>
            )}
          </div>
        </div>

        {/* 3D Perspective Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 px-6 text-center bg-white dark:bg-onyx-900/80 rounded-3xl border border-slate-200 dark:border-onyx-800 max-w-lg mx-auto shadow-md backdrop-blur-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-crimson-500/10 text-crimson-500 mx-auto flex items-center justify-center mb-4 border border-crimson-500/20">
              <Filter size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.projects.noProjectsTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-5 max-w-xs mx-auto leading-relaxed">
              {t.projects.noProjectsDesc}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-crimson transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>{t.projects.resetFilter}</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1200"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
