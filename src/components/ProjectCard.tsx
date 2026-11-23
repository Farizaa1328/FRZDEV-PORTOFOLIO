import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Layers,
  FileText,
  UserPlus,
  Receipt,
  Home,
  Code2,
} from 'lucide-react';
import { Project } from '../data/projects';
import { Tilt3D } from './Tilt3D';
import { sfx } from '../utils/sound';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'sim'>('info');

  // Interactive Simulation States for BPS System
  const [bpsOutput, setBpsOutput] = useState<number>(4850);
  const [bpsStockKg, setBpsStockKg] = useState<number>(120400);
  const [bpsLog, setBpsLog] = useState<string>('Socket.io Realtime: Terhubung ke Pabrik PT Bintang Plastik Sempurna');

  // Interactive Simulation States for SIPAK
  const [wargaCount, setWargaCount] = useState<number>(142);
  const [kasAmount, setKasAmount] = useState<number>(7100000);
  const [sipakLog, setSipakLog] = useState<string>('Sistem SIPAK RT-012 online & siap dioperasikan.');

  // Interactive Simulation States for Kost Saali
  const [selectedRoom, setSelectedRoom] = useState<'101' | '102' | '103'>('102');
  const [room102Booked, setRoom102Booked] = useState<boolean>(false);

  // Interactive Simulation States for Kasir POS
  const [posTotal, setPosTotal] = useState<number>(0);
  const [posItems, setPosItems] = useState<string[]>([]);
  const [isReceiptPrinted, setIsReceiptPrinted] = useState<boolean>(false);

  // Interactive Simulation States for CodeLearn
  const [codeOutput, setCodeOutput] = useState<string>('Tekan tombol "Jalankan Kode" di bawah...');

  const isInProgress = project.status === 'In Progress';

  const handleTabSwitch = (tab: 'info' | 'sim') => {
    sfx.playSwitch();
    setActiveTab(tab);
  };

  return (
    <Tilt3D
      maxTilt={5}
      scale={1.015}
      glare={true}
      spotlight={true}
      spotlightColor="rgba(239, 68, 68, 0.2)"
      className="group rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/90 overflow-hidden shadow-lg dark:shadow-3d-card hover:border-crimson-500/70 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full backdrop-blur-xl"
    >
      <div>
        {/* Project Thumbnail / Header Graphic with 3D Z-Popout */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className={`relative h-56 w-full bg-gradient-to-br ${project.thumbnailGradient} p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden rounded-t-3xl shadow-lg`}
        >
          {/* Subtle Cyber Grid in Banner */}
          <div className="absolute inset-0 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          {/* Top badges */}
          <div
            style={{ transform: 'translateZ(35px)' }}
            className="relative z-10 flex items-center justify-between gap-2"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full text-white border border-white/15 shadow-sm">
              {project.category}
            </span>

            {isInProgress ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-amber-400 text-amber-950 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                <Clock size={12} className="animate-pulse" />
                <span>In Progress</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-500 text-white px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                <CheckCircle2 size={12} />
                <span>Completed</span>
              </span>
            )}
          </div>

          {/* Title in Banner */}
          <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
            <div className="text-[10px] font-mono uppercase tracking-widest text-crimson-200 font-bold mb-1">
              Fariza Arlistiana &bull; Architecture Solution
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white leading-tight line-clamp-2 drop-shadow-md">
              {project.title}
            </h4>
          </div>
        </div>

        {/* View Mode Switcher: Deskripsi vs Simulasi Interaktif */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-100 dark:border-onyx-800">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleTabSwitch('info')}
              onMouseEnter={() => sfx.playHover()}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'info'
                  ? 'text-crimson-600 dark:text-crimson-400 border-b-2 border-crimson-500 font-black'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              [DESKRIPSI]
            </button>
            <button
              onClick={() => handleTabSwitch('sim')}
              onMouseEnter={() => sfx.playHover()}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sim'
                  ? 'text-crimson-600 dark:text-crimson-400 border-b-2 border-crimson-500 font-black'
                  : 'text-slate-400 hover:text-crimson-500'
              }`}
            >
              <Play size={11} className="text-crimson-500 fill-crimson-500" />
              <span>[SIMULASI LIVE]</span>
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            INTERACTIVE CARD
          </span>
        </div>

        {/* Card Content Area */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'info' ? (
              <motion.div
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Technologies Badges */}
                <div style={{ transform: 'translateZ(20px)' }} className="flex flex-wrap gap-1.5 mb-3.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-bold text-crimson-600 dark:text-crimson-400 bg-crimson-500/10 px-2.5 py-0.5 rounded-lg border border-crimson-500/20 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  style={{ transform: 'translateZ(25px)' }}
                  className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors mb-2.5 line-clamp-1"
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{ transform: 'translateZ(15px)' }}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-2 font-normal"
                >
                  {project.shortDescription}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="sim"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-2xl bg-slate-100 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 text-xs font-mono"
              >
                {/* SIMULATOR 0: BPS SYSTEM (ENTERPRISE ERP) */}
                {project.id === 'bps-system' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 font-bold uppercase">KONTROL PABRIK REALTIME:</span>
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Socket.io Live</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800">
                        <div className="text-[9px] font-mono text-slate-400">OUTPUT HARI INI</div>
                        <div className="font-mono font-black text-xs text-sky-500">{bpsOutput.toLocaleString('id-ID')} Kg</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800">
                        <div className="text-[9px] font-mono text-slate-400">STOK BIJI PLASTIK</div>
                        <div className="font-mono font-black text-xs text-slate-900 dark:text-white">{(bpsStockKg / 1000).toFixed(1)} Ton</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-onyx-900 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                      &gt; {bpsLog}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick();
                          setBpsOutput((p) => p + 250);
                          setBpsStockKg((s) => s - 250);
                          setBpsLog('Batch SPK #BP-881 Selesai: +250 Kg Produk Jadi dicetak!');
                        }}
                        className="p-1.5 rounded-md bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-sky-500 transition-colors cursor-pointer"
                      >
                        <Sparkles size={11} />
                        <span>+ Cetak Produksi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sfx.playSuccess();
                          setBpsLog('Faktur Pajak & Surat Jalan #SJ-094 Terbit (PPN 11% Otomatis)');
                        }}
                        className="p-1.5 rounded-md bg-slate-900 dark:bg-onyx-800 text-white font-bold text-[10px] flex items-center justify-center gap-1 hover:border-sky-500 border border-transparent transition-colors cursor-pointer"
                      >
                        <FileText size={11} />
                        <span>Terbit Faktur</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* SIMULATOR 1: SIPAK RT-012 */}
                {project.id === 'sipak-rt012' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-200 dark:border-onyx-800">
                      <span className="text-slate-500">DATABASE WARGA:</span>
                      <span className="font-bold text-crimson-500">{wargaCount} KK</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-200 dark:border-onyx-800">
                      <span className="text-slate-500">KAS IURAN RT:</span>
                      <span className="font-bold text-emerald-500">
                        Rp {kasAmount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-onyx-900 text-[10px] text-slate-600 dark:text-slate-300">
                      &gt; {sipakLog}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick();
                          setWargaCount((c) => c + 1);
                          setKasAmount((k) => k + 50000);
                          setSipakLog('Warga baru KK terdaftar! Kas iuran bertambah Rp 50.000');
                        }}
                        className="p-1.5 rounded-md bg-crimson-600 text-white font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-crimson-500 transition-colors"
                      >
                        <UserPlus size={11} />
                        <span>+ Input Warga</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sfx.playSuccess();
                          setSipakLog('Surat Pengantar RT #084 berhasil diterbitkan PDF.');
                        }}
                        className="p-1.5 rounded-md bg-slate-900 dark:bg-onyx-800 text-white font-bold text-[10px] flex items-center justify-center gap-1 hover:border-crimson-500 border border-transparent transition-colors"
                      >
                        <FileText size={11} />
                        <span>Cetak Surat</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* SIMULATOR 2: KOST SAALI */}
                {project.id === 'kost-saali' && (
                  <div className="space-y-2.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      PILIH KAMAR KOST UNTUK MENGECEK:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['101', '102', '103'] as const).map((room) => (
                        <button
                          key={room}
                          type="button"
                          onClick={() => {
                            sfx.playClick();
                            setSelectedRoom(room);
                          }}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            selectedRoom === room
                              ? 'border-crimson-500 bg-crimson-500/10 text-crimson-500 font-bold'
                              : 'border-slate-300 dark:border-onyx-700 text-slate-500'
                          }`}
                        >
                          Kamar {room}
                        </button>
                      ))}
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-onyx-900 text-[10px]">
                      {selectedRoom === '101' && (
                        <div className="text-slate-600 dark:text-slate-300">
                          <span className="font-bold text-rose-500">[TERISI]</span> Penyewa: Rian P. (AC, Km Mandi Dalam)
                        </div>
                      )}
                      {selectedRoom === '102' && (
                        <div className="text-slate-600 dark:text-slate-300">
                          <span className="font-bold text-emerald-500">
                            {room102Booked ? '[TERBOOKING]' : '[TERSEDIA]'}
                          </span>{' '}
                          Rp 1.200.000/bln &bull; Siap Huni
                        </div>
                      )}
                      {selectedRoom === '103' && (
                        <div className="text-slate-600 dark:text-slate-300">
                          <span className="font-bold text-rose-500">[TERISI]</span> Penyewa: Budi S. (Wifi 50Mbps)
                        </div>
                      )}
                    </div>

                    {selectedRoom === '102' && !room102Booked && (
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playSuccess();
                          setRoom102Booked(true);
                        }}
                        className="w-full py-1.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-500 transition-colors"
                      >
                        Simulasi Booking Kamar 102
                      </button>
                    )}
                  </div>
                )}

                {/* SIMULATOR 3: APLIKASI KASIR */}
                {project.id === 'aplikasi-kasir' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">TOTAL BELANJA:</span>
                      <span className="font-bold text-crimson-500">
                        Rp {posTotal.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick();
                          setPosTotal((t) => t + 18000);
                          setPosItems((arr) => [...arr, 'Nasi Goreng']);
                          setIsReceiptPrinted(false);
                        }}
                        className="p-1 rounded bg-white dark:bg-onyx-850 border border-slate-300 dark:border-onyx-700 text-[10px] text-left px-2"
                      >
                        + Nasi Goreng (18k)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick();
                          setPosTotal((t) => t + 5000);
                          setPosItems((arr) => [...arr, 'Es Teh']);
                          setIsReceiptPrinted(false);
                        }}
                        className="p-1 rounded bg-white dark:bg-onyx-850 border border-slate-300 dark:border-onyx-700 text-[10px] text-left px-2"
                      >
                        + Es Teh Manis (5k)
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (posTotal > 0) {
                            sfx.playSuccess();
                            setIsReceiptPrinted(true);
                          }
                        }}
                        className="flex-1 py-1 rounded bg-crimson-600 text-white text-[10px] font-bold"
                      >
                        {isReceiptPrinted ? 'Struk Dicetak!' : 'Bayar & Struk'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick();
                          setPosTotal(0);
                          setPosItems([]);
                          setIsReceiptPrinted(false);
                        }}
                        className="px-2 py-1 rounded bg-slate-300 dark:bg-onyx-800 text-[10px]"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {/* SIMULATOR 4: CODELEARN */}
                {project.id === 'codelearn' && (
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-slate-900 text-emerald-400 text-[10px] leading-tight">
                      <code>console.log("Belajar Web Development di CodeLearn!");</code>
                    </div>

                    <div className="p-1.5 rounded bg-white dark:bg-onyx-900 text-[10px] text-slate-500 dark:text-slate-300">
                      Output: {codeOutput}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        sfx.playSuccess();
                        setCodeOutput('Belajar Web Development di CodeLearn! (Executed in 0.4ms)');
                      }}
                      className="w-full py-1.5 rounded bg-gradient-to-r from-crimson-600 to-rose-600 text-white font-bold text-[10px] flex items-center justify-center gap-1.5"
                    >
                      <Code2 size={12} />
                      <span>Jalankan Kode Sekarang</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div style={{ transform: 'translateZ(25px)' }} className="p-6 pt-0 border-t border-slate-100 dark:border-onyx-800 mt-2">
        <div className="flex items-center justify-between gap-3 pt-4">
          <Link
            to={`/project/${project.id}`}
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="btn-3d flex-1 inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-600 py-3.5 px-4 rounded-xl transition-all shadow-glow-crimson group/btn cursor-pointer"
          >
            <span>Detail Lengkap</span>
            <ArrowUpRight
              size={14}
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            />
          </Link>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            title="Lihat Source Code di GitHub"
            className="inline-flex items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-onyx-700 bg-slate-50 dark:bg-onyx-850 text-slate-700 dark:text-slate-300 hover:text-crimson-500 dark:hover:text-white hover:border-crimson-500 transition-all active:scale-95 shadow-sm"
            aria-label="GitHub Repository"
          >
            <Github size={16} />
          </a>

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              title="Buka Live Demo Website"
              className="inline-flex items-center justify-center p-3 rounded-xl border border-crimson-500/40 bg-crimson-500/10 text-crimson-500 hover:text-white hover:bg-crimson-600 hover:border-crimson-500 transition-all active:scale-95 shadow-sm"
              aria-label="Live Demo Website"
            >
              <ExternalLink size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </Tilt3D>
  );
};
