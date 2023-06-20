import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "P3DW Kawaluyaan",
  description: "Laporan harian P3DW Kawaluyaan",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0C7066" />
      {/* <!-- this sets logo in Apple smatphones. --> */}
      <link rel="apple-touch-icon" href="/logo-72x72.png" />
      {/* <!-- this sets the color of url bar in Apple smatphones --> */}
      <meta name="apple-mobile-web-app-status-bar" content="#0C7066" />
      <body className={inter.className}>
        <div className="flex-1 mx-auto">{children}</div>
      </body>
    </html>
  );
}
