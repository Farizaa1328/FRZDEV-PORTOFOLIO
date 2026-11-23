import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Clock, ShieldCheck, Terminal, Cpu, Search, Smartphone, WifiOff } from 'lucide-react';
import { sfx } from '../utils/sound';
import { usePwa } from '../context/PwaContext';
import { useLanguage } from '../context/LanguageContext';

export const TelemetryBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [soundOn, setSoundOn] = useState<boolean>(sfx.enabled);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const { isInstalled, isOffline, promptInstall } = usePwa();
  const { lang } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as WIB (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString('id-ID', options) + ' WIB');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleSfxChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.enabled === 'boolean') {
        setSoundOn(customEvent.detail.enabled);
      } else {
        setSoundOn(sfx.enabled);
      }
    };
    window.addEventListener('frz-sfx-toggle', handleSfxChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('frz-sfx-toggle', handleSfxChange);
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = sfx.toggleSound();
    setSoundOn(nextState);
  };

  const scrollToContact = () => {
    sfx.playClick();
    const el = document.getElementById('kontak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => {
          sfx.playClick();
          setIsMinimized(false);
        }}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-full bg-slate-900/90 text-white border border-crimson-500/50 shadow-glow-crimson font-mono text-[10px] flex items-center gap-1.5 backdrop-blur-md cursor-pointer hover:scale-105 transition-all"
        title="Buka Telemetry Dock"
      >
        <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping" />
        <span>FRZ.DEV // HUD [OPEN]</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="System Telemetry Bar"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] sm:w-auto px-4 py-2 rounded-2xl bg-white/90 dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-700/80 shadow-2xl backdrop-blur-xl transition-all duration-300 flex items-center justify-between gap-3 sm:gap-6 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
    >
      {/* 1. Status Indicator with Blinking Radar (Opens Terminal CLI) */}
      <button
        onClick={() => {
          sfx.playClick();
          window.dispatchEvent(new CustomEvent('open-terminal'));
        }}
        onMouseEnter={() => sfx.playHover()}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
        title="Buka Developer Terminal CLI"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500" />
        </span>
        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider hidden xs:inline">
          SYS.V4 //
        </span>
        <span className="text-crimson-600 dark:text-crimson-400 font-bold group-hover:underline">
          CLI [OPEN]
        </span>
      </button>

      {/* 2. Live WIB Clock */}
      <div className="hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <Clock size={12} className="text-crimson-500" />
        <span>{timeStr || '10:00:00 WIB'}</span>
        <span className="text-slate-300 dark:text-slate-600">&bull;</span>
        <span className="text-slate-600 dark:text-slate-300">JAKARTA SELATAN</span>
      </div>

      {/* 3. Academic & Work Focus */}
      <div className="hidden md:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
        <Cpu size={12} className="text-rose-500" />
        <span>UNPAM TI &bull; SIPAK RT-012</span>
      </div>

      {/* 4. Controls: PWA Install + SFX Audio Toggle + Quick Search + Minimize */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Offline Status Badge */}
        {isOffline && (
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 animate-pulse">
            <WifiOff size={11} />
            <span className="hidden sm:inline">OFFLINE</span>
          </span>
        )}

        {/* Install PWA Button */}
        {!isInstalled && (
          <button
            onClick={() => promptInstall()}
            onMouseEnter={() => sfx.playHover()}
            className="px-2 py-1 rounded-lg border border-crimson-500/40 bg-crimson-500/10 hover:bg-crimson-500/20 text-[10px] font-bold flex items-center gap-1 text-crimson-600 dark:text-crimson-400 transition-all cursor-pointer shadow-xs"
            title={lang === 'id' ? 'Pasang Aplikasi FRZ.DEV (PWA)' : 'Install FRZ.DEV App (PWA)'}
          >
            <Smartphone size={11} className="text-crimson-500 animate-pulse" />
            <span className="hidden sm:inline">Install App</span>
          </button>
        )}

        <button
          onClick={() => {
            sfx.playClick();
            window.dispatchEvent(new CustomEvent('open-command-palette'));
          }}
          onMouseEnter={() => sfx.playHover()}
          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-onyx-700 bg-slate-100 dark:bg-onyx-800 hover:border-crimson-500/50 hover:bg-crimson-500/10 text-[10px] font-bold flex items-center gap-1 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          title="Buka Command Palette (Ctrl+K)"
        >
          <Search size={11} className="text-crimson-500" />
          <span className="hidden sm:inline">Ctrl+K</span>
        </button>

        <button
          onClick={handleToggleSound}
          onMouseEnter={() => sfx.playHover()}
          className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            soundOn
              ? 'bg-crimson-500/15 border-crimson-500/40 text-crimson-600 dark:text-crimson-400 shadow-xs'
              : 'bg-slate-100 dark:bg-onyx-800 border-slate-200 dark:border-onyx-700 text-slate-400'
          }`}
          title={soundOn ? 'Nonaktifkan Efek Suara Haptic' : 'Aktifkan Efek Suara Haptic'}
        >
          {soundOn ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
          <span className="hidden xs:inline">{soundOn ? 'SFX: ON' : 'SFX: OFF'}</span>
        </button>

        <button
          onClick={scrollToContact}
          onMouseEnter={() => sfx.playHover()}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-crimson-600 to-rose-600 hover:from-crimson-500 hover:to-rose-500 text-white font-bold text-[10px] tracking-wider uppercase shadow-glow-crimson transition-all cursor-pointer hidden sm:inline-flex items-center gap-1"
        >
          <span>HUBUNGI</span>
          <span>&rarr;</span>
        </button>

        <button
          onClick={() => {
            sfx.playClick();
            setIsMinimized(true);
          }}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-onyx-800 transition-colors cursor-pointer"
          title="Minimalkan Telemetry"
        >
          &times;
        </button>
      </div>
    </aside>
  );
};
