import React from 'react';
import { ArrowUp, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { sfx } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 pt-20 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Tech Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 shadow-glow-crimson" />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-crimson-600 to-rose-600 text-white font-mono text-sm font-black flex items-center justify-center shadow-glow-crimson">
                &gt;_
              </span>
              <span className="font-mono font-black text-2xl tracking-tight text-slate-900 dark:text-white">
                FRZ<span className="text-crimson-500">.DEV</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-4 leading-relaxed font-normal">
              Portofolio profesional Fariza Arlistiana, mahasiswa Teknik
              Informatika Universitas Pamulang yang berfokus pada Web Development
              dan Software Engineering modern.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-onyx-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
              <span>UNPAM &bull; S1 Teknik Informatika (Aktif)</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">
              <li>
                <a href="/#beranda" className="hover:text-crimson-500 transition-colors">
                  // 00 Beranda
                </a>
              </li>
              <li>
                <a href="/#tentang" className="hover:text-crimson-500 transition-colors">
                  // 01 Tentang Saya
                </a>
              </li>
              <li>
                <a href="/#keahlian" className="hover:text-crimson-500 transition-colors">
                  // 02 Keahlian Teknis
                </a>
              </li>
              <li>
                <a href="/#proyek" className="hover:text-crimson-500 transition-colors">
                  // 03 Proyek Pilihan
                </a>
              </li>
              <li>
                <a href="/#sertifikat" className="hover:text-crimson-500 transition-colors">
                  // 04 Map Sertifikat
                </a>
              </li>
              <li>
                <a href="/#pengalaman" className="hover:text-crimson-500 transition-colors">
                  // 05 Riwayat Akademik
                </a>
              </li>
              <li>
                <a href="/#kontak" className="hover:text-crimson-500 transition-colors">
                  // 06 Hubungi Saya
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">
              Koneksi Sosial
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Kunjungi profil media sosial atau kirim email langsung:
            </p>
            <SocialLinks variant="compact" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-onyx-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            &copy; 2026 FRZ.DEV &bull; Fariza Arlistiana. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="btn-3d px-4 py-2 rounded-xl bg-slate-100 dark:bg-onyx-900 hover:bg-slate-200 dark:hover:bg-onyx-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
