import Nav from "../components/Nav";

export const metadata = {
  title: "Projects — Margi Sahai",
};

export default function ProjectsPage() {
  return (
    <main>
      <Nav />
      <div className="min-h-screen pt-[72px] px-10 md:px-20 py-24">
        <div className="border-b border-[#1C1917]/10 pb-12 mb-16">
          <p
            className="text-[#D4522A] text-[13px] uppercase tracking-[0.12em] mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Work
          </p>
          <h1
            className="text-[64px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-[#1C1917]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            All Projects
          </h1>
        </div>
        <p
          className="text-[18px] font-light text-[#6B6560]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Case studies and projects coming soon.
        </p>
      </div>
    </main>
  );
}
