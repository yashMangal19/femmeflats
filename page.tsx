"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const profiles = [
  { id: 1, name: "Ananya S.", age: 24, photo: "https://randomuser.me/api/portraits/women/44.jpg", location: "Koramangala, Bengaluru", rent: "₹12,000 / mo", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Veg only", "Early riser", "WFH", "No pets"], lookingFor: "1BHK share", verified: true },
  { id: 2, name: "Priya M.", age: 27, photo: "https://randomuser.me/api/portraits/women/68.jpg", location: "Baner, Pune", rent: "₹9,500 / mo", activeStatus: "Active yesterday", activeDot: "#FFC107", preferences: ["Occ. smoker ok", "Any diet", "Night owl", "Office goer", "Cat ok"], lookingFor: "2BHK share", verified: true },
  { id: 3, name: "Riya K.", age: 22, photo: "https://randomuser.me/api/portraits/women/90.jpg", location: "Malviya Nagar, Delhi", rent: "₹8,000 / mo", activeStatus: "Active 3 days ago", activeDot: "#9E9E9E", preferences: ["Non-smoker", "Veg preferred", "Flexible timing", "Student", "No pets"], lookingFor: "PG / room share", verified: false },
  { id: 4, name: "Meera T.", age: 29, photo: "https://randomuser.me/api/portraits/women/31.jpg", location: "Juhu, Mumbai", rent: "₹18,000 / mo", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Any diet", "Early riser", "Freelancer", "Dog lover"], lookingFor: "2BHK share", verified: true },
];

const navLinks = ["Discover", "How it works", "Safety", "Stories"];

function FloatingCard({ photo, name, age, location, preferences, delay, style }: {
  photo: string; name: string; age: number; location: string;
  preferences: string[]; delay: number; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      position: "absolute",
      background: "rgba(248,246,240,0.96)", backdropFilter: "blur(12px)",
      borderRadius: "16px", padding: "12px 14px",
      border: "1px solid rgba(168,184,168,0.35)",
      boxShadow: "0 8px 32px rgba(45,58,45,0.12)",
      animation: `floatCard 6s ease-in-out ${delay}s infinite`,
      width: "190px",
      zIndex: 10,
      ...style,
    }}>
      <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E8EDE6", flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: "12px", color: "#2D3A2D" }}>{name}, {age}</div>
          <div style={{ fontSize: "10px", color: "#A8B8A8", marginTop: "1px" }}>{location}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "9px" }}>
        {preferences.slice(0, 3).map(p => (
          <span key={p} style={{ background: "#E8EDE6", color: "#6B7F6B", fontSize: "9px", fontWeight: 500, padding: "2px 7px", borderRadius: "100px" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

function MatchNotif({ delay }: { delay: number }) {
  return (
    <div style={{
      position: "absolute", right: "6%", top: "18%",
      background: "rgba(107,127,107,0.95)", borderRadius: "14px",
      padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px",
      animation: `floatCard 5s ease-in-out ${delay}s infinite`,
      boxShadow: "0 4px 20px rgba(107,127,107,0.25)",
      zIndex: 10,
    }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#A8EDB0", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", fontWeight: 600, color: "#F8F6F0", whiteSpace: "nowrap" }}>New match found!</span>
    </div>
  );
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2400);
    return () => clearInterval(t);
  }, []);

  const matchPct = [87, 92, 78, 95, 89][tick % 5];

  return (
    <main>
      <style>{`
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes matchPop { 0%{transform:scale(0.95);opacity:0.8} 50%{transform:scale(1.02);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes orbitDot { from{transform:rotate(0deg) translateX(52px) rotate(0deg)} to{transform:rotate(360deg) translateX(52px) rotate(-360deg)} }
        @keyframes orbitDot2 { from{transform:rotate(120deg) translateX(52px) rotate(-120deg)} to{transform:rotate(480deg) translateX(52px) rotate(-480deg)} }
        @keyframes orbitDot3 { from{transform:rotate(240deg) translateX(52px) rotate(-240deg)} to{transform:rotate(600deg) translateX(52px) rotate(-600deg)} }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
      `}</style>

      {/* ── SECTION 1: HERO ── */}
      <section className="snap-section" style={{ background: "var(--sage)", display: "flex", flexDirection: "column" }}>
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 32px", borderBottom: "1px solid rgba(168,184,168,0.25)",
          background: "rgba(232,237,230,0.88)", backdropFilter: "blur(10px)",
          position: "sticky", top: 0, zIndex: 50, flexShrink: 0,
        }}>
          <span className="font-display" style={{ fontSize: "20px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.3px" }}>FemmeFlats</span>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <span key={link} className="nav-link" style={{ position: "relative" }} onClick={() => setActiveNav(link)}>
                {link}{activeNav === link && <span className="nav-pill" />}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link href="/login" className="btn-ghost">Log in</Link>
            <Link href="/signup" className="btn-primary">Join free</Link>
          </div>
        </nav>

        {/*
          KEY FIX 1: grid with justifyItems:center so each column's content
          centers itself within that column's space.
          KEY FIX 2: padding reduced so left column has breathing room to center.
        */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          justifyItems: "center",
          padding: "0 24px",
          gap: "0",
          overflow: "hidden",
        }}>

          {/* ── LEFT HALF: Hero content centered in left column ── */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            animation: "slideIn 0.6s ease both",
            width: "100%",
            maxWidth: "440px",
            padding: "0 16px 0 24px",
          }}>
            <span style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
              textTransform: "uppercase", color: "var(--sage-deep)",
              background: "rgba(107,127,107,0.1)", padding: "5px 14px",
              borderRadius: "100px", alignSelf: "flex-start",
            }}>
              Women only · Verified profiles
            </span>
            <h1 className="font-display" style={{
              fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700,
              color: "var(--sage-dark)", lineHeight: 1.1,
              letterSpacing: "-1px", margin: 0,
            }}>
              Find a flatmate<br />
              who <span style={{ color: "var(--sage-deep)", fontStyle: "italic" }}>fits</span> your<br />
              life.
            </h1>
            <p style={{ fontSize: "15px", color: "var(--sage-deep)", lineHeight: 1.65, maxWidth: "360px", margin: 0 }}>
              FemmeFlats matches women with compatible flatmates based on lifestyle, habits, and deal-breakers — not just who&apos;s available.
            </p>
            <div className="search-bar" style={{ maxWidth: "380px" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--sage-mid)" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Enter a locality, city..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn-primary" style={{ padding: "7px 16px", fontSize: "12px", flexShrink: 0 }}>Search</button>
            </div>
            <div style={{ display: "flex", gap: "24px", marginTop: "4px" }}>
              {[["2,400+", "Women joined"], ["98%", "Verified profiles"], ["4 days", "Avg. match time"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display" style={{ fontSize: "20px", fontWeight: 700, color: "var(--sage-dark)" }}>{n}</div>
                  <div style={{ fontSize: "11px", color: "var(--sage-mid)", marginTop: "2px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT HALF: Animation — overflow visible so floating cards don't clip ── */}
          {/*
            KEY FIX 3: overflow is NOT hidden here. The section clips at page level.
            Cards are positioned relative to this div's center, using px offsets
            from center so they don't overflow the right half edge.
          */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "calc(100dvh - 65px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}>
            {/* Orbit rings */}
            <div style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(107,127,107,0.12)", animation: "spinRing 18s linear infinite" }} />
            <div style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", border: "1px dashed rgba(107,127,107,0.18)", animation: "spinRing 12s linear infinite reverse" }} />

            {/* Center match % bubble */}
            <div style={{
              position: "relative", zIndex: 2,
              width: "120px", height: "120px", borderRadius: "50%",
              background: "rgba(107,127,107,0.08)", border: "1.5px solid rgba(107,127,107,0.25)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
              animation: "pulse 3s ease-in-out infinite",
            }}>
              <div className="font-display" style={{ fontSize: "28px", fontWeight: 700, color: "var(--sage-deep)", animation: "matchPop 2.4s ease infinite" }}>{matchPct}%</div>
              <div style={{ fontSize: "9px", color: "var(--sage-mid)", letterSpacing: "1px", textTransform: "uppercase" }}>match</div>
            </div>

            {/* Orbiting avatars */}
            {[
              { photo: "https://randomuser.me/api/portraits/women/44.jpg", anim: "orbitDot 8s linear infinite" },
              { photo: "https://randomuser.me/api/portraits/women/68.jpg", anim: "orbitDot2 8s linear infinite" },
              { photo: "https://randomuser.me/api/portraits/women/90.jpg", anim: "orbitDot3 8s linear infinite" },
            ].map((o, i) => (
              <div key={i} style={{ position: "absolute", zIndex: 3, animation: o.anim, transformOrigin: "center center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.photo} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--ivory)", boxShadow: "0 4px 12px rgba(45,58,45,0.15)" }} />
              </div>
            ))}

            {/*
              KEY FIX 4: Floating cards now positioned so they stay inside
              the right half. Using inset px values from center of the column.
              Left card: top-left quadrant of right half
              Right card: bottom-right quadrant of right half
            */}
            <FloatingCard
              photo="https://randomuser.me/api/portraits/women/31.jpg"
              name="Meera T." age={29} location="Juhu, Mumbai"
              preferences={["Non-smoker", "Early riser", "Dog lover"]}
              delay={0}
              style={{ left: "4%", top: "14%" }}
            />
            <FloatingCard
              photo="https://randomuser.me/api/portraits/women/55.jpg"
              name="Kavya R." age={25} location="HSR Layout, BLR"
              preferences={["Veg only", "WFH", "No pets"]}
              delay={1.5}
              style={{ right: "4%", bottom: "18%" }}
            />

            {/* Match notif — top right */}
            <MatchNotif delay={0.8} />

            {/* Aadhaar badge — bottom left */}
            <div style={{
              position: "absolute", left: "4%", bottom: "14%",
              background: "rgba(196,168,130,0.15)", border: "1px solid rgba(196,168,130,0.4)",
              borderRadius: "100px", padding: "6px 14px",
              fontSize: "11px", fontWeight: 600, color: "var(--sand-dark)",
              animation: "shimmer 3s ease-in-out infinite", letterSpacing: "0.3px",
              zIndex: 10,
            }}>
              ✓ Aadhaar verified
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROFILES + STORIES ── */}
      <section className="snap-section" style={{ background: "var(--ivory)", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 32px 0", gap: "20px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexShrink: 0 }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sage-mid)" }}>Who you&apos;ll find</span>
              <h2 className="font-display" style={{ fontSize: "22px", fontWeight: 600, color: "var(--sage-dark)", marginTop: "4px" }}>Real people, real preferences</h2>
            </div>
            <Link href="/browse" style={{ fontSize: "12px", color: "var(--sage-deep)", fontWeight: 500, textDecoration: "none" }}>Browse all →</Link>
          </div>
          <div className="cards-row" style={{ flexShrink: 0 }}>
            {profiles.map((p) => (
              <Link href="/signup" key={p.id} style={{ textDecoration: "none" }}>
                <div className="profile-card">
                  <div style={{ padding: "14px 14px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.photo} alt={p.name} width={44} height={44} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--sage)" }} />
                        {p.verified && (
                          <span style={{ position: "absolute", bottom: -1, right: -1, background: "var(--sage-deep)", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--ivory)" }}>
                            <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </span>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--sage-dark)" }}>{p.name}, {p.age}</div>
                        <div style={{ fontSize: "10px", color: "var(--sage-mid)", marginTop: "1px" }}>{p.location}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "10px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.activeDot, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "10px", color: "var(--sage-mid)" }}>{p.activeStatus}</span>
                    </div>
                  </div>
                  <div style={{ height: "1px", background: "rgba(168,184,168,0.2)", margin: "0 14px" }} />
                  <div style={{ padding: "10px 14px 14px" }}>
                    <div style={{ fontSize: "10px", color: "var(--sage-mid)", marginBottom: "7px", fontWeight: 500 }}>Lifestyle</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {p.preferences.slice(0, 4).map((pref) => <span key={pref} className="preference-tag">{pref}</span>)}
                      {p.preferences.length > 4 && <span className="preference-tag" style={{ background: "var(--sage-mid)", color: "white" }}>+{p.preferences.length - 4}</span>}
                    </div>
                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--sage-dark)" }}>{p.rent}</span>
                      <span style={{ fontSize: "10px", color: "var(--sage-mid)" }}>{p.lookingFor}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--sage-mid)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Stories</div>
            <div className="cards-row">
              {[
                { name: "Tanvi & Shruti", text: "Found each other in 3 days. We both wanted a quiet home with no parties — literally the same answer for everything.", stars: 5 },
                { name: "Aisha R.", text: "The preference filters saved me from a bad match. Ended up with a flatmate who actually does dishes.", stars: 5 },
                { name: "Neha & Pooja", text: "Moved from different cities to Bengaluru. FemmeFlats made us feel like we already knew each other before we met.", stars: 5 },
              ].map((s) => (
                <div key={s.name} className="story-card">
                  <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>{[...Array(s.stars)].map((_, i) => <span key={i} style={{ color: "var(--sand)", fontSize: "11px" }}>★</span>)}</div>
                  <p style={{ fontSize: "12px", color: "var(--sage-deep)", lineHeight: 1.6 }}>&ldquo;{s.text}&rdquo;</p>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--sage-mid)", marginTop: "8px" }}>— {s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer style={{ padding: "14px 32px", borderTop: "1px solid rgba(168,184,168,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span className="font-display" style={{ fontSize: "13px", color: "var(--sage-mid)", fontWeight: 600 }}>© 2025 FemmeFlats</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms", "Contact Us"].map((l) => <a key={l} href="#" className="footer-link">{l}</a>)}
          </div>
        </footer>
      </section>
    </main>
  );
}
