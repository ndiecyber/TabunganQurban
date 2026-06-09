"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, History, Banknote, CreditCard, ArrowDownRight, BellDot, Check, X, ImageIcon } from 'lucide-react';

interface Jamaah {
  id: number;
  name: string;
  target: string;
}

interface MenabungProps {
  jamaahList: Jamaah[];
}

export default function MenabungTab({ jamaahList }: MenabungProps) {
  const [history] = useState([
    { id: 101, name: 'Keluarga Budi', amount: 'Rp 500.000', date: '09 Jun 2026', method: 'Tunai' },
    { id: 102, name: 'Ibu Siti', amount: 'Rp 1.000.000', date: '08 Jun 2026', method: 'Transfer' },
  ]);

  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 201, name: 'Hamba Allah', amount: 'Rp 500.000', method: 'BSI (Syariah)', time: 'Hari ini, 14:30' }
  ]);

  const handleSetor = (e: React.FormEvent) => {
    e.preventDefault();
    // Memanggil Notifikasi Toast
    toast.success('Berhasil! Data setoran berhasil dicatat ke sistem.');
  };

  const handleApproveDeposit = (id: number) => {
    setPendingDeposits(pendingDeposits.filter(item => item.id !== id));
    toast.success('Setoran mandiri divalidasi!');
  };

  const handleRejectDeposit = (id: number) => {
    setPendingDeposits(pendingDeposits.filter(item => item.id !== id));
    toast.error('Bukti setoran ditolak.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a0e] tracking-tight">Pencatatan & Validasi Setoran</h1>
        <p className="text-[#4a5240] text-sm mt-0.5">Kelola konfirmasi setoran mandiri dan input dana tunai dari jamaah.</p>
      </div>

      {pendingDeposits.length > 0 && (
        <div className="bg-[#fdf3e3] border border-[#f0c472] rounded-2xl overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="px-5 sm:px-6 py-4 border-b border-[#f0c472]/50 bg-white/40 flex justify-between items-center">
            <h2 className="font-semibold text-[#c9873a] flex items-center gap-2 text-sm sm:text-base">
              <BellDot size={18} className="animate-pulse" />
              Menunggu Verifikasi Bukti Transfer ({pendingDeposits.length})
            </h2>
          </div>
          <div className="divide-y divide-[#f0c472]/30">
            {pendingDeposits.map((deposit) => (
              <div key={deposit.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 bg-white/20 hover:bg-white/40 transition-colors">
                <div>
                  <h3 className="font-bold text-[#1a1a0e] text-base sm:text-lg">{deposit.name}</h3>
                  <div className="text-xs sm:text-sm text-[#4a5240] mt-1 space-x-2 sm:space-x-3">
                    <span className="font-semibold text-[#22884e]">{deposit.amount}</span>
                    <span className="text-[#8a9488]">•</span>
                    <span>{deposit.method}</span>
                    <span className="text-[#8a9488]">•</span>
                    <span>{deposit.time}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#1a6b3c] border border-[#2aab62]/30 hover:bg-[#e8f5ee] font-medium rounded-xl transition-colors text-sm active:scale-95">
                    <ImageIcon size={18} />
                    Lihat Bukti
                  </button>
                  <button 
                    onClick={() => handleRejectDeposit(deposit.id)}
                    className="flex items-center justify-center p-2 text-rose-500 hover:bg-rose-50 border border-rose-200 hover:border-rose-300 rounded-xl transition-colors active:scale-95"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={() => handleApproveDeposit(deposit.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a6b3c] hover:bg-[#22884e] text-white font-medium rounded-xl transition-colors shadow-md shadow-[#1a6b3c]/20 text-sm active:scale-95"
                  >
                    <Check size={18} />
                    Validasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-[#e0e8df] shadow-sm animate-in slide-in-from-bottom-8 duration-700">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1a1a0e]">Input Setoran Manual</h2>
            <p className="text-[#4a5240] text-sm">Gunakan form ini untuk jamaah yang menyetor uang tunai langsung ke masjid.</p>
          </div>

          <form onSubmit={handleSetor} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a0e] mb-2">Pilih Jamaah</label>
              <select required className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#e0e8df] focus:ring-2 focus:ring-[#1a6b3c] outline-none bg-[#faf8f4] focus:bg-white transition-all text-sm sm:text-base">
                <option value="">-- Pilih Shohibul Qurban --</option>
                {jamaahList.map(j => (
                  <option key={j.id} value={j.id}>{j.name} - {j.target}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a0e] mb-2">Nominal Setoran (Rp)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9488] font-semibold text-sm sm:text-base">Rp</span>
                <input 
                  type="number" 
                  required 
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border border-[#e0e8df] focus:ring-2 focus:ring-[#1a6b3c] outline-none bg-[#faf8f4] focus:bg-white transition-all text-sm sm:text-base" 
                  placeholder="0" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a0e] mb-2">Metode Pembayaran</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <label className="flex items-center gap-3 p-4 border border-[#e0e8df] rounded-xl cursor-pointer hover:bg-[#faf8f4] has-checked:border-[#1a6b3c] has-checked:bg-[#e8f5ee] transition-colors">
                  <input type="radio" name="method" value="tunai" defaultChecked className="text-[#1a6b3c] focus:ring-[#1a6b3c] w-4 h-4 sm:w-5 sm:h-5" />
                  <Banknote className="text-[#8a9488]" size={20} />
                  <span className="font-medium text-[#1a1a0e] text-sm">Uang Tunai</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-[#e0e8df] rounded-xl cursor-pointer hover:bg-[#faf8f4] has-checked:border-[#1a6b3c] has-checked:bg-[#e8f5ee] transition-colors">
                  <input type="radio" name="method" value="transfer" className="text-[#1a6b3c] focus:ring-[#1a6b3c] w-4 h-4 sm:w-5 sm:h-5" />
                  <CreditCard className="text-[#8a9488]" size={20} />
                  <span className="font-medium text-[#1a1a0e] text-sm">Transfer Bank</span>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 sm:py-4 mt-2 bg-[#1a6b3c] hover:bg-[#22884e] text-white rounded-xl font-bold text-sm sm:text-base transition-transform active:scale-[0.98] shadow-lg shadow-[#1a6b3c]/20 flex items-center justify-center gap-2">
              <Plus size={20} />
              Simpan Data Setoran
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-[#e0e8df] shadow-sm overflow-hidden flex flex-col animate-in slide-in-from-right-8 duration-700">
          <div className="p-6 border-b border-[#e0e8df]">
            <h2 className="text-lg font-bold text-[#1a1a0e] flex items-center gap-2">
              <History size={20} className="text-[#c9873a]" />
              Riwayat Terakhir
            </h2>
          </div>
          
          <div className="divide-y divide-[#e0e8df] flex-1">
            {history.map(item => (
              <div key={item.id} className="p-4 sm:p-5 hover:bg-[#faf8f4] transition-colors flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#1a6b3c] shrink-0 mt-0.5">
                  <ArrowDownRight size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a0e] text-sm sm:text-base">{item.name}</h4>
                  <p className="font-bold text-[#22884e] my-0.5 text-sm sm:text-base">{item.amount}</p>
                  <div className="flex items-center gap-2 text-xs text-[#8a9488]">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.method}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-semibold text-[#8a9488] hover:text-[#1a6b3c] hover:bg-[#faf8f4] transition-colors border-t border-[#e0e8df]">
            Lihat Semua Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}