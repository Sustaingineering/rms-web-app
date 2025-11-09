import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
