import React from 'react';
import { Github, Instagram, Mail, MessageCircle, Linkedin } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  variant?: 'hero' | 'footer' | 'contact' | 'compact';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Farizaa1328',
      icon: Github,
      color: 'hover:text-crimson-500 hover:border-crimson-500/50 hover:shadow-glow-crimson',
      label: 'github.com/Farizaa1328',
      iconColor: 'text-slate-700 dark:text-slate-300',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/frzarlstn',
      icon: Instagram,
      color: 'hover:text-rose-500 hover:border-rose-500/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]',
      label: '@frzarlstn',
      iconColor: 'text-rose-500',
    },
    {
      name: 'Email',
      url: 'mailto:farizaarlis28@gmail.com',
      icon: Mail,
      color: 'hover:text-crimson-500 hover:border-crimson-500/50 hover:shadow-glow-crimson',
      label: 'farizaarlis28@gmail.com',
      iconColor: 'text-crimson-500',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/6282121965278?text=Halo%20Fariza,%20saya%20tertarik%20untuk%20berkolaborasi%20proyek',
      icon: MessageCircle,
      color: 'hover:text-emerald-500 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      label: '+62 821-2196-5278',
      iconColor: 'text-emerald-500',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/fariza-arlistiana',
      icon: Linkedin,
      color: 'hover:text-crimson-500 hover:border-crimson-500/50 hover:shadow-glow-crimson',
      label: 'Fariza Arlistiana',
      iconColor: 'text-crimson-500',
    },
  ];

  if (variant === 'contact') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/80 backdrop-blur-md transition-all duration-300 shadow-md ${item.color} group`}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-onyx-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon size={20} className={item.iconColor} />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {item.name}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-crimson-500 dark:group-hover:text-white transition-colors">
                  {item.label}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {socials.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} - Fariza Arlistiana`}
            className={`w-11 h-11 rounded-xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/80 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all duration-200 hover:-translate-y-1 shadow-md ${item.color}`}
            aria-label={item.name}
          >
            <Icon size={19} />
          </a>
        );
      })}
    </div>
  );
};
