"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      const size = hovered ? 20 : 12;
      cursor.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [hovered]);

  useEffect(() => {
    const selectors = "a, button, [role='button'], input, textarea, select, label";

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const attach = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach();

    // Re-attach if new elements appear
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovered ? 20 : 12,
        height: hovered ? 20 : 12,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform, width, height",
        transition: "width 0.45s cubic-bezier(0.23, 1, 0.32, 1), height 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    />
  );
}
