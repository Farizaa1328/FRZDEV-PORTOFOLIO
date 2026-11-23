import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Download,
  X,
  CheckCircle2,
  WifiOff,
  Zap,
  Home,
  Share,
  PlusSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { usePwa } from '../context/PwaContext';
import { useLanguage } from '../context/LanguageContext';
import { sfx } from '../utils/sound';

export const PwaInstallModal: React.FC = () => {
  const { isModalOpen, closeInstallModal, isInstallable, isInstalled, promptInstall } = usePwa();
  const { lang } = useLanguage();

  // Simple iOS Safari check
  const isIos =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInstallModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0A0A0F] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Top Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400" />

            {/* Header & Close Button */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crimson-600 to-rose-600 flex items-center justify-center text-white shadow-glow-crimson shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles size={11} />
                    <span>PROGRESSIVE WEB APP</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {lang === 'id' ? 'Pasang Aplikasi FRZ.DEV' : 'Install FRZ.DEV Web App'}
                  </h3>
                </div>
              </div>

              <button
                onClick={closeInstallModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* App Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
              {lang === 'id'
                ? 'Pasang portofolio Fariza Arlistiana langsung ke layar utama ponsel atau desktop Anda. Nikmati tampilan native tanpa bar peramban dan akses offline saat berada di lokasi wawancara kerja.'
                : 'Install Fariza Arlistiana portfolio directly to your home screen or desktop. Enjoy a clean native app view without browser bars and full offline support during on-site interviews.'}
            </p>

            {/* Benefit Highlights */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Performa Instan & Layar Penuh' : 'Instant & Standalone Fullscreen'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'id'
                      ? 'Dibuka instan tanpa address bar seperti aplikasi App Store'
                      : 'Opens instantly without browser address bar just like native apps'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-crimson-500/10 text-crimson-500 flex items-center justify-center shrink-0">
                  <WifiOff size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Akses Offline-First' : 'Offline-First Support'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'id'
                      ? 'Dapat dibuka lancar meskipun sedang tidak terhubung internet'
                      : 'Fully readable and interactive even without active internet connection'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Home size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Ikon Khusus Homescreen' : 'Dedicated Home Icon'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'id'
                      ? 'Ikon logo FRZ.DEV tersimpan di beranda perangkat Anda'
                      : 'Custom FRZ.DEV logo icon pinned directly on your device home'}
                  </div>
                </div>
              </div>
            </div>

            {/* iOS Guidance or Action Button */}
            {isInstalled ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>
                  {lang === 'id'
                    ? 'Aplikasi FRZ.DEV Sudah Terpasang di Perangkat Ini!'
                    : 'FRZ.DEV Web App is Already Installed!'}
                </span>
              </div>
            ) : isIos ? (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-crimson-600 dark:text-crimson-400">
                  <Share size={14} />
                  <span>
                    {lang === 'id'
                      ? 'Panduan Pasang di iOS Safari:'
                      : 'How to install on iOS Safari:'}
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                  <li>
                    {lang === 'id'
                      ? 'Tap tombol Bagikan / Share (ikon kotak panah atas) di Safari'
                      : 'Tap the Share button at the bottom of Safari'}
                  </li>
                  <li>
                    {lang === 'id'
                      ? 'Gulir ke bawah dan pilih "Tambah ke Layar Utama"'
                      : 'Scroll down and select "Add to Home Screen"'}
                  </li>
                  <li>
                    {lang === 'id'
                      ? 'Tap "Tambah" di pojok kanan atas untuk menyelesaikan'
                      : 'Tap "Add" in the top-right corner to complete'}
                  </li>
                </ol>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => promptInstall()}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-crimson-600 to-rose-600 hover:from-crimson-500 hover:to-rose-500 text-white font-mono font-bold text-xs tracking-wider uppercase shadow-glow-crimson flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Download size={15} />
                  <span>{lang === 'id' ? 'Pasang Sekarang' : 'Install App Now'}</span>
                </button>
                <button
                  onClick={closeInstallModal}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  {lang === 'id' ? 'Nanti Saja' : 'Later'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
