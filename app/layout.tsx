import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "China 2026 · The Grand Journey",
  description: "A synchronized 17-day China itinerary for Shanghai, Zhangjiajie, Shenzhen, Macau and Hong Kong.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
