import React, { createContext, useContext, useEffect, useState } from 'react';
import { sfx } from '../utils/sound';

export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    certificates: string;
    experience: string;
    contact: string;
    contactBtn: string;
    searchPlaceholder: string;
  };
  hero: {
    statusBadge: string;
    openForWork: string;
    studentBadge: string;
    exploreBtn: string;
    downloadCvBtn: string;
    certificatesBtn: string;
    terminalBtn: string;
    scrollDown: string;
  };
  about: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
  };
  skills: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
    codeShowcaseTitle: string;
    codeShowcaseSubtitle: string;
  };
  projects: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
    categoryLabel: string;
    techFilterLabel: string;
    showing: string;
    of: string;
    projectsWord: string;
    resetFilter: string;
    noProjectsTitle: string;
    noProjectsDesc: string;
  };
  github: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
    openBtn: string;
    reposWord: string;
    commitMatrixTitle: string;
  };
  certificates: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
  };
  experience: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
    eduHeading: string;
    workHeading: string;
  };
  contact: {
    tag: string;
    heading1: string;
    heading2: string;
    subheading: string;
    officialChannels: string;
    sendMessage: string;
    sendViaWa: string;
    sendViaEmail: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'BERANDA',
      about: 'TENTANG',
      skills: 'KEAHLIAN',
      projects: 'PROYEK',
      certificates: 'SERTIFIKAT',
      experience: 'PENGALAMAN',
      contact: 'KONTAK',
      contactBtn: 'CONTACT ME',
      searchPlaceholder: 'Cari...',
    },
    hero: {
      statusBadge: 'SOFTWARE ENGINEER • WEB DEVELOPER',
      openForWork: '[OPEN FOR WORK]',
      studentBadge: 'Mahasiswa Teknik Informatika • Universitas Pamulang',
      exploreBtn: 'JELAJAHI PROYEK',
      downloadCvBtn: 'DOWNLOAD CV (.PDF)',
      certificatesBtn: 'MAP SERTIFIKAT',
      terminalBtn: 'TERMINAL CLI',
      scrollDown: 'SCROLL KE BAWAH',
    },
    about: {
      tag: '01 // ARSITEKTUR KARIER & IDENTITAS',
      heading1: 'Filosofi',
      heading2: '& Rekayasa Sistem',
      subheading:
        'Mahasiswa S1 Teknik Informatika Universitas Pamulang yang fokus pada pengembangan aplikasi web, perancangan basis data relasional, dan arsitektur backend skalabel.',
    },
    skills: {
      tag: '02 // TECH STACK MATRIX',
      heading1: 'Keahlian &',
      heading2: 'Teknologi',
      subheading:
        'Teknologi, framework, dan tools yang saya gunakan dalam merancang antarmuka, membangun arsitektur backend, serta mengelola basis data secara efisien.',
      codeShowcaseTitle: 'Implementasi Logika Kode Produksi Nyata',
      codeShowcaseSubtitle:
        'Tinjau langsung penulisan sintaks bersih, penanganan transaksi ACID pada BPS-System ERP, autentikasi JWT dengan RBAC, serta WebSocket event broadcast.',
    },
    projects: {
      tag: '03 // SHOWCASE PORTOFOLIO',
      heading1: 'Proyek Pilihan &',
      heading2: 'Solusi Sistem',
      subheading:
        'Implementasi nyata dalam pengembangan perangkat lunak enterprise (BPS-System ERP), sistem informasi pelayanan publik, hingga aplikasi kasir POS dan billing kos.',
      categoryLabel: 'Kategori:',
      techFilterLabel: 'Filter Stack Teknologi:',
      showing: 'Menampilkan',
      of: 'dari',
      projectsWord: 'Proyek',
      resetFilter: 'Reset Filter',
      noProjectsTitle: 'Tidak Ada Proyek yang Cocok',
      noProjectsDesc: 'Coba pilih tag stack atau kategori lain untuk melihat portofolio proyek.',
    },
    github: {
      tag: '04 // GITHUB LIVE STATS & REPOSITORI',
      heading1: 'Aktivitas &',
      heading2: 'Repositori Kode',
      subheading:
        'Pantau performa repositori publik, commit, dan riwayat open source akun @Farizaa1328 secara transparan.',
      openBtn: 'Buka GitHub',
      reposWord: 'Repositori Aktif',
      commitMatrixTitle: 'Matriks Kontribusi & Commit Telemetry (Recent Weeks)',
    },
    certificates: {
      tag: '05 // SERTIFIKASI & KREDENSIAL RESMI',
      heading1: 'Sertifikasi &',
      heading2: 'Lisensi Kompetensi',
      subheading:
        'Kredensial resmi Cisco Networking Academy (CCNA SRWE) dan Transkrip Pelatihan 70 JP LPKKS Universitas Pamulang terverifikasi.',
    },
    experience: {
      tag: '06 // REKAM JEJAK & KUALIFIKASI',
      heading1: 'Pendidikan &',
      heading2: 'Pengalaman Kerja',
      subheading:
        'Rekam jejak pendidikan formal di Universitas Pamulang dan SMKN 29 Penerbangan Jakarta, serta pengalaman kerja praktik di PT. Bintang Plastik Sempurna dan Panasonic Gobel Indonesia.',
      eduHeading: 'Pendidikan Formal',
      workHeading: 'Pengalaman Kerja',
    },
    contact: {
      tag: '07 // HUBUNGI SAYA',
      heading1: 'Mari',
      heading2: 'Berkolaborasi',
      subheading:
        'Memiliki ide proyek, tawaran magang / kerja sama, atau sekadar berdiskusi seputar web development? Saya siap terhubung dengan Anda.',
      officialChannels: 'Saluran Kontak Resmi',
      sendMessage: 'Kirim Pesan Langsung',
      sendViaWa: 'Kirim via WhatsApp (+62 821-2196-5278)',
      sendViaEmail: 'Kirim via Surel Resmi',
    },
  },

  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      skills: 'SKILLS',
      projects: 'PROJECTS',
      certificates: 'CERTIFICATES',
      experience: 'EXPERIENCE',
      contact: 'CONTACT',
      contactBtn: 'CONTACT ME',
      searchPlaceholder: 'Search...',
    },
    hero: {
      statusBadge: 'SOFTWARE ENGINEER • WEB DEVELOPER',
      openForWork: '[OPEN FOR WORK]',
      studentBadge: 'Informatics Engineering Student • Universitas Pamulang',
      exploreBtn: 'EXPLORE PROJECTS',
      downloadCvBtn: 'DOWNLOAD CV (.PDF)',
      certificatesBtn: 'CERTIFICATES MAP',
      terminalBtn: 'TERMINAL CLI',
      scrollDown: 'SCROLL DOWN',
    },
    about: {
      tag: '01 // CAREER ARCHITECTURE & IDENTITY',
      heading1: 'Engineering',
      heading2: 'Philosophy & Systems',
      subheading:
        'Informatics Engineering student at Universitas Pamulang focused on full-stack web application development, relational database engineering, and scalable backend architecture.',
    },
    skills: {
      tag: '02 // TECH STACK MATRIX',
      heading1: 'Skills &',
      heading2: 'Technologies',
      subheading:
        'Technologies, frameworks, and developer tooling used to design interfaces, engineer robust backends, and manage high-integrity databases efficiently.',
      codeShowcaseTitle: 'Production Code Quality & Clean Architecture',
      codeShowcaseSubtitle:
        'Review clean code syntax, ACID database transactions in BPS-System ERP, JWT authentication with RBAC, and real-time WebSocket event broadcasting.',
    },
    projects: {
      tag: '03 // PORTFOLIO SHOWCASE',
      heading1: 'Featured Projects &',
      heading2: 'System Solutions',
      subheading:
        'Real-world software engineering implementations: BPS-System Enterprise ERP, citizen public service systems, POS cashier applications, and property billing.',
      categoryLabel: 'Category:',
      techFilterLabel: 'Filter Tech Stack:',
      showing: 'Showing',
      of: 'of',
      projectsWord: 'Projects',
      resetFilter: 'Reset Filters',
      noProjectsTitle: 'No Matching Projects Found',
      noProjectsDesc: 'Try selecting another technology tag or category filter to view projects.',
    },
    github: {
      tag: '04 // GITHUB LIVE STATS & REPOSITORIES',
      heading1: 'Activity &',
      heading2: 'Code Repositories',
      subheading:
        'Monitor public repositories performance, commit velocity, and open source track record for @Farizaa1328 in real-time.',
      openBtn: 'Open GitHub',
      reposWord: 'Active Repositories',
      commitMatrixTitle: 'Contribution & Commit Telemetry Matrix (Recent Weeks)',
    },
    certificates: {
      tag: '05 // OFFICIAL CERTIFICATIONS & CREDENTIALS',
      heading1: 'Certifications &',
      heading2: 'Professional Licenses',
      subheading:
        'Verified credentials from Cisco Networking Academy (CCNA SRWE) and official 70 JP Training Transcript from LPKKS Universitas Pamulang.',
    },
    experience: {
      tag: '06 // TRACK RECORD & QUALIFICATIONS',
      heading1: 'Education &',
      heading2: 'Work Experience',
      subheading:
        'Formal education background at Universitas Pamulang and SMKN 29 Penerbangan Jakarta, along with industrial internships at PT. Bintang Plastik Sempurna and Panasonic Gobel Indonesia.',
      eduHeading: 'Formal Education',
      workHeading: 'Work Experience',
    },
    contact: {
      tag: '07 // GET IN TOUCH',
      heading1: "Let's",
      heading2: 'Collaborate',
      subheading:
        'Have a software project inquiry, internship opportunity, or wish to discuss web development? I am ready to connect.',
      officialChannels: 'Official Contact Channels',
      sendMessage: 'Send Direct Message',
      sendViaWa: 'Send via WhatsApp (+62 821-2196-5278)',
      sendViaEmail: 'Send via Official Email',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('frz_lang') as Language;
    if (saved === 'id' || saved === 'en') return saved;
    return 'id'; // Default to Indonesian
  });

  useEffect(() => {
    localStorage.setItem('frz_lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggleLang = () => {
    sfx.playSwitch();
    setLangState((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const setLang = (newLang: Language) => {
    sfx.playSwitch();
    setLangState(newLang);
  };

  const t = DICTIONARY[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, setLanguage: setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
