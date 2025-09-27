import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "妙笔-你的独立写作助手",
  description: "为内容创作者打造的全平台写作工具，支持微信公众号、知乎、掘金、小红书，一次创作，多平台发布。集成AI智能助手，让图文创作变得简单高效。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 预设样式元素，参考Markdown2Html-main项目 */}
        <style id="dynamic-basic-style"></style>
        <style id="dynamic-theme-style"></style>
        <style id="dynamic-code-style"></style>
        <style id="dynamic-font-style"></style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
