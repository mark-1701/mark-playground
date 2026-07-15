import type { Metadata } from 'next';
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
      <body className="flex min-h-full flex-col">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
