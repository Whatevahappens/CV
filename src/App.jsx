import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const Tag = ({ children }) => (
  <span style={{
    background: "rgba(0,255,180,0.08)",
    border: "1px solid rgba(0,255,180,0.25)",
    color: "#00ffb4",
    fontSize: "0.72rem",
    padding: "2px 10px",
    borderRadius: "3px",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap"
  }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem" }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.75rem", letterSpacing: "0.15em" }}>{"//"}</span>
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
      fontWeight: 800,
      color: "#f0f0f0",
      margin: 0,
      letterSpacing: "-0.02em",
      whiteSpace: "nowrap"
    }}>{children}</h2>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,255,180,0.4), transparent)" }} />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "12px",
      padding: "1.5rem",
      backdropFilter: "blur(4px)",
      transition: "border-color 0.3s, background 0.3s",
      ...style
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,180,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
  >
    {children}
  </div>
);

const NAV_LINKS = ["about", "education", "experience", "projects", "skills", "achievements", "contact"];

const skills = {
  "Languages": ["C++", "Java", "Python", "C#", "JavaScript", "TypeScript", "SQL"],
  "Backend": ["Spring Boot", "REST APIs", "JWT Auth", "Spring Security", "Backend Architecture"],
  "Databases": ["MongoDB", "MS SQL Server"],
  "Web": ["HTML", "CSS"],
  "Tools": ["Git", "GitHub", "Docker"],
  "OS": ["Windows", "Arch Linux", "EndeavourOS"],
};

const achievements = [
  { title: "National Universities Math Olympiad Finalist", desc: "Ranked 16th nationally among Mongolia's undergraduate mathematics students.", icon: "🏅" },
  { title: "MUST Mathematical Olympiad Finalist", desc: "Placed 16th among 65 final competitors.", icon: "🎓" },
  { title: "Best Graduate Award", desc: "Awarded Best Graduate in the school.", icon: "🎖️" },
  { title: "School Math Olympiad Winner", desc: "1st place in both Grade 7 and Grade 12.", icon: "🥇" },
  { title: "School IQ Olympiad Winner", desc: "1st place in Grade 8.", icon: "🥇" },
  { title: "School IQ Olympiad Third Place", desc: "3rd place in Grade 9.", icon: "🥉" },
];

export default function App() {
  const [typed, setTyped] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const fullText = "Backend & Systems Developer";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c10; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: #00ffb4; border-radius: 2px; }
        ::selection { background: rgba(0,255,180,0.25); }

        .nav-link {
          color: rgba(240,240,240,0.55);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #00ffb4; }

        .mobile-nav-link {
          color: rgba(240,240,240,0.7);
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          text-decoration: none;
          letter-spacing: 0.1em;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: block;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #00ffb4; }

        .social-link {
          color: rgba(240,240,240,0.6);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .social-link:hover { color: #00ffb4; }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #00ffb4;
          animation: blink 0.85s step-end infinite;
          vertical-align: text-bottom;
          margin-left: 2px;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Responsive grid helpers */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 600px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; }
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        @media (max-width: 480px) {
          .achievements-grid { grid-template-columns: 1fr; }
        }

        .contact-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .hero-social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .project-features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 480px) {
          .project-features { grid-template-columns: 1fr; }
        }

        /* Hamburger button */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          cursor: pointer;
          padding: 6px;
          transition: border-color 0.2s;
        }
        .hamburger:hover { border-color: #00ffb4; }
        .hamburger span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: rgba(240,240,240,0.7);
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex; }
        }

        .mobile-menu {
          position: fixed;
          top: 56px;
          left: 0;
          right: 0;
          background: rgba(8,12,16,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 1rem 1.5rem 1.5rem;
          z-index: 99;
          transform-origin: top;
          transition: opacity 0.2s, transform 0.2s;
        }
        .mobile-menu.closed {
          opacity: 0;
          pointer-events: none;
          transform: scaleY(0.95);
        }
        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
          transform: scaleY(1);
        }

        /* Section padding responsive */
        .section-pad {
          padding-top: 6rem;
          padding-bottom: 4rem;
        }
        @media (max-width: 600px) {
          .section-pad { padding-top: 4rem; padding-bottom: 3rem; }
        }

        .page-pad {
          padding-left: clamp(1.25rem, 6vw, 8rem);
          padding-right: clamp(1.25rem, 6vw, 8rem);
        }
      `}</style>

      <div style={{ background: "#080c10", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(8,12,16,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0 clamp(1.25rem, 5vw, 4rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px"
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            ob<span style={{ color: "rgba(255,255,255,0.3)" }}>.dev</span>
          </span>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", gap: "1.75rem" }}>
            {NAV_LINKS.map(s => (
              <a key={s} href={`#${s}`} className="nav-link">{s}</a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : "closed"}`}>
          {NAV_LINKS.map(s => (
            <a
              key={s}
              href={`#${s}`}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >{s}</a>
          ))}
        </div>

        {/* HERO */}
        <section className="grid-bg page-pad" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", paddingTop: "80px", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "20%", right: "10%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(0,255,180,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(0,150,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "860px", position: "relative" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                &gt; hello_world.sh
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 10vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.25rem",
            }}>
              <span style={{ display: "block", color: "#f0f0f0" }}>Orgil</span>
              <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1.5px rgba(240,240,240,0.25)" }}>Batbileg</span>
            </h1>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(0.82rem, 2.5vw, 1.1rem)", color: "rgba(240,240,240,0.6)", marginBottom: "2rem", minHeight: "1.8em" }}>
              {typed}<span className="cursor" />
            </p>

            <div className="hero-tags">
              <Tag>📍 Ulaanbaatar, Mongolia</Tag>
              <Tag>🎓 Final Year · MUST</Tag>
              <Tag>Math Olympiad Finalist</Tag>
              <Tag>C1 English</Tag>
            </div>

            <div className="hero-social-links">
              {[
                { label: "GitHub", href: "https://github.com/Whatevahappens", icon: "⌥" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/orgil-batbileg-b418952a5/", icon: "◈" },
                { label: "Art Portfolio", href: "https://www.deviantart.com/orgilbatbileg", icon: "◎" },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link" style={{
                  padding: "9px 18px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  transition: "all 0.25s",
                  fontSize: "0.875rem"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffb4"; e.currentTarget.style.color = "#00ffb4"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(240,240,240,0.6)"; }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{icon}</span> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#00ffb4" }}>SCROLL</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(#00ffb4, transparent)", animation: "float 2s ease-in-out infinite" }} />
          </div>
        </section>

        <div className="page-pad">

          {/* ABOUT */}
          <section id="about" className="section-pad" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>About</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <div className="about-grid">
                <Card style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.8, color: "rgba(240,240,240,0.75)", fontWeight: 300 }}>
                    Final-year Software Engineering student at MUST with strong interests in backend development, Linux systems, and software architecture. I work primarily with Java, C++, Python, and database technologies, and enjoy building secure and efficient systems using tools like Spring Boot and JWT.
                  </p>
                  <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.8, color: "rgba(240,240,240,0.75)", fontWeight: 300, marginTop: "1rem" }}>
                    My background in mathematics competitions shaped my analytical thinking, while my academic work has led me to explore AI research and integrate AI techniques into software engineering. Outside of programming, I create digital art and have published over 40 artworks exploring atmosphere, storytelling, and character design.
                  </p>
                </Card>
                {[
                  { label: "Email", value: "osohitooss@gmail.com", icon: "✉" },
                  { label: "Phone", value: "+976 99721585", icon: "◷" },
                ].map(({ label, value, icon }) => (
                  <Card key={label}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "6px" }}>{icon} {label}</div>
                    <div style={{ color: "rgba(240,240,240,0.8)", fontSize: "0.9rem", wordBreak: "break-all" }}>{value}</div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* EDUCATION */}
          <section id="education" style={{ paddingBottom: "4rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Education</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
                      Mongolian University of Science and Technology
                    </div>
                    <div style={{ color: "#00ffb4", fontSize: "0.88rem", fontFamily: "'JetBrains Mono', monospace" }}>
                      Bachelor of Software Engineering
                    </div>
                  </div>
                  <Tag>Expected 2026</Tag>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ color: "rgba(240,240,240,0.45)", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>RELEVANT COURSEWORK</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["Data Mining & Machine Learning", "Data Structures & Algorithms", "Software Engineering", "Database Systems", "Web Systems and Technology", "Computer Vision"].map(c => <Tag key={c}>{c}</Tag>)}
                  </div>
                </div>
              </Card>
            </FadeIn>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ paddingBottom: "4rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Internship Experience</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
                      Backend Developer Intern
                    </div>
                    <div style={{ color: "#00ffb4", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>E-Mongol Academy</div>
                  </div>
                  <Tag>Internship</Tag>
                </div>
                <p style={{ color: "rgba(240,240,240,0.7)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Worked on the backend of a property management system under senior developers. Built real-world, secure backend features — improving independent learning and applied architecture skills.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Java", "Spring Boot", "Spring Security", "JWT Authentication", "MongoDB"].map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            </FadeIn>
          </section>

          {/* PROJECTS */}
          <section id="projects" style={{ paddingBottom: "4rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Projects</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 700, color: "#f0f0f0" }}>
                    Asset Management System
                  </div>
                  <Tag>Final Year Project</Tag>
                </div>
                <p style={{ color: "rgba(240,240,240,0.7)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Computer Vision–based asset management platform designed to digitize and audit institutional assets. Combines a full-stack responsive web application with a Computer Vision module that detects and verifies assets during audits, comparing against database records to identify discrepancies.
                </p>
                <div className="project-features">
                  {[
                    "Full-stack responsive asset management web platform",
                    "Computer Vision module for automated asset auditing",
                    "Database comparison between detected assets and records",
                    "Audit efficiency analysis vs manual counting"
                  ].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "rgba(240,240,240,0.65)", fontSize: "0.875rem" }}>
                      <span style={{ color: "#00ffb4", marginTop: "2px", flexShrink: 0 }}>›</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Backend Development", "Database Systems", "System Architecture", "Computer Vision"].map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            </FadeIn>
          </section>

          {/* SKILLS */}
          <section id="skills" style={{ paddingBottom: "4rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Technical Skills</SectionLabel></FadeIn>
            <div className="skills-grid">
              {Object.entries(skills).map(([cat, items], i) => (
                <FadeIn key={cat} delay={i * 0.06}>
                  <Card style={{ height: "100%" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>{cat.toUpperCase()}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {items.map(s => <Tag key={s}>{s}</Tag>)}
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" style={{ paddingBottom: "4rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Achievements</SectionLabel></FadeIn>
            <div className="achievements-grid">
              {achievements.map((a, i) => (
                <FadeIn key={a.title} delay={i * 0.07}>
                  <Card style={{ height: "100%" }}>
                    <div style={{ fontSize: "1.6rem", marginBottom: "0.65rem" }}>{a.icon}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#f0f0f0", marginBottom: "0.4rem" }}>{a.title}</div>
                    <div style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.85rem", lineHeight: 1.6 }}>{a.desc}</div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ paddingBottom: "6rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Contact</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card style={{ textAlign: "center", padding: "clamp(1.75rem, 5vw, 3rem) 1.5rem" }}>
                <p style={{ color: "rgba(240,240,240,0.6)", fontSize: "clamp(0.88rem, 2vw, 1rem)", marginBottom: "2rem", lineHeight: 1.75 }}>
                  Open to backend engineering roles, system/server administration, graduate research opportunities, or just a good conversation about systems and code.
                </p>
                <div className="contact-links">
                  {[
                    { label: "osohitooss@gmail.com", href: "mailto:osohitooss@gmail.com" },
                    { label: "GitHub", href: "https://github.com/Whatevahappens" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/orgil-batbileg-b418952a5/" },
                    { label: "Art Portfolio", href: "https://www.deviantart.com/orgilbatbileg" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      padding: "11px 20px",
                      border: "1px solid rgba(0,255,180,0.3)",
                      borderRadius: "8px",
                      background: "rgba(0,255,180,0.05)",
                      color: "#00ffb4",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                      transition: "all 0.25s",
                      whiteSpace: "nowrap"
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,180,0.12)"; e.currentTarget.style.borderColor = "#00ffb4"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,180,0.05)"; e.currentTarget.style.borderColor = "rgba(0,255,180,0.3)"; }}
                    >{label}</a>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </section>
        </div>

        {/* FOOTER */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "1.25rem clamp(1.25rem, 6vw, 8rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem"
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(240,240,240,0.25)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
            © 2026 Orgil Batbileg
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,255,180,0.35)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
            Built with React + Vite
          </span>
        </div>
      </div>
    </>
  );
}