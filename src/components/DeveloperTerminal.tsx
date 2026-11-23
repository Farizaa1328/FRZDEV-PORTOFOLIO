import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  CornerDownLeft,
  Sparkles,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Download,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { usePwa } from '../context/PwaContext';
import { sfx } from '../utils/sound';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
  isComponent?: boolean;
  component?: React.ReactNode;
}

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv?: () => void;
}

const WELCOME_BANNER = `
 ███████╗██████╗ ███████╗    ██████╗ ███████╗██╗   ██╗
 ██╔════╝██╔══██╗╚══███╔╝    ██╔══██╗██╔════╝██║   ██║
 █████╗  ██████╔╝  ███╔╝     ██║  ██║█████╗  ██║   ██║
 ██╔══╝  ██╔══██╗ ███╔╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ██║     ██║  ██║███████╗    ██████╔╝███████╗ ╚████╔╝ 
 ╚═╝     ╚═╝  ╚═╝╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝  
 Interactive Developer Console v2.4 (x86_64-pc-linux-gnu)
 Fariza Arlistiana — Software Engineer & Web Developer
`;

const INITIAL_HELP = `
Ketik 'help' untuk melihat daftar perintah, atau klik chip perintah di bawah:
  whoami       — Profil ringkas & latar belakang
  skills       — Matriks keahlian teknis & meteran ASCII
  projects     — Daftar seluruh proyek rekayasa perangkat lunak
  cat bps      — Studi kasus & arsitektur ERP BPS-System
  edu          — Riwayat pendidikan formal (UNPAM & SMKN 29)
  work         — Pengalaman kerja & magang industri
  certs        — Detail sertifikat CCNA Cisco & LPKKS 70 JP
  cv           — Unduh & pratinjau Curriculum Vitae (.PDF)
  wa           — Buka chat WhatsApp langsung (+62 821-2196-5278)
  email        — Kirim pesan surel resmi
  theme        — Beralih antara Dark Mode & Light Mode
  lang         — Beralih bahasa situs (Bahasa Indonesia / English)
  install      — Pasang aplikasi FRZ.DEV ke homescreen/desktop (PWA)
  clear        — Bersihkan layar konsol
  exit         — Tutup jendela terminal
`;

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onOpenCv,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'welcome',
      type: 'system',
      text: WELCOME_BANNER,
    },
    {
      id: 'init-help',
      type: 'output',
      text: INITIAL_HELP,
    },
  ]);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, setLanguage } = useLanguage();
  const { isInstalled, promptInstall } = usePwa();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      sfx.playClick();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to input history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: `in-${Date.now()}`,
        type: 'input',
        text: trimmed,
      },
    ];

    const args = trimmed.toLowerCase().split(/\s+/);
    const command = args[0];
    const subArgs = args.slice(1);

    switch (command) {
      case 'help':
      case '?':
      case 'man':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
DAFTAR PERINTAH RESMI FRZ.DEV SHELL:
-----------------------------------------------------------
  whoami             Tampilkan identitas, kampus, dan status akademik
  about / bio        Biografi ringkas & filosofi rekayasa sistem
  skills / stack     Matriks keahlian & stack teknologi utama
  projects / ls      Daftar 5 proyek utama Fariza Arlistiana
  cat <nama-proyek>  Lihat spesifikasi proyek (contoh: cat bps-system)
  edu / education    Riwayat pendidikan (Universitas Pamulang & SMKN 29)
  work / experience  Pengalaman kerja (PT Bintang Plastik Sempurna & Panasonic)
  certs / ccna       Sertifikasi CCNA Cisco NetAcad & LPKKS UNPAM
  cv / download-cv   Unduh berkas CV resmi (.PDF)
  contact            Daftar seluruh saluran kontak resmi
  wa / whatsapp      Buka chat WhatsApp langsung (+62 821-2196-5278)
  email / mail       Kirim surel ke farizaarlis28@gmail.com
  github             Buka profil GitHub https://github.com/Farizaa1328
  theme [toggle]     Ganti tampilan Dark Mode / Light Mode
  lang [id|en]       Beralih bahasa antarmuka web (Bahasa Indonesia / English)
  install / pwa      Pasang aplikasi portofolio (Progressive Web App)
  sound [toggle]     Aktifkan / nonaktifkan efek audio procedural
  date               Tampilkan tanggal dan waktu WIB (UTC+7)
  clear / cls        Bersihkan layar konsol terminal
  exit / quit        Tutup jendela terminal
  sudo <perintah>    Hak akses administrator
-----------------------------------------------------------`,
        });
        sfx.playClick();
        break;

      case 'whoami':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `
USER PROFILE:
  Nama          : Fariza Arlistiana
  Role          : Software Engineer & Web Developer
  Pendidikan    : Universitas Pamulang (UNPAM) — S1 Teknik Informatika (Semester 7)
  Sekolah Asal  : SMKN 29 Penerbangan Jakarta — Teknik Pendingin & Tata Udara
  Lokasi        : Jakarta Selatan, DKI Jakarta, Indonesia (UTC+7)
  Status        : Open to Work / Full-Stack & Backend Internship
  Kredensial    : Cisco Certified Network Associate (CCNA SRWE) & Transkrip 70 JP LPKKS`,
        });
        sfx.playSuccess();
        break;

      case 'about':
      case 'bio':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
TENTANG SAYA:
  Fariza Arlistiana adalah mahasiswa semester 7 Teknik Informatika di Universitas
  Pamulang yang memiliki minat mendalam pada rekayasa perangkat lunak, pengembangan
  web modern (Frontend, Backend, dan Full-Stack), serta arsitektur basis data relasional.
  
  Terbiasa membangun sistem enterprise skala manufaktur (seperti BPS-System ERP),
  aplikasi administrasi publik (SIPAK RT-012), hingga sistem POS kasir dan manajemen kos.`,
        });
        sfx.playClick();
        break;

      case 'skills':
      case 'stack':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
KEAHLIAN TEKNOLOGI & KOMPETENSI REKAYASA:
-----------------------------------------------------------
  Backend Architecture:
    Node.js & Express.js  [██████████████████░░] 90% (REST API, JWT, Middleware)
    PHP & Laravel         [████████████████░░░░] 80% (MVC, Eloquent, Blade)
    Socket.io Realtime    [█████████████████░░░] 85% (Event-driven, Factory Feed)

  Relational Database:
    MySQL / Sequelize     [█████████████████░░░] 85% (ACID, Complex Joins, ERD)

  Frontend Engineering:
    React.js & TypeScript [████████████████░░░░] 82% (Hooks, SPA, Component Arch)
    Tailwind CSS          [██████████████████░░] 90% (Responsive, Custom Theme)
    JavaScript (ES6+)     [██████████████████░░] 90% (Async/Await, DOM API)

  Networking & Infrastructure:
    Cisco CCNA (SRWE)     [█████████████████░░░] 88% (VLAN, Routing, LAN Security)
    Git & GitHub          [█████████████████░░░] 85% (Version Control, PR, CI/CD)
-----------------------------------------------------------`,
        });
        sfx.playClick();
        break;

      case 'projects':
      case 'ls':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
DAFTAR PROYEK TERPILIH (Gunakan 'cat <nama-proyek>' untuk detail):
  1. bps-system      — Enterprise Resource Planning (ERP) PT Bintang Plastik Sempurna
  2. sipak-rt012     — Sistem Informasi Pelayanan Administrasi & Keuangan Warga RT 012
  3. kost-saali      — Aplikasi Manajemen Hunian Indekos & Billing Otomatis
  4. smartpos        — Point of Sale & Inventori Kasir Ritel Berbasis Web
  5. codelearn       — Platform Edukasi Pemrograman Web Interaktif & Code Playground`,
        });
        sfx.playClick();
        break;

      case 'cat':
        const target = subArgs[0];
        if (!target) {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: `Syntax: cat <nama-proyek>\nContoh: cat bps-system atau cat sipak-rt012`,
          });
          break;
        }

        if (target.includes('bps')) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'success',
            text: `
[PROYEK: BPS-System — ERP PT Bintang Plastik Sempurna]
-----------------------------------------------------------
Kategori    : Enterprise Resource Planning (ERP)
Status      : Selesai / Terverifikasi
Stack Utama : Node.js, Express.js, React.js, MySQL, Sequelize ORM, Socket.io, Tailwind CSS
Deskripsi   :
  Sistem informasi manajemen enterprise terpadu untuk pabrik manufaktur plastik
  PT Bintang Plastik Sempurna yang mengintegrasikan alur produksi, inventori bahan
  baku biji plastik, pesanan penjualan, penerbitan faktur pajak PPN 11%, dan
  pelaporan eksekutif realtime via Socket.io.
Fitur Utama :
  • Alur otomatisasi Work Order (WO) dari peracikan biji plastik hingga pengepakan
  • Pelacak batch barcode lot produksi untuk ketelusuran kualitas produk cacat
  • Rekonsiliasi stok inventori otomatis dengan peringatan safety stock level
  • Simulator telemetri pabrik berbasis WebSocket live
Repositori  : https://github.com/Farizaa1328/BPS-System`,
          });
        } else if (target.includes('sipak')) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `
[PROYEK: SIPAK RT 012 — Layanan Warga & Kas RT]
-----------------------------------------------------------
Kategori    : Sistem Informasi Administrasi & Keuangan Publik
Stack Utama : Laravel, PHP, MySQL, Bootstrap, Blade Template
Deskripsi   :
  Sistem informasi pelayanan kependudukan terpadu dengan otomasi penerbitan surat
  pengantar mandiri ber-QR code verifikasi serta transparansi buku kas iuran warga.`,
          });
        } else if (target.includes('kost')) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `
[PROYEK: Kost Saali — Billing & Kamar Kos]
-----------------------------------------------------------
Kategori    : Sistem Manajemen Properti & Tagihan
Stack Utama : TypeScript, React.js, Tailwind CSS, LocalStorage / REST
Deskripsi   :
  Manajemen kamar kost dengan penghitung hari mundur menuju tanggal jatuh tempo
  dan integrasi tombol pengingat pesan WhatsApp otomatis untuk penyewa.`,
          });
        } else if (target.includes('pos') || target.includes('smartpos') || target.includes('kasir')) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `
[PROYEK: SmartPOS — Point of Sale & Inventori Ritel]
-----------------------------------------------------------
Kategori    : Point of Sale Application
Stack Utama : React.js, Express.js, MySQL, Web Thermal Printer API
Deskripsi   :
  Aplikasi kasir barcode scanner fisik dengan perhitungan pajak otomatis, diskon
  bertingkat, dan cetak struk nota belanja thermal 58mm/80mm.`,
          });
        } else if (target.includes('code') || target.includes('codelearn')) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `
[PROYEK: CodeLearn — Platform Edukasi Pemrograman]
-----------------------------------------------------------
Kategori    : Educational Technology (EdTech)
Stack Utama : React.js, Monaco Editor Engine, Node.js Sandbox Interpreter
Deskripsi   :
  Platform pembelajaran koding interaktif web dengan kurikulum terstruktur dan
  evaluator eksekusi kode JavaScript langsung di peramban.`,
          });
        } else {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: `cat: Proyek '${target}' tidak ditemukan. Ketik 'projects' untuk daftar proyek.`,
          });
        }
        sfx.playClick();
        break;

      case 'edu':
      case 'education':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
RIWAYAT PENDIDIKAN FORMAL:
-----------------------------------------------------------
1. 2023 — Sekarang | Universitas Pamulang (UNPAM)
   Jurusan : S1 Teknik Informatika (Semester 7 — Mahasiswa Aktif)
   Fokus   : Pengembangan perangkat lunak dan sistem informasi, pemrograman website,
             database relasional, serta dasar-dasar analisis dan perancangan sistem.

2. 2020 — 2023 | SMKN 29 Penerbangan Jakarta
   Jurusan : Teknik Pendingin dan Tata Udara (Alumni)
   Fokus   : Dasar instalasi, perawatan, dan perbaikan sistem pendingin dan tata udara
             (AC & refrigerasi), dasar kelistrikan, dan troubleshooting teknis.
-----------------------------------------------------------`,
        });
        sfx.playClick();
        break;

      case 'work':
      case 'experience':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
RIWAYAT PENGALAMAN KERJA & MAGANG:
-----------------------------------------------------------
1. 2022 — 2023 | PT. Bintang Plastik Sempurna
   Peran   : Magang (Web Developer)
   Fokus   : Terlibat dalam pengembangan website internal perusahaan untuk mendukung
             proses transaksi, pengelolaan inventory, serta pengolahan data perusahaan.
             Membantu pengembangan fitur dan memastikan sistem dapat digunakan sesuai
             kebutuhan operasional pabrik.

2. 2017 — 2018 | Panasonic Gobel Indonesia
   Peran   : Praktik Kerja Lapangan (PKL)
   Fokus   : Bertanggung jawab dalam proses produksi dan perakitan radio Panasonic,
             termasuk perakitan PCB, pemasangan komponen elektronik, serta pengecekan
             hasil perakitan sesuai prosedur standar produksi.
-----------------------------------------------------------`,
        });
        sfx.playClick();
        break;

      case 'certs':
      case 'ccna':
      case 'certifications':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `
SERTIFIKASI & KREDENSIAL MIKRO KOMPUTER:
-----------------------------------------------------------
1. CCNA: Switching, Routing, and Wireless Essentials (SRWE)
   Penerbit       : Cisco Networking Academy
   Credential ID  : 5a21875e-f035-4314-8eee-cfd7c5a298c1
   Materi         : VLAN, Trunking, EtherChannel, DHCPv4/v6, SLAAC, Switch Security,
                    WLAN Controller & Routing Protocols.

2. Sertifikat Pelatihan & Transkrip 70 JP CCNA
   Penerbit       : LPKKS Universitas Pamulang (UNPAM)
   Nomor Sertif   : RIN-SRWE-26-0003-0582 (Kode: PB97XC06HV0NRVYW)
   Status         : Nilai A / A- pada seluruh 16 modul ujian kompetensi jaringan.
-----------------------------------------------------------`,
        });
        sfx.playSuccess();
        break;

      case 'cv':
      case 'resume':
      case 'download':
      case 'download-cv':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[OK] Mengunduh berkas CV resmi Fariza Arlistiana (fariza-cv.pdf)...`,
        });
        sfx.playSuccess();
        // Trigger download
        const dlLink = document.createElement('a');
        dlLink.href = '/cv/fariza-cv.pdf';
        dlLink.download = 'fariza-cv.pdf';
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
        if (onOpenCv) {
          setTimeout(() => onOpenCv(), 400);
        }
        break;

      case 'contact':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
SALURAN KONTAK RESMI:
-----------------------------------------------------------
  WhatsApp  : +62 821-2196-5278  (ketik 'wa' untuk chat langsung)
  Surel     : farizaarlis28@gmail.com  (ketik 'email' untuk kirim)
  GitHub    : https://github.com/Farizaa1328  (ketik 'github' untuk buka)
  LinkedIn  : https://linkedin.com/in/fariza-arlistiana
  Instagram : https://instagram.com/frzarlstn
  Domisili  : Jakarta Selatan, DKI Jakarta, Indonesia
-----------------------------------------------------------`,
        });
        sfx.playClick();
        break;

      case 'wa':
      case 'whatsapp':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[OK] Membuka jendela percakapan WhatsApp Fariza Arlistiana (+62 821-2196-5278)...`,
        });
        sfx.playClick();
        window.open(
          'https://wa.me/6282121965278?text=Halo%20Fariza,%20saya%20tertarik%20untuk%20berkolaborasi%20proyek',
          '_blank'
        );
        break;

      case 'email':
      case 'mail':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[OK] Membuka aplikasi surel menuju farizaarlis28@gmail.com...`,
        });
        sfx.playClick();
        window.location.href =
          'mailto:farizaarlis28@gmail.com?subject=[FRZ.DEV]%20Inquiry%20Kolaborasi%20Proyek';
        break;

      case 'github':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[OK] Membuka profil GitHub resmi https://github.com/Farizaa1328...`,
        });
        sfx.playClick();
        window.open('https://github.com/Farizaa1328', '_blank');
        break;

      case 'theme':
        toggleTheme();
        sfx.playSwitch();
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `[OK] Mode tema antarmuka diubah ke: ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}.`,
        });
        break;

      case 'lang':
      case 'language':
      case 'i18n':
        const targetLang = subArgs[0];
        let newL = lang === 'id' ? 'en' : 'id';
        if (targetLang === 'id' || targetLang === 'en') {
          setLanguage(targetLang);
          newL = targetLang;
        } else {
          toggleLang();
        }
        sfx.playSwitch();
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[OK] Bahasa antarmuka website berhasil dialihkan ke: ${
            newL === 'id' ? 'Bahasa Indonesia (ID)' : 'English (EN)'
          }.`,
        });
        break;

      case 'install':
      case 'pwa':
      case 'app':
        sfx.playSuccess();
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: isInstalled
            ? '[OK] Aplikasi FRZ.DEV PWA sudah terpasang di perangkat ini.'
            : '[PWA] Membuka jendela dialog instalasi aplikasi FRZ.DEV...',
        });
        setTimeout(() => {
          promptInstall();
        }, 300);
        break;

      case 'sound':
        const nextSound = sfx.toggleSound();
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `[OK] Efek audio procedural sekarang: ${nextSound ? 'AKTIF (ON)' : 'MATI (MUTED)'}.`,
        });
        break;

      case 'date':
      case 'time':
        const now = new Date();
        const formatted = now.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'full',
          timeStyle: 'long',
        });
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `WIB Timestamp: ${formatted} (Jakarta Selatan, UTC+7)`,
        });
        sfx.playClick();
        break;

      case 'clear':
      case 'cls':
        setLines([]);
        setInputVal('');
        sfx.playClick();
        return;

      case 'exit':
      case 'quit':
        onClose();
        sfx.playClick();
        return;

      case 'sudo':
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: `Permission denied: fariza is the only authorized superuser on this workstation.\nThis incident has been reported to security telemetry.`,
        });
        sfx.playClick();
        break;

      case 'matrix':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `Wake up, Neo... The Matrix has you. Follow the red rabbit (FRZ.DEV).`,
        });
        sfx.playSuccess();
        break;

      default:
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: `bash: perintah '${command}' tidak dikenali. Ketik 'help' untuk daftar perintah yang tersedia.`,
        });
        sfx.playClick();
        break;
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete basic commands
      const available = [
        'help',
        'whoami',
        'about',
        'skills',
        'projects',
        'cat bps-system',
        'cat sipak-rt012',
        'cat kost-saali',
        'cat smartpos',
        'cat codelearn',
        'edu',
        'work',
        'certs',
        'cv',
        'contact',
        'wa',
        'email',
        'github',
        'theme',
        'lang',
        'install',
        'pwa',
        'sound',
        'date',
        'clear',
        'exit',
      ];
      const match = available.find((cmd) => cmd.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const quickChips = [
    'help',
    'whoami',
    'skills',
    'projects',
    'cat bps-system',
    'edu',
    'work',
    'certs',
    'cv',
    'wa',
    'lang',
    'install',
    'clear',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full ${
              isMaximized ? 'h-[95vh] max-w-7xl' : 'h-[80vh] max-w-4xl'
            } bg-[#07070B] border border-slate-700/80 dark:border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-all font-mono`}
          >
            {/* Title Bar (Mac / Linux styling) */}
            <div className="px-4 py-3 bg-[#0E0E14] border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                {/* 3 Window Control Dots */}
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center group cursor-pointer"
                  title="Tutup Terminal (ESC)"
                >
                  <X size={9} className="text-black opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() => {
                    setLines([]);
                    sfx.playClick();
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center group cursor-pointer"
                  title="Bersihkan Terminal (clear)"
                >
                  <span className="text-black text-[9px] font-bold opacity-0 group-hover:opacity-100">&bull;</span>
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors flex items-center justify-center group cursor-pointer"
                  title={isMaximized ? 'Perkecil' : 'Maksimalkan'}
                >
                  {isMaximized ? (
                    <Minimize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Maximize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
                  )}
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-2" />

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <TerminalIcon size={14} className="text-crimson-500" />
                  <span className="font-bold text-white tracking-wide">fariza@frz-dev:~ (bash)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="hidden sm:inline-block">TTY1 // 80x24</span>
                <button
                  onClick={() => {
                    setLines([]);
                    sfx.playClick();
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
                  title="Clear Console"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
                  title="Close Terminal (ESC)"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Command Chips Toolbar */}
            <div className="px-4 py-2 bg-[#0A0A0F] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1">
                Chips:
              </span>
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    handleCommand(chip);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-crimson-600/20 text-slate-300 hover:text-crimson-400 border border-white/10 hover:border-crimson-500/40 text-[11px] font-mono transition-all shrink-0 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Terminal Body / Output Scroll Buffer */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-grow p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 space-y-3 cursor-text leading-relaxed select-text"
            >
              {lines.map((line) => {
                if (line.type === 'input') {
                  return (
                    <div key={line.id} className="flex items-center gap-2 text-white font-bold">
                      <span className="text-emerald-400">fariza@frz-dev</span>
                      <span className="text-slate-500">:</span>
                      <span className="text-crimson-400">~</span>
                      <span className="text-slate-500">$</span>
                      <span className="text-slate-100">{line.text}</span>
                    </div>
                  );
                }

                if (line.type === 'system') {
                  return (
                    <pre
                      key={line.id}
                      className="text-crimson-500 dark:text-crimson-400 font-mono text-[10px] sm:text-xs leading-none whitespace-pre overflow-x-auto py-1 font-bold"
                    >
                      {line.text}
                    </pre>
                  );
                }

                if (line.type === 'error') {
                  return (
                    <div key={line.id} className="text-rose-400 whitespace-pre-wrap">
                      {line.text}
                    </div>
                  );
                }

                if (line.type === 'success') {
                  return (
                    <div key={line.id} className="text-emerald-400 whitespace-pre-wrap font-medium">
                      {line.text}
                    </div>
                  );
                }

                return (
                  <div key={line.id} className="text-slate-300 whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              })}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-emerald-400 shrink-0 font-bold">fariza@frz-dev</span>
                <span className="text-slate-500 shrink-0">:</span>
                <span className="text-crimson-400 shrink-0 font-bold">~</span>
                <span className="text-slate-500 shrink-0">$</span>
                <div className="relative flex-grow flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-0 text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 p-0 m-0"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div ref={endRef} />
            </div>

            {/* Terminal Footer Info */}
            <div className="px-4 py-2.5 bg-[#0E0E14] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300">
                    TAB
                  </kbd>
                  <span>Auto-complete</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300">
                    ↑↓
                  </kbd>
                  <span>History</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300">
                    ↵
                  </kbd>
                  <span>Run</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-400">SESSION: ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
