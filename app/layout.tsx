import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import InteractionLayer from './interaction-layer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tandede.github.io'),
  title: 'ZHEWEN TAN（谭哲文）｜大语言模型算法研究与工程',
  description: 'ZHEWEN TAN（谭哲文）的个人主页，主要研究大语言模型预训练数据、Pretrain Data Scaling、Agent、安全对齐与模型评测。',
  keywords: [
    'Zhewen Tan',
    'ZHEWEN TAN',
    '谭哲文',
    '大语言模型',
    'LLM',
    'Pretrain Data Scaling',
    'Agent',
    'Safety Alignment',
    'Model Evaluation',
  ],
  authors: [{ name: 'ZHEWEN TAN', url: 'https://tandede.github.io' }],
  creator: 'ZHEWEN TAN',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/tan-zhewen.png' },
  openGraph: {
    title: 'ZHEWEN TAN（谭哲文）｜大语言模型算法研究与工程',
    description: 'Pretrain Data Scaling · Agent · Safety · Evaluation — 让研究成为可验证的系统能力。',
    url: '/',
    siteName: 'ZHEWEN TAN · Personal Homepage',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: '谭哲文｜LLM Research & Engineering' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZHEWEN TAN（谭哲文）｜大语言模型算法研究与工程',
    description: 'Pretrain Data Scaling · Agent · Safety · Evaluation — 让研究成为可验证的系统能力。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'ZHEWEN TAN',
              alternateName: '谭哲文',
              url: 'https://tandede.github.io/',
              image: 'https://tandede.github.io/tan-zhewen.png',
              jobTitle: '大语言模型算法实习生',
              knowsAbout: [
                'Large Language Models',
                'Pretraining Data',
                'Data Scaling',
                'AI Agents',
                'Safety Alignment',
                'Model Evaluation',
              ],
              sameAs: [
                'https://scholar.google.com/citations?user=6uw9ALUAAAAJ',
                'https://github.com/tandede',
                'https://www.linkedin.com/in/zhewen-tan-0ba830401/',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InteractionLayer />
        {children}
      </body>
    </html>
  );
}
