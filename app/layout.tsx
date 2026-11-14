import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ProgressBar from "@/components/ui/progressbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressBar></ProgressBar>
        <Toaster 
          position = "top-center"
          toastOptions={
            {
              duration: 5000
            }
          }
        />
        {children}
      </body>
    </html>
  );
}
