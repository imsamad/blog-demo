import Navbar from '@/app/components/Navbar';
import '../../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TidBits',
  description: 'Daily dose of relevant info!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar height={80} />
        {children}
      </body>
    </html>
  );
}
