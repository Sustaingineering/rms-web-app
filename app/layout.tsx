import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ProgressBar from "@/components/ui/progressbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressBar></ProgressBar>
        <div className="flex flex-col items-center pt-10">
            <Image
                className="min-w-auto"
                src="/banner_rms.svg"
                alt="Next.js logo"
                width={600}
                height={300}
                priority
              />
        </div>
        {children}
      </body>
    </html>
  );
}
