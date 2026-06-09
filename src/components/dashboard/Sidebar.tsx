"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, CircleDollarSign, BarChart3, LogOut, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shohibul', label: 'Shohibul Qurban', icon: Users },
    { id: 'tabung', label: 'Menabung', icon: CircleDollarSign },
    { id: 'rekap', label: 'Rekapitulasi', icon: BarChart3 },
  ];

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 min-w-65 p-2">
        <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-2">
          <LogOut size={28} strokeWidth={2} className="ml-1" />
        </div>
        <div className="text-center mb-2">
          <h3 className="font-bold text-[#1a1a0e] text-lg mb-1">Keluar Sistem?</h3>
          <p className="text-[#8a9488] text-sm">Sesi Dasbor Anda akan diakhiri.</p>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="flex-1 px-4 py-3 bg-[#faf8f4] hover:bg-[#e0e8df] text-[#4a5240] rounded-xl font-bold transition-colors text-sm border border-[#e0e8df]"
          >
            Batal
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              toast.success('Berhasil keluar dari sistem.');
              router.push('/login');
            }} 
            className="flex-1 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors text-sm shadow-lg shadow-rose-500/20 active:scale-95"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    ), { 
      duration: Infinity,
      style: {
        background: '#ffffff',
        color: '#1a1a0e',
        padding: '16px',
        borderRadius: '24px',
        border: '1px solid #e0e8df',
        boxShadow: '0 25px 50px -12px rgba(26, 107, 60, 0.15)',
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1a6b3c] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-10">
            <div className="flex flex-col gap-2">
              <div className="bg-white px-3 py-2.5 rounded-xl shadow-lg shadow-[#1a1a0e]/20 inline-block shrink-0">
                <Image src="/logo-dkm.jpeg" alt="Logo DKM Kassiti" width={160} height={50} className="h-9 w-auto object-contain" priority />
              </div>
              <p className="text-xs font-medium text-[#a8d9bc] ml-1">Sistem Admin Panel</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-[#a8d9bc] hover:text-white hover:bg-[#22884e] rounded-lg mt-1">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors overflow-hidden ${isActive ? 'text-white' : 'text-[#e8f5ee] hover:text-white hover:bg-[#22884e]'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute inset-0 bg-[#c9873a] shadow-md z-0" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-4">
                    <Icon size={20} />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-[#2aab62]/30">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-[#f0c472] hover:bg-[#22884e] transition-all">
            <LogOut size={20} />
            Keluar Sistem
          </button>
        </div>
      </aside>
    </>
  );
}