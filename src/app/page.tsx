"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Alhamdulillah, pendaftaran Anda berhasil dikirim!');
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-5/12 bg-[#1a6b3c] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden min-h-[40vh] lg:min-h-screen">
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 sm:w-64 sm:h-64 bg-[#22884e] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 sm:w-64 sm:h-64 bg-[#13502c] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <div className="relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="bg-white px-4 py-3 rounded-2xl shadow-lg shadow-[#1a1a0e]/20 inline-block mb-8">
            <Image 
              src="/logo-dkm.jpeg" 
              alt="Logo DKM Kassiti" 
              width={180} 
              height={50} 
              className="h-10 w-auto object-contain" 
              priority 
            />
          </div>
          
          <div className="mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Mulai Niat Baikmu Hari Ini.
            </h1>
            <p className="text-[#e8f5ee] text-base sm:text-lg leading-relaxed">
              Sistem pendaftaran program Tabungan Qurban. Daftarkan diri Anda, tentukan target, dan pantau tabungan dengan mudah.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-[#22884e]/50 flex items-center justify-center font-bold border border-[#2aab62]/50 text-sm sm:text-base">1</div>
              <p className="text-white text-sm sm:text-base">Isi formulir pendaftaran</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-[#22884e]/50 flex items-center justify-center font-bold border border-[#2aab62]/50 text-sm sm:text-base">2</div>
              <p className="text-white text-sm sm:text-base">Tunggu validasi Admin DKM</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-[#22884e]/50 flex items-center justify-center font-bold border border-[#2aab62]/50 text-sm sm:text-base">3</div>
              <p className="text-white text-sm sm:text-base">Mulai setor tabungan qurban</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-7/12 p-6 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-[#faf8f4] min-h-[60vh] lg:min-h-screen">
        <div className="w-full max-w-lg flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700">
          {isSubmitted ? (
            <div className="bg-white border border-[#e0e8df] text-[#1a1a0e] p-6 sm:p-8 rounded-3xl text-center shadow-lg shadow-[#1a6b3c]/5 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#e8f5ee] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#1a6b3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Alhamdulillah, Terdaftar!</h3>
              <p className="text-sm sm:text-base text-[#4a5240] leading-relaxed mb-8">
                Data Anda telah masuk ke sistem dan berstatus <span className="font-semibold text-[#c9873a] bg-[#fdf3e3] px-2 py-1 rounded-md">Menunggu Validasi</span>.<br/><br/>
                Silakan hubungi Admin DKM agar pendaftaran Anda dapat segera disetujui.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="px-6 sm:px-8 py-3 bg-[#1a6b3c] hover:bg-[#22884e] text-white rounded-xl transition-all font-medium text-sm sm:text-base"
              >
                Kembali ke Form
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm border border-[#e0e8df]">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a0e] mb-2">Formulir Pendaftaran</h2>
                <p className="text-sm sm:text-base text-[#4a5240]">Lengkapi data di bawah ini untuk menjadi Shohibul Qurban.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1a1a0e] mb-2">Nama Lengkap</label>
                  <input type="text" required className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none text-sm sm:text-base" placeholder="Sesuai nama yang akan diqurbankan" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1a1a0e] mb-2">Nomor WhatsApp</label>
                  <input type="tel" required className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none text-sm sm:text-base" placeholder="Contoh: 08123456789" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1a1a0e] mb-2">Alamat / Blok Rumah</label>
                  <textarea required rows={3} className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none resize-none text-sm sm:text-base" placeholder="Contoh: Blok A No. 12"></textarea>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1a1a0e] mb-2">Rencana Target Qurban</label>
                  <select required className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-[#e0e8df] bg-[#faf8f4] focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] transition-all outline-none text-sm sm:text-base">
                    <option value="">-- Pilih Target Hewan --</option>
                    <option value="sapi_patungan">Sapi (Patungan 7 Orang)</option>
                    <option value="sapi_individu">Sapi (Individu)</option>
                    <option value="kambing">Kambing / Domba</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3.5 sm:py-4 mt-2 sm:mt-4 bg-[#1a1a0e] hover:bg-black text-white rounded-xl font-bold text-base sm:text-lg transition-transform active:scale-[0.98] shadow-lg shadow-[#1a1a0e]/20">
                  Kirim Pendaftaran
                </button>
              </form>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-[#4a5240]">
              Sudah terdaftar dan ingin cek progres?{' '}
              <Link href="/jamaah" className="font-bold text-[#1a6b3c] hover:text-[#22884e] underline underline-offset-4 transition-colors">
                Setor Mandiri & Papan Peringkat
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}