import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/lib/authProvider/authProvider";
import TanstackProvider from "@/lib/reactQueryProvider/reactQuery";
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Bot",
  description: "Control the Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <TanstackProvider>
        <Toaster />
          <main>{children}</main>
        </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
