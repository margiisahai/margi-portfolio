import Nav from "../components/Nav";

export const metadata = {
  title: "Contact — Margi Sahai",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <div className="min-h-screen pt-[72px] px-10 md:px-20 flex flex-col justify-center">
        <p
          className="text-[#D4522A] text-[13px] uppercase tracking-[0.12em] mb-4"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Get in touch
        </p>
        <h1
          className="text-[64px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-[#1C1917] mb-8"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Let&apos;s make<br />something good.
        </h1>
        <p
          className="text-[18px] font-light text-[#6B6560] max-w-md mb-12"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Open to full-time roles, freelance projects, and interesting conversations. Don&apos;t be a stranger.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:hello@margi.design"
            className="inline-flex items-center justify-center bg-[#1C1917] text-[#F4F0EB] text-[15px] font-medium px-12 py-[18px] rounded-sm hover:bg-[#D4522A] transition-colors duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Say Hello
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[#1C1917]/20 text-[#6B6560] text-[15px] font-light px-12 py-[18px] rounded-sm hover:border-[#1C1917] hover:text-[#1C1917] transition-colors duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </main>
  );
}
