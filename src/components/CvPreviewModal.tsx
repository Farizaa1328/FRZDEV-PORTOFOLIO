import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Eye,
  Sparkles,
  GraduationCap,
  Award,
  ShieldCheck,
  Mail,
  Github,
  Briefcase,
  Building2,
} from 'lucide-react';
import { sfx } from '../utils/sound';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'ats'>('preview');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText('farizaarlis28@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-onyx-950 border-b border-slate-200 dark:border-onyx-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 flex items-center justify-center border border-crimson-500/20">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Curriculum Vitae &bull; Fariza Arlistiana
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Mahasiswa Teknik Informatika Universitas Pamulang &bull; Software Engineer
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-slate-200/60 dark:bg-onyx-800 text-slate-600 dark:text-slate-300 hover:text-crimson-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-onyx-700 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Tutup Pratinjau CV"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sub Navigation Bar: View Mode Switcher */}
          <div className="px-6 py-2.5 bg-white dark:bg-onyx-900 border-b border-slate-100 dark:border-onyx-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sfx.playSwitch();
                  setActiveTab('preview');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30 font-black'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span>Pratinjau PDF Asli</span>
              </button>

              <button
                onClick={() => {
                  sfx.playSwitch();
                  setActiveTab('ats');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ats'
                    ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30 font-black'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles size={13} />
                <span>Ringkasan Profil ATS (10 Detik)</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Format Dokumen Resmi (525 KB)</span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/60 dark:bg-onyx-950/60 min-h-[460px]">
            {activeTab === 'preview' ? (
              <div className="w-full h-full flex flex-col items-center">
                {/* PDF Viewer Container */}
                <div className="w-full h-[58vh] sm:h-[62vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 shadow-inner relative">
                  <iframe
                    src="/cv/fariza-cv.pdf#toolbar=1&navpanes=0"
                    title="Curriculum Vitae Fariza Arlistiana"
                    className="w-full h-full border-0"
                  />
                  {/* Fallback info bar for mobile if iframe is constrained */}
                  <div className="sm:hidden absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-white/95 dark:bg-onyx-900/95 backdrop-blur-md border border-slate-200 dark:border-onyx-800 text-center shadow-lg">
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-1.5">
                      Pratinjau PDF optimal di browser desktop atau unduh langsung.
                    </p>
                    <a
                      href="/cv/fariza-cv.pdf"
                      download="fariza-cv.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-crimson-600 text-white text-xs font-bold"
                    >
                      <Download size={12} />
                      <span>Unduh File PDF Sekarang</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: ATS PROFILE SUMMARY (FAST RECRUITER VIEW) */
              <div className="space-y-5 max-w-3xl mx-auto">
                {/* Card 1: Executive Profile */}
                <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-onyx-800 pb-2.5">
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        Fariza Arlistiana
                      </h4>
                      <p className="text-xs font-mono text-crimson-600 dark:text-crimson-400 font-bold">
                        Software Engineer &bull; Web Application Developer
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                      Open to Work / Internship
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Mahasiswa Teknik Informatika Universitas Pamulang yang memiliki minat mendalam dan kompetensi pada pengembangan perangkat lunak modern, perancangan arsitektur sistem informasi berbasis web (MVC &amp; SPA), serta rekayasa basis data relasional.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <span className="text-[10px] font-mono text-slate-400 block">PENDIDIKAN:</span>
                      <span className="font-bold text-slate-900 dark:text-white">S1 Teknik Informatika</span>
                      <span className="text-[11px] text-slate-500 block">Universitas Pamulang</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <span className="text-[10px] font-mono text-slate-400 block">SERTIFIKASI RESMI:</span>
                      <span className="font-bold text-slate-900 dark:text-white">Cisco CCNA &amp; LPKKS</span>
                      <span className="text-[11px] text-slate-500 block">Kredensial Mikro 70 JP</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <span className="text-[10px] font-mono text-slate-400 block">DOMISILI &amp; BAHASA:</span>
                      <span className="font-bold text-slate-900 dark:text-white">Jakarta Selatan</span>
                      <span className="text-[11px] text-slate-500 block">Indonesia (Native)</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Riwayat Pendidikan */}
                <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm space-y-3">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap size={16} className="text-crimson-500" />
                    <span>Riwayat Pendidikan Formal</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-[13px] block">
                            Universitas Pamulang
                          </span>
                          <span className="text-crimson-600 dark:text-crimson-400 font-semibold">
                            Teknik Informatika (S1) &bull; Semester 7
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 font-bold">
                          2023 — Sekarang
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                        Jurusan ini mempelajari pengembangan perangkat lunak dan sistem informasi, meliputi pemrograman, pengembangan website, database, serta dasar-dasar analisis dan perancangan sistem.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-[13px] block">
                            SMKN 29 Penerbangan Jakarta
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">
                            Teknik Pendingin dan Tata Udara
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-bold">
                          2020 — 2023
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                        Jurusan ini mempelajari dasar-dasar instalasi, perawatan, dan perbaikan sistem pendingin dan tata udara, seperti AC dan sistem refrigerasi, serta dasar kelistrikan dan troubleshooting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Pengalaman Kerja & Praktik */}
                <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm space-y-3">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={16} className="text-rose-500" />
                    <span>Pengalaman Kerja &amp; Praktik Industri</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-[13px] block">
                            PT. Bintang Plastik Sempurna
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Magang — Web Developer
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          2022 — 2023
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                        Terlibat dalam pengembangan website internal perusahaan untuk mendukung proses transaksi, pengelolaan inventory, serta pengolahan data perusahaan. Membantu pengembangan fitur dan memastikan sistem dapat digunakan sesuai kebutuhan perusahaan.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-[13px] block">
                            Panasonic Gobel Indonesia
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            Praktik Kerja Lapangan (PKL)
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                          2017 — 2018
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                        Bertanggung jawab dalam proses produksi dan perakitan radio Panasonic, termasuk perakitan PCB, pemasangan komponen elektronik, serta pengecekan hasil perakitan sesuai prosedur produksi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Core Skills Matrix */}
                <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm space-y-3">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Award size={16} className="text-crimson-500" />
                    <span>Keahlian &amp; Stack Teknologi Utama</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
                        BACKEND &amp; BASIS DATA:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['PHP', 'Laravel', 'MySQL', 'REST API', 'Eloquent ORM', 'Relational ERD'].map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 font-mono font-bold text-[11px] border border-crimson-500/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
                        FRONTEND &amp; UI/UX:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['React.js', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 / Semantic DOM', 'Bootstrap'].map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-onyx-950 text-slate-800 dark:text-slate-200 font-mono font-bold text-[11px] border border-slate-200 dark:border-onyx-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Featured Projects */}
                <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm space-y-3">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText size={16} className="text-rose-500" />
                    <span>Proyek Rekayasa Unggulan</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">BPS-System (Enterprise ERP)</span>
                        <span className="font-mono text-[10px] text-sky-500 font-bold">Node.js &bull; React &bull; MySQL</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        Sistem manajemen manufaktur PT Bintang Plastik Sempurna: produksi pabrik, inventaris bahan baku biji plastik, faktur pajak PPN 11%, dan Socket.io realtime.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">SIPAK RT-012 (Tugas Akhir S1)</span>
                        <span className="font-mono text-[10px] text-amber-500 font-bold">Laravel &bull; MySQL</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        Sistem informasi pelayanan kependudukan RT, otomasi pembuatan surat pengantar mandiri, dan pembukuan transparansi kas keuangan warga.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">Kost Saali Application</span>
                        <span className="font-mono text-[10px] text-violet-500 font-bold">React &bull; TypeScript</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        Aplikasi manajemen kamar kost, pelacak jatuh tempo tagihan sewa penyewa, dan matriks okupansi interaktif.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Action Bar */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-onyx-950 border-t border-slate-200 dark:border-onyx-800 flex flex-wrap items-center justify-between gap-3">
            {/* Left buttons: Copy email & new tab */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-onyx-900 hover:bg-slate-100 dark:hover:bg-onyx-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-onyx-800 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Email Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    <span>Salin Email</span>
                  </>
                )}
              </button>

              <a
                href="/cv/fariza-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playClick()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-onyx-900 hover:bg-slate-100 dark:hover:bg-onyx-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-onyx-800 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              >
                <ExternalLink size={14} />
                <span>Buka Tab Penuh</span>
              </a>
            </div>

            {/* Right button: Direct Download */}
            <a
              href="/cv/fariza-cv.pdf"
              download="fariza-cv.pdf"
              onClick={() => sfx.playSuccess()}
              className="btn-3d inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-glow-crimson hover:scale-105 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Unduh File CV Resmi (.PDF)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
