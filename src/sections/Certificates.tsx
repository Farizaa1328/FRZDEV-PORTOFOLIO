import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Download,
  Eye,
  FileText,
  CheckCircle2,
  X,
  ChevronRight,
  Lock,
  Stamp,
  QrCode,
  GraduationCap,
  Calendar,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Tilt3D } from '../components/Tilt3D';
import { sfx } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export interface ModuleGrade {
  code: string;
  name: string;
  jp: number;
  score: number;
  grade: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationCode?: string;
  type: string;
  institution: string;
  instructor: string;
  description: string;
  skillsAcquired: string[];
  status: string;
  previewImage: string;
  transcriptImage?: string;
  pdfUrl: string;
  totalJp?: string;
  modules?: ModuleGrade[];
}

export const Certificates: React.FC = () => {
  const { t } = useLanguage();
  const [activeCert, setActiveCert] = useState<string>('cisco-ccna');
  const [modalCert, setModalCert] = useState<CertificateItem | null>(null);
  const [modalPage, setModalPage] = useState<'cert' | 'transcript'>('cert');

  const certificates: CertificateItem[] = [
    {
      id: 'cisco-ccna',
      title: 'CCNA: Switching, Routing, and Wireless Essentials',
      issuer: 'Cisco Networking Academy',
      issueDate: '23 September 2026',
      credentialId: '5a21875e-f035-4314-8eee-cfd7c5a298c1',
      type: 'Sertifikasi Internasional Resmi Cisco',
      institution: 'Universitas Pamulang melalui Cisco Networking Academy Program',
      instructor: 'Herwis Gultom',
      description:
        'Sertifikasi kompetensi jaringan komputer internasional resmi dari Cisco Networking Academy yang memvalidasi penguasaan konsep switching, routing, inter-VLAN routing, protokol redundansi LAN (STP & EtherChannel), keamanan switch & LAN, serta konfigurasi arsitektur jaringan nirkabel (WLAN).',
      skillsAcquired: [
        'VLAN & Inter-VLAN Routing',
        'Spanning Tree Protocol (STP)',
        'EtherChannel Redundancy',
        'DHCPv4 & SLAAC / DHCPv6',
        'Switch & LAN Security Hardening',
        'WLAN Concepts & Configuration',
        'IP Static & Default Routing',
      ],
      status: 'Terverifikasi Resmi Cisco NetAcad',
      previewImage: '/images/certificates/cisco-ccna-preview.png',
      pdfUrl: '/certificates/cisco-ccna-official.pdf',
    },
    {
      id: 'unpam-lpkks',
      title: 'Sertifikat Pelatihan Kredensial Mikro: Switching, Routing, and Wireless Essentials',
      issuer: 'LPKKS & FILKOM Universitas Pamulang bersama Cisco',
      issueDate: '21 Agustus 2026',
      credentialId: 'RIN-SRWE-26-0003-0582',
      verificationCode: 'PB97XC06HV0NRVYW',
      type: 'Kredensial Mikro Resmi & Transkrip 70 JP',
      institution: 'Lembaga Pengembangan Kompetensi dan Kajian Strategis (LPKKS) UNPAM & Fakultas Ilmu Komputer',
      instructor: 'Herwis Gultom, S.Kom., M.Kom.',
      totalJp: '70 JP (16 Modul Unit Kompetensi)',
      description:
        'Sertifikat pelatihan kredensial mikro akademik resmi dari Lembaga Pengembangan Kompetensi dan Kajian Strategis (LPKKS) Universitas Pamulang bekerja sama dengan FILKOM dan Cisco Networking Academy, dengan beban 70 Jam Pelajaran (JP) dan transkrip nilai akademik berpredikat sangat memuaskan (seluruh modul Grade A / A-). Ditandatangani resmi oleh Rektor UNPAM Dr. E. Nurzaman A.M, M.Si. dan Kepala LPKKS Dr. Dani Rahman Hakim, M.Pd.',
      skillsAcquired: [
        'Beban Belajar 70 JP',
        '16 Modul Berpredikat Grade A & A-',
        'Kredensial Mikro FILKOM UNPAM',
        'Pengesahan Rektor & LPKKS',
        'LAN & Switch Security Hardening',
        'Enterprise WLAN & IPv6 Deployment',
      ],
      status: 'Resmi Rektor UNPAM & LPKKS',
      previewImage: '/images/certificates/unpam-lpkks-preview.png',
      transcriptImage: '/images/certificates/unpam-lpkks-transkrip.png',
      pdfUrl: '/certificates/unpam-lpkks-ccna.pdf',
      modules: [
        { code: 'Module 1', name: 'Basic Device Configuration', jp: 4, score: 97, grade: 'A' },
        { code: 'Module 10', name: 'LAN Security Concepts', jp: 4, score: 97, grade: 'A' },
        { code: 'Module 11', name: 'Switch Security Configuration', jp: 5, score: 88, grade: 'A' },
        { code: 'Module 12', name: 'WLAN Concepts', jp: 4, score: 85, grade: 'A-' },
        { code: 'Module 13', name: 'WLAN Configuration', jp: 5, score: 94, grade: 'A' },
        { code: 'Module 14', name: 'Routing Concepts', jp: 4, score: 80, grade: 'A-' },
        { code: 'Module 15', name: 'IP Static Routing', jp: 5, score: 87, grade: 'A' },
        { code: 'Module 16', name: 'Troubleshoot Static and Default Routes', jp: 3, score: 80, grade: 'A-' },
        { code: 'Module 2', name: 'Switching Concepts', jp: 5, score: 82, grade: 'A-' },
        { code: 'Module 3', name: 'VLANs', jp: 5, score: 80, grade: 'A-' },
        { code: 'Module 4', name: 'Inter-VLAN Routing', jp: 5, score: 80, grade: 'A-' },
        { code: 'Module 5', name: 'STP Concepts', jp: 5, score: 97, grade: 'A' },
        { code: 'Module 6', name: 'EtherChannel', jp: 4, score: 88, grade: 'A' },
        { code: 'Module 7', name: 'DHCPv4', jp: 4, score: 85, grade: 'A-' },
        { code: 'Module 8', name: 'SLAAC and DHCPv6', jp: 4, score: 94, grade: 'A' },
        { code: 'Module 9', name: 'FHRP Concepts', jp: 4, score: 80, grade: 'A-' },
      ],
    },
    {
      id: 'sipak-charter',
      title: 'Piagam Tugas Akhir: Sistem Informasi Pelayanan Warga (SIPAK RT-012)',
      issuer: 'Program Studi Teknik Informatika — UNPAM',
      issueDate: '2025 — 2026',
      credentialId: 'UNPAM-TA-SIPAK-012',
      type: 'Proyek Rekayasa Tugas Akhir S1',
      institution: 'Fakultas Ilmu Komputer Universitas Pamulang',
      instructor: 'Dosen Pembimbing Tugas Akhir',
      description:
        'Dokumen penetapan dan implementasi sistem informasi pelayanan warga berbasis web MVC (Laravel & MySQL) yang menangani tata kelola administrasi kependudukan, permohonan surat pengantar daring, dan akuntansi iuran kas warga.',
      skillsAcquired: ['Laravel 10 Framework', 'Relational MySQL', 'Multi-role Authorization', 'Financial Ledger'],
      status: 'Fase Implementasi Aktif',
      previewImage: '/images/certificates/unpam-lpkks-preview.png',
      pdfUrl: '/cv/fariza-cv.pdf',
    },
  ];

  const current = certificates.find((c) => c.id === activeCert) || certificates[0];

  const openModal = (cert: CertificateItem, page: 'cert' | 'transcript' = 'cert') => {
    sfx.playSuccess();
    setModalCert(cert);
    setModalPage(page);
  };

  return (
    <section
      id="sertifikat"
      className="py-28 bg-white dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
          >
            <Award size={14} className="text-crimson-500" />
            <span>{t.certificates.tag}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
          >
            {t.certificates.heading1} <span className="text-gradient-crimson">{t.certificates.heading2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
          >
            {t.certificates.subheading}
          </motion.p>
          <div className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 rounded-full mx-auto mt-4 shadow-glow-crimson" />
        </div>

        {/* Dual CCNA Showcase Grid: Both Cisco NetAcad & LPKKS UNPAM displayed simultaneously! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* CARD 1: CISCO NETACAD */}
          <Tilt3D
            maxTilt={5}
            scale={1.015}
            spotlight={true}
            className="group rounded-3xl p-6 bg-slate-50 dark:bg-onyx-900 border-2 border-slate-200 dark:border-onyx-800 hover:border-crimson-500/80 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30">
                  CISCO NETWORKING ACADEMY
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Sertifikasi Internasional</span>
                </span>
              </div>

              <div
                onClick={() => openModal(certificates[0], 'cert')}
                className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-onyx-700 mb-4 bg-black cursor-pointer group/img shadow-md aspect-[16/10] flex items-center justify-center"
              >
                <img
                  src="/images/certificates/cisco-ccna-preview.png"
                  alt="Cisco CCNA Certificate"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold backdrop-blur-2xs">
                  <Eye size={16} />
                  <span>Buka Resolusi Penuh</span>
                </div>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5 leading-snug">
                CCNA: Switching, Routing, and Wireless Essentials
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Diterbitkan resmi oleh Cisco Networking Academy melalui program kemitraan Universitas Pamulang.
              </p>

              <div className="p-3 rounded-xl bg-white dark:bg-onyx-950 border border-slate-100 dark:border-onyx-850 text-[11px] font-mono space-y-1 mb-4">
                <div className="text-slate-400">ID Kredensial: <span className="font-bold text-slate-800 dark:text-slate-200">5a21875e-f035-4314-8eee-cfd7c5a298c1</span></div>
                <div className="text-slate-400">Tanggal: <span className="font-bold text-slate-800 dark:text-slate-200">23 September 2026</span> &bull; Instruktur: <span className="font-bold text-slate-800 dark:text-slate-200">Herwis Gultom</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-onyx-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => openModal(certificates[0], 'cert')}
                className="btn-3d flex-1 py-2 px-3 rounded-xl bg-slate-900 dark:bg-onyx-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-crimson-600 transition-colors cursor-pointer"
              >
                <Eye size={13} />
                <span>Lihat Sertifikat</span>
              </button>
              <a
                href="/certificates/cisco-ccna-official.pdf"
                download="cisco-ccna-official.pdf"
                onClick={() => sfx.playSuccess()}
                className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-onyx-700 text-slate-700 dark:text-slate-300 hover:text-crimson-500 font-mono font-bold text-xs flex items-center gap-1.5 hover:border-crimson-500 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>PDF (192 KB)</span>
              </a>
            </div>
          </Tilt3D>

          {/* CARD 2: LPKKS & FILKOM UNPAM */}
          <Tilt3D
            maxTilt={5}
            scale={1.015}
            spotlight={true}
            className="group rounded-3xl p-6 bg-slate-50 dark:bg-onyx-900 border-2 border-slate-200 dark:border-onyx-800 hover:border-crimson-500/80 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  LPKKS &amp; FILKOM UNPAM + CISCO
                </span>
                <span className="text-[11px] font-mono font-bold text-sky-500 flex items-center gap-1">
                  <GraduationCap size={14} />
                  <span>Kredensial Mikro 70 JP</span>
                </span>
              </div>

              <div
                onClick={() => openModal(certificates[1], 'cert')}
                className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-onyx-700 mb-4 bg-black cursor-pointer group/img shadow-md aspect-[16/10] flex items-center justify-center"
              >
                <img
                  src="/images/certificates/unpam-lpkks-preview.png"
                  alt="LPKKS UNPAM CCNA Certificate"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold backdrop-blur-2xs">
                  <Eye size={16} />
                  <span>Lihat Sertifikat &amp; Transkrip Nilai</span>
                </div>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5 leading-snug">
                Sertifikat Kredensial Mikro: Switching, Routing, and Wireless Essentials
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Pelatihan intensif LPKKS UNPAM bersama FILKOM &amp; Cisco. Beban 70 JP dengan 16 unit modul kompetensi berpredikat Grade A / A-.
              </p>

              <div className="p-3 rounded-xl bg-white dark:bg-onyx-950 border border-slate-100 dark:border-onyx-850 text-[11px] font-mono space-y-1 mb-4">
                <div className="text-slate-400">No Sertifikat: <span className="font-bold text-slate-800 dark:text-slate-200">RIN-SRWE-26-0003-0582</span></div>
                <div className="text-slate-400">Pengesahan: <span className="font-bold text-slate-800 dark:text-slate-200">Rektor UNPAM &amp; Kepala LPKKS</span> &bull; Kode: <span className="font-bold text-emerald-500">PB97XC06HV0NRVYW</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-onyx-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => openModal(certificates[1], 'transcript')}
                className="btn-3d flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-crimson-600 to-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 hover:scale-102 transition-transform shadow-glow-crimson cursor-pointer"
              >
                <FileText size={13} />
                <span>Transkrip Nilai (70 JP)</span>
              </button>
              <a
                href="/certificates/unpam-lpkks-ccna.pdf"
                download="unpam-lpkks-ccna.pdf"
                onClick={() => sfx.playSuccess()}
                className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-onyx-700 text-slate-700 dark:text-slate-300 hover:text-crimson-500 font-mono font-bold text-xs flex items-center gap-1.5 hover:border-crimson-500 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>PDF (1.1 MB)</span>
              </a>
            </div>
          </Tilt3D>
        </div>

        {/* Certificate Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 p-1.5 bg-slate-100 dark:bg-onyx-900 rounded-2xl border border-slate-200 dark:border-onyx-800 max-w-3xl mx-auto backdrop-blur-md shadow-sm">
          {certificates.map((cert) => {
            const isActive = activeCert === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => {
                  sfx.playSwitch();
                  setActiveCert(cert.id);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 z-10 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCertTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-crimson-700 via-crimson-600 to-rose-600 rounded-xl shadow-glow-crimson -z-10"
                  />
                )}
                <span>
                  {cert.id === 'cisco-ccna' && 'CISCO NETACAD (INTERNASIONAL)'}
                  {cert.id === 'unpam-lpkks' && 'LPKKS UNPAM (KREDENSIAL 70 JP)'}
                  {cert.id === 'sipak-charter' && 'TUGAS AKHIR SIPAK RT-012'}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Envelope / Map Dossier Container */}
        <div className="max-w-4xl mx-auto">
          <Tilt3D
            maxTilt={4}
            scale={1.01}
            glare={true}
            spotlight={true}
            spotlightColor="rgba(239, 68, 68, 0.22)"
            className="rounded-3xl p-6 sm:p-10 bg-slate-50 dark:bg-gradient-to-br dark:from-onyx-900/95 dark:via-onyx-900/80 dark:to-crimson-950/40 border-2 border-slate-200 dark:border-onyx-700/80 shadow-3d-card relative overflow-visible backdrop-blur-2xl"
          >
            {/* Top Folder Header with Executive Stitch & Clasps */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-onyx-800 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-crimson-600 to-rose-600 text-white flex items-center justify-center shadow-glow-crimson">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-crimson-600 dark:text-crimson-400 font-bold flex items-center gap-1.5">
                    <Lock size={11} />
                    <span>OFFICIAL DOSSIER MAP // CLASSIFIED CREDENTIAL</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    {current.issuer}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>{current.status}</span>
                </span>
              </div>
            </div>

            {/* The Document Peeking Out of the Folder / Envelope */}
            <div
              className="relative group cursor-pointer"
              onClick={() => openModal(current, 'cert')}
              onMouseEnter={() => sfx.playHover()}
            >
              {/* Back Folder Flap (Simulating an Envelope / Map) */}
              <div className="absolute -top-4 left-6 right-6 h-9 bg-gradient-to-r from-crimson-900 via-onyx-800 to-crimson-900 rounded-t-2xl opacity-70 pointer-events-none border-t border-crimson-500/40" />

              {/* The Realistic Certificate Paper Document */}
              <motion.div
                layout
                whileHover={{ y: -14, scale: 1.01 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative rounded-2xl bg-white dark:bg-slate-900 border-2 border-crimson-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden"
              >
                {/* Official Certificate Ornate Corner Markers */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-crimson-500" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-crimson-500" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-crimson-500" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-crimson-500" />

                {/* Subtle Background Watermark */}
                <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Certificate Header */}
                  <div className="text-center mb-5">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-crimson-600 dark:text-crimson-400 font-extrabold block mb-1">
                      {current.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {current.title}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {current.institution}
                    </div>
                  </div>

                  {/* High-Resolution Document Preview Thumbnail */}
                  <div className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-onyx-700 shadow-md relative group/img max-h-72 flex items-center justify-center bg-slate-100 dark:bg-black">
                    <img
                      src={current.previewImage}
                      alt={current.title}
                      className="w-full h-auto object-cover max-h-72 transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold backdrop-blur-2xs">
                      <Eye size={16} />
                      <span>Klik untuk Pratinjau Dokumen Resolusi Penuh</span>
                    </div>
                  </div>

                  {/* Recipient Ribbon */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-onyx-850/80 border border-slate-200 dark:border-onyx-800 flex flex-wrap items-center justify-between gap-3 text-xs mb-5">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        DIBERIKAN DENGAN BANGGA KEPADA:
                      </span>
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        Fariza Arlistiana
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        TANGGAL PENYELESAIAN:
                      </span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {current.issueDate}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-center max-w-2xl mx-auto mb-5 font-normal">
                    {current.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {current.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-crimson-500/10 border border-crimson-500/20 text-crimson-600 dark:text-crimson-400 font-mono text-[11px] font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar inside Certificate */}
                  <div className="pt-5 border-t border-slate-100 dark:border-onyx-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                      <span className="truncate max-w-xs">ID Kredensial: {current.credentialId}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {current.transcriptImage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(current, 'transcript');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-onyx-800 hover:bg-slate-200 dark:hover:bg-onyx-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                        >
                          <FileText size={13} className="text-amber-500" />
                          <span>Lihat Transkrip Nilai (70 JP)</span>
                        </button>
                      )}

                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-crimson-600 dark:text-crimson-400 group-hover:translate-x-1 transition-transform">
                        <span>Buka Resolusi Penuh</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Front Envelope Pocket Lip */}
              <div className="absolute -bottom-3 left-4 right-4 h-6 rounded-b-2xl bg-gradient-to-r from-crimson-800 via-onyx-850 to-crimson-800 border-t-2 border-crimson-400/60 shadow-lg pointer-events-none" />
            </div>

            {/* Folder Footer Specs */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-onyx-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instruktur Resmi: {current.instructor}</span>
              </span>

              <a
                href={current.pdfUrl}
                download
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.playSuccess();
                }}
                className="inline-flex items-center gap-1.5 text-crimson-600 dark:text-crimson-400 hover:underline font-bold"
              >
                <Download size={13} />
                <span>Unduh Berkas PDF Asli</span>
              </a>
            </div>
          </Tilt3D>
        </div>
      </div>

      {/* Modal Preview Full Certificate & Transcript Lightbox */}
      <AnimatePresence>
        {modalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setModalCert(null)}
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-onyx-900 border-2 border-crimson-500/60 shadow-2xl z-10 overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-onyx-950 border-b border-slate-200 dark:border-onyx-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 flex items-center justify-center border border-crimson-500/20">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                      {modalCert.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      ID Kredensial: {modalCert.credentialId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setModalCert(null)}
                  className="w-9 h-9 rounded-xl bg-slate-200/60 dark:bg-onyx-800 text-slate-600 dark:text-slate-300 hover:text-crimson-500 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Tutup Modal Sertifikat"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sub-Tabs (if transcript available, e.g. LPKKS) */}
              {modalCert.transcriptImage && (
                <div className="px-6 py-2.5 bg-white dark:bg-onyx-900 border-b border-slate-100 dark:border-onyx-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sfx.playSwitch();
                        setModalPage('cert');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        modalPage === 'cert'
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Halaman 1: Sertifikat Kredensial Mikro
                    </button>

                    <button
                      onClick={() => {
                        sfx.playSwitch();
                        setModalPage('transcript');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        modalPage === 'transcript'
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Halaman 2: Transkrip Pelatihan (70 JP &bull; Grade A/A-)
                    </button>
                  </div>

                  <span className="hidden sm:inline text-xs font-mono text-emerald-500 font-bold">
                    ✓ Nilai 16 Unit Terverifikasi
                  </span>
                </div>
              )}

              {/* Modal Body: High Resolution Scan Display */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 dark:bg-black/80 flex flex-col items-center">
                <div className="w-full max-w-3xl rounded-xl overflow-hidden border border-slate-300 dark:border-onyx-700 shadow-xl bg-white">
                  <img
                    src={
                      modalPage === 'transcript' && modalCert.transcriptImage
                        ? modalCert.transcriptImage
                        : modalCert.previewImage
                    }
                    alt={modalCert.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* If on transcript page: Display detailed module breakdown table */}
                {modalPage === 'transcript' && modalCert.modules && (
                  <div className="w-full max-w-3xl mt-6 p-5 rounded-2xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-onyx-800 mb-4">
                      <div>
                        <h5 className="text-sm font-black text-slate-900 dark:text-white">
                          Rincian Transkrip Nilai 16 Modul Unit Kompetensi
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Instruktur: Herwis Gultom, S.Kom., M.Kom. &bull; Total Beban: 70 Jam Pelajaran (JP)
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                        Predikat: Sangat Memuaskan
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {modalCert.modules.map((m) => (
                        <div
                          key={m.code}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-onyx-950 border border-slate-100 dark:border-onyx-800 flex items-center justify-between"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] text-slate-400 block">{m.code}</span>
                            <span className="font-bold text-slate-900 dark:text-white truncate block">
                              {m.name}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs">
                              {m.grade} ({m.score})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Action Bar */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-onyx-950 border-t border-slate-200 dark:border-onyx-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Kredensial Resmi S1 Teknik Informatika Fariza Arlistiana</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={modalCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-onyx-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-onyx-700 text-xs font-mono font-bold hover:bg-slate-100 dark:hover:bg-onyx-700 transition-all cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>Buka File Asli</span>
                  </a>

                  <a
                    href={modalCert.pdfUrl}
                    download
                    onClick={() => sfx.playSuccess()}
                    className="btn-3d inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-glow-crimson hover:scale-105 transition-all cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Dokumen (.PDF)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
