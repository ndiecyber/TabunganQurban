"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Check, X, UserCheck } from 'lucide-react';

interface Jamaah {
  id: number;
  name: string;
  target: string;
  saved: string;
  progress: number;
}

interface ShohibulProps {
  activeList: Jamaah[];
  setActiveList: React.Dispatch<React.SetStateAction<Jamaah[]>>;
}

export default function ShohibulTab({ activeList, setActiveList }: ShohibulProps) {
  const [pendingList, setPendingList] = useState([
    { id: 1, name: 'Rhafi Gunawan', phone: '081234567890', target: 'Sapi (Patungan)', address: 'Tasikmalaya' },
    { id: 2, name: 'Ahmad Fazri', phone: '089876543210', target: 'Kambing', address: 'Singaparna, Blok B' },
  ]);

  const handleApprove = (user: any) => {
    const newJamaah: Jamaah = {
      id: user.id,
      name: user.name,
      target: user.target,
      saved: 'Rp 0',
      progress: 0
    };
    setActiveList([...activeList, newJamaah]);
    setPendingList(pendingList.filter(item => item.id !== user.id));
    toast.success(`${user.name} berhasil divalidasi ke daftar jamaah aktif!`);
  };

  const handleReject = (id: number) => {
    setPendingList(pendingList.filter(item => item.id !== id));
    toast.error('Pendaftaran ditolak dan dihapus dari sistem.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a0e] tracking-tight">Data Shohibul Qurban</h1>
          <p className="text-[#4a5240] text-sm mt-0.5">Kelola validasi pendaftar baru dan daftar jamaah aktif.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9488]" size={18} />
          <input type="text" placeholder="Cari jamaah..." className="pl-10 pr-4 py-2.5 sm:py-2 border border-[#e0e8df] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6b3c] w-full md:w-64 text-sm bg-white" />
        </div>
      </div>

      {pendingList.length > 0 && (
        <div className="bg-[#fdf3e3] border border-[#f0c472] rounded-2xl overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="px-5 sm:px-6 py-4 border-b border-[#f0c472]/50 bg-white/40 flex justify-between items-center">
            <h2 className="font-semibold text-[#c9873a] flex items-center gap-2 text-sm sm:text-base">
              <UserCheck size={18} />
              Menunggu Validasi ({pendingList.length})
            </h2>
          </div>
          <div className="divide-y divide-[#f0c472]/30">
            {pendingList.map((user) => (
              <div key={user.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 bg-white/20 hover:bg-white/40 transition-colors">
                <div>
                  <h3 className="font-bold text-[#1a1a0e] text-base sm:text-lg">{user.name}</h3>
                  <div className="text-xs sm:text-sm text-[#4a5240] mt-1 space-x-2 sm:space-x-3">
                    <span>{user.phone}</span>
                    <span className="text-[#8a9488]">•</span>
                    <span>{user.address}</span>
                  </div>
                  <div className="inline-block mt-3 px-3 py-1 bg-white border border-[#f0c472] text-[#c9873a] text-xs font-semibold rounded-lg">Target: {user.target}</div>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button onClick={() => handleReject(user.id)} className="flex-1 md:flex-none flex items-center justify-center p-2 text-rose-500 hover:bg-rose-50 border border-rose-200 hover:border-rose-300 rounded-xl transition-colors active:scale-95"><X size={20} /></button>
                  <button onClick={() => handleApprove(user)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1a6b3c] hover:bg-[#22884e] text-white font-medium rounded-xl transition-colors shadow-md shadow-[#1a6b3c]/20 active:scale-95"><Check size={18} />Setujui</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-[#e0e8df] rounded-2xl overflow-hidden shadow-sm animate-in slide-in-from-bottom-8 duration-700">
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[#e0e8df]"><h2 className="font-semibold text-[#1a1a0e] text-sm sm:text-base">Daftar Jamaah Aktif</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#4a5240] min-w-150">
            <thead className="bg-[#faf8f4] text-[#8a9488] border-b border-[#e0e8df] uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 sm:px-6 py-3 sm:py-4">Nama Jamaah</th>
                <th className="px-5 sm:px-6 py-3 sm:py-4">Target Qurban</th>
                <th className="px-5 sm:px-6 py-3 sm:py-4">Total Tabungan</th>
                <th className="px-5 sm:px-6 py-3 sm:py-4">Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e8df]">
              {activeList.map((item) => (
                <tr key={item.id} className="hover:bg-[#faf8f4] transition-colors">
                  <td className="px-5 sm:px-6 py-3 sm:py-4 font-medium text-[#1a1a0e] whitespace-nowrap">{item.name}</td>
                  <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">{item.target}</td>
                  <td className="px-5 sm:px-6 py-3 sm:py-4 font-medium whitespace-nowrap">{item.saved}</td>
                  <td className="px-5 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-3 min-w-30">
                      <div className="w-full bg-[#e8f5ee] rounded-full h-2"><div className="bg-[#1a6b3c] h-2 rounded-full" style={{ width: `${item.progress}%` }}></div></div>
                      <span className="text-xs font-medium text-[#4a5240] w-8">{item.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}