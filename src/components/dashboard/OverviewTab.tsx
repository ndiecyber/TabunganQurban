"use client";

import React from 'react';
import { Users, ShieldAlert, Wallet, PieChart, ArrowUpRight, FileText } from 'lucide-react';

interface OverviewProps {
  totalJamaah: number;
}

export default function OverviewTab({ totalJamaah }: OverviewProps) {
  const stats = [
    { 
      label: 'Total Shohibul', 
      value: `${totalJamaah} Orang`, 
      subtext: 'Jamaah tervalidasi',
      icon: Users, 
      color: 'bg-[#1a6b3c]/10 text-[#1a6b3c]' 
    },
    { 
      label: 'Menunggu Validasi', 
      value: '5 Pendaftar', 
      subtext: 'Butuh tindakan admin',
      icon: ShieldAlert, 
      color: 'bg-[#c9873a]/10 text-[#c9873a]' 
    },
    { 
      label: 'Dana Terkumpul', 
      value: 'Rp 84,5 Juta', 
      subtext: 'Total uang kas masuk',
      icon: Wallet, 
      color: 'bg-[#22884e]/10 text-[#22884e]' 
    },
    { 
      label: 'Persentase Target', 
      value: '68%', 
      subtext: 'Dari estimasi qurban',
      icon: PieChart, 
      color: 'bg-[#1a1a0e]/10 text-[#1a1a0e]' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a0e] tracking-tight">Ringkasan Sistem</h1>
          <p className="text-[#8a9488] text-sm mt-1">Kondisi terkini tabungan qurban periode 2026.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#e0e8df] text-sm font-semibold text-[#1a1a0e] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2aab62] animate-pulse"></span>
          Tahun Transaksi: 1447 H
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-3xl border border-[#e0e8df] shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#2aab62] bg-[#e8f5ee] px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  <ArrowUpRight size={14} />
                  Aktif
                </span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a0e] tracking-tight mb-1.5 truncate">{stat.value}</h3>
                <p className="text-sm font-semibold text-[#4a5240] mb-0.5">{stat.label}</p>
                <p className="text-xs text-[#8a9488]">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="lg:col-span-2 bg-[#fdf3e3] border border-[#f0c472] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#f0c472]/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-[#c9873a] mb-2">Perhatian Admin</h3>
            <p className="text-sm text-[#1a1a0e] leading-relaxed max-w-lg">
              Terdapat <strong>5 pendaftar baru</strong> dan bukti setoran mandiri yang menunggu untuk Anda validasi hari ini. Segera proses agar jamaah dapat melihat progresnya.
            </p>
          </div>
          <button className="relative z-10 w-full sm:w-auto shrink-0 bg-[#c9873a] hover:bg-[#b0742f] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#c9873a]/20">
            Tinjau Pendaftar
          </button>
        </div>

        <div className="bg-white border border-[#e0e8df] rounded-3xl p-6 sm:p-8 flex flex-col justify-center gap-4">
          <div className="w-12 h-12 bg-[#faf8f4] border border-[#e0e8df] rounded-2xl flex items-center justify-center text-[#8a9488]">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1a1a0e] mb-1">Cetak Laporan</h3>
            <p className="text-xs text-[#8a9488] mb-4">Unduh rekapitulasi sementara bulan ini.</p>
            <button className="w-full bg-[#faf8f4] border border-[#e0e8df] hover:border-[#1a6b3c] hover:bg-[#e8f5ee] hover:text-[#1a6b3c] text-[#4a5240] font-medium px-4 py-2.5 rounded-xl transition-colors text-sm">
              Unduh PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}