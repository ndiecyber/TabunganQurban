"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f4] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e8f5ee] rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#fdf3e3] rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-[#e0e8df] inline-block mb-8">
          <Image 
            src="/logo-dkm.jpeg" 
            alt="Logo DKM Kassiti" 
            width={160} 
            height={45} 
            className="h-9 w-auto object-contain" 
            priority 
          />
        </div>

        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-[#fdf3e3] rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10 mx-auto"
          >
            <Compass size={40} className="text-[#c9873a]" />
          </motion.div>
          <h1 className="text-[120px] font-black text-[#e8f5ee] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 tracking-tighter select-none">
            404
          </h1>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a0e] tracking-tight mb-3">
          Afwan, Halaman Tidak Ditemukan
        </h2>
        <p className="text-[#4a5240] text-sm sm:text-base leading-relaxed mb-8">
          Sepertinya Anda tersesat. Jalan atau tautan yang Anda tuju tidak tersedia di sistem Tabungan Qurban DKM Kassiti.
        </p>

        <Link href="/" passHref>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3.5 bg-[#1a6b3c] hover:bg-[#22884e] text-white rounded-xl font-medium text-sm sm:text-base transition-colors shadow-lg shadow-[#1a6b3c]/20 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}