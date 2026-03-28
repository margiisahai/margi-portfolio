"use client";

import { useEffect, useState } from "react";

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
        <span
          className="text-[20px] font-black tracking-tight text-[#1C1917]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Margi.
        </span>
        <div className="hidden md:flex items-center gap-12">
          {["Projects", "About", "AI", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[15px] text-[#1C1917] hover:text-[#D4522A] transition-colors duration-200 tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-10 md:px-20 pt-[72px] relative overflow-hidden">
      <div
        className={`max-w-4xl transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p
          className="text-[#D4522A] text-[13px] font-normal uppercase tracking-[0.12em] mb-6"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Product Designer
        </p>
        <h1
          className="text-[80px] md:text-[112px] lg:text-[128px] font-black leading-[0.95] tracking-[-0.04em] text-[#1C1917]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Hello,
          <br />
          I&apos;m Margi.
        </h1>
        <p
          className="text-[18px] md:text-[20px] font-light text-[#6B6560] leading-relaxed max-w-[520px] mt-8"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          I design digital products that feel intuitive, look considered, and
          make people&apos;s lives a little better.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
          <a
            href="#projects"
            className="inline-flex items-center justify-center bg-[#1C1917] text-[#F4F0EB] text-[15px] font-medium px-9 py-4 rounded-sm hover:bg-[#D4522A] transition-colors duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View Work
          </a>
          <a
            href="#"
            className="text-[15px] text-[#6B6560] underline underline-offset-4 hover:text-[#1C1917] transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-10 md:right-20 bottom-12 flex items-center gap-3">
        <div className="w-10 h-px bg-[#6B6560]" />
        <span
          className="text-[12px] text-[#6B6560] uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Scroll to explore
        </span>
      </div>
    </section>
  );
}

/* ─── Project Card ────────────────────────────────────────────────────── */
interface Project {
  num: string;
  category: string;
  title: string;
  description: string;
  variant: "light" | "dark" | "terracotta";
  large?: boolean;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    category: "UX / Product",
    title: "Streamlining Onboarding for a FinTech App",
    description:
      "Redesigned the sign-up and onboarding flow, reducing drop-off by 38% and cutting time-to-value from 9 minutes to under 3.",
    variant: "light",
    large: true,
  },
  {
    num: "02",
    category: "UI / Design System",
    title: "Building a Design System from Zero",
    description:
      "Established a component library and token architecture used by a team of 12 designers across 3 products.",
    variant: "dark",
  },
  {
    num: "03",
    category: "Mobile / UX",
    title: "A Wellness App Reimagined",
    description:
      "End-to-end redesign of a mental wellness platform — research, IA, wireframes, and hi-fi UI for iOS.",
    variant: "terracotta",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const bg =
    project.variant === "dark"
      ? "bg-[#1C1917]"
      : project.variant === "terracotta"
      ? "bg-[#D4522A]"
      : "bg-[#EDE8E1]";

  const titleColor =
    project.variant === "light" ? "text-[#1C1917]" : "text-[#F4F0EB]";
  const bodyColor =
    project.variant === "light"
      ? "text-[#6B6560]"
      : project.variant === "dark"
      ? "text-[#8A8178]"
      : "text-[#F4F0EB]/70";
  const labelColor =
    project.variant === "light" ? "text-[#6B6560]" : "text-[#F4F0EB]/50";
  const ctaColor =
    project.variant === "light" ? "text-[#1C1917]" : "text-[#F4F0EB]";
  const lineColor =
    project.variant === "light" ? "bg-[#1C1917]" : "bg-[#F4F0EB]";

  if (project.large) {
    return (
      <div className={`${bg} rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[420px] md:min-h-[480px]`}>
        <div className="flex-1 flex flex-col justify-between p-10 md:p-14 gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className={`text-[12px] ${labelColor} uppercase tracking-[0.1em]`} style={{ fontFamily: "var(--font-dm-sans)" }}>{project.num}</span>
              <div className={`w-6 h-px ${lineColor} opacity-40`} />
              <span className={`text-[12px] ${labelColor} uppercase tracking-[0.1em]`} style={{ fontFamily: "var(--font-dm-sans)" }}>{project.category}</span>
            </div>
            <h3 className={`text-[32px] md:text-[40px] font-black leading-[1.1] tracking-[-0.03em] ${titleColor}`} style={{ fontFamily: "var(--font-syne)" }}>
              {project.title}
            </h3>
            <p className={`text-[15px] md:text-[16px] font-light ${bodyColor} leading-relaxed max-w-[380px]`} style={{ fontFamily: "var(--font-dm-sans)" }}>
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className={`text-[14px] font-medium ${ctaColor} group-hover:text-[#D4522A] transition-colors`} style={{ fontFamily: "var(--font-dm-sans)" }}>View Case Study</span>
            <div className={`w-5 h-px ${lineColor} group-hover:w-10 transition-all duration-300`} />
          </div>
        </div>
        <div className="md:w-[460px] min-h-[240px] md:min-h-0 bg-[#C8C0B4] flex items-center justify-center flex-shrink-0">
          <span className="text-[12px] text-[#8A8178] uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-dm-sans)" }}>Project Preview</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bg} rounded-sm flex-1 flex flex-col justify-between p-10 md:p-12 min-h-[360px] md:min-h-[400px]`}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className={`text-[12px] ${labelColor} uppercase tracking-[0.1em]`} style={{ fontFamily: "var(--font-dm-sans)" }}>{project.num}</span>
          <div className={`w-6 h-px ${lineColor} opacity-40`} />
          <span className={`text-[12px] ${labelColor} uppercase tracking-[0.1em]`} style={{ fontFamily: "var(--font-dm-sans)" }}>{project.category}</span>
        </div>
        <h3 className={`text-[28px] md:text-[34px] font-black leading-[1.1] tracking-[-0.03em] ${titleColor}`} style={{ fontFamily: "var(--font-syne)" }}>
          {project.title}
        </h3>
        <p className={`text-[14px] md:text-[15px] font-light ${bodyColor} leading-relaxed`} style={{ fontFamily: "var(--font-dm-sans)" }}>
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-10 group cursor-pointer">
        <span className={`text-[14px] font-medium ${ctaColor}`} style={{ fontFamily: "var(--font-dm-sans)" }}>View Case Study</span>
        <div className={`w-5 h-px ${lineColor} group-hover:w-10 transition-all duration-300`} />
      </div>
    </div>
  );
}

/* ─── Projects Section ────────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="px-10 md:px-20 pb-28 md:pb-36">
      <div className="flex items-end justify-between border-t border-[#1C1917]/10 pt-12 mb-16">
        <h2 className="text-[40px] md:text-[56px] font-black tracking-[-0.03em] leading-[1] text-[#1C1917]" style={{ fontFamily: "var(--font-syne)" }}>
          Selected Work
        </h2>
        <a href="#" className="text-[13px] text-[#6B6560] uppercase tracking-[0.08em] underline underline-offset-4 hover:text-[#1C1917] transition-colors pb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
          View all projects
        </a>
      </div>
      <div className="flex flex-col gap-6">
        <ProjectCard project={PROJECTS[0]} />
        <div className="flex flex-col md:flex-row gap-6">
          <ProjectCard project={PROJECTS[1]} />
          <ProjectCard project={PROJECTS[2]} />
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="px-10 md:px-20 py-24 md:py-32 border-t border-[#1C1917]/10">
      <div className="flex flex-col md:flex-row gap-16 md:gap-32 lg:gap-40">
        <div className="flex flex-col gap-3 md:flex-shrink-0">
          <span className="text-[12px] text-[#6B6560] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-dm-sans)" }}>About</span>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1C1917]" style={{ fontFamily: "var(--font-syne)" }}>
            The person<br />behind the work.
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:pt-14 flex-1">
          <p className="text-[18px] md:text-[20px] font-light text-[#1C1917] leading-[1.7]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            I&apos;m a product designer who believes the best interfaces are the ones you don&apos;t notice. I&apos;m drawn to the messy, human side of design — the research, the edge cases, the moments where a small decision changes everything.
          </p>
          <p className="text-[16px] font-light text-[#6B6560] leading-[1.7]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Currently based in India. Previously at — and open to new opportunities.
          </p>
          <div className="flex flex-row gap-12 md:gap-16 mt-2">
            {[
              { value: "4+", label: "Years of experience" },
              { value: "20+", label: "Projects shipped" },
              { value: "3", label: "Industries" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-[36px] font-black tracking-[-0.02em] text-[#D4522A]" style={{ fontFamily: "var(--font-syne)" }}>{stat.value}</span>
                <span className="text-[12px] text-[#6B6560] uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-dm-sans)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2 group cursor-pointer">
            <span className="text-[14px] font-medium text-[#1C1917] group-hover:text-[#D4522A] transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>Read full story</span>
            <div className="w-5 h-px bg-[#1C1917] group-hover:w-10 transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="bg-[#1C1917] px-10 md:px-20 py-28 md:py-36 flex flex-col items-center text-center">
      <span className="text-[12px] text-[#6B6560]/60 uppercase tracking-[0.12em] mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>Get in touch</span>
      <h2 className="text-[56px] md:text-[72px] lg:text-[80px] font-black tracking-[-0.04em] leading-[1] text-[#F4F0EB] max-w-3xl" style={{ fontFamily: "var(--font-syne)" }}>
        Let&apos;s make<br />something good.
      </h2>
      <p className="text-[16px] md:text-[18px] font-light text-[#8A8178] leading-relaxed max-w-md mt-6" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Open to full-time roles, freelance projects, and interesting conversations. Don&apos;t be a stranger.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
        <a
          href="mailto:hello@margi.design"
          className="inline-flex items-center justify-center bg-[#D4522A] text-[#F4F0EB] text-[15px] font-medium px-12 py-[18px] rounded-sm hover:bg-[#C03D1A] transition-colors duration-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Say Hello
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-[#6B6560]/30 text-[#8A8178] text-[15px] font-light px-12 py-[18px] rounded-sm hover:border-[#6B6560] hover:text-[#F4F0EB] transition-colors duration-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="px-10 md:px-20 py-8 border-t border-[#1C1917]/10 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-[16px] font-black tracking-[-0.02em] text-[#1C1917]" style={{ fontFamily: "var(--font-syne)" }}>Margi.</span>
      <span className="text-[13px] text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>© 2025 Margi Sahai. Designed with intention.</span>
      <div className="flex items-center gap-8">
        {["Twitter", "LinkedIn", "Dribbble"].map((link) => (
          <a key={link} href="#" className="text-[13px] text-[#6B6560] hover:text-[#1C1917] transition-colors tracking-wide" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
