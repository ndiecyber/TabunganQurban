"use client";

import React from 'react';
import { Printer, Download, TrendingUp, DollarSign, Award, Percent } from 'lucide-react';

export default function RekapTab() {
  const summary = [
    { label: 'Estimasi Kebutuhan', value: 'Rp 120.000.000', icon: DollarSign, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Dana Terkumpul', value: 'Rp 84.500.000', icon: Award, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Sisa Kekurangan', value: 'Rp 35.500.000', icon: Percent, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  const animals = [
    { type: 'Sapi (Patungan & Individu)', target: 7, current: 5, color: 'bg-[#1a6b3c]', percentage: 71 },
    { type: 'Kambing / Domba', target: 20, current: 14, color: 'bg-[#c9873a]', percentage: 70 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a0e] tracking-tight">Laporan & Rekapitulasi</h1>
          <p className="text-[#4a5240] text-sm mt-0.5">Pantau kesiapan finansial dan jumlah hewan qurban periode ini.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-[#e0e8df] text-[#4a5240] hover:bg-[#faf8f4] font-medium rounded-xl transition-colors text-sm">
            <Printer size={18} />
            Cetak
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a6b3c] hover:bg-[#22884e] text-white font-medium rounded-xl transition-colors shadow-md shadow-[#1a6b3c]/10 text-sm">
            <Download size={18} />
            Unduh Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {summary.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-3xl border border-[#e0e8df] shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#8a9488] uppercase tracking-wider mb-0.5">{item.label}</p>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a0e] tracking-tight">{item.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e0e8df] shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#e8f5ee] text-[#1a6b3c] rounded-2xl shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1a1a0e]">Progres Pengadaan Hewan</h2>
              <p className="text-xs text-[#8a9488]">Akumulasi target hewan berdasarkan pendaftar</p>
            </div>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {animals.map((animal, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-[#4a5240] text-sm sm:text-base">{animal.type}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1a1a0e] bg-[#faf8f4] border border-[#e0e8df] px-2.5 py-1 rounded-lg">{animal.current} / {animal.target} Ekor</span>
                </div>
                <div className="w-full bg-[#faf8f4] border border-[#e0e8df] rounded-full h-3">
                  <div 
                    className={`${animal.color} h-3 rounded-full transition-all duration-1000`} 
                    style={{ width: `${animal.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs font-semibold text-[#2aab62] text-right">Tercapai {animal.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e0e8df] shadow-sm">
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-bold text-[#1a1a0e]">Status Capaian Dana</h2>
            <p className="text-xs text-[#8a9488]">Rasio tabungan masuk dibanding estimasi total</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#faf8f4" strokeWidth="3.5"></circle>
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="#1a6b3c" 
                  strokeWidth="3.5" 
                  strokeDasharray="70, 100"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#1a1a0e]">70%</span>
                <span className="text-[10px] font-bold text-[#8a9488] uppercase tracking-wider">Terkumpul</span>
              </div>
            </div>

            <div className="space-y-3 w-full sm:w-auto flex-1">
              <div className="flex items-center gap-3 p-3 bg-[#faf8f4] rounded-xl border border-[#e0e8df]">
                <div className="w-3 h-3 rounded-full bg-[#1a6b3c] shrink-0"></div>
                <div className="flex-1 flex justify-between text-xs font-semibold">
                  <span className="text-[#4a5240]">Sudah Masuk</span>
                  <span className="text-[#1a1a0e]">70%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#faf8f4] rounded-xl border border-[#e0e8df]">
                <div className="w-3 h-3 rounded-full bg-[#faf8f4] border border-[#e0e8df] shrink-0"></div>
                <div className="flex-1 flex justify-between text-xs font-semibold">
                  <span className="text-[#4a5240]">Belum Masuk</span>
                  <span className="text-[#1a1a0e]">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}