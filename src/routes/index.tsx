import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Github,
  Instagram,
  Youtube,
  Facebook,
  Music2,
  Code2,
  Palette,
  Braces,
  Atom,
  Layers,
  Wind,
  Database,
  Server,
  Figma,
  GitBranch,
  FileCode2,
  Globe,
  ArrowUpRight,
  Network,
  Send,
} from "lucide-react";
import profileImg from "../assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sajad Nazar — IT Support & Network Technician" },
      {
        name: "description",
        content:
          "Portfolio of Sajad Nazar, an IT Support and Network Technician building reliable networks, systems and modern web experiences.",
      },
      { property: "og:title", content: "Sajad Nazar — IT Support & Network Technician" },
      {
        property: "og:description",
        content:
          "Networking, troubleshooting, and modern web — explore Sajad's skills, projects and contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skill", label: "Skills" },
  { href: "#project", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SKILLS = [
  { icon: Code2, label: "HTML5" },
  { icon: Palette, label: "CSS3" },
  { icon: Braces, label: "JavaScript" },
  { icon: FileCode2, label: "TypeScript" },
  { icon: Atom, label: "React" },
  { icon: Layers, label: "Next.js" },
  { icon: Globe, label: "Alpine.js" },
  { icon: Wind, label: "Tailwind" },
  { icon: Database, label: "MySQL" },
  { icon: Server, label: "PostgreSQL" },
  { icon: Figma, label: "Figma" },
  { icon: GitBranch, label: "GitHub" },
];

const PROJECTS = [
  {
    title: "CryptoExplorer Website",
    desc: "An educational website about cryptocurrencies that introduces blockchain technology, showcases the top 10 digital currencies, and provides trusted resources for tracking prices.",
    tags: ["React", "API", "Charts"],
  },
  {
    title: "Social Dashboard",
    desc: "A dashboard showing social media stats and analytics in real-time with clean data visualizations.",
    tags: ["Next.js", "Analytics"],
  },
  {
    title: "Task Manager",
    desc: "Manage daily tasks, deadlines, and priorities with a clean, focused interface.",
    tags: ["TypeScript", "UI"],
  },
  {
    title: "Weather App",
    desc: "Check real-time weather conditions with animated icons and multi-day forecasts.",
    tags: ["API", "Animation"],
  },
  {
    title: "Portfolio",
    desc: "A personal portfolio website to showcase projects and skills elegantly.",
    tags: ["Design", "Motion"],
  },
  {
    title: "Game Website",
    desc: "Interactive web-based games with fun animations and score tracking.",
    tags: ["JavaScript", "Canvas"],
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function ProfilePhoto() {
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="profile-frame group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-secondary">
        <img
          src={profileImg}
          alt="Portrait of Sajad Nazar"
          loading="lazy"
          width={1024}
          height={1280}
          className="h-[520px] w-full object-cover"
        />
        <div className="profile-shine" />
        <div className="profile-caption absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/95 via-background/60 to-transparent p-5 pt-16">
          <div>
            <p className="text-lg font-bold text-foreground">Sajad Nazar</p>
            <p className="text-sm text-muted-foreground">
              IT Support & Network Technician
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Network className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="orb absolute -left-32 top-1/4 size-96 rounded-full bg-accent/10 blur-[120px]" />
        <div
          className="orb absolute -right-32 top-2/3 size-96 rounded-full bg-foreground/5 blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a
            href="#home"
            className="text-xl font-bold tracking-widest transition-colors hover:text-accent"
          >
            SAJAD<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-lg border border-border px-5 py-2 text-sm font-semibold transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground md:block"
          >
            Get In Touch
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute right-6 top-6 text-foreground"
          aria-label="Close menu"
        >
          <X className="size-8" />
        </button>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`text-3xl font-bold transition-all duration-500 hover:text-accent ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Hero */}
      <section id="home" className="flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <svg viewBox="0 0 1500 320" className="w-full max-w-3xl text-foreground">
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              className="hero-name fill-foreground stroke-accent"
              style={{
                fontSize: "220px",
                fontWeight: 800,
                letterSpacing: "0.05em",
                strokeWidth: 2,
              }}
            >
              SAJAD
            </text>
          </svg>
          <Reveal delay={400}>
            <h1 className="mt-2 max-w-xl text-balance text-2xl font-medium leading-snug text-muted-foreground md:text-3xl">
              Someone who plays with networks —{" "}
              <span className="rounded-lg bg-foreground px-2 py-0.5 font-bold text-background">
                and builds things that work
              </span>
            </h1>
          </Reveal>
          <Reveal delay={650}>
            <a
              href="#project"
              className="group mt-10 inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_20px_50px_-12px] hover:shadow-accent/40"
            >
              Show my Work
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              About <span className="text-accent">Me</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
            <Reveal delay={150}>
              <ProfilePhoto />
            </Reveal>
            <Reveal delay={300}>
              <div className="space-y-5">
                <h3 className="text-3xl font-bold">SAJAD</h3>
                <span className="inline-block rounded-lg bg-foreground px-3 py-1.5 text-lg font-semibold text-background">
                  IT Support & Network Technician
                </span>
                <p className="leading-relaxed text-muted-foreground">
                  Hello! I'm Sajad, an IT Support and Network Technician passionate
                  about building reliable, efficient, and well-structured technology
                  environments. I enjoy working with networks, troubleshooting
                  technical issues, and ensuring systems run smoothly and securely.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  I've gained hands-on experience in network configuration, VLAN
                  setup, internet distribution, printer configuration, CCTV
                  monitoring, and general IT support within companies and work
                  environments. My journey in IT started from pure curiosity and
                  quickly turned into a real passion for technology and
                  problem-solving.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Beyond technical knowledge, I value communication, teamwork, and
                  continuous learning. I'm constantly looking for opportunities to
                  grow in networking, system administration, and IT solutions.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skill" className="px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              My <span className="text-accent">Skills</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {SKILLS.map((skill, i) => (
              <Reveal key={skill.label} delay={i * 60}>
                <div className="group flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_-12px] hover:shadow-accent/25">
                  <skill.icon className="size-7 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
                  <span className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {skill.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="project" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              My <span className="text-accent">Projects</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.title} delay={(i % 3) * 120}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-[0_24px_60px_-16px] hover:shadow-accent/20">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                      <Code2 className="size-6" />
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                  </div>
                  <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-accent/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-lg border border-border py-2 text-sm font-semibold transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background">
                      Github
                    </button>
                    <button className="flex-1 rounded-lg border border-border py-2 text-sm font-semibold transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground">
                      Demo
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              Get In <span className="text-accent">Touch</span>
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Have a project or need IT support? Send me a message.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <form
              className="mt-12 space-y-4 rounded-2xl border border-border bg-card/50 p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {["Name...", "Email...", "Phone...", "Subject..."].map(
                  (placeholder) => (
                    <input
                      key={placeholder}
                      type="text"
                      placeholder={placeholder}
                      className="rounded-lg border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  ),
                )}
              </div>
              <textarea
                placeholder="Message..."
                rows={6}
                className="w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3.5 font-semibold text-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                Send Message
                <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <a href="#home" className="text-2xl font-bold tracking-widest">
                SAJAD<span className="text-accent">.</span>
              </a>
              <p className="mt-4 max-w-sm text-muted-foreground">
                IT Support & Network Technician focused on troubleshooting,
                networking, and reliable IT solutions.
              </p>
              <div className="mt-6 flex gap-3">
                {[Instagram, Youtube, Facebook, Music2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold">Skills</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {["React.js", "Next.js", "Tailwind CSS", "TypeScript"].map((s) => (
                    <li key={s}>
                      <a href="#skill" className="transition-colors hover:text-accent">
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Technology</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {["Figma", "GitHub", "MySQL", "PostgreSQL"].map((s) => (
                    <li key={s}>
                      <a href="#skill" className="transition-colors hover:text-accent">
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Navigation</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="transition-colors hover:text-accent">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">
          © 2026 Sajad Nazar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
