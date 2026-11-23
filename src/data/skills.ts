export interface Skill {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  description: string;
  iconBg: string;
  badgeColor: string;
  svgIcon: string;
}

export const skillCategories = [
  'Semua',
  'Programming',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
] as const;

export const skills: Skill[] = [
  // Programming
  {
    name: 'PHP',
    category: 'Programming',
    description: 'Bahasa pemrograman server-side untuk membangun aplikasi web dinamis dan backend API.',
    iconBg: '#EEF2FF',
    badgeColor: '#4F5D95',
    svgIcon: 'php',
  },
  {
    name: 'JavaScript',
    category: 'Programming',
    description: 'Fondasi logika interaktif web client-side dan ekosistem modern full-stack development.',
    iconBg: '#FEFCE8',
    badgeColor: '#EAB308',
    svgIcon: 'javascript',
  },
  {
    name: 'TypeScript',
    category: 'Programming',
    description: 'Superset JavaScript bertipe statis untuk kode yang aman, scalable, dan maintainable.',
    iconBg: '#EFF6FF',
    badgeColor: '#3178C6',
    svgIcon: 'typescript',
  },
  {
    name: 'Java',
    category: 'Programming',
    description: 'Pemrograman berorientasi objek (OOP) kuat untuk aplikasi desktop dan rekayasa perangkat lunak.',
    iconBg: '#FFF1F2',
    badgeColor: '#E11D48',
    svgIcon: 'java',
  },

  // Frontend
  {
    name: 'HTML5',
    category: 'Frontend',
    description: 'Struktur semantik standar industri untuk membangun antarmuka web modern dan aksesibel.',
    iconBg: '#FFF7ED',
    badgeColor: '#EA580C',
    svgIcon: 'html5',
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    description: 'Desain layout modern, responsif, Flexbox, CSS Grid, serta transisi dan animasi visual.',
    iconBg: '#EFF6FF',
    badgeColor: '#2563EB',
    svgIcon: 'css3',
  },
  {
    name: 'React.js',
    category: 'Frontend',
    description: 'Library UI terpopuler untuk komponen reaktif, hooks, dan Single Page Application modern.',
    iconBg: '#ECFEFF',
    badgeColor: '#06B6D4',
    svgIcon: 'react',
  },
  {
    name: 'Bootstrap',
    category: 'Frontend',
    description: 'Framework UI komponen cepat untuk prototyping dan layout berbasis grid responsif.',
    iconBg: '#FAF5FF',
    badgeColor: '#7952B3',
    svgIcon: 'bootstrap',
  },

  // Backend
  {
    name: 'Laravel',
    category: 'Backend',
    description: 'Framework PHP MVC elegan dengan Eloquent ORM, routing terstruktur, dan arsitektur kokoh.',
    iconBg: '#FFF1F2',
    badgeColor: '#FF2D20',
    svgIcon: 'laravel',
  },

  // Database
  {
    name: 'MySQL',
    category: 'Database',
    description: 'Relational Database Management System (RDBMS) handal untuk perancangan skema data efisien.',
    iconBg: '#F0F9FF',
    badgeColor: '#00758F',
    svgIcon: 'mysql',
  },

  // Tools
  {
    name: 'Git',
    category: 'Tools',
    description: 'Distributed Version Control System untuk manajemen branch, commit history, dan kolaborasi.',
    iconBg: '#FFF7ED',
    badgeColor: '#F05032',
    svgIcon: 'git',
  },
  {
    name: 'GitHub',
    category: 'Tools',
    description: 'Platform kolaborasi kode, repository hosting publik/privat, dan version management.',
    iconBg: '#F8FAFC',
    badgeColor: '#181717',
    svgIcon: 'github',
  },
  {
    name: 'Antigravity',
    category: 'Tools',
    description: 'Environment AI-assisted agentic software development modern untuk efisiensi produktivitas kode.',
    iconBg: '#EEF2FF',
    badgeColor: '#4F46E5',
    svgIcon: 'antigravity',
  },
  {
    name: 'Visual Studio Code',
    category: 'Tools',
    description: 'Editor kode andalan dengan ekosistem ekstensi terintegrasi untuk debugging dan development.',
    iconBg: '#F0F9FF',
    badgeColor: '#007ACC',
    svgIcon: 'vscode',
  },
];
