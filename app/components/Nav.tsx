"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "AI", href: "/ai" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F4F0EB]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-20 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="text-[20px] font-black tracking-tight text-[#1C1917] hover:text-[#D4522A] transition-colors duration-200"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Margi.
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[15px] transition-colors duration-200 tracking-wide ${
                  active
                    ? "text-[#D4522A]"
                    : "text-[#1C1917] hover:text-[#D4522A]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
