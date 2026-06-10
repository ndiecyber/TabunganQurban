"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f4] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#e0e8df] p-8 text-center shadow-sm"
      >
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo-dkm.jpeg" 
            alt="Logo DKM Kassiti" 
            width={140} 
            height={40} 
            className="h-8 w-auto object-contain" 
            priority 
          />
        </div>

        <div className="w-16 h-16 bg-[#e8f5ee] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1a6b3c]">
          <FileQuestion size={32} />
        </div>

        <h1 className="text-6xl font-black text-[#1a6b3c] tracking-tight mb-2">
          404
        </h1>
        
        <h2 className="text-xl font-bold text-[#1a1a0e] mb-3">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-[#4a5240] text-sm leading-relaxed mb-8 px-2">
          Afwan, tautan yang Anda tuju salah atau telah dihapus dari sistem sistem Tabungan Qurban DKM Kassiti.
        </p>

        <Link href="/" passHref>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-[#1a1a0e] hover:bg-black text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#1a1a0e]/10"
          >
            <Home size={16} />
            Kembali ke Beranda
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}