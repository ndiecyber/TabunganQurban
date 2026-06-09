import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistem Qurban | DKM Kassiti',
  description: 'Platform digital pendaftaran dan transparansi tabungan qurban DKM Masjid Jami\' Kassiti.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: 'Google Sans', sans-serif !important;
            }
          `
        }} />
      </head>
      
      <body className="bg-[#faf8f4] text-[#1a1a0e] antialiased selection:bg-[#2aab62] selection:text-white">
        {children}
        
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a0e',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '16px 24px',
              boxShadow: '0 20px 25px -5px rgba(26, 107, 60, 0.2), 0 8px 10px -6px rgba(26, 107, 60, 0.1)',
            },
            success: {
              style: {
                background: '#1a6b3c',
                border: '1px solid #2aab62',
              },
              iconTheme: {
                primary: '#ffffff',
                secondary: '#1a6b3c',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
            },
          }} 
        />
      </body>
    </html>
  );
}