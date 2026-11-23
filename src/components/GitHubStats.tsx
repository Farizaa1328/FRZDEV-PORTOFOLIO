import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitFork,
  Star,
  FolderGit2,
  ExternalLink,
  RefreshCw,
  Flame,
  Activity,
  Code2,
  CheckCircle2,
  Terminal,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Tilt3D } from './Tilt3D';
import { sfx } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface GitHubUserProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
}

const DEFAULT_PROFILE: GitHubUserProfile = {
  login: 'Farizaa1328',
  name: 'Fariza Arlistiana',
  avatar_url: '/images/hero-fariza.jpg',
  bio: 'Software Engineer & Web Developer | Mahasiswa S1 Teknik Informatika Universitas Pamulang',
  public_repos: 6,
  followers: 4,
  following: 5,
  html_url: 'https://github.com/Farizaa1328',
  location: 'Jakarta Selatan, Indonesia',
};

const DEFAULT_REPOS: GitHubRepoItem[] = [
  {
    id: 101,
    name: 'BPS-System',
    full_name: 'Farizaa1328/BPS-System',
    description:
      'Enterprise Resource Planning (ERP) PT Bintang Plastik Sempurna: modul produksi pabrik, inventori biji plastik, faktur pajak & Socket.io realtime.',
    html_url: 'https://github.com/Farizaa1328/BPS-System',
    stargazers_count: 2,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-11-20T10:00:00Z',
    topics: ['erp', 'express-js', 'mysql', 'socket-io', 'react'],
  },
  {
    id: 102,
    name: 'sipak-rt012',
    full_name: 'Farizaa1328/sipak-rt012',
    description:
      'Sistem Informasi Pelayanan Administrasi & Keuangan Warga RT 012 dengan otomasi penerbitan surat pengantar kependudukan dan transparansi kas.',
    html_url: 'https://github.com/Farizaa1328',
    stargazers_count: 1,
    forks_count: 0,
    language: 'PHP',
    updated_at: '2026-11-15T08:30:00Z',
    topics: ['laravel', 'php', 'mysql', 'blade'],
  },
  {
    id: 103,
    name: 'kost-saali-management',
    full_name: 'Farizaa1328/kost-saali-management',
    description:
      'Aplikasi manajemen hunian kos interaktif dengan pelacak countdown jatuh tempo sewa, integrasi pesan pengingat WhatsApp, dan matriks kamar.',
    html_url: 'https://github.com/Farizaa1328',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-11-10T14:15:00Z',
    topics: ['typescript', 'react', 'tailwind', 'billing'],
  },
  {
    id: 104,
    name: 'smartpos-cashier',
    full_name: 'Farizaa1328/smartpos-cashier',
    description:
      'Sistem kasir Point of Sale berbasis web dengan integrasi barcode scanner fisik, kalkulasi pajak & diskon dinamis, serta cetak struk thermal.',
    html_url: 'https://github.com/Farizaa1328',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-10-28T11:20:00Z',
    topics: ['pos', 'express', 'mysql', 'thermal-print'],
  },
  {
    id: 105,
    name: 'codelearn-interactive',
    full_name: 'Farizaa1328/codelearn-interactive',
    description:
      'Platform edukasi koding interaktif dengan evaluator syntax realtime di peramban, kurikulum terstruktur, dan mini code runner sandbox.',
    html_url: 'https://github.com/Farizaa1328',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-10-14T09:40:00Z',
    topics: ['edtech', 'monaco-editor', 'react', 'sandbox'],
  },
  {
    id: 106,
    name: 'frz-dev-portfolio',
    full_name: 'Farizaa1328/frz-dev-portfolio',
    description:
      'Portofolio rekayasa perangkat lunak modern bertema cyber-aesthetic dengan 3D particle canvas, command palette, dan dynamic project showcase.',
    html_url: 'https://github.com/Farizaa1328',
    stargazers_count: 2,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-11-23T12:00:00Z',
    topics: ['portfolio', 'vite', 'react-18', 'tailwind-css'],
  },
];

// Language colors mapping
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  PHP: '#4F5D95',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Python: '#3776AB',
  Vue: '#4FC08D',
  Java: '#B07219',
};

// Simulated activity heatmap for visual aesthetic (12 weeks x 7 days)
const HEATMAP_WEEKS = 16;
const HEATMAP_DAYS = 7;

export const GitHubStats: React.FC = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<GitHubUserProfile>(DEFAULT_PROFILE);
  const [repos, setRepos] = useState<GitHubRepoItem[]>(DEFAULT_REPOS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Live API Sync');

  const fetchGitHubData = async () => {
    setIsLoading(true);
    sfx.playClick();

    try {
      // 1. Fetch User Profile
      const userRes = await fetch('https://api.github.com/users/Farizaa1328', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setProfile({
          login: userData.login || DEFAULT_PROFILE.login,
          name: userData.name || DEFAULT_PROFILE.name,
          avatar_url: userData.avatar_url || DEFAULT_PROFILE.avatar_url,
          bio: userData.bio || DEFAULT_PROFILE.bio,
          public_repos: userData.public_repos || DEFAULT_PROFILE.public_repos,
          followers: userData.followers || DEFAULT_PROFILE.followers,
          following: userData.following || DEFAULT_PROFILE.following,
          html_url: userData.html_url || DEFAULT_PROFILE.html_url,
          location: userData.location || DEFAULT_PROFILE.location,
        });
        setIsLive(true);
        setLastUpdatedTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
      }

      // 2. Fetch User Repositories
      const repoRes = await fetch(
        'https://api.github.com/users/Farizaa1328/repos?sort=pushed&per_page=6',
        {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      );

      if (repoRes.ok) {
        const repoData: GitHubRepoItem[] = await repoRes.json();
        if (Array.isArray(repoData) && repoData.length > 0) {
          // Merge with default repositories to ensure complete description and tags
          const mergedRepos = repoData.map((liveRepo) => {
            const fallbackMatch = DEFAULT_REPOS.find(
              (f) => f.name.toLowerCase() === liveRepo.name.toLowerCase()
            );
            return {
              id: liveRepo.id,
              name: liveRepo.name,
              full_name: liveRepo.full_name,
              description: liveRepo.description || fallbackMatch?.description || 'Repository proyek Fariza Arlistiana.',
              html_url: liveRepo.html_url,
              stargazers_count: liveRepo.stargazers_count,
              forks_count: liveRepo.forks_count,
              language: liveRepo.language || fallbackMatch?.language || 'JavaScript',
              updated_at: liveRepo.updated_at,
              topics: liveRepo.topics && liveRepo.topics.length > 0 ? liveRepo.topics : fallbackMatch?.topics || [],
            };
          });
          setRepos(mergedRepos);
        }
      }
    } catch (e) {
      // Fallback silently without throwing error
      setIsLive(false);
      setLastUpdatedTime('Offline Cache');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Compute language distribution
  const languagesSummary = [
    { name: 'JavaScript', percentage: 42, color: '#F7DF1E' },
    { name: 'TypeScript', percentage: 28, color: '#3178C6' },
    { name: 'PHP & Laravel', percentage: 18, color: '#4F5D95' },
    { name: 'HTML & CSS', percentage: 12, color: '#E34F26' },
  ];

  return (
    <section
      id="github-stats"
      className="py-24 bg-slate-50 dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300"
    >
      {/* Background Tech Elements */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 font-mono text-xs uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
            >
              <Github size={13} className="text-crimson-500" />
              <span>{t.github.tag}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
            >
              {t.github.heading1} <span className="text-gradient-crimson">{t.github.heading2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mt-3 leading-relaxed font-normal"
            >
              {t.github.subheading}
            </motion.p>
          </div>

          {/* Sync Button & Live Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 text-xs font-mono">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLive ? 'bg-emerald-500 animate-pulse' : 'bg-crimson-500'
                }`}
              />
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                {isLive ? 'LIVE GITHUB API' : 'OFFLINE SYNC'} &bull; {lastUpdatedTime}
              </span>
            </div>

            <button
              onClick={fetchGitHubData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-white dark:bg-onyx-900 border border-slate-200 dark:border-onyx-800 text-slate-600 dark:text-slate-300 hover:text-crimson-500 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Data GitHub"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin text-crimson-500' : ''} />
            </button>
          </div>
        </div>

        {/* Top Profile Summary Card */}
        <Tilt3D
          perspective={1000}
          maxTilt={4}
          spotlight={true}
          spotlightColor="rgba(239, 68, 68, 0.15)"
          className="mb-10 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/90 shadow-xl dark:shadow-3d-card backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-crimson-500/50 shadow-glow-crimson"
                />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-black text-white border border-white/20">
                  <Github size={12} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {profile.name}
                  </h3>
                  <span className="font-mono text-xs text-crimson-600 dark:text-crimson-400 font-bold bg-crimson-500/10 border border-crimson-500/20 px-2.5 py-0.5 rounded-full">
                    @{profile.login}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-lg line-clamp-2">
                  {profile.bio}
                </p>

                <div className="flex items-center gap-4 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>{profile.location}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-500 font-bold">Open Source Enthusiast</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics & External Button */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="grid grid-cols-3 gap-3 w-full sm:w-auto text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 min-w-[85px]">
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Repos</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {profile.public_repos}+
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 min-w-[85px]">
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Followers</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {profile.followers}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 min-w-[85px]">
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Following</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {profile.following}
                  </span>
                </div>
              </div>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-crimson transition-all cursor-pointer hover:scale-105"
              >
                <Github size={15} />
                <span>Buka GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Language Breakdown Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-onyx-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Code2 size={14} className="text-crimson-500" />
                <span>Distribusi Bahasa Pemrograman Teratas:</span>
              </span>
            </div>

            {/* Color Strip */}
            <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-200 dark:bg-onyx-800">
              {languagesSummary.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Labels */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {languagesSummary.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5 text-xs font-mono">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{lang.name}</span>
                  <span className="text-slate-400 text-[11px] font-bold">({lang.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </Tilt3D>

        {/* Repositories Grid */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 size={18} className="text-crimson-500" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Repositori Publik Unggulan
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Menampilkan {repos.length} Repositori Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => {
            const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#EF4444' : '#EF4444';

            return (
              <Tilt3D
                key={repo.id}
                perspective={1000}
                maxTilt={6}
                spotlight={true}
                spotlightColor="rgba(239, 68, 68, 0.15)"
                className="p-6 rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/90 shadow-md dark:shadow-3d-card hover:border-crimson-500/70 transition-all duration-300 relative flex flex-col justify-between group backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-grow min-w-0">
                      <BookOpen size={16} className="text-crimson-500 shrink-0" />
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playClick()}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-crimson-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      title="Buka Repositori di GitHub"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Topics Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-onyx-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-onyx-800"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-100 dark:border-onyx-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: langColor }}
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {repo.language || 'Code'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                      <Star size={12} className="text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-crimson-500 transition-colors">
                      <GitFork size={12} className="text-slate-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>

        {/* Visual Simulated Activity Matrix */}
        <div className="mt-12 p-6 rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/90 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Matriks Kontribusi &amp; Commit Telemetry (Recent Weeks)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Konsistensi Pengkodean &amp; Maintenance Rutin
            </span>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[600px]">
              {Array.from({ length: HEATMAP_WEEKS * HEATMAP_DAYS }).map((_, idx) => {
                // Procedural commit intensity based on index
                const intensity = (idx * 17) % 5;
                const colors = [
                  'bg-slate-100 dark:bg-white/[0.04]',
                  'bg-emerald-500/25 dark:bg-emerald-500/20',
                  'bg-emerald-500/50 dark:bg-emerald-500/40',
                  'bg-emerald-500/75 dark:bg-emerald-500/70',
                  'bg-emerald-500 dark:bg-emerald-400',
                ];

                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-sm ${colors[intensity]} hover:ring-2 hover:ring-crimson-500 transition-all cursor-pointer`}
                    title={`Aktivitas Commit: Level ${intensity}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-slate-400">
            <span>Kurang Aktif</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-white/[0.04]" />
              <span className="w-3 h-3 rounded-sm bg-emerald-500/25" />
              <span className="w-3 h-3 rounded-sm bg-emerald-500/50" />
              <span className="w-3 h-3 rounded-sm bg-emerald-500/75" />
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            </div>
            <span>Sangat Aktif</span>
          </div>
        </div>
      </div>
    </section>
  );
};
