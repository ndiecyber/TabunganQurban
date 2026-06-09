"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Trophy, Medal, QrCode, Landmark, Upload, CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function JamaahPortal() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rankings = [
    { id: 1, name: 'Ibu Siti Khadijah', target: 'Sapi (Individu)', progress: 100, amount: 'Rp 25.000.000' },
    { id: 2, name: 'Keluarga Bapak Budi', target: 'Sapi (Patungan)', progress: 85, amount: 'Rp 3.000.000' },
    { id: 3, name: 'Rhafi Gunawan', target: 'Kambing', progress: 60, amount: 'Rp 2.100.000' },
    { id: 4, name: 'Ahmad Fazri', target: 'Kambing', progress: 40, amount: 'Rp 1.400.000' },
    { id: 5, name: 'Hamba Allah', target: 'Sapi (Patungan)', progress: 15, amount: 'Rp 500.000' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Bukti transfer terkirim! Menunggu validasi Admin.');
  };

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    if (index === 1) return 'text-slate-400 bg-slate-50 border-slate-200';
    if (index === 2) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-[#8a9488] bg-[#faf8f4] border-[#e0e8df]';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="min-h-screen bg-[#faf8f4] flex flex-col lg:flex-row overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-16 flex flex-col border-r border-[#e0e8df] min-h-[50vh]"
      >
        <div className="mb-8 sm:mb-10">
          <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-[#e0e8df] inline-block mb-6">
            <Image 
              src="/logo-dkm.jpeg" 
              alt="Logo DKM Kassiti" 
              width={160} 
              height={45} 
              className="h-9 w-auto object-contain" 
              priority 
            />
          </div>
          <h2 className="text-[#c9873a] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2">Transparansi & Fastabiqul Khairat</h2>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a0e] tracking-tight mb-3">Papan Peringkat Qurban</h1>
          <p className="text-[#4a5240] text-sm sm:text-base leading-relaxed">Daftar jamaah dengan progres tabungan tertinggi. Mari berlomba-lomba dalam kebaikan menyambut Idul Adha 1447 H.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {rankings.map((user, index) => (
            <motion.div 
              key={user.id} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e0e8df] shadow-sm flex items-center gap-4 cursor-default"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 border ${getMedalColor(index)}`}>
                {index === 0 ? <Trophy size={24} /> : index < 3 ? <Medal size={24} /> : <span className="font-bold text-lg">{index + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[#1a1a0e] truncate text-sm sm:text-base">{user.name}</h3>
                  <span className="font-bold text-[#1a6b3c] text-sm sm:text-base">{user.progress}%</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-[#8a9488] mb-2.5">
                  <span className="truncate pr-2">{user.target}</span>
                  <span>{user.amount}</span>
                </div>
                <div className="w-full bg-[#faf8f4] rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${user.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
                    className="bg-[#2aab62] h-full rounded-full" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-5/12 bg-white p-6 sm:p-10 lg:p-16 flex flex-col min-h-[50vh]"
      >
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a0e] tracking-tight mb-2">Setor Mandiri</h2>
          <p className="text-[#4a5240] text-sm sm:text-base">Gunakan kanal pembayaran resmi DKM di bawah ini, lalu konfirmasi setoran Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="sm:col-span-2 p-5 sm:p-6 rounded-2xl border border-[#e0e8df] bg-[#faf8f4] flex flex-col items-center justify-center text-center gap-2 shadow-sm">
            <div className="w-12 h-12 bg-[#e8f5ee] text-[#1a6b3c] rounded-full flex items-center justify-center mb-1">
              <Landmark size={24} />
            </div>
            <h4 className="font-bold text-[#1a1a0e] text-base">Bank Syariah Indonesia (BSI)</h4>
            <p className="font-mono text-[#22884e] font-bold text-lg tracking-widest">7453555555</p>
            <span className="text-xs text-[#8a9488] font-bold uppercase tracking-wider">A.N DKM JAMI KASSITI</span>
          </div>

          <div className="sm:col-span-2 p-6 rounded-2xl border border-[#c9873a]/30 bg-[#fdf3e3] flex flex-col items-center justify-center text-center shadow-sm">
            <h4 className="font-bold text-[#1a1a0e] text-base mb-4">Scan QRIS Nasional</h4>
            <div className="bg-white p-2 rounded-2xl border border-[#e0e8df] shadow-md inline-block transition-transform hover:scale-105">
              <Image 
                src="/qris-dkm.jpg" 
                alt="QRIS DKM Kassiti" 
                width={300} 
                height={400} 
                className="w-full max-w-55 h-auto object-contain rounded-xl"
                priority
              />
            </div>
            <p className="text-xs text-[#c9873a] mt-4 font-medium">Mendukung semua aplikasi M-Banking & E-Wallet</p>
          </div>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#e8f5ee] border border-[#2aab62]/30 p-6 sm:p-8 rounded-2xl text-center flex-1 flex flex-col justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#1a6b3c] mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-bold text-[#1a1a0e] mb-2">Konfirmasi Terkirim!</h3>
            <p className="text-sm text-[#4a5240] mb-6">Jazakumullah khairan. Admin akan segera memvalidasi setoran Anda agar tampil di Papan Peringkat.</p>
            <button onClick={() => setIsSubmitted(false)} className="px-6 py-3 bg-[#1a6b3c] hover:bg-[#22884e] text-white font-medium rounded-xl transition-colors text-sm">Kirim Konfirmasi Lain</button>
          </motion.div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-4 sm:space-y-5 flex-1">
            <div className="pt-4 border-t border-[#e0e8df]"><h3 className="font-bold text-[#1a1a0e] mb-4 text-sm sm:text-base">Formulir Konfirmasi</h3></div>
            <div><input type="text" required placeholder="Nama Jamaah" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#e0e8df] focus:ring-2 focus:ring-[#1a6b3c] outline-none bg-[#faf8f4] focus:bg-white transition-all text-sm" /></div>
            <div><input type="number" required placeholder="Nominal Transfer (Rp)" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#e0e8df] focus:ring-2 focus:ring-[#1a6b3c] outline-none bg-[#faf8f4] focus:bg-white transition-all text-sm" /></div>
            <div>
              <label className="flex items-center justify-center gap-2 w-full px-4 py-6 rounded-xl border-2 border-dashed border-[#c8d8c4] hover:border-[#1a6b3c] hover:bg-[#e8f5ee] transition-all cursor-pointer bg-[#faf8f4] group">
                <Upload size={20} className="text-[#8a9488] group-hover:text-[#1a6b3c]" />
                <span className="text-sm font-medium text-[#8a9488] group-hover:text-[#1a6b3c]">Unggah Bukti Transfer</span>
                <input type="file" required className="hidden" accept="image/*" />
              </label>
            </div>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-3.5 sm:py-4 bg-[#1a1a0e] hover:bg-black text-white rounded-xl font-bold text-sm sm:text-base"
            >
              Kirim Konfirmasi
            </motion.button>
          </form>
        )}
      </motion.div>
    </main>
  );
}