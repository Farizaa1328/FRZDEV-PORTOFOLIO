import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  User,
  GraduationCap,
  MapPin,
  Target,
  Building2,
  ShieldCheck,
  Code2,
  Sparkles,
  Zap,
  Copy,
  Check,
  FileCode,
  Terminal,
} from 'lucide-react';
import { Tilt3D } from '../components/Tilt3D';
import { CvPreviewModal } from '../components/CvPreviewModal';
import { sfx } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'mission' | 'academics'>('profile');
  const [copied, setCopied] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  const codeSnippets = {
    profile: `// FarizaArlistiana.ts - Creative Software Engineer
export const developer: Engineer = {
  name: "Fariza Arlistiana",
  title: "Web Developer & Informatics Student",
  institution: "Universitas Pamulang (UNPAM)",
  degree: "S1 Teknik Informatika",
  status: "Active Student // Semester 7",
  location: "Jakarta Selatan, Indonesia (UTC+7)",
  coreFocus: [
    "Web Application Architecture",
    "Full-Stack Development (Laravel & React)",
    "Relational Database Engineering",
    "Network Infrastructure (Cisco CCNA)"
  ],
  isAvailableForHire: true
};`,
    mission: `// CareerMission.json
{
  "vision": "Membangun solusi digital yang fungsional, terukur, dan bermakna",
  "engineeringPrinciples": [
    "Clean & Maintainable Architecture",
    "User-Centric Responsive UI/UX",
    "Robust Security & Data Integrity",
    "High Performance & Low Latency"
  ],
  "passion": "Eksplorasi teknologi modern & penerapan rekayasa perangkat lunak"
}`,
    academics: `// Academics.config.ts
export const academicProfile = {
  university: "Universitas Pamulang (UNPAM)",
  faculty: "Ilmu Komputer // Teknik Informatika (S1)",
  finalProject: {
    code: "SIPAK RT-012",
    title: "Sistem Informasi Pelayanan Administrasi & Keuangan Warga",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap", "Blade"]
  },
  certifications: [
    "Cisco CCNA (Switching, Routing, and Wireless Essentials)",
    "Kredensial Mikro LPKKS UNPAM & Cisco (70 JP)"
  ]
};`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = [
    {
      label: 'Nama Lengkap',
      value: 'Fariza Arlistiana',
      detail: 'Founder & Engineer FRZ.DEV',
      icon: User,
      color: 'from-crimson-600 to-rose-600',
    },
    {
      label: 'Jenjang Studi',
      value: 'S1 Teknik Informatika',
      detail: 'Konsentrasi Software Engineering',
      icon: GraduationCap,
      color: 'from-rose-600 to-purple-600',
    },
    {
      label: 'Perguruan Tinggi',
      value: 'Universitas Pamulang',
      detail: 'Kampus Pamulang / Jakarta Selatan',
      icon: Building2,
      color: 'from-amber-600 to-crimson-600',
    },
    {
      label: 'Fokus Rekayasa',
      value: 'Web Development & Systems',
      detail: 'Full-Stack Architecture & Database',
      icon: Target,
      color: 'from-crimson-600 to-rose-500',
    },
    {
      label: 'Domisili',
      value: 'Jakarta Selatan, ID',
      detail: 'Waktu Indonesia Barat (UTC+7)',
      icon: MapPin,
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <section id="tentang" className="py-28 bg-slate-50 dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-crimson-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 font-mono text-xs uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span>{t.about.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {t.about.heading1} <span className="text-gradient-crimson">{t.about.heading2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-3 leading-relaxed font-normal"
          >
            {t.about.subheading}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 mt-4 rounded-full origin-left shadow-glow-crimson"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Cyber IDE Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Tilt3D
              perspective={1000}
              maxTilt={4}
              spotlight={true}
              spotlightColor="rgba(239, 68, 68, 0.22)"
              className="bg-white dark:bg-onyx-900/95 rounded-3xl border-2 border-slate-200 dark:border-onyx-700/80 shadow-2xl dark:shadow-3d-card p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl transition-colors duration-300"
            >
              {/* IDE Window Header & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-onyx-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-crimson-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  
                  {/* File Tabs */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'profile'
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Fariza.ts
                    </button>
                    <button
                      onClick={() => setActiveTab('mission')}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'mission'
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Mission.json
                    </button>
                    <button
                      onClick={() => setActiveTab('academics')}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'academics'
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Academics.ts
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-onyx-700 bg-slate-100 dark:bg-onyx-850 text-slate-500 dark:text-slate-400 hover:text-crimson-500 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                  title="Copy Code"
                >
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Display Area */}
              <div className="bg-slate-900 rounded-2xl p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed shadow-inner border border-slate-800 text-slate-300">
                <pre className="text-slate-200">
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>

              {/* Bio Narrative */}
              <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                <p>
                  Saya merupakan mahasiswa Teknik Informatika di Universitas Pamulang yang berfokus pada pengembangan aplikasi berbasis web, perancangan sistem informasi, serta penerapan teknologi untuk membangun solusi digital yang efektif dan bermanfaat.
                </p>
                <p>
                  Saya terus mengembangkan kemampuan teknis, mengeksplorasi teknologi baru, dan membangun berbagai proyek sebagai bagian dari perjalanan saya di dunia teknologi.
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 pt-6 border-t border-slate-200 dark:border-onyx-800">
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-onyx-850 border border-slate-200 dark:border-onyx-800">
                  <div className="text-2xl font-black text-slate-900 dark:text-white">4+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Proyek Nyata Teruji</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-onyx-850 border border-slate-200 dark:border-onyx-800">
                  <div className="text-2xl font-black text-crimson-600 dark:text-crimson-400">CCNA</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Sertifikasi Cisco</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-100 dark:bg-onyx-850 border border-slate-200 dark:border-onyx-800">
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Komitmen Mutu Kode</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    setIsCvOpen(true);
                  }}
                  className="btn-3d px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-glow-crimson group cursor-pointer"
                >
                  <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download CV Fariza (.PDF)</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Dokumen Terverifikasi Resmi</span>
                </div>
              </div>
            </Tilt3D>
          </motion.div>

          {/* Right Column: 3D Micro Spec Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            {specs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Tilt3D
                  key={idx}
                  perspective={800}
                  maxTilt={6}
                  spotlight={true}
                  spotlightColor="rgba(239, 68, 68, 0.18)"
                  className="p-4 rounded-2xl bg-white dark:bg-onyx-900/80 border border-slate-200 dark:border-onyx-800 shadow-md hover:border-crimson-500/70 transition-all duration-300 group backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0" style={{ transform: 'translateZ(10px)' }}>
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {item.label}
                      </div>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                        {item.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              );
            })}

            {/* Academic Status Card */}
            <Tilt3D
              perspective={800}
              maxTilt={5}
              className="p-5 rounded-2xl bg-gradient-to-r from-crimson-950 via-onyx-900 to-rose-950 text-white shadow-2xl border border-crimson-500/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span>STATUS AKADEMIK AKTIF</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Universitas Pamulang &bull; S1 Teknik Informatika
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Tugas Akhir: SIPAK RT-012 (Sistem Pelayanan Warga)
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold border border-white/20">
                    2023 — Sekarang
                  </span>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>

      {/* CV Interactive Preview & Download Modal */}
      <CvPreviewModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
};
