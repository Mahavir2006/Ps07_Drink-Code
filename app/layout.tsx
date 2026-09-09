import type { Metadata } from 'next';
import { Baloo_2, Fredoka, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-baloo',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'घुmo — The Travel Reality Engine | Hackathon Prototype',
  description:
    'A two-sided dynamic tour planning and operations platform. When reality changes mid-trip, घुmo re-plans it live.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${fredoka.variable} ${jakarta.variable}`}>
      <body className="antialiased selection:bg-pink-300 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
