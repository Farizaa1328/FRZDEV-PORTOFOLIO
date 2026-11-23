import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  Fingerprint,
  QrCode,
  Radio,
  Sparkles,
  Zap,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Unlock,
} from 'lucide-react';
import { Tilt3D } from './Tilt3D';
import { sfx } from '../utils/sound';

export const HolographicKeycard: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'id' | 'telemetry' | 'biometrics'>('id');
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleModeChange = (mode: 'id' | 'telemetry' | 'biometrics') => {
    sfx.playClick();
    setActiveMode(mode);
  };

  const handleBiometricScan = () => {
    sfx.playSwitch();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsBiometricVerified(true);
      sfx.playSuccess();
      setTimeout(() => {
        setIsBiometricVerified(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Mode Selector Tabs at the Top of the Card */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/90 dark:bg-onyx-900/90 rounded-2xl border border-crimson-500/30 mb-3 shadow-glow-crimson backdrop-blur-xl">
        <button
          onClick={() => handleModeChange('id')}
          onMouseEnter={() => sfx.playHover()}
          className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
            activeMode === 'id'
              ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          [PHOTO ID]
        </button>
        <button
          onClick={() => handleModeChange('telemetry')}
          onMouseEnter={() => sfx.playHover()}
          className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
            activeMode === 'telemetry'
              ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          [TELEMETRY]
        </button>
        <button
          onClick={() => handleModeChange('biometrics')}
          onMouseEnter={() => sfx.playHover()}
          className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
            activeMode === 'biometrics'
              ? 'bg-gradient-to-r from-crimson-600 to-rose-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          [BIOMETRIC]
        </button>
      </div>

      {/* 3D Holographic Keycard Housing */}
      <Tilt3D
        maxTilt={7}
        scale={1.02}
        glare={true}
        spotlight={true}
        spotlightColor="rgba(239, 68, 68, 0.35)"
        className="w-64 sm:w-76 lg:w-80 h-84 sm:h-96 lg:h-[430px] rounded-3xl p-3 bg-gradient-to-b from-crimson-600/40 via-slate-800 to-onyx-950 border-2 border-crimson-500/70 shadow-3d-float relative overflow-visible group transition-colors duration-500"
      >
        {/* Cyber Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-crimson-400 pointer-events-none z-20" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-crimson-400 pointer-events-none z-20" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-crimson-400 pointer-events-none z-20" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-crimson-400 pointer-events-none z-20" />

        {/* Top Keycard Header Badge */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-[9px] font-mono text-slate-300 bg-onyx-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-1.5 text-crimson-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-ping" />
            <span>FRZ-ID // SEC_LVL_3</span>
          </div>
          <div className="text-slate-400 font-mono">UNPAM TI</div>
        </div>

        {/* Internal Screen Content */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl bg-onyx-950"
        >
          <AnimatePresence mode="wait">
            {/* VIEW 1: AUTHENTIC PHOTO ID */}
            {activeMode === 'id' && (
              <motion.div
                key="id"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <img
                  src="/images/profile.png"
                  alt="Foto Profil Fariza Arlistiana"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Animated Horizontal Laser Scanline */}
                <motion.div
                  animate={{ y: ['-100%', '420%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crimson-400 to-transparent opacity-80 pointer-events-none shadow-[0_0_15px_#EF4444]"
                />

                {/* Holographic light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-crimson-500/10 pointer-events-none" />

                {/* HUD Coordinates & Live Status Badge */}
                <div
                  style={{ transform: 'translateZ(45px)' }}
                  className="absolute bottom-4 left-4 right-4 px-3 py-2 rounded-xl bg-onyx-950/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between text-[11px] font-mono text-slate-300 shadow-xl pointer-events-none"
                >
                  <span className="flex items-center gap-1.5 text-crimson-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-crimson-400 animate-pulse" />
                    FULL-STACK DEV
                  </span>
                  <span className="text-slate-400 font-semibold font-mono">SEMESTER 7</span>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: LIVE TELEMETRY MATRIX */}
            {activeMode === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-6 pt-12 flex flex-col justify-between text-white font-mono text-xs bg-gradient-to-b from-onyx-900 via-onyx-950 to-black overflow-y-auto"
              >
                <div>
                  <div className="flex items-center gap-2 text-crimson-400 mb-3 text-[11px] font-bold">
                    <Activity size={14} className="animate-pulse" />
                    <span>ENGINEERING TELEMETRY MATRIX</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-onyx-850/80 border border-onyx-700">
                      <div className="text-[10px] text-slate-400">INSTITUSI &amp; PROGRAM STUDI</div>
                      <div className="text-white font-bold text-xs mt-0.5">S1 Teknik Informatika</div>
                      <div className="text-crimson-400 text-[10px]">Universitas Pamulang (UNPAM)</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-onyx-850/80 border border-onyx-700">
                      <div className="text-[10px] text-slate-400">TUGAS AKHIR BERJALAN</div>
                      <div className="text-white font-bold text-xs mt-0.5">SIPAK RT-012</div>
                      <div className="text-slate-300 text-[10px]">Laravel 10 &bull; PHP &bull; MySQL</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-onyx-850/80 border border-onyx-700">
                      <div className="text-[10px] text-slate-400">SERTIFIKASI INTERNASIONAL</div>
                      <div className="text-emerald-400 font-bold text-xs mt-0.5">Cisco CCNA Certified</div>
                      <div className="text-slate-400 text-[10px]">Switching, Routing &amp; Wireless</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-onyx-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>STATUS: READY FOR HIRE</span>
                  <span className="text-emerald-400 font-bold">ONLINE WIB</span>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: BIOMETRIC SCANNER SIMULATION */}
            {activeMode === 'biometrics' && (
              <motion.div
                key="biometrics"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-6 pt-12 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-onyx-900 to-black relative"
              >
                <div className="text-[11px] font-mono text-crimson-400 font-bold mb-4 flex items-center gap-1.5">
                  <Lock size={13} />
                  <span>BIOMETRIC CREDENTIAL VERIFIER</span>
                </div>

                {/* Fingerprint Touch Target */}
                <button
                  onClick={handleBiometricScan}
                  disabled={isScanning}
                  onMouseEnter={() => sfx.playHover()}
                  className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    isBiometricVerified
                      ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                      : isScanning
                      ? 'border-crimson-400 bg-crimson-500/20 shadow-glow-crimson animate-pulse'
                      : 'border-slate-700 bg-onyx-850 hover:border-crimson-500 hover:shadow-glow-crimson'
                  }`}
                  title="Sentuh untuk Verifikasi Kredensial"
                >
                  <Fingerprint
                    size={56}
                    className={`transition-colors ${
                      isBiometricVerified
                        ? 'text-emerald-400'
                        : isScanning
                        ? 'text-crimson-400'
                        : 'text-slate-400'
                    }`}
                  />

                  {/* Laser Beam during scan */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-1 bg-crimson-400 shadow-[0_0_10px_#EF4444]"
                    />
                  )}
                </button>

                <div className="mt-4 font-mono text-xs">
                  {isScanning ? (
                    <span className="text-crimson-400 animate-pulse">MENGIKUTI PEMINDAIAN BIOMETRIK...</span>
                  ) : isBiometricVerified ? (
                    <div className="space-y-1">
                      <div className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 size={14} />
                        <span>KREDENSIAL TERVERIFIKASI RESMI</span>
                      </div>
                      <div className="text-[10px] text-slate-300">
                        Fariza Arlistiana &bull; UNPAM NIM TI Verified
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-[11px]">
                      Sentuh sensor sidik jari untuk verifikasi otentikasi identitas
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tilt3D>
    </div>
  );
};
