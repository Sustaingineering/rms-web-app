"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <Image
                src="/RMS_banner.png"
                alt="Remote Monitoring System"
                width={500}
                height={200}
                className="sidebar-image"
                priority
            />

            <nav className="sidebar-nav">
                <Link
                    href="/hompage"
                    className={
                        pathname === "/homepage"
                            ? "nav-link activate"
                            : "nav-link"
                    }
                >
                    Summary
                </Link>

                <Link
                    href="/hompage/graphs"
                    className={
                        pathname === "/homepage/graphs"
                            ? "nav-link activate"
                            : "nav-link"
                    }
                >
                    Outdoor Station
                </Link>
            </nav>
        </aside>
    );
}