import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, MessageCircle, MapPin, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SocialLinks } from '../components/SocialLinks';
import { Tilt3D } from '../components/Tilt3D';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp'>('email');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Format email tidak valid.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subjek pesan wajib diisi.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Pesan minimal 10 karakter agar maksud tersampaikan jelas.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (submissionMethod === 'email') {
      const mailtoUrl = `mailto:farizaarlis28@gmail.com?subject=${encodeURIComponent(
        `[FRZ.DEV Portfolio] ${formData.subject} - dari ${formData.name}`
      )}&body=${encodeURIComponent(
        `Halo Fariza,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nSubjek: ${formData.subject}\n\nPesan:\n${formData.message}\n\n---\nDikirim melalui kontak form FRZ.DEV`
      )}`;

      window.location.href = mailtoUrl;
    } else {
      const waText = `Halo Fariza, saya ${formData.name} (${formData.email}).\n*Subjek:* ${formData.subject}\n\n*Pesan:*\n${formData.message}`;
      const waUrl = `https://wa.me/6282121965278?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#EF4444', '#DC2626', '#F43F5E', '#FFFFFF'],
      });
    } catch (e) {
      // ignore
    }

    setIsSubmitted(true);
  };

  return (
    <section id="kontak" className="py-28 bg-slate-50 dark:bg-onyx-950 relative overflow-hidden border-t border-slate-200 dark:border-onyx-800 transition-colors duration-300">
      {/* Background Tech elements */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-96 h-96 bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson-500/10 border border-crimson-500/30 text-crimson-600 dark:text-crimson-400 font-mono text-xs uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span>{t.contact.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {t.contact.heading1} <span className="text-gradient-crimson">{t.contact.heading2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mt-3 leading-relaxed font-normal"
          >
            {t.contact.subheading}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-crimson-400 mt-4 rounded-full origin-left shadow-glow-crimson"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <Tilt3D
              perspective={1000}
              maxTilt={6}
              spotlight={true}
              spotlightColor="rgba(239, 68, 68, 0.2)"
              className="bg-white dark:bg-onyx-900/90 p-8 rounded-3xl border border-slate-200 dark:border-onyx-800 shadow-xl dark:shadow-3d-card backdrop-blur-xl"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Terminal size={18} className="text-crimson-500" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {t.contact.officialChannels}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-normal">
                Hubungi saya melalui email resmi, akun GitHub, atau WhatsApp langsung:
              </p>

              <SocialLinks variant="contact" />
            </Tilt3D>

            <Tilt3D
              perspective={1000}
              maxTilt={6}
              spotlight={true}
              spotlightColor="rgba(239, 68, 68, 0.2)"
              className="p-6 rounded-3xl bg-white dark:bg-onyx-900/90 border border-slate-200 dark:border-onyx-800 shadow-xl dark:shadow-3d-card flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crimson-600 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-glow-crimson">
                <MapPin size={22} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  LOKASI DOMISILI
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Jakarta Selatan, DKI Jakarta &bull; Indonesia
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Universitas Pamulang (UNPAM)
                </div>
              </div>
            </Tilt3D>
          </div>

          {/* Right Column: 3D Contact Form */}
          <div className="lg:col-span-7">
            <Tilt3D
              perspective={1000}
              maxTilt={4}
              spotlight={true}
              spotlightColor="rgba(239, 68, 68, 0.18)"
              className="bg-white dark:bg-onyx-900/90 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-onyx-800 shadow-xl dark:shadow-3d-card backdrop-blur-xl"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 font-normal">
                Pilih saluran pengiriman favorit Anda dan isi formulir berikut:
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-3xl bg-crimson-500/10 border border-crimson-500/30 text-center">
                  <div className="w-14 h-14 rounded-full bg-crimson-600 text-white flex items-center justify-center mx-auto mb-4 shadow-glow-crimson">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                    Pesan Siap Terkirim!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
                    Aplikasi surel atau percakapan WhatsApp Anda telah terbuka dengan draf pesan lengkap.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn-3d px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-onyx-850 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Kirim Pesan Lain</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Method Selector Tabs */}
                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-onyx-950 border border-slate-200 dark:border-onyx-800 mb-6">
                    <button
                      type="button"
                      onClick={() => setSubmissionMethod('email')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        submissionMethod === 'email'
                          ? 'bg-crimson-600 text-white shadow-glow-crimson'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Email Client Direct
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionMethod('whatsapp')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        submissionMethod === 'whatsapp'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      WhatsApp (+62 821-2196-5278)
                    </button>
                  </div>

                  {submissionMethod === 'whatsapp' && (
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>Pesan otomatis membuka obrolan langsung ke WhatsApp Fariza (+62 821-2196-5278).</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-bold">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Fariza Arlistiana"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-onyx-950 text-slate-900 dark:text-white placeholder-slate-400 focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 focus:outline-none text-sm transition-all"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-bold">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="nama@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-onyx-950 text-slate-900 dark:text-white placeholder-slate-400 focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 focus:outline-none text-sm transition-all"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subjek */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-bold">
                      Subjek Pesan *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: '' });
                      }}
                      placeholder="Diskusi Proyek Web Development / Kolaborasi"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-onyx-950 text-slate-900 dark:text-white placeholder-slate-400 focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 focus:outline-none text-sm transition-all"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.subject}</p>
                    )}
                  </div>

                  {/* Pesan */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-bold">
                      Isi Pesan *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tuliskan ide proyek, kebutuhan fitur, atau pesan Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-onyx-950 text-slate-900 dark:text-white placeholder-slate-400 focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 focus:outline-none text-sm transition-all resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-3d w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-600 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-glow-crimson cursor-pointer mt-2"
                  >
                    <Send size={15} />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  );
};
