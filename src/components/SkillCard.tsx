import React from 'react';
import { Skill } from '../data/skills';
import { Tilt3D } from './Tilt3D';
import { sfx } from '../utils/sound';

interface SkillCardProps {
  skill: Skill;
}

// Crisp official tech icons
const TechnologyIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-8 h-8' }) => {
  switch (name) {
    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3L5.6 19.3L12 21.1L18.4 19.3L20 3H4Z" fill="#E44D26" />
          <path d="M12 4.6V19.4L17 18L18.3 4.6H12Z" fill="#F16529" />
          <path d="M12 8.3H8.5L8.7 10.7H12V13.1H8.9L9.2 16L12 16.8V19.2L7.3 17.9L6.7 10.7L6.5 6H12V8.3Z" fill="white" />
          <path d="M12 8.3H15.5L15.2 10.7H12V13.1H15.1L14.7 16L12 16.8V19.2L16.7 17.9L17.3 10.7L17.5 6H12V8.3Z" fill="#EBEBEB" />
        </svg>
      );
    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3L5.6 19.3L12 21.1L18.4 19.3L20 3H4Z" fill="#1572B6" />
          <path d="M12 4.6V19.4L17 18L18.3 4.6H12Z" fill="#33A9DC" />
          <path d="M12 8.3H8.5L8.7 10.7H12V13.1H8.9L9.2 16L12 16.8V19.2L7.3 17.9L6.7 10.7L6.5 6H12V8.3Z" fill="white" />
          <path d="M12 8.3H15.5L15.2 10.7H12V13.1H15.1L14.7 16L12 16.8V19.2L16.7 17.9L17.3 10.7L17.5 6H12V8.3Z" fill="#EBEBEB" />
        </svg>
      );
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M6 18.5V14H8V18.5C8 19.8 7.2 20.5 5.8 20.5C4.5 20.5 3.8 19.8 3.8 18.7H5.6C5.6 19.1 5.8 19.4 6.3 19.4C6.7 19.4 7 19.2 7 18.5ZM13.8 20.5C12.1 20.5 11 19.5 11 17.8H12.9C12.9 18.8 13.5 19.3 14.3 19.3C15.1 19.3 15.6 18.9 15.6 18.3C15.6 17.6 15.2 17.3 14.2 16.8L13.5 16.5C12 15.8 11.2 15 11.2 13.5C11.2 11.9 12.5 10.8 14.3 10.8C15.9 10.8 17.1 11.7 17.2 13.4H15.3C15.2 12.6 14.7 12.2 14.1 12.2C13.5 12.2 13.1 12.5 13.1 13.1C13.1 13.7 13.4 14 14.3 14.4L15 14.7C16.7 15.4 17.6 16.2 17.6 17.7C17.6 19.4 16.1 20.5 13.8 20.5Z" fill="#000000" />
        </svg>
      );
    case 'typescript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M4 9H11V11H8.6V19H6.4V11H4V9ZM13.2 19V17H15.1C15.6 17 16 16.7 16 16.2C16 15.7 15.6 15.4 14.8 15.1L14.1 14.8C12.5 14.2 11.8 13.5 11.8 12.2C11.8 10.7 13 9.7 14.7 9.7C16.4 9.7 17.5 10.7 17.6 12.2H15.5C15.4 11.6 15 11.2 14.4 11.2C13.8 11.2 13.5 11.5 13.5 12C13.5 12.5 13.8 12.8 14.6 13.1L15.3 13.4C17 14 17.8 14.8 17.8 16.2C17.8 17.8 16.5 19 14.8 19H13.2Z" fill="white" />
        </svg>
      );
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#06B6D4">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case 'php':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#777BB4">
          <path d="M12 4C5.5 4 0 7.5 0 12s5.5 8 12 8 12-3.5 12-8-5.5-8-12-8zm-5.7 11.2H5.1l1.4-6.4h2.2c1.4 0 2.2.6 1.9 2-.3 1.5-1.5 2.1-2.7 2.1H7l-.7 2.3zm5.4 0h-1.2l1.4-6.4h1.2l-.4 2.1h1.7c1.4 0 2.2.6 1.9 2-.3 1.5-1.5 2.1-2.7 2.1h-1.5l-.4 2.2zm6.6-4.3c-.3 1.5-1.5 2.1-2.7 2.1h-.9l-.7 2.2h-1.2l1.4-6.4h2.2c1.4 0 2.2.6 1.9 2.1z" />
        </svg>
      );
    case 'laravel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#FF2D20">
          <path d="M21.2 5.5l-8.5-4.9c-.4-.2-.9-.2-1.3 0L2.8 5.5c-.5.3-.8.8-.8 1.4v9.8c0 .6.3 1.1.8 1.4l8.5 4.9c.2.1.4.2.7.2.2 0 .5-.1.7-.2l8.5-4.9c.5-.3.8-.8.8-1.4V6.9c0-.6-.3-1.1-.8-1.4zM12 2.6l7.3 4.2-3.1 1.8L8.9 4.4l3.1-1.8zm-1 .6v7.4L4.8 7l6.2-3.8zm1 18.2l-7.3-4.2 3.1-1.8 7.3 4.2-3.1 1.8zm1-.6V13.4l6.2 3.6-6.2 3.8zm0-9.2L6.8 8l3.1-1.8 6.2 3.6-3.1 1.8zm1.2-.7l3.1-1.8 3.1 1.8-3.1 1.8-3.1-1.8z" />
        </svg>
      );
    case 'java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#ED8B00">
          <path d="M9.1 18.5c-.8.1-1.5-.1-1.5-.1s.4-.3.9-.4c1.8-.4 3.7-.3 5.4.3.4.1.7.3.7.3s-.5-.2-1.1-.3c-1.4-.2-2.9-.1-4.4.2zm-.4 2.2c-1 .1-1.8-.1-1.8-.1s.5-.3 1.1-.4c2.2-.4 4.5-.4 6.7.3.3.1.5.2.5.2s-.4-.2-.8-.2c-1.8-.2-3.8-.2-5.7.2zm9.1-8.3c.4 1.3-.2 2.4-1.3 3-.9.5-2 .6-3 .6.5-.4 1-.9 1.4-1.5.6-.9.8-1.8.4-2.8-.3-.8-.9-1.4-1.6-1.8 1.8.3 3.6 1.1 4.1 2.5zm-5.7-4.1c.3.5.3 1.1.1 1.6-.3.8-.9 1.3-1.6 1.7-.8.5-1.7.8-2.6.9.4-.5.8-1 1.1-1.5.5-.8.7-1.7.4-2.6-.2-.6-.7-1.1-1.3-1.4 1.5.1 3.1.5 3.9 1.3z" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#4479A1">
          <path d="M12 2C6.5 2 2 4.7 2 8c0 2.2 2 4.1 5 5.1V16l3-1.8c.6.1 1.3.1 2 .1 5.5 0 10-2.7 10-6s-4.5-6-10-6zm0 10.5c-4.7 0-8.5-2.2-8.5-5S7.3 2.5 12 2.5s8.5 2.2 8.5 5-3.8 5-8.5 5z" />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F05032">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4 12 6.6c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.5 2.5c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.6-1.3-.4-1.8L13 10V15.1c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V9.8c-.2-.1-.4-.3-.6-.5-.5-.5-.6-1.3-.4-1.8L8 4.9 2.4 10.5c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6.1-2.2z" />
        </svg>
      );
    case 'cisco':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#E11D48">
          <rect x="2" y="10" width="1.5" height="4" rx="0.75" />
          <rect x="5.5" y="7" width="1.5" height="10" rx="0.75" />
          <rect x="9" y="10" width="1.5" height="4" rx="0.75" />
          <rect x="12.5" y="5" width="1.5" height="14" rx="0.75" />
          <rect x="16" y="10" width="1.5" height="4" rx="0.75" />
          <rect x="19.5" y="7" width="1.5" height="10" rx="0.75" />
        </svg>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-lg bg-crimson-500/20 text-crimson-400 flex items-center justify-center font-mono font-bold text-xs border border-crimson-500/30">
          &lt;/&gt;
        </div>
      );
  }
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div onMouseEnter={() => sfx.playHover()}>
      <Tilt3D
        maxTilt={7}
        scale={1.02}
        glare={true}
        spotlight={true}
        spotlightColor="rgba(239, 68, 68, 0.2)"
        className="group rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-onyx-900/90 p-6 shadow-md dark:shadow-3d-card hover:border-crimson-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full backdrop-blur-xl relative"
      >
        {/* Microchip Circuit Contact Pins at Top */}
        <div className="absolute top-0 left-8 right-8 flex justify-between pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="w-1.5 h-1 bg-amber-400 rounded-b-sm shadow-xs" />
          ))}
        </div>

        {/* Laser Brand Color Bar at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:h-1.5 shadow-sm"
          style={{ backgroundColor: skill.badgeColor }}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            {/* Logo with 3D Z-Popout */}
            <div
              className="w-14 h-14 p-2.5 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 border border-slate-200 dark:border-slate-800"
              style={{
                transform: 'translateZ(30px)',
                backgroundColor: skill.iconBg || '#0A0D14',
              }}
            >
              <TechnologyIcon name={skill.svgIcon} />
            </div>

            <span
              className="text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-crimson-500/20"
              style={{
                transform: 'translateZ(20px)',
                backgroundColor: `${skill.badgeColor}20`,
                color: skill.badgeColor,
              }}
            >
              {skill.category}
            </span>
          </div>

          <h3
            style={{ transform: 'translateZ(25px)' }}
            className="text-base font-black text-slate-900 dark:text-white group-hover:text-crimson-500 transition-colors mb-2"
          >
            {skill.name}
          </h3>
          <p
            style={{ transform: 'translateZ(15px)' }}
            className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
          >
            {skill.description}
          </p>
        </div>

        <div
          style={{ transform: 'translateZ(20px)' }}
          className="mt-5 pt-3.5 border-t border-slate-100 dark:border-onyx-800 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full transition-transform group-hover:scale-125 shadow-xs"
              style={{ backgroundColor: skill.badgeColor }}
            />
            <span>CORE STACK</span>
          </span>
          <span className="text-[10px] text-crimson-500 font-bold uppercase tracking-widest">
            ACTIVE
          </span>
        </div>
      </Tilt3D>
    </div>
  );
};
