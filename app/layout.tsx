import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import { Toaster } from "./_components/ui/sonner";
import AuthProvider from "./_providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BARBERBLEND | Simplicidade no agendamento, excelência no corte!",
  description: "Criado por Israel Kilday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
