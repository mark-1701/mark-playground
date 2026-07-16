import type { Metadata } from 'next';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import { geistMono, geistSans } from '../config/fonts';
import { ToastProvider } from '../providers/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mark Playground',
  description: 'Zona de pruebas para mi próximo proyecto'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full
        antialiased`}
    >
      <body className="bg-gray-50">
        <div className="flex h-dvh">
          <NavMenu />

          <div className="w-full overflow-auto p-12">{children}</div>
        </div>

        <ToastProvider />
      </body>
    </html>
  );
}
