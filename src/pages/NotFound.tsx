import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home as HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-main mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm sm:text-base text-neutral-secondary max-w-md mb-8">
        Halaman atau proyek yang Anda cari tidak tersedia atau tautan telah berpindah.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-sm shadow-soft transition-all duration-200"
      >
        <HomeIcon size={16} />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
};
