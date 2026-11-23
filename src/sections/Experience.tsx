import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Terminal,
  ArrowUpRight,
  Cpu,
  Wrench,
} from 'lucide-react';
import { Tilt3D } from '../components/Tilt3D';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const education = [
    {
      period: '2023 — Sekarang',
      role: 'Teknik Informatika',
      institution: 'Universitas Pamulang',
      badge: 'Mahasiswa Aktif (Semester 7)',
      badgeColor: 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border-crimson-500/30',
      description:
        'Jurusan ini mempelajari pengembangan perangkat lunak dan sistem informasi, meliputi pemrograman, pengembangan website, database, serta dasar-dasar analisis dan perancangan sistem.',
      highlights: [
        'Pengembangan perangkat lunak & website modern (Frontend, Backend, dan Full-Stack)',
        'Rekayasa basis data relasional (MySQL) dan perancangan arsitektur sistem informasi',
        'Dasar-dasar analisis sistem, kebutuhan bisnis manufaktur, dan perancangan sistem terpadu',
      ],
      icon: GraduationCap,
    },
    {
      period: '2020 — 2023',
      role: 'Teknik Pendingin dan Tata Udara',
      institution: 'SMKN 29 Penerbangan Jakarta',
      badge: 'Alumni',
      badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
      description:
        'Jurusan ini mempelajari dasar-dasar instalasi, perawatan, dan perbaikan sistem pendingin dan tata udara, seperti AC dan sistem refrigerasi, serta dasar kelistrikan dan troubleshooting.',
      highlights: [
        'Dasar-dasar instalasi, pemeliharaan preventif, dan perbaikan sistem pendingin (AC & refrigerasi)',
        'Pemahaman dasar kelistrikan, instrumen pengukuran, dan skema rangkaian teknis',
        'Metodologi troubleshooting masalah teknis dan keselamatan kerja bengkel industri',
      ],
      icon: Wrench,
    },
  ];

  const workExperience = [
    {
      period: '2022 — 2023',
      role: 'Magang — Web Developer',
      company: 'PT. Bintang Plastik Sempurna',
      type: 'Magang',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      description:
        'Terlibat dalam pengembangan website internal perusahaan untuk mendukung proses transaksi, pengelolaan inventory, serta pengolahan data perusahaan. Membantu pengembangan fitur dan memastikan sistem dapat digunakan sesuai kebutuhan perusahaan.',
      responsibilities: [
        'Pengembangan modul website internal perusahaan untuk transaksi bisnis dan pergerakan stok',
        'Pengelolaan inventory bahan baku dan barang jadi manufaktur secara terstruktur',
        'Pengolahan data perusahaan, pelaporan operasional, dan penyesuaian fitur sistem sesuai kebutuhan pengguna',
      ],
      icon: Building2,
    },
    {
      period: '2017 — 2018',
      role: 'Praktik Kerja Lapangan (PKL)',
      company: 'Panasonic Gobel Indonesia',
      type: 'PKL',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      description:
        'Bertanggung jawab dalam proses produksi dan perakitan radio Panasonic, termasuk perakitan PCB, pemasangan komponen elektronik, serta pengecekan hasil perakitan sesuai prosedur produksi.',
      responsibilities: [
        'Proses lini perakitan radio Panasonic dengan disiplin dan ketelitian manufaktur tinggi',
        'Perakitan modul PCB dan pemasangan komponen elektronik presisi',
        'Inspeksi dan pengecekan kualitas hasil perakitan sesuai Standard Operating Procedure (SOP)',
      ],
      icon: Cpu,
    },
  ];

  return (
    <section
      id="pengalaman"
      className="py-28 bg-white dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300"
    >
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-crimson-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span>{t.experience.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {t.experience.heading1} <span className="text-gradient-crimson">{t.experience.heading2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-3 leading-relaxed font-normal"
          >
            {t.experience.subheading}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 mt-4 rounded-full origin-left shadow-glow-crimson"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Pendidikan Formal */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-crimson-600 text-white flex items-center justify-center shadow-glow-crimson">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t.experience.eduHeading}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Riwayat studi akademis dan kejuruan
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {education.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Tilt3D
                    key={idx}
                    perspective={1000}
                    maxTilt={6}
                    spotlight={true}
                    spotlightColor="rgba(239, 68, 68, 0.2)"
                    className="p-7 sm:p-8 rounded-3xl border border-slate-200 dark:border-onyx-800 bg-slate-50 dark:bg-onyx-900/90 shadow-md dark:shadow-3d-card hover:border-crimson-500/70 transition-all duration-300 relative overflow-hidden group backdrop-blur-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <span className="font-mono text-xs text-crimson-600 dark:text-crimson-400 font-bold bg-crimson-500/10 border border-crimson-500/20 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-bold shadow-xs ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 shrink-0 mt-0.5">
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors">
                            {item.role}
                          </h4>
                          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                            {item.institution}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-3 mb-5">
                        {item.description}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-onyx-800">
                        {item.highlights.map((point, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 mt-2 shrink-0 shadow-glow-crimson" />
                            <span className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Laser Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 opacity-80" />
                  </Tilt3D>
                );
              })}
            </div>
          </div>

          {/* Right Column: Pengalaman Kerja */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-glow-crimson">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t.experience.workHeading}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Praktik kerja industri &amp; magang software
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {workExperience.map((work, idx) => {
                const IconComponent = work.icon;
                return (
                  <Tilt3D
                    key={idx}
                    perspective={1000}
                    maxTilt={6}
                    spotlight={true}
                    spotlightColor="rgba(239, 68, 68, 0.2)"
                    className="p-7 sm:p-8 rounded-3xl border border-slate-200 dark:border-onyx-800 bg-slate-50 dark:bg-onyx-900/90 shadow-md dark:shadow-3d-card hover:border-crimson-500/70 transition-all duration-300 relative overflow-hidden group backdrop-blur-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <span className="font-mono text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                          {work.period}
                        </span>
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-bold shadow-xs ${work.badgeColor}`}
                        >
                          {work.type}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors">
                            {work.role}
                          </h4>
                          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                            {work.company}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-3 mb-5">
                        {work.description}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-onyx-800">
                        {work.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0 shadow-[0_0_8px_#F43F5E]" />
                            <span className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Laser Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-crimson-500 to-rose-400 opacity-80" />
                  </Tilt3D>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verification & Certification Note */}
        <div className="mt-10 p-5 rounded-2xl bg-crimson-500/10 border border-crimson-500/30 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3.5 shadow-md backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-crimson-600 text-white flex items-center justify-center shrink-0 shadow-glow-crimson">
            <ShieldCheck size={20} />
          </div>
          <div className="leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white">Verifikasi Kredensial &amp; Dokumen:</span> Seluruh riwayat pendidikan di{' '}
            <strong className="text-slate-900 dark:text-white">Universitas Pamulang</strong> &amp;{' '}
            <strong className="text-slate-900 dark:text-white">SMKN 29 Penerbangan Jakarta</strong>, serta pengalaman kerja di{' '}
            <strong className="text-slate-900 dark:text-white">PT. Bintang Plastik Sempurna</strong> &amp;{' '}
            <strong className="text-slate-900 dark:text-white">Panasonic Gobel Indonesia</strong> tercatat resmi pada Curriculum Vitae dan dapat dibuktikan keabsahannya.
          </div>
        </div>
      </div>
    </section>
  );
};
