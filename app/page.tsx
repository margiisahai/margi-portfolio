"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Loader from "./components/Loader";

/* ─── Project Card Stack ─────────────────────────────────────────────── */
const PROJECTS = [
  { id: 1, bg: "#D4522A", label: "Project 01", sub: "UX Research & Design" },
  { id: 2, bg: "#1C1917", label: "Project 02", sub: "Product Design" },
  { id: 3, bg: "#C8C0B4", label: "Project 03", sub: "UI Design" },
];

const CARD_SIZE = 400;

// Each card tracks its own named position — no slot mapping
type CardPos = "front" | "middle" | "back" | "lifting" | "arc-out" | "arc-back";

function CardStack() {
  const [positions, setPositions] = useState<CardPos[]>(["front", "middle", "back"]);
  const [topIdx, setTopIdx]       = useState(0);
  const [exitDir, setExitDir]     = useState<1 | -1>(1);
  const [busy, setBusy]           = useState(false);

  const styleFor = (pos: CardPos): React.CSSProperties => {
    const smooth = "transform 0.75s cubic-bezier(0.23,1,0.32,1)";
    switch (pos) {
      case "front":
        return { zIndex: 10, transform: "scale(1) translateY(0)",                      opacity: 1, transition: smooth };
      case "middle":
        return { zIndex: 5,  transform: "rotate(7deg) scale(0.94) translateY(6px)",    opacity: 1, transition: smooth };
      case "back":
        return { zIndex: 1,  transform: "rotate(-7deg) scale(0.88) translateY(12px)",  opacity: 1, transition: smooth };

      // ── Phase 1: card lifts straight up with a slight tilt ──────────────
      case "lifting": {
        const rot = exitDir === 1 ? 5 : -5;
        return { zIndex: 20,
                 transform: `translateY(-50px) scale(1.07) rotate(${rot}deg)`,
                 opacity: 1,
                 transition: "transform 0.22s ease-out" };
      }

      // ── Phase 2: card arcs OUT to the side (still above the deck) ────────
      case "arc-out": {
        const tx  = exitDir === 1 ?  140 : -140;
        const rot = exitDir === 1 ?   18 :  -18;
        return { zIndex: 20,
                 transform: `translateX(${tx}px) translateY(-60px) rotate(${rot}deg) scale(0.97)`,
                 opacity: 1,
                 transition: "transform 0.3s ease-in" };
      }

      // ── Phase 3: card arcs BACK behind the deck (z drops to 1) ───────────
      // Transition from arc-out position → back position = natural curved return
      case "arc-back":
        return { zIndex: 1,
                 transform: "rotate(-7deg) scale(0.88) translateY(12px)",
                 opacity: 1,
                 transition: "transform 0.52s cubic-bezier(0.33,1,0.68,1)" };
    }
  };

  const go = (d: 1 | -1) => {
    if (busy) return;
    setBusy(true);
    setExitDir(d);

    const frontI  = positions.indexOf("front");
    const middleI = positions.indexOf("middle");
    const backI   = positions.indexOf("back");

    // ① Lift
    setPositions(p => { const n = [...p] as CardPos[]; n[frontI] = "lifting"; return n; });

    // ② Arc out to the side (220ms after lift starts)
    setTimeout(() => {
      setPositions(p => { const n = [...p] as CardPos[]; n[frontI] = "arc-out"; return n; });
    }, 220);

    // ③ Arc back behind — simultaneously promote the other two cards
    //    arc-out takes 300ms so we fire at 220+300=520ms
    setTimeout(() => {
      setPositions(p => {
        const n = [...p] as CardPos[];
        n[frontI]  = "arc-back"; // z drops to 1 → card slides behind the deck
        n[middleI] = "front";    // next card rises to top
        n[backI]   = "middle";   // back card steps up
        return n;
      });
      setTopIdx(middleI);
    }, 520);

    // ④ Settle into official "back" state (same transform → no visual jump)
    //    arc-back transition is 520ms, so 520+520=1040ms
    setTimeout(() => {
      setPositions(p => {
        const n = [...p] as CardPos[];
        if (n[frontI] === "arc-back") n[frontI] = "back";
        return n;
      });
    }, 1050);

    // ⑤ Unlock
    setTimeout(() => setBusy(false), 1300);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-14">

        {/* Left chevron */}
        <button onClick={() => go(-1)} style={{ background: "none", border: "none", padding: 8, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10l6-6" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Deck */}
        <div style={{ position: "relative", width: CARD_SIZE, height: CARD_SIZE }}>
          {PROJECTS.map((card, i) => (
            <div
              key={card.id}
              style={{
                position: "absolute",
                inset: 0,
                width: CARD_SIZE,
                height: CARD_SIZE,
                borderRadius: 40,
                background: card.bg,
                ...styleFor(positions[i]),
              }}
            />
          ))}
        </div>

        {/* Right chevron */}
        <button onClick={() => go(1)} style={{ background: "none", border: "none", padding: 8, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* Label — uses topIdx so it stays stable during the animation */}
      <div className="text-center">
        <p style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, color: "#1C1917" }}>
          {PROJECTS[topIdx].label}
        </p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "#6B6560", marginTop: 4 }}>
          {PROJECTS[topIdx].sub}
        </p>
      </div>
    </div>
  );
}

/* ─── Home Nav (dark/light aware) ────────────────────────────────────── */
function HomeNav({ isDark }: { isDark: boolean }) {
  const color = isDark ? "#F4F0EB" : "#1C1917";
  const hoverColor = "#D4522A";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Hide on scroll down (only after scrolling past 80px), show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      // Show nav when scrolling stops (150ms of no scroll events)
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setHidden(false), 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  const bgColor = isDark ? "#1C1917" : "#F4F0EB";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? bgColor : "transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "background-color 0.5s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-20 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: 24,
            letterSpacing: "0.02em",
            color: "#B82E29",
            textDecoration: "none",
          }}
        >
          MARGI
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
                transition: "color 0.8s ease",
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
    <div ref={containerRef} className="flex flex-wrap justify-start">
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
                ? "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), color 0.8s ease"
                : "transform 0.18s linear, color 0.8s ease",
            whiteSpace: char === " " ? "pre" : "normal",
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
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
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [starScrollY, setStarScrollY] = useState(0);
  const secondFoldRef = useRef<HTMLElement>(null);

  const handleLoaderDone = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setVisible(true), 200);
  }, []);

  // Auto-trigger since loader is parked
  useEffect(() => {
    handleLoaderDone();
  }, [handleLoaderDone]);

  // Staggered star parallax scroll
  useEffect(() => {
    const onScroll = () => setStarScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <>
      <Loader onDone={handleLoaderDone} />
      <main
        style={{
          backgroundColor: bgColor,
          minHeight: "100vh",
          opacity: loaded ? 1 : 0,
          transition: "background-color 0.8s ease, opacity 0.8s ease",
          position: "relative",
          isolation: "isolate",
        }}
      >
        <HomeNav isDark={isDark} />

        {/* ── Star — fixed, parallax, behind all content ── */}
        <svg
          viewBox="0 0 1565 1604"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 1640,
            height: 1640,
            top: "calc(50vh + 100px)",
            left: 150,
            transform: `translate(-50%, calc(-50% + ${starScrollY * 0.75}px))`,
            transition: "fill 0.8s ease, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <path
            d="M782.5 0L932.225 431.524L1335.81 234.9L1143.97 648.544L1565 802L1143.97 955.456L1335.81 1369.1L932.225 1172.48L782.5 1604L632.775 1172.48L229.189 1369.1L421.032 955.456L0 802L421.032 648.544L229.189 234.9L632.775 431.524L782.5 0Z"
            style={{
              fill: isDark ? "#2F2F2F" : "#C8C0B4",
              transition: "fill 0.8s ease",
            }}
          />
        </svg>

        {/* ── Hero ── */}
        <section className="h-screen flex flex-col items-center justify-center px-10 relative" style={{ zIndex: 1 }}>
          <div
            className={`relative z-10 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex flex-col items-start">
              <div className="decorative-h1 select-none">
                <MagneticText text="PORTFOLIO" color={textColor} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontWeight: 400,
                  fontSize: 80,
                  lineHeight: 1,
                  letterSpacing: "0px",
                  textTransform: "uppercase",
                  marginTop: -72,
                }}
              >
                <MagneticText text="MARGI SAHAI" color={textColor} />
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute bottom-10 flex flex-col items-center"
            style={{ opacity: isDark ? 0.4 : 0, transition: "opacity 0.8s ease" }}
          >
            <div className="w-px h-10 animate-pulse" style={{ backgroundColor: textColor }} />
          </div>
        </section>

        {/* ── Selected Work ── */}
        <section
          ref={secondFoldRef}
          className="min-h-screen px-10 md:px-20 py-32 flex flex-col items-center justify-center gap-16"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="text-center">
            <p
              className="text-[12px] uppercase tracking-[0.14em] mb-4"
              style={{ color: "#D4522A", fontFamily: "var(--font-dm-sans)" }}
            >
              Selected Work
            </p>
            <h2 className="section-h1">
              Projects AND experiments.
            </h2>
          </div>

          <CardStack />

          <Link
            href="/projects"
            className="inline-flex items-center gap-3 group"
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

        {/* ── About ── */}
        <section
          className="min-h-screen px-10 md:px-20 py-32 flex flex-col justify-center"
          style={{ backgroundColor: "#EDE8E1", position: "relative", zIndex: 1 }}
        >
          <p
            className="text-[12px] uppercase tracking-[0.14em] mb-8"
            style={{ color: "#D4522A", fontFamily: "var(--font-dm-sans)" }}
          >
            About
          </p>
          <h2
            className="text-[48px] md:text-[72px] font-black tracking-[-0.03em] leading-[1]"
            style={{ color: "#1C1917", fontFamily: "var(--font-syne)" }}
          >
            Designer. Thinker.
            <br />Problem solver.
          </h2>
        </section>

        {/* ── Contact ── */}
        <section
          className="min-h-screen px-10 md:px-20 py-32 flex flex-col justify-center"
          style={{ backgroundColor: "#1C1917", position: "relative", zIndex: 1 }}
        >
          <p
            className="text-[12px] uppercase tracking-[0.14em] mb-8"
            style={{ color: "#D4522A", fontFamily: "var(--font-dm-sans)" }}
          >
            Contact
          </p>
          <h2
            className="text-[48px] md:text-[72px] font-black tracking-[-0.03em] leading-[1]"
            style={{ color: "#F4F0EB", fontFamily: "var(--font-syne)" }}
          >
            Let's build
            <br />something great.
          </h2>
        </section>

        {/* ── Footer ── */}
        <footer
          className="px-10 md:px-20 py-10 flex items-center justify-between border-t"
          style={{ backgroundColor: "#1C1917", borderColor: "#F4F0EB20" }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.08em",
              color: "#F4F0EB",
            }}
          >
            MARGI.
          </span>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: "#6B6560",
            }}
          >
            © 2026 Margi Sahai
          </span>
        </footer>
      </main>
    </>
  );
}
