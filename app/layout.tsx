import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import { Toaster } from "./_components/ui/sonner";
import AuthProvider from "./_providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} dark`}> */}
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
