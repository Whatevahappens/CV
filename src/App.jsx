import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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
    letterSpacing: "0.04em"
  }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem" }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
      {"//"}
    </span>
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 800,
      color: "#f0f0f0",
      margin: 0,
      letterSpacing: "-0.02em"
    }}>{children}</h2>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,255,180,0.4), transparent)" }} />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "1.75rem",
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
  { title: "Best Graduate Award", desc: "Awarded Best Graduate in the school", icon: "🎖️"},
  { title: "School Math Olympiad Winner", desc: "1st place in both Grade 7 and Grade 12.", icon: "🥇" },
  { title: "School IQ Olympiad Winner", desc: "1st place in Grade 8.", icon: "🥇" },
  { title: "School IQ Olympiad Third Place", desc: "3rd place in Grade 9.", icon: "🥉" },
];

export default function App() {
  const [typed, setTyped] = useState("");
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c10; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: #00ffb4; border-radius: 2px; }
        ::selection { background: rgba(0,255,180,0.25); }
        .nav-link { color: rgba(240,240,240,0.55); font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; text-decoration: none; letter-spacing: 0.08em; transition: color 0.2s; }
        .nav-link:hover { color: #00ffb4; }
        .social-link { color: rgba(240,240,240,0.6); text-decoration: none; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
        .social-link:hover { color: #00ffb4; }
        .cursor { display: inline-block; width: 2px; height: 1.1em; background: #00ffb4; animation: blink 0.85s step-end infinite; vertical-align: text-bottom; margin-left: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        .grid-bg { background-image: linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px); background-size: 48px 48px; }
      `}</style>

      <div style={{ background: "#080c10", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(8,12,16,0.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px"
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            ob<span style={{ color: "rgba(255,255,255,0.3)" }}>.dev</span>
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["about", "education", "experience", "projects", "skills", "achievements", "contact"].map(s => (
              <a key={s} href={`#${s}`} className="nav-link">{s}</a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem, 8vw, 8rem)", paddingTop: "80px", position: "relative", overflow: "hidden" }}>
          {/* Glow orb */}
          <div style={{ position: "absolute", top: "20%", right: "10%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(0,255,180,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(0,150,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "860px", position: "relative" }}>
            <div style={{ opacity: 0, animation: "float 0s 0.1s forwards", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                &gt; hello_world.sh
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              opacity: 0,
              animation: "none",
              animationFillMode: "forwards"
            }}
              ref={el => {
                if (el) {
                  setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    el.style.transition = "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s";
                    el.style.transform = "translateY(20px)";
                    requestAnimationFrame(() => {
                      setTimeout(() => { el.style.transform = "translateY(0)"; el.style.opacity = "1"; }, 50);
                    });
                  }, 100);
                }
              }}
            >
              <span style={{ display: "block", color: "#f0f0f0" }}>Orgil</span>
              <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1.5px rgba(240,240,240,0.25)" }}>Batbileg</span>
            </h1>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(0.9rem, 2vw, 1.15rem)", color: "rgba(240,240,240,0.6)", marginBottom: "2.5rem", minHeight: "1.8em" }}>
              {typed}<span className="cursor" />
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Tag>📍 Ulaanbaatar, Mongolia</Tag>
              <Tag>🎓 Final Year · MUST</Tag>
              <Tag>National Math Olympiad Finalist</Tag>
              <Tag>C1 English</Tag>
            </div>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: "https://github.com/Whatevahappens", icon: "⌥" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/orgil-batbileg-b418952a5/", icon: "◈" },
                { label: "Art Portfolio", href: "https://www.deviantart.com/orgilbatbileg", icon: "◎" },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link" style={{
                  padding: "10px 20px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  transition: "all 0.25s"
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
          <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#00ffb4" }}>SCROLL</span>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(#00ffb4, transparent)", animation: "float 2s ease-in-out infinite" }} />
          </div>
        </section>

        <div style={{ padding: "0 clamp(1.5rem, 8vw, 8rem)" }}>
          {/* ABOUT */}
          <section id="about" style={{ paddingTop: "7rem", paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn>
              <SectionLabel>About</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <Card style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(240,240,240,0.75)", fontWeight: 300 }}>
                    Final-year Software Engineering student at MUST with strong interests in backend development, Linux systems, and software architecture. I work primarily with Java, C++, Python, and database technologies, and enjoy building secure and efficient systems using tools like Spring Boot and JWT.
                  </p>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(240,240,240,0.75)", fontWeight: 300, marginTop: "1rem" }}>
                    My background in mathematics competitions helped shape my analytical thinking, while my academic work has led me to explore AI research and integrate AI techniques into software engineering projects. Outside of programming, I also create digital art and have published over 40 artworks exploring atmosphere, storytelling, and character design.
                  </p>
                </Card>
                {[
                  { label: "Email", value: "osohitooss@gmail.com", icon: "✉" },
                  { label: "Phone", value: "+976 99721585", icon: "◷" },
                ].map(({ label, value, icon }) => (
                  <Card key={label}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ffb4", fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "6px" }}>{icon} {label}</div>
                    <div style={{ color: "rgba(240,240,240,0.8)", fontSize: "0.95rem" }}>{value}</div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* EDUCATION */}
          <section id="education" style={{ paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Education</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
                      Mongolian University of Science and Technology
                    </div>
                    <div style={{ color: "#00ffb4", fontSize: "0.9rem", fontFamily: "'JetBrains Mono', monospace" }}>
                      Bachelor of Software Engineering
                    </div>
                  </div>
                  <Tag>Expected 2026</Tag>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ color: "rgba(240,240,240,0.45)", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>RELEVANT COURSEWORK</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["Data Mining & Machine Learning", "Data Structures & Algorithms", "Software Engineering", "Database Systems","Web Systems and Technology", "Computer Vision"].map(c => <Tag key={c}>{c}</Tag>)}
                  </div>
                </div>
              </Card>
            </FadeIn>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Internship Experience</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
                      Backend Developer Intern
                    </div>
                    <div style={{ color: "#00ffb4", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88rem" }}>E-Mongol Academy</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Tag>Internship</Tag>
                  </div>
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
          <section id="projects" style={{ paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Projects</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#f0f0f0" }}>
                    Asset Management System
                  </div>
                  <Tag>Final Year Project</Tag>
                </div>
                <p style={{ color: "rgba(240,240,240,0.7)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Computer Vision–based asset management platform designed to digitize and audit institutional assets. 
                  The system combines a full-stack responsive web application for asset management with a Computer Vision 
                  module that detects and verifies assets during audits. Detected assets are automatically compared with 
                  database records to identify discrepancies and evaluate the efficiency of automated auditing compared 
                  to traditional manual counting.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px", marginBottom: "1.25rem" }}>
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
                  {["Backend Development", "Database Systems", "System Architecture"].map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            </FadeIn>
          </section>

          {/* SKILLS */}
          <section id="skills" style={{ paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Technical Skills</SectionLabel></FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
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
          <section id="achievements" style={{ paddingBottom: "5rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Achievements</SectionLabel></FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {achievements.map((a, i) => (
                <FadeIn key={a.title} delay={i * 0.07}>
                  <Card style={{ height: "100%" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{a.icon}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#f0f0f0", marginBottom: "0.5rem" }}>{a.title}</div>
                    <div style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.875rem", lineHeight: 1.6 }}>{a.desc}</div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ paddingBottom: "7rem", maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn><SectionLabel>Contact</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <Card style={{ textAlign: "center", padding: "3rem 2rem" }}>
                <p style={{ color: "rgba(240,240,240,0.6)", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Open to backend engineering roles, system/server administration roles, graduate research opportunities,<br />or just a good conversation about systems and code.
                </p>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
                  {[
                    { label: "osohitooss@gmail.com", href: "mailto:osohitooss@gmail.com" },
                    { label: "GitHub", href: "https://github.com/Whatevahappens" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/orgil-batbileg-b418952a5/" },
                    { label: "Art Portfolio", href: "https://www.deviantart.com/orgilbatbileg" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link" style={{
                      padding: "12px 24px",
                      border: "1px solid rgba(0,255,180,0.3)",
                      borderRadius: "8px",
                      background: "rgba(0,255,180,0.05)",
                      color: "#00ffb4",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.82rem",
                      letterSpacing: "0.05em",
                      transition: "all 0.25s"
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
          padding: "1.5rem clamp(1.5rem, 8vw, 8rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(240,240,240,0.25)", fontSize: "0.72rem", letterSpacing: "0.08em" }}>
            © 2026 Orgil Batbileg
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,255,180,0.35)", fontSize: "0.72rem", letterSpacing: "0.08em" }}>
            Built with React + Tailwind
          </span>
        </div>
      </div>
    </>
  );
}