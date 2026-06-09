"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import OverviewTab from '@/components/dashboard/OverviewTab';
import ShohibulTab from '@/components/dashboard/ShohibulTab';
import MenabungTab from '@/components/dashboard/MenabungTab';
import RekapTab from '@/components/dashboard/RekapTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [jamaahData, setJamaahData] = useState([
    { id: 3, name: 'Keluarga Budi', target: 'Sapi (Patungan)', saved: 'Rp 1.500.000', progress: 42 },
    { id: 4, name: 'Ibu Siti', target: 'Kambing', saved: 'Rp 3.500.000', progress: 100 },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <OverviewTab totalJamaah={jamaahData.length} />;
      case 'shohibul': 
        return <ShohibulTab activeList={jamaahData} setActiveList={setJamaahData} />;
      case 'tabung': 
        return <MenabungTab jamaahList={jamaahData} />;
      case 'rekap': 
        return <RekapTab />;
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        <header className="lg:hidden bg-[#1a6b3c] text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="bg-white px-3 py-1.5 rounded-xl shrink-0 flex items-center shadow-sm">
            <Image 
              src="/logo-dkm.jpeg" 
              alt="Logo DKM Kassiti" 
              width={140} 
              height={40} 
              className="h-8 w-auto object-contain" 
              priority 
            />
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-[#22884e] rounded-lg transition-colors">
            <Menu size={24} />
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}