"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Autentikasi berhasil! Mengalihkan ke Dasbor...');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#faf8f4] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-[#1a6b3c]/5 flex flex-col lg:flex-row overflow-hidden border border-[#e0e8df] animate-in zoom-in-95 duration-500">
        
        <div className="w-full lg:w-5/12 bg-[#1a6b3c] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden min-h-80 lg:min-h-150">
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-[#22884e] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#13502c] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="bg-white px-4 py-2.5 rounded-2xl shadow-lg shadow-[#1a1a0e]/20 inline-flex items-center justify-center">
              <Image 
                src="/logo-dkm.jpeg" 
                alt="Logo DKM Kassiti" 
                width={160} 
                height={45} 
                className="h-9 w-auto object-contain" 
                priority 
              />
            </div>
          </div>

          <div className="relative z-10 mt-8 lg:mt-0">
            <ShieldCheck size={40} className="text-[#f0c472] mb-4 sm:mb-6" strokeWidth={1.5} />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Gerbang Keamanan Sistem.
            </h1>
            <p className="text-[#e8f5ee] text-xs sm:text-sm leading-relaxed max-w-sm">
              Akses khusus pengurus Dewan Kemakmuran Masjid untuk mengelola validasi dan pencatatan tabungan qurban jamaah.
            </p>
          </div>
        </div>

        {/* Panel Kanan (Formulir Login) */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a0e] tracking-tight mb-2">Masuk ke Dasbor</h2>
            <p className="text-[#8a9488] text-sm sm:text-base">Silakan masukkan kredensial admin Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a0e] mb-2">Nama Pengguna / ID Admin</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9488]">
                  <User size={20} />
                </span>
                <input 
                  type="text" 
                  required 
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none text-sm sm:text-base" 
                  placeholder="Masukkan username" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#1a1a0e]">Kata Sandi</label>
                <button type="button" className="text-xs font-bold text-[#1a6b3c] hover:text-[#22884e] transition-colors">
                  Lupa Sandi?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9488]">
                  <Lock size={20} />
                </span>
                <input 
                  type="password" 
                  required 
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none text-sm sm:text-base" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 mt-4 bg-[#1a1a0e] hover:bg-black text-white rounded-xl font-bold text-sm sm:text-base transition-all active:scale-[0.98] shadow-lg shadow-[#1a1a0e]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Masuk Sistem
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#4a5240]">
              Bukan pengurus?{' '}
              <Link 
                href="/" 
                className="font-bold text-[#1a6b3c] hover:text-[#22884e] transition-colors hover:underline"
              >
                Kembali ke Beranda
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}