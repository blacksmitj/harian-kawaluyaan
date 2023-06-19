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
      <body className={inter.className}>
        <div className="flex-1 mx-auto">{children}</div>
      </body>
    </html>
  );
}
