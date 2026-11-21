"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <Link
                    href="/homepage"
                    className={
                        pathname === "/homepage"
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Summary
                </Link>

                <Link
                    href="/homepage/outdoor_station"
                    className={
                        pathname === "/homepage/outdoor_station"
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Outdoor Station
                </Link>
            </nav>

            <Image
                src="/RMS_banner.png"
                alt="Remote Monitoring System"
                width={500}
                height={200}
                className="sidebar-image"
                priority
            />
        </aside>
    );
}