import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { sfx } from '../utils/sound';

export const LeftSocialRail: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/frzarlstn',
      icon: Instagram,
      label: '@frzarlstn',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/fariza-arlistiana',
      icon: Linkedin,
      label: 'Fariza Arlistiana',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Farizaa1328',
      icon: Github,
      label: 'Farizaa1328',
    },
    {
      name: 'Email',
      url: 'mailto:farizaarlis28@gmail.com',
      icon: Mail,
      label: 'farizaarlis28@gmail.com',
    },
  ];

  return (
    <aside
      aria-label="Social Profiles"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6"
    >
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-slate-300 dark:to-slate-700/80 transition-colors duration-500" />
      <div className="flex flex-col items-center gap-5">
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              title={`${item.name} - ${item.label}`}
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              className="text-slate-500 dark:text-slate-400 hover:text-crimson-600 dark:hover:text-crimson-400 hover:scale-125 transition-all duration-300 cursor-pointer p-1"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          );
        })}
      </div>
      <div className="w-[1px] h-16 bg-gradient-to-b from-slate-300 dark:from-slate-700/80 to-transparent transition-colors duration-500" />
    </aside>
  );
};
