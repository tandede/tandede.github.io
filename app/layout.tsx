import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: '谭哲文｜大语言模型算法研究与工程',
  description: '谭哲文的个人主页：Pretrain Data Scaling、Agent 系统、安全对齐、模型评测、学术论文与开源贡献。',
  icons: { icon: '/tan-zhewen.png' },
  openGraph: {
    title: '谭哲文｜大语言模型算法研究与工程',
    description: 'Pretrain Data Scaling · Agent · Safety · Evaluation — 让研究成为可验证的系统能力。',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: '谭哲文｜LLM Research & Engineering' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '谭哲文｜大语言模型算法研究与工程',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
