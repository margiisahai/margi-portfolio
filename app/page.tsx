"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Home Nav (dark/light aware) ────────────────────────────────────── */
function HomeNav({ isDark }: { isDark: boolean }) {
  const color = isDark ? "#F4F0EB" : "#1C1917";
  const hoverColor = "#D4522A";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ transition: "background 0.6s ease" }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-20 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: 20,
            color,
            textDecoration: "none",
            transition: "color 0.6s ease",
          }}
        >
          Margi.
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {[
            { label: "Projects", href: "/projects" },
            { label: "About", href: "/about" },
            { label: "AI", href: "/ai" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color,
                textDecoration: "none",
                transition: "color 0.6s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = color)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Magnetic Text ───────────────────────────────────────────────────── */
function MagneticText({ text, color }: { text: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    () => text.split("").map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-letter]");
      const newOffsets: { x: number; y: number }[] = [];

      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;

        if (dist < radius) {
          const force = (1 - dist / radius) * 60;
          newOffsets.push({
            x: -(dx / dist) * force,
            y: -(dy / dist) * force,
          });
        } else {
          newOffsets.push({ x: 0, y: 0 });
        }
      });

      setOffsets(newOffsets);
    };

    const handleMouseLeave = () => {
      setOffsets(text.split("").map(() => ({ x: 0, y: 0 })));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text]);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center">
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-letter
          style={{
            display: "inline-block",
            color,
            transform: `translate(${offsets[i]?.x ?? 0}px, ${offsets[i]?.y ?? 0}px)`,
            transition:
              offsets[i]?.x === 0 && offsets[i]?.y === 0
                ? "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), color 0.6s ease"
                : "transform 0.18s linear, color 0.6s ease",
            whiteSpace: char === " " ? "pre" : "normal",
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function Home() {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const secondFoldRef = useRef<HTMLElement>(null);

  // Fade in on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Switch dark→light when second fold enters viewport
  useEffect(() => {
    const el = secondFoldRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsDark(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bgColor = isDark ? "#1C1917" : "#F4F0EB";
  const textColor = isDark ? "#F4F0EB" : "#1C1917";

  return (
    <main
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.6s ease",
        minHeight: "100vh",
      }}
    >
      <HomeNav isDark={isDark} />

      {/* First fold — dark hero */}
      <section className="h-screen flex flex-col items-center justify-center px-10 text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className="text-[80px] md:text-[120px] leading-[1.2] tracking-[-0.04em] select-none uppercase"
          >
            <MagneticText text="Hello," color={textColor} />
            <MagneticText text="I'm Margi." color={textColor} />
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          style={{ opacity: isDark ? 0.4 : 0, transition: "opacity 0.6s ease" }}
        >
          <div
            className="w-px h-10 animate-pulse"
            style={{ backgroundColor: textColor }}
          />
        </div>
      </section>

      {/* Second fold — light content */}
      <section
        ref={secondFoldRef}
        className="min-h-screen px-10 md:px-20 py-24 flex flex-col justify-center border-t"
        style={{ borderColor: "#1C191720" }}
      >
        <p
          className="text-[13px] uppercase tracking-[0.12em] mb-6"
          style={{ color: "#D4522A", fontFamily: "var(--font-dm-sans)" }}
        >
          Selected Work
        </p>
        <h2
          className="text-[48px] md:text-[64px] font-black tracking-[-0.03em] leading-[1] mb-4"
          style={{ color: "#1C1917", fontFamily: "var(--font-syne)" }}
        >
          Projects, case studies
          <br />& experiments.
        </h2>
        <p
          className="text-[18px] font-light mt-4 max-w-md"
          style={{ color: "#6B6560", fontFamily: "var(--font-dm-sans)" }}
        >
          UX research, product design, and UI — built with care.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 mt-10 group"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <span className="text-[15px] font-medium" style={{ color: "#1C1917" }}>
            View all work
          </span>
          <div
            className="h-px bg-[#1C1917] group-hover:w-12 transition-all duration-300"
            style={{ width: 20 }}
          />
        </Link>
      </section>
    </main>
  );
}
