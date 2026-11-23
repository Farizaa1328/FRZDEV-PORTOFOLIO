import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  FileText,
  Award,
  Terminal,
  ExternalLink,
  ArrowRight,
  Sun,
  Moon,
  MessageCircle,
  Mail,
  Copy,
  Check,
  X,
  Layers,
  Sparkles,
  Download,
  FolderGit2,
  Navigation,
  Globe,
  CornerDownLeft,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Github,
  Smartphone,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { usePwa } from '../context/PwaContext';
import { sfx } from '../utils/sound';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'proyek' | 'navigasi' | 'dokumen' | 'aksi';
  icon: React.ElementType;
  badge?: string;
  tags?: string[];
  keywords?: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenCv,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const { promptInstall } = usePwa();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smooth scroll or navigate helper
  const navigateToSection = (sectionId: string) => {
    sfx.playClick();
    onClose();

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProject = (projectId: string) => {
    sfx.playClick();
    onClose();
    navigate(`/proyek/${projectId}`);
  };

  const handleCopyPortfolioUrl = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Build the list of commands
  const allCommands: CommandItem[] = useMemo(() => {
    return [
      // --- PROYEK UNGGULAN ---
      {
        id: 'project-bps',
        title: 'BPS-System — ERP PT Bintang Plastik Sempurna',
        subtitle: 'Enterprise Resource Planning manufaktur plastik (Express, React, MySQL, Socket.io)',
        category: 'proyek',
        icon: FolderGit2,
        badge: 'Enterprise',
        tags: ['Express.js', 'MySQL', 'Socket.io', 'React'],
        keywords: ['bps', 'bintang plastik', 'erp', 'manufaktur', 'pabrik', 'faktur', 'produksi'],
        action: () => handleOpenProject('bps-system'),
      },
      {
        id: 'project-sipak',
        title: 'SIPAK RT 012 — Layanan Warga & Kas RT',
        subtitle: 'Sistem administrasi surat pengantar digital & transparansi keuangan kas iuran warga',
        category: 'proyek',
        icon: FolderGit2,
        badge: 'Web App',
        tags: ['React', 'Express.js', 'MySQL'],
        keywords: ['sipak', 'rt', 'warga', 'surat', 'iuran', 'administrasi', 'kas'],
        action: () => handleOpenProject('sipak-rt012'),
      },
      {
        id: 'project-kost',
        title: 'Kost Saali — Billing & Kamar Kos',
        subtitle: 'Manajemen hunian kos dengan auto-due WhatsApp trigger & tracking deposit sewa',
        category: 'proyek',
        icon: FolderGit2,
        badge: 'Management',
        tags: ['Node.js', 'MySQL', 'WhatsApp API'],
        keywords: ['kost', 'saali', 'sewa', 'kamar', 'penyewa', 'billing', 'jatuh tempo'],
        action: () => handleOpenProject('kost-saali'),
      },
      {
        id: 'project-pos',
        title: 'SmartPOS — Point of Sale & Inventori',
        subtitle: 'Aplikasi kasir ritel barcode scanner, diskon dinamis, dan cetak struk thermal',
        category: 'proyek',
        icon: FolderGit2,
        badge: 'POS App',
        tags: ['React', 'Express.js', 'MySQL'],
        keywords: ['pos', 'kasir', 'smartpos', 'struk', 'penjualan', 'inventori', 'ritel'],
        action: () => handleOpenProject('aplikasi-kasir'),
      },
      {
        id: 'project-codelearn',
        title: 'CodeLearn — Interactive Coding Learning',
        subtitle: 'Platform edukasi pemrograman web dengan browser sandbox interpreter & kurikulum kuis',
        category: 'proyek',
        icon: FolderGit2,
        badge: 'EdTech',
        tags: ['React', 'Node.js', 'Monaco Editor'],
        keywords: ['codelearn', 'belajar koding', 'sandbox', 'edukasi', 'javascript', 'interaktif'],
        action: () => handleOpenProject('codelearn'),
      },

      // --- NAVIGASI HALAMAN ---
      {
        id: 'nav-home',
        title: 'Beranda (Home)',
        subtitle: 'Lompat ke bagian teratas header terminal & hero introduction',
        category: 'navigasi',
        icon: Navigation,
        badge: 'Section',
        keywords: ['beranda', 'home', 'top', 'hero', 'fariza', 'atas'],
        action: () => navigateToSection('beranda'),
      },
      {
        id: 'nav-about',
        title: 'Tentang Saya (About)',
        subtitle: 'Profil, latar belakang S1 Teknik Informatika UNPAM, dan filosofi engineering',
        category: 'navigasi',
        icon: Terminal,
        badge: 'Section',
        keywords: ['tentang', 'about', 'profil', 'bio', 'unpam', 'kuliah', 'jakarta selatan'],
        action: () => navigateToSection('tentang'),
      },
      {
        id: 'nav-skills',
        title: 'Keahlian & Tech Stack (Skills)',
        subtitle: 'Arsitektur backend Node.js/Express, relational database MySQL, dan network engineering',
        category: 'navigasi',
        icon: Layers,
        badge: 'Section',
        keywords: ['keahlian', 'skills', 'stack', 'teknologi', 'backend', 'frontend', 'cisco', 'mysql'],
        action: () => navigateToSection('keahlian'),
      },
      {
        id: 'nav-projects',
        title: 'Galeri Proyek (Projects)',
        subtitle: 'Koleksi lengkap studi kasus proyek web enterprise, POS, dan sistem informasi',
        category: 'navigasi',
        icon: FolderGit2,
        badge: 'Section',
        keywords: ['proyek', 'projects', 'portfolio', 'karya', 'aplikasi'],
        action: () => navigateToSection('proyek'),
      },
      {
        id: 'nav-github-stats',
        title: 'Aktivitas GitHub & Repositori (GitHub Stats)',
        subtitle: 'Statistik live commit, repositori publik BPS-System & open source @Farizaa1328',
        category: 'navigasi',
        icon: Github,
        badge: 'Live API',
        keywords: ['github', 'stats', 'repositori', 'repo', 'commit', 'farizaa1328', 'aktivitas', 'open source'],
        action: () => navigateToSection('github-stats'),
      },
      {
        id: 'nav-certificates',
        title: 'Sertifikasi & Lisensi (Certificates)',
        subtitle: 'CCNA Cisco Networking Academy & Transkrip 70 JP LPKKS Universitas Pamulang',
        category: 'navigasi',
        icon: Award,
        badge: 'Section',
        keywords: ['sertifikat', 'certificates', 'ccna', 'cisco', 'lpkks', 'unpam', 'srwe', 'nilai'],
        action: () => navigateToSection('sertifikat'),
      },
      {
        id: 'nav-experience',
        title: 'Pendidikan & Pengalaman Kerja (Journey)',
        subtitle: 'Universitas Pamulang, SMKN 29 Penerbangan, PT BPS, & Panasonic Gobel Indonesia',
        category: 'navigasi',
        icon: GraduationCap,
        badge: 'Section',
        keywords: [
          'pengalaman',
          'pendidikan',
          'education',
          'kerja',
          'magang',
          'unpam',
          'smkn 29',
          'bps',
          'panasonic',
          'journey',
          'timeline',
        ],
        action: () => navigateToSection('pengalaman'),
      },
      {
        id: 'nav-contact',
        title: 'Hubungi Saya (Contact)',
        subtitle: 'Formulir pesan langsung, WhatsApp aktif, dan surel resmi Fariza Arlistiana',
        category: 'navigasi',
        icon: MessageCircle,
        badge: 'Section',
        keywords: ['kontak', 'contact', 'email', 'wa', 'whatsapp', 'hire', 'pesan', 'kolaborasi'],
        action: () => navigateToSection('kontak'),
      },

      // --- DOKUMEN & SERTIFIKAT ---
      {
        id: 'doc-cv-preview',
        title: 'Buka CV Fariza Arlistiana (ATS-Friendly PDF)',
        subtitle: 'Tinjau Curriculum Vitae dalam modal interaktif dengan ringkasan 10 detik untuk rekruter',
        category: 'dokumen',
        icon: FileText,
        badge: 'PDF Preview',
        tags: ['ATS-Friendly', 'PDF Ready'],
        keywords: ['cv', 'resume', 'curriculum vitae', 'ats', 'rekruter', 'download cv', 'buka cv'],
        action: () => {
          sfx.playClick();
          onClose();
          if (onOpenCv) {
            onOpenCv();
          } else {
            window.dispatchEvent(new CustomEvent('open-cv-modal'));
          }
        },
      },
      {
        id: 'doc-cv-download',
        title: 'Download Berkas CV (fariza-cv.pdf)',
        subtitle: 'Unduh langsung file PDF resmi Fariza Arlistiana untuk lampiran lamaran kerja',
        category: 'dokumen',
        icon: Download,
        badge: 'Download',
        keywords: ['unduh cv', 'download cv', 'pdf cv', 'berkas cv', 'resume pdf'],
        action: () => {
          sfx.playSuccess();
          onClose();
          const link = document.createElement('a');
          link.href = '/cv/fariza-cv.pdf';
          link.download = 'CV_Fariza_Arlistiana_Software_Engineer.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        id: 'doc-cert-cisco',
        title: 'Sertifikat Resmi CCNA Cisco NetAcad (SRWE)',
        subtitle: 'Credential ID: 5a21875e-f035-4314-8eee-cfd7c5a298c1 — Switching, Routing & Wireless',
        category: 'dokumen',
        icon: ShieldCheck,
        badge: 'Cisco NetAcad',
        keywords: ['ccna cisco', 'srwe', 'netacad', 'switching routing', 'sertifikat ccna'],
        action: () => {
          navigateToSection('sertifikat');
        },
      },
      {
        id: 'doc-cert-lpkks',
        title: 'Sertifikat & Transkrip 70 JP LPKKS UNPAM',
        subtitle: 'Nomor: RIN-SRWE-26-0003-0582 — Nilai Sempurna 16 Modul Jaringan Komputer',
        category: 'dokumen',
        icon: Award,
        badge: 'LPKKS UNPAM',
        keywords: ['lpkks', 'transkrip ccna', '70 jp', 'nilai unpam', 'sertifikat unpam'],
        action: () => {
          navigateToSection('sertifikat');
        },
      },

      // --- AKSI CEPAT ---
      {
        id: 'action-pwa-install',
        title:
          lang === 'id'
            ? 'Pasang Aplikasi FRZ.DEV (Install Web App)'
            : 'Install FRZ.DEV Web App (PWA)',
        subtitle:
          lang === 'id'
            ? 'Pasang portofolio ke layar utama ponsel atau desktop untuk akses cepat & offline'
            : 'Install portfolio to home screen or desktop for instant & offline access',
        category: 'aksi',
        icon: Smartphone,
        badge: 'PWA App',
        keywords: [
          'install',
          'pwa',
          'pasang',
          'aplikasi',
          'unduh app',
          'offline',
          'homescreen',
          'desktop app',
          'apk',
        ],
        action: () => {
          sfx.playClick();
          onClose();
          promptInstall();
        },
      },
      {
        id: 'action-language',
        title:
          lang === 'id'
            ? 'Ganti Bahasa ke English (Switch to English)'
            : 'Switch Language to Bahasa Indonesia',
        subtitle:
          lang === 'id'
            ? 'Ubah tampilan antarmuka web ke Bahasa Inggris (Switch to English)'
            : 'Ganti tampilan antarmuka situs ke Bahasa Indonesia',
        category: 'aksi',
        icon: Globe,
        badge: lang === 'id' ? 'ID ➔ EN' : 'EN ➔ ID',
        keywords: [
          'language',
          'bahasa',
          'english',
          'indonesia',
          'i18n',
          'translate',
          'terjemahan',
          'ganti bahasa',
          'switch',
        ],
        action: () => {
          sfx.playSwitch();
          toggleLang();
          onClose();
        },
      },
      {
        id: 'action-terminal',
        title: 'Buka Developer Terminal CLI (Interactive Shell)',
        subtitle: 'Buka konsol terminal Linux interaktif untuk menjalankan perintah CLI langsung',
        category: 'aksi',
        icon: Terminal,
        badge: 'Ctrl + `',
        keywords: ['terminal', 'cli', 'bash', 'console', 'shell', 'developer', 'konsol', 'perintah'],
        action: () => {
          sfx.playClick();
          onClose();
          window.dispatchEvent(new CustomEvent('open-terminal'));
        },
      },
      {
        id: 'action-wa',
        title: 'Chat WhatsApp Langsung (+62 821-2196-5278)',
        subtitle: 'Kirim pesan instan via WhatsApp untuk tawaran proyek, magang, atau rekrutmen',
        category: 'aksi',
        icon: MessageCircle,
        badge: '+62 821-2196-5278',
        keywords: ['wa', 'whatsapp', 'chat', 'nomor wa', 'telepon', 'pesan wa', '082121965278'],
        action: () => {
          sfx.playClick();
          onClose();
          window.open(
            'https://wa.me/6282121965278?text=Halo%20Fariza,%20saya%20tertarik%20untuk%20berkolaborasi%20proyek',
            '_blank'
          );
        },
      },
      {
        id: 'action-email',
        title: 'Kirim Surel Resmi (farizaarlis28@gmail.com)',
        subtitle: 'Buka surel langsung untuk pengiriman undangan wawancara atau proposal proyek',
        category: 'aksi',
        icon: Mail,
        badge: 'Email',
        keywords: ['email', 'surel', 'surat', 'mail', 'farizaarlis28@gmail.com'],
        action: () => {
          sfx.playClick();
          onClose();
          window.location.href =
            'mailto:farizaarlis28@gmail.com?subject=[FRZ.DEV]%20Inquiry%20Kolaborasi%20Proyek';
        },
      },
      {
        id: 'action-github',
        title: 'Kunjungi GitHub Profil Fariza (@Farizaa1328)',
        subtitle: 'Lihat repository publik BPS-System, kontribusi kode, dan commit history',
        category: 'aksi',
        icon: Globe,
        badge: 'GitHub',
        keywords: ['github', 'farizaa1328', 'repo', 'source code', 'git'],
        action: () => {
          sfx.playClick();
          onClose();
          window.open('https://github.com/Farizaa1328', '_blank');
        },
      },
      {
        id: 'action-toggle-theme',
        title: `Ganti Tema Mode: ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
        subtitle: `Beralih ke tampilan antarmuka ${theme === 'dark' ? 'terang' : 'gelap cyberpunk'}`,
        category: 'aksi',
        icon: theme === 'dark' ? Sun : Moon,
        badge: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
        keywords: ['tema', 'theme', 'dark mode', 'light mode', 'gelap', 'terang', 'warna'],
        action: () => {
          sfx.playSwitch();
          toggleTheme();
        },
      },
      {
        id: 'action-copy-url',
        title: 'Salin Tautan Portofolio (Copy URL)',
        subtitle: 'Salin alamat web portofolio ini untuk dibagikan ke tim atau media sosial',
        category: 'aksi',
        icon: copiedLink ? Check : Copy,
        badge: copiedLink ? 'Disalin!' : 'Copy',
        keywords: ['salin', 'copy', 'link', 'url', 'bagikan', 'share'],
        action: handleCopyPortfolioUrl,
      },
    ];
  }, [location.pathname, theme, copiedLink]);

  // Filter commands based on query and activeCategory
  const filteredCommands = useMemo(() => {
    let list = allCommands;

    if (activeCategory !== 'all') {
      list = list.filter((cmd) => cmd.category === activeCategory);
    }

    if (!query.trim()) {
      return list;
    }

    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = cleanQuery.split(/\s+/);

    return list.filter((cmd) => {
      const matchTarget = [
        cmd.title,
        cmd.subtitle,
        cmd.category,
        cmd.badge || '',
        ...(cmd.tags || []),
        ...(cmd.keywords || []),
      ]
        .join(' ')
        .toLowerCase();

      return queryTokens.every((token) => matchTarget.includes(token));
    });
  }, [allCommands, query, activeCategory]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      sfx.playClick();
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setActiveCategory('all');
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (filteredCommands.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        sfx.playHover();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sfx.playHover();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'navigasi', label: 'Navigasi' },
    { id: 'dokumen', label: 'Dokumen & CV' },
    { id: 'aksi', label: 'Aksi Cepat' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white/95 dark:bg-[#07070B]/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[82vh] transition-colors"
          >
            {/* Header: Terminal Prefix & Input */}
            <div className="relative border-b border-slate-200 dark:border-white/10 p-4 sm:p-5 bg-slate-50/50 dark:bg-onyx-900/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded bg-crimson-500/10 border border-crimson-500/20 text-crimson-600 dark:text-crimson-400 font-mono text-[11px] font-bold">
                  <Terminal size={13} className="animate-pulse" />
                  <span>frz:~$</span>
                </div>

                <div className="relative flex-grow flex items-center">
                  <Search
                    size={18}
                    className="absolute left-1 text-slate-400 dark:text-slate-500 pointer-events-none"
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ketik nama proyek, sertifikat CCNA, download CV, atau navigasi..."
                    className="w-full pl-8 pr-10 py-1.5 bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-sans font-medium focus:outline-none focus:ring-0"
                  />
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('');
                        inputRef.current?.focus();
                      }}
                      className="absolute right-1 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-xs font-mono flex items-center gap-1"
                  title="Tutup (ESC)"
                >
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] border border-slate-300 dark:border-white/20">
                    ESC
                  </kbd>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sfx.playHover();
                      setActiveCategory(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-crimson-600 text-white shadow-glow-crimson'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className="flex-grow overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100 dark:divide-white/5 max-h-[55vh]"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-crimson-500/10 text-crimson-500 mx-auto flex items-center justify-center mb-3">
                    <Search size={22} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                    Tidak ada hasil untuk "{query}"
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    Coba gunakan kata kunci lain seperti <span className="font-mono text-crimson-500">BPS</span>,{' '}
                    <span className="font-mono text-crimson-500">CV</span>,{' '}
                    <span className="font-mono text-crimson-500">CCNA</span>,{' '}
                    <span className="font-mono text-crimson-500">WhatsApp</span>, atau{' '}
                    <span className="font-mono text-crimson-500">Keahlian</span>.
                  </p>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;

                  return (
                    <button
                      key={cmd.id}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'bg-crimson-50 dark:bg-crimson-950/40 border border-crimson-500/30 shadow-sm'
                          : 'hover:bg-slate-50 dark:hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-crimson-600 text-white shadow-glow-crimson'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:text-crimson-500'
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`text-sm font-bold truncate ${
                              isSelected
                                ? 'text-crimson-700 dark:text-crimson-400'
                                : 'text-slate-800 dark:text-white'
                            }`}
                          >
                            {cmd.title}
                          </span>

                          {cmd.badge && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider font-semibold ${
                                isSelected
                                  ? 'bg-crimson-600/20 text-crimson-600 dark:text-crimson-400 border border-crimson-500/30'
                                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {cmd.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {cmd.subtitle}
                        </p>

                        {/* Tags */}
                        {cmd.tags && cmd.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {cmd.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Arrow / Enter Icon */}
                      <div
                        className={`shrink-0 self-center pl-2 transition-opacity ${
                          isSelected ? 'opacity-100 text-crimson-600 dark:text-crimson-400' : 'opacity-0 text-slate-400'
                        }`}
                      >
                        <CornerDownLeft size={16} />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="border-t border-slate-200 dark:border-white/10 px-4 py-3 bg-slate-50/70 dark:bg-onyx-950/70 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    ↓
                  </kbd>
                  <span>Navigasi</span>
                </span>

                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    ↵
                  </kbd>
                  <span>Pilih</span>
                </span>

                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    ESC
                  </kbd>
                  <span>Tutup</span>
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[10px]">
                <Sparkles size={12} className="text-crimson-500" />
                <span>FRZ.DEV Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
