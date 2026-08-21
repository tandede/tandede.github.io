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
  title: '谭哲文｜LLM Research & Engineering',
  description: '谭哲文的个人主页：大语言模型、Pretrain 数据质量、Agent、安全对齐与开源工程。',
  icons: { icon: '/tan-zhewen.png' },
  openGraph: {
    title: '谭哲文｜LLM Research & Engineering',
    description: 'Pretrain · Agents · Open Source — 从失败路径出发，把复杂问题变成可以验证的解决方案。',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: '谭哲文｜LLM Research & Engineering' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '谭哲文｜LLM Research & Engineering',
    description: 'Pretrain · Agents · Open Source — 从失败路径出发，把复杂问题变成可以验证的解决方案。',
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
