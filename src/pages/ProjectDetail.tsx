import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Clock,
  CheckCircle2,
  Sparkles,
  Layers,
  Target,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Code2,
  ShieldCheck,
  FileText,
  Monitor,
  Database,
  Server,
  Key,
  Link2,
  Lock,
  RefreshCw,
  Search,
  Bell,
  Download,
  Check,
  Send,
  Printer,
  SlidersHorizontal,
} from 'lucide-react';
import { projects } from '../data/projects';
import { Tilt3D } from '../components/Tilt3D';
import { ProductionCodeViewer } from '../components/ProductionCodeViewer';
import { sfx } from '../utils/sound';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blueprintTab, setBlueprintTab] = useState<'mockup' | 'architecture' | 'erd' | 'code'>('mockup');
  const [selectedScreenIndex, setSelectedScreenIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedScreenIndex(0);
  }, [id]);

  const currentIndex = projects.findIndex((p) => p.id === id);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-white dark:bg-onyx-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Proyek Tidak Ditemukan
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Proyek dengan ID "{id}" tidak ditemukan dalam data portofolio.
        </p>
        <Link
          to="/#proyek"
          className="btn-3d inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-600 text-white text-xs font-bold"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Proyek</span>
        </Link>
      </div>
    );
  }

  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const isInProgress = project.status === 'In Progress';
  const activeScreen = project.mockupScreens?.[selectedScreenIndex] || project.mockupScreens?.[0];

  const handleTabSwitch = (tab: 'mockup' | 'architecture' | 'erd' | 'code') => {
    sfx.playSwitch();
    setBlueprintTab(tab);
  };

  const handleScreenSwitch = (idx: number) => {
    sfx.playClick();
    setSelectedScreenIndex(idx);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-white dark:bg-onyx-950 transition-colors duration-300">
      {/* Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => {
              sfx.playClick();
              navigate('/#proyek');
            }}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-onyx-900 border border-transparent hover:border-slate-300 dark:hover:border-onyx-800 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>&larr; Kembali ke Daftar Proyek</span>
          </motion.button>

          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-semibold hidden sm:inline">
            FRZ.DEV // REKAYASA SISTEM &amp; BLUEPRINT
          </span>
        </div>

        {/* 3D Project Cover / Header Banner */}
        <Tilt3D
          perspective={1200}
          maxTilt={4}
          spotlight={true}
          spotlightColor="rgba(239, 68, 68, 0.25)"
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${project.thumbnailGradient} p-8 sm:p-12 text-white shadow-xl dark:shadow-3d-card mb-10 border border-slate-200 dark:border-onyx-800`}
        >
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
            {/* Top status & category */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="text-xs font-mono font-black uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-1 rounded-full text-white border border-white/20 shadow-xs">
                {project.category}
              </span>

              {isInProgress ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold bg-amber-400 text-amber-950 px-3.5 py-1 rounded-full shadow-sm">
                  <Clock size={13} className="animate-pulse" />
                  <span>Tahap Pengembangan (In Progress)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold bg-emerald-400 text-emerald-950 px-3.5 py-1 rounded-full shadow-sm">
                  <CheckCircle2 size={13} />
                  <span>Selesai &amp; Teruji (Completed)</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              {project.title}
            </h1>

            {/* Subtitle / summary */}
            <p className="text-base sm:text-xl text-white/90 max-w-3xl font-normal leading-relaxed mb-8">
              {project.shortDescription}
            </p>

            {/* Action buttons inside banner */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="btn-3d inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white border border-slate-700 text-xs font-mono font-bold shadow-md hover:bg-slate-800 transition-colors"
                >
                  <Github size={16} />
                  <span>Lihat Repository GitHub</span>
                </a>
              )}

              {project.liveDemoUrl ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="btn-3d inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-mono font-bold shadow-md hover:bg-white/30 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Buka Live Demo</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-200 text-xs font-mono">
                  <span>Demo Internal / Lokal Environment</span>
                </span>
              )}
            </div>
          </div>
        </Tilt3D>

        {/* Project Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-800 shadow-sm"
            >
              <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CENTERPIECE: REKAYASA SPESIFIKASI SISTEM & BLUEPRINT SHOWCASE (NO 3)     */}
        {/* ========================================================================= */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-800 shadow-lg">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-onyx-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-crimson-600 dark:text-crimson-400 uppercase tracking-wider mb-1">
                <Sparkles size={14} />
                <span>SPESIFIKASI REKAYASA PERANGKAT LUNAK</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Blueprint Arsitektur, ERD &amp; Pratinjau Antarmuka
              </h2>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="flex items-center p-1 bg-white dark:bg-onyx-950 rounded-2xl border border-slate-200 dark:border-onyx-800 shadow-xs shrink-0">
              <button
                onClick={() => handleTabSwitch('mockup')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  blueprintTab === 'mockup'
                    ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Monitor size={14} />
                <span>Mockup UI</span>
              </button>

              <button
                onClick={() => handleTabSwitch('architecture')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  blueprintTab === 'architecture'
                    ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers size={14} />
                <span>Arsitektur Alur</span>
              </button>

              <button
                onClick={() => handleTabSwitch('erd')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  blueprintTab === 'erd'
                    ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Database size={14} />
                <span>Skema ERD</span>
              </button>

              <button
                onClick={() => handleTabSwitch('code')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  blueprintTab === 'code'
                    ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code2 size={14} />
                <span>Kode Produksi</span>
              </button>
            </div>
          </div>

          {/* TAB 1: MOCKUP ANTARMUKA SISTEM (HIGH FIDELITY) */}
          {blueprintTab === 'mockup' && (
            <motion.div
              key="mockup"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Screen Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 mr-1">
                  PILIH TAMPILAN:
                </span>
                {project.mockupScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => handleScreenSwitch(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedScreenIndex === idx
                        ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/40 font-black shadow-xs'
                        : 'bg-white dark:bg-onyx-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-onyx-800 hover:border-slate-300 dark:hover:border-onyx-700'
                    }`}
                  >
                    {screen.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Realistic Browser Window Frame */}
              <div className="rounded-2xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 shadow-xl overflow-hidden">
                {/* Browser Chrome Header */}
                <div className="px-4 py-3 bg-slate-100 dark:bg-onyx-900 border-b border-slate-200 dark:border-onyx-800 flex items-center justify-between gap-3">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs" />
                  </div>

                  {/* Browser Address Bar */}
                  <div className="flex-1 max-w-lg mx-auto bg-white dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 rounded-lg px-3 py-1 flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-300 shadow-2xs">
                    <Lock size={12} className="text-emerald-500 shrink-0" />
                    <span className="truncate">https://{activeScreen.route}</span>
                    <RefreshCw size={11} className="text-slate-400 ml-auto shrink-0" />
                  </div>

                  {/* Category Pill */}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20 px-2.5 py-0.5 rounded-full hidden sm:inline">
                    {activeScreen.category}
                  </span>
                </div>

                {/* Simulated Screen Content Body */}
                <div className="p-4 sm:p-6 bg-slate-50/70 dark:bg-onyx-950/70 min-h-[380px]">
                  {/* PROJECT 0: BPS-SYSTEM (PT BINTANG PLASTIK SEMPURNA) */}
                  {project.id === 'bps-system' && selectedScreenIndex === 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">BPS ERP // EXECUTIVE FACTORY DASHBOARD</div>
                          <h3 className="text-base font-black text-slate-900 dark:text-white">
                            Monitoring Produksi Pabrik &amp; Persediaan Terpadu
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Socket.io Synchronized</span>
                          </span>
                        </div>
                      </div>

                      {/* 4 ERP Stats Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">OUTPUT HARI INI</div>
                          <div className="text-xl font-black text-sky-500 mt-1">4.850 Kg</div>
                          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">&uarr; 102% Target SPK</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">STOK BIJI PLASTIK</div>
                          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">120,4 Ton</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">PP, HDPE, LDPE Ready</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">SURAT JALAN AKTIF</div>
                          <div className="text-xl font-black text-amber-500 mt-1">8 Armada</div>
                          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">6 Terkirim &bull; 2 Jalan</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">FAKTUR PAJAK BLN INI</div>
                          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">Rp 428,5 Jt</div>
                          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">PPN 11% Rekap Rapi</div>
                        </div>
                      </div>

                      {/* Factory Lines & Fleet Activity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-3">
                          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center justify-between">
                            <span>Status Lini Mesin Pabrik</span>
                            <span className="text-[10px] font-mono text-emerald-500 font-bold">Semua Mesin Normal</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-slate-200">Mesin Injection 01 (Blow Film)</span>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">98.4% Kapasitas</span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-slate-200">Mesin Extruder 02 (HDPE Bag)</span>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">94.2% Kapasitas</span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-slate-200">Mesin Recycling &amp; Pelletizer</span>
                              <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-500 font-mono text-[10px] font-bold">Daur Ulang Aktif</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-2.5">
                          <div className="text-xs font-black text-slate-900 dark:text-white">
                            Logistik &amp; Surat Jalan Terakhir
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800 flex items-start gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">SJ-BPS-2026-0842 &bull; PT Cahaya Abadi</span>
                                <p className="text-slate-500">1.500 Kg Plastik HD &bull; Supir: Pak Joko (Truk B-9124-BPS)</p>
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800 flex items-start gap-2">
                              <span className="w-2 h-2 rounded-full bg-sky-500 mt-1 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">Faktur Pajak 010.002-26.00000842 Diterbitkan</span>
                                <p className="text-slate-500">Nilai DPP Rp 45.000.000 + PPN 11% Rp 4.950.000</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.id === 'bps-system' && selectedScreenIndex === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-onyx-800 pb-2">
                        <div>
                          <div className="text-xs font-mono text-slate-400">AKUNTANSI &amp; LOGISTIK // FAKTUR PAJAK</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Pratinjau Dokumen Faktur Pajak Resmi PPN 11%
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                          Status: TERVALIDASI
                        </span>
                      </div>

                      <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-3 shadow-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950">
                            <span className="text-[10px] text-slate-400 font-mono">NOMOR FAKTUR PAJAK:</span>
                            <div className="font-mono font-bold text-slate-900 dark:text-white">010.002-26.00000842</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950">
                            <span className="text-[10px] text-slate-400 font-mono">PERUSAHAAN PEMBELI (CUSTOMER):</span>
                            <div className="font-bold text-slate-900 dark:text-white">PT Cahaya Abadi Perkasa (NPWP: 01.324.567.8-012.000)</div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-onyx-950 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between text-slate-600 dark:text-slate-300">
                            <span>Dasar Pengenaan Pajak (DPP):</span>
                            <span className="font-bold text-slate-900 dark:text-white">Rp 45.000.000</span>
                          </div>
                          <div className="flex justify-between text-sky-600 dark:text-sky-400">
                            <span>PPN 11% (Undang-Undang HPP):</span>
                            <span className="font-bold">Rp 4.950.000</span>
                          </div>
                          <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-200 dark:border-onyx-800 text-slate-900 dark:text-white">
                            <span>Grand Total Tagihan:</span>
                            <span className="text-emerald-600 dark:text-emerald-400">Rp 49.950.000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.id === 'bps-system' && selectedScreenIndex === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-onyx-800 pb-2">
                        <div>
                          <div className="text-xs font-mono text-slate-400">GUDANG // KONTROL BAHAN BAKU</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Inventaris Bahan Baku Biji Plastik &amp; Batas Minimum
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-500">
                          Total Stok: 120,4 Ton
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 dark:bg-onyx-950 text-slate-500 text-[10px] font-mono uppercase border-b border-slate-200 dark:border-onyx-800">
                            <tr>
                              <th className="p-3">Kode Material</th>
                              <th className="p-3">Nama Bahan Baku</th>
                              <th className="p-3">Stok Aktif</th>
                              <th className="p-3">Batas Aman</th>
                              <th className="p-3 text-right">Status Gudang</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-onyx-800 text-[11px]">
                            <tr>
                              <td className="p-3 font-mono font-bold text-sky-500">MAT-PP-01</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">Polypropylene Pure Resin</td>
                              <td className="p-3 font-mono">42.500 Kg</td>
                              <td className="p-3 font-mono text-slate-400">10.000 Kg</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                  OPTIMAL
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-mono font-bold text-sky-500">MAT-HDPE-02</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">HDPE Film Grade Pellets</td>
                              <td className="p-3 font-mono">38.000 Kg</td>
                              <td className="p-3 font-mono text-slate-400">8.000 Kg</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                  OPTIMAL
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-mono font-bold text-sky-500">MAT-PIG-RED</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">Masterbatch Pigmen Merah</td>
                              <td className="p-3 font-mono font-bold text-amber-500">850 Kg</td>
                              <td className="p-3 font-mono text-slate-400">1.000 Kg</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                                  PERLU RESTOCK
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 1: SIPAK RT-012 LIVE MOCKUPS */}
                  {project.id === 'sipak-rt012' && selectedScreenIndex === 0 && (
                    <div className="space-y-4">
                      {/* Sub-header inside app */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">SIPAK // ADMIN RT 012</div>
                          <h3 className="text-base font-black text-slate-900 dark:text-white">
                            Dashboard Eksekutif &amp; Pengawasan Kependudukan
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                            <Check size={12} />
                            <span>Server Aktif</span>
                          </span>
                        </div>
                      </div>

                      {/* 4 Stats Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">KEPALA KELUARGA</div>
                          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">142 KK</div>
                          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">&uarr; 100% Terverifikasi</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">TOTAL JIWA WARGA</div>
                          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">428 Jiwa</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">218 L / 210 P</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">KAS RT FEBRUARI</div>
                          <div className="text-xl font-black text-crimson-600 dark:text-crimson-400 mt-1">Rp 7.150.000</div>
                          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">92% Target Lunas</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-xs">
                          <div className="text-[10px] font-mono text-slate-400">SURAT PENDING</div>
                          <div className="text-xl font-black text-amber-500 mt-1">3 Berkas</div>
                          <div className="text-[10px] text-amber-500 font-bold mt-0.5">Butuh Validasi TTD</div>
                        </div>
                      </div>

                      {/* Split Info Panel */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Demographic Progress */}
                        <div className="p-4 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-3">
                          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center justify-between">
                            <span>Distribusi Kelompok Usia Warga</span>
                            <span className="text-[10px] font-mono text-slate-400">Sensus 2026</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-600 dark:text-slate-300">Usia Produktif (18 - 55 Thn)</span>
                                <span className="font-bold text-slate-900 dark:text-white">68%</span>
                              </div>
                              <div className="h-2 rounded-full bg-slate-100 dark:bg-onyx-800 overflow-hidden">
                                <div className="h-full bg-crimson-500 rounded-full w-[68%]" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-600 dark:text-slate-300">Anak-Anak &amp; Remaja (0 - 17 Thn)</span>
                                <span className="font-bold text-slate-900 dark:text-white">20%</span>
                              </div>
                              <div className="h-2 rounded-full bg-slate-100 dark:bg-onyx-800 overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full w-[20%]" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-600 dark:text-slate-300">Lansia (&gt; 55 Thn)</span>
                                <span className="font-bold text-slate-900 dark:text-white">12%</span>
                              </div>
                              <div className="h-2 rounded-full bg-slate-100 dark:bg-onyx-800 overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full w-[12%]" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="p-4 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-2.5">
                          <div className="text-xs font-black text-slate-900 dark:text-white">
                            Aktivitas Terkini Administrasi RT
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800 flex items-start gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">Surat Domisili #SRT-089</span>
                                <p className="text-slate-500">Diajukan oleh Hendra (KK #042) &bull; 10 menit lalu</p>
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800 flex items-start gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">Iuran Kas Februari Diverifikasi</span>
                                <p className="text-slate-500">Bpk. Agus (KK #015) &bull; Rp 50.000 via Transfer BCA</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIPAK SCREEN 2: LAYANAN SURAT */}
                  {project.id === 'sipak-rt012' && selectedScreenIndex === 1 && (
                    <div className="space-y-4">
                      {/* Flow steps */}
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          1. INPUT NIK &bull; ✓
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          2. PILIH SURAT &bull; ✓
                        </div>
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 animate-pulse">
                          3. VERIFIKASI RT &bull; ⏳
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-onyx-900 text-slate-400">
                          4. CETAK PDF RESMI
                        </div>
                      </div>

                      {/* Document Preview Card */}
                      <div className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-3.5 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-onyx-800 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400">DOKUMEN RESMI PELAYANAN</span>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white">
                              Surat Keterangan Pengantar Warga
                            </h4>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20">
                            No: 470/089/RT.012/II/2026
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950">
                            <span className="text-[10px] text-slate-400 font-mono">NAMA LENGKAP:</span>
                            <div className="font-bold text-slate-900 dark:text-white">Fariza Arlistiana</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950">
                            <span className="text-[10px] text-slate-400 font-mono">NOMOR INDUK KEPENDUDUKAN (NIK):</span>
                            <div className="font-bold text-slate-900 dark:text-white font-mono">3201************</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950 sm:col-span-2">
                            <span className="text-[10px] text-slate-400 font-mono">KEPERLUAN DOKUMEN:</span>
                            <div className="text-slate-800 dark:text-slate-200">
                              Persyaratan Administrasi Beasiswa Pendidikan dan Pengantar KTP / Domisili Wilayah.
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            <ShieldCheck size={16} />
                            <span>Tervalidasi Database Sensus RT 012</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => sfx.playSuccess()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-crimson-600 text-white text-xs font-bold hover:bg-crimson-500 transition-colors shadow-xs"
                          >
                            <Download size={13} />
                            <span>Unduh Pratinjau PDF</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIPAK SCREEN 3: KAS IURAN */}
                  {project.id === 'sipak-rt012' && selectedScreenIndex === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">BENDAHARA RT 012 // REKAP KAS</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Buku Rekapitulasi Iuran Kebersihan &amp; Keamanan
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-500">
                          Total Kas: Rp 7.150.000
                        </span>
                      </div>

                      {/* Ledger Table */}
                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 dark:bg-onyx-950 text-slate-500 text-[10px] font-mono uppercase border-b border-slate-200 dark:border-onyx-800">
                            <tr>
                              <th className="p-3">No KK</th>
                              <th className="p-3">Kepala Keluarga</th>
                              <th className="p-3">Periode</th>
                              <th className="p-3">Nominal</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-onyx-800 text-[11px]">
                            <tr>
                              <td className="p-3 font-mono font-bold">KK-012-001</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">Hendra Gunawan</td>
                              <td className="p-3 font-mono">Feb 2026</td>
                              <td className="p-3 font-mono font-bold">Rp 50.000</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                  LUNAS
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono text-slate-400">BCA Transfer</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-mono font-bold">KK-012-002</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">Siti Aminah</td>
                              <td className="p-3 font-mono">Feb 2026</td>
                              <td className="p-3 font-mono font-bold">Rp 50.000</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                  LUNAS
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono text-slate-400">Tunai</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-mono font-bold">KK-012-003</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">Agus Prasetyo</td>
                              <td className="p-3 font-mono">Feb 2026</td>
                              <td className="p-3 font-mono font-bold">Rp 50.000</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                                  TERTUNGGAK
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono text-crimson-500 cursor-pointer font-bold">
                                Kirim Pengingat WA
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 2: KOST SAALI LIVE MOCKUPS */}
                  {project.id === 'kost-saali' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">KOST SAALI // ROOM PLANNER</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Matriks Okupansi Kamar Lantai 1 &amp; 2
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-500">
                          Okupansi: 87.5% (21/24 Kamar)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono font-black text-slate-900 dark:text-white">Kamar 101</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold">TERISI</span>
                          </div>
                          <p className="text-xs text-slate-500">Penyewa: Rian P. &bull; AC + Km Mandi</p>
                          <div className="text-[11px] font-mono text-slate-400 mt-2">Jatuh Tempo: 15 Maret 2026</div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono font-black text-slate-900 dark:text-white">Kamar 102</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">TERSEDIA</span>
                          </div>
                          <p className="text-xs text-slate-500">Tipe Standard &bull; Siap Huni</p>
                          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-2">Rp 1.200.000 / bln</div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono font-black text-slate-900 dark:text-white">Kamar 103</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold">TERISI</span>
                          </div>
                          <p className="text-xs text-slate-500">Penyewa: Budi S. &bull; Wifi 50Mbps</p>
                          <div className="text-[11px] font-mono text-slate-400 mt-2">Jatuh Tempo: 28 Feb 2026</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 3: APLIKASI KASIR LIVE MOCKUPS */}
                  {project.id === 'aplikasi-kasir' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">POS TERMINAL // KANTIN SYSTEM</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Layar Transaksi Point of Sale &amp; Kasir
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-crimson-500">
                          Struk: #TRX-2026-0842
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Cart */}
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-2">
                          <div className="text-xs font-black text-slate-900 dark:text-white">Keranjang Pesanan Aktif</div>
                          <div className="text-xs space-y-1.5 divide-y divide-slate-100 dark:divide-onyx-800">
                            <div className="flex justify-between pt-1">
                              <span>1x Nasi Goreng Spesial</span>
                              <span className="font-mono font-bold">Rp 25.000</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span>2x Es Teh Manis Jumbo</span>
                              <span className="font-mono font-bold">Rp 10.000</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200 dark:border-onyx-800 flex justify-between font-black text-sm">
                            <span>Total Tagihan:</span>
                            <span className="text-crimson-600 dark:text-crimson-400 font-mono">Rp 35.000</span>
                          </div>
                        </div>

                        {/* Payment calculation */}
                        <div className="p-3.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 space-y-2">
                          <div className="text-xs font-black text-slate-900 dark:text-white">Kalkulasi Kembalian</div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Uang Tunai Pelanggan:</span>
                              <span className="font-mono font-bold">Rp 50.000</span>
                            </div>
                            <div className="flex justify-between text-emerald-500 font-bold text-sm pt-1 border-t border-slate-100 dark:border-onyx-800">
                              <span>Kembalian Uang Tunai:</span>
                              <span className="font-mono">Rp 15.000</span>
                            </div>
                          </div>
                          <div className="pt-2">
                            <span className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                              <Printer size={13} />
                              <span>Cetak Struk Thermal</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 4: CODELEARN LIVE MOCKUPS */}
                  {project.id === 'codelearn' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-onyx-800">
                        <div>
                          <div className="text-xs font-mono text-slate-400">CODELEARN // WORKSPACE</div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Editor Interaktif &amp; Console Output
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-500">
                          Modul 02: JavaScript Modern
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 space-y-1">
                          <div className="text-[10px] text-slate-400">// script.js</div>
                          <p className="text-emerald-400">const student = "Fariza Arlistiana";</p>
                          <p className="text-sky-400">const university = "Universitas Pamulang";</p>
                          <p className="text-amber-300">{'console.log(`Hello from ${student}!`);'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-black text-emerald-400 space-y-1">
                          <div className="text-[10px] text-slate-500">// Simulated Console Output</div>
                          <p>&gt; "Hello from Fariza Arlistiana!"</p>
                          <p className="text-slate-400">&gt; Executed in 0.24ms without errors.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Screen Details Bar */}
                <div className="p-4 sm:p-5 bg-white dark:bg-onyx-900 border-t border-slate-200 dark:border-onyx-800">
                  <div className="mb-3">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">
                      {activeScreen.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {activeScreen.description}
                    </p>
                  </div>

                  {/* Screen Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-onyx-800">
                    {activeScreen.metrics.map((m, i) => (
                      <div key={i} className="text-xs">
                        <span className="text-[10px] font-mono text-slate-400 block">{m.label}</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ARSITEKTUR ALUR SISTEM (DATA FLOW & TIERS) */}
          {blueprintTab === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Architecture Summary Note */}
              <div className="p-5 rounded-2xl bg-white dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-crimson-600 dark:text-crimson-400 mb-1">
                  <Server size={14} />
                  <span>DESAIN ARSITEKTUR &amp; PEMISAHAN CONCERN</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.architectureSummary}
                </p>
              </div>

              {/* Stacked Architecture Tiers */}
              <div className="space-y-3 relative">
                {project.architectureLayers.map((layer, idx) => (
                  <div key={idx} className="relative">
                    <div className="p-5 rounded-2xl bg-white dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 hover:border-crimson-500/50 transition-colors shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 font-mono font-bold text-xs flex items-center justify-center border border-crimson-500/20">
                            0{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white">
                              {layer.name}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400">
                              Peran: {layer.role}
                            </span>
                          </div>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {layer.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-onyx-900 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold border border-slate-200 dark:border-onyx-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        {layer.description}
                      </p>

                      {/* Component Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-onyx-900">
                        {layer.components.map((comp) => (
                          <span
                            key={comp}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-onyx-900/90 text-slate-800 dark:text-slate-200 text-[10px] font-mono font-semibold border border-slate-200 dark:border-onyx-800"
                          >
                            &bull; {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Flow arrow indicator */}
                    {idx < project.architectureLayers.length - 1 && (
                      <div className="flex justify-center my-1 text-crimson-500">
                        <span className="text-xs font-mono font-bold">&darr; Data Flow &amp; Response Pipeline &darr;</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Security & Reliability Badges */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>Keamanan: CSRF Protection, Role-Based Access Control &amp; SQL Injection Sanitization</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  Standar OWASP &bull; Terverifikasi
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SKEMA BASIS DATA (ERD RELASIONAL) */}
          {blueprintTab === 'erd' && (
            <motion.div
              key="erd"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* ERD Intro note */}
              <div className="p-5 rounded-2xl bg-white dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-crimson-600 dark:text-crimson-400 mb-1">
                    <Database size={14} />
                    <span>SPESIFIKASI SKEMA BASIS DATA RELASIONAL</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Struktur tabel normalisasi dengan relasi Foreign Key (FK) dan Primary Key (PK) untuk menjamin integritas data referensial.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono font-bold shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-amber-400 text-amber-950">PK: Primary Key</span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-500 text-white">FK: Foreign Key</span>
                </div>
              </div>

              {/* Database Table Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.erdSchema.map((table) => (
                  <div
                    key={table.name}
                    className="rounded-2xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 overflow-hidden shadow-xs"
                  >
                    {/* Table Header */}
                    <div className="px-4 py-3 bg-slate-100 dark:bg-onyx-900 border-b border-slate-200 dark:border-onyx-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database size={14} className="text-crimson-500" />
                        <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                          {table.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {table.columns.length} Kolom
                      </span>
                    </div>

                    <div className="p-3 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-onyx-900">
                      {table.desc}
                    </div>

                    {/* Columns List */}
                    <div className="divide-y divide-slate-100 dark:divide-onyx-900 text-xs">
                      {table.columns.map((col) => (
                        <div key={col.name} className="px-4 py-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {col.isPk && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-amber-400 text-amber-950 shrink-0">
                                PK
                              </span>
                            )}
                            {col.isFk && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-sky-500 text-white shrink-0">
                                FK
                              </span>
                            )}
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                              {col.name}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 block">
                              {col.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PRODUCTION CLEAN CODE VIEW */}
          {blueprintTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductionCodeViewer projectId={project.id} />
            </motion.div>
          )}
        </section>

        {/* Content Breakdown: Latar Belakang & Fitur */}
        <div className="space-y-12">
          {/* Section 1: Latar Belakang & Tujuan Rekayasa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-800 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText size={18} className="text-crimson-600 dark:text-crimson-400" />
                <span>Latar Belakang Proyek</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                {project.background}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-crimson-500/10 border border-crimson-500/30 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Target size={18} className="text-crimson-500" />
                <span>Tujuan &amp; Manfaat Sistem</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                {project.purpose}
              </p>
            </div>
          </div>

          {/* Section 2: Tech Stack Matrix */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 size={20} className="text-crimson-500" />
              <span>Teknologi &amp; Dependensi Utama</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 text-crimson-600 dark:text-crimson-400 text-xs font-mono font-bold shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Fitur Utama */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-rose-500" />
              <span>Fitur &amp; Kemampuan Utama</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-800 shadow-sm flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 flex items-center justify-center shrink-0 mt-0.5 border border-crimson-500/20">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Tantangan Rekayasa */}
          <div className="p-7 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h3 className="text-base font-black text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              <span>Tantangan Rekayasa &amp; Solusi Implementasi</span>
            </h3>
            <p className="text-sm text-amber-900 dark:text-amber-100/80 leading-relaxed font-normal">
              {project.challenges}
            </p>
          </div>

          {/* Prev / Next Project Navigator */}
          <div className="pt-10 border-t border-slate-200 dark:border-onyx-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => {
                sfx.playClick();
                navigate(`/proyek/${prevProject.id}`);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 hover:border-crimson-500 text-left transition-all duration-200 group shadow-sm cursor-pointer"
            >
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mb-1">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Proyek Sebelumnya</span>
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors">
                {prevProject.title}
              </div>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                navigate(`/proyek/${nextProject.id}`);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 hover:border-crimson-500 text-right transition-all duration-200 group shadow-sm cursor-pointer"
            >
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center justify-end gap-1 mb-1">
                <span>Proyek Selanjutnya</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors">
                {nextProject.title}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
