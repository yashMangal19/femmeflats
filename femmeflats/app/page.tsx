"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Profile = {
  id: number; match: number; name: string; age: number; photo: string;
  location: string; rent: string; activeStatus: string; activeDot: string;
  preferences: string[]; lookingFor: string; verified: boolean;
};

const profiles: Profile[] = [
  { id: 1, match: 92, name: "Ananya S.", age: 24, photo: "https://randomuser.me/api/portraits/women/44.jpg", location: "Koramangala, Bengaluru", rent: "₹12,000 / mo", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Veg only", "Early riser", "WFH", "No pets"], lookingFor: "1BHK share", verified: true },
  { id: 2, match: 87, name: "Priya M.", age: 27, photo: "https://randomuser.me/api/portraits/women/68.jpg", location: "Baner, Pune", rent: "₹9,500 / mo", activeStatus: "Active yesterday", activeDot: "#FFC107", preferences: ["Occ. smoker ok", "Any diet", "Night owl", "Office goer", "Cat ok"], lookingFor: "2BHK share", verified: true },
  { id: 3, match: 74, name: "Riya K.", age: 22, photo: "https://randomuser.me/api/portraits/women/90.jpg", location: "Malviya Nagar, Delhi", rent: "₹8,000 / mo", activeStatus: "Active 3 days ago", activeDot: "#9E9E9E", preferences: ["Non-smoker", "Veg preferred", "Flexible timing", "Student", "No pets"], lookingFor: "PG / room share", verified: false },
  { id: 4, match: 95, name: "Meera T.", age: 29, photo: "https://randomuser.me/api/portraits/women/31.jpg", location: "Juhu, Mumbai", rent: "₹18,000 / mo", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Any diet", "Early riser", "Freelancer", "Dog lover"], lookingFor: "2BHK share", verified: true },
];

const navLinks = ["Discover", "How it works", "Safety", "Stories"];
const locationChips = ["Mumbai", "Delhi", "Bengaluru", "Pune"];

const stories = [
  { name: "Tanvi & Shruti", text: "Found each other in three days. We both wanted a quiet home with no parties — literally the same answer for everything." },
  { name: "Aisha R.", text: "The preference filters saved me from a bad match. Ended up with a flatmate who actually does the dishes." },
  { name: "Neha & Pooja", text: "Moved from different cities to Bengaluru. We felt like we already knew each other before we met." },
];

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

function MatchRing({ pct, size = 46 }: { pct: number; size?: number }) {
  const inner = size - 8;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `conic-gradient(var(--sage-deep) ${pct * 3.6}deg, rgba(168,184,168,0.3) 0deg)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: inner, height: inner, borderRadius: "50%", background: "#fff",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1,
      }}>
        <span className="font-display" style={{ fontSize: "13px", fontWeight: 700, color: "var(--sage-dark)" }}>{pct}</span>
        <span style={{ fontSize: "6px", letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--sage-mid)", marginTop: "1px" }}>match</span>
      </div>
    </div>
  );
}

/* Tall profile card. Avatar-led rather than full-bleed: the mock portraits are
   only 128px square, so a full-bleed photo upscales into mush. A large circle
   renders them close to native resolution — crisp, and softer for this palette. */
function ProfileCardTall({ p }: { p: Profile }) {
  return (
    <div style={{
      width: "322px", height: "440px", borderRadius: "28px",
      background: "#fff", border: "1px solid rgba(168,184,168,0.45)",
      boxShadow: "0 20px 48px rgba(45,58,45,0.15)",
      padding: "22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "-84px", left: "50%", transform: "translateX(-50%)",
        width: "360px", height: "230px", borderRadius: "50%",
        background: "var(--sage)", opacity: 0.8,
      }} />

      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 3 }}>
        <MatchRing pct={p.match} size={54} />
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", flex: 1 }}>
        <div style={{ position: "relative", marginTop: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.photo} alt="" style={{
            width: "124px", height: "124px", borderRadius: "50%", objectFit: "cover",
            border: "3.5px solid #fff", boxShadow: "0 6px 20px rgba(45,58,45,0.16)",
          }} />
          {p.verified && (
            <span style={{
              position: "absolute", bottom: "5px", right: "5px",
              background: "var(--sage-deep)", borderRadius: "50%", width: "28px", height: "28px",
              display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff",
            }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <div className="font-display" style={{ fontSize: "24px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.4px" }}>
            {p.name}, {p.age}
          </div>
          <div style={{ fontSize: "13px", color: "var(--sage-mid)", marginTop: "4px" }}>{p.location}</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
          {p.preferences.slice(0, 4).map((pref) => (
            <span key={pref} className="preference-tag" style={{ fontSize: "11px", padding: "4px 10px" }}>{pref}</span>
          ))}
        </div>

        <div style={{ marginTop: "auto", width: "100%", paddingTop: "16px", borderTop: "1px solid rgba(168,184,168,0.3)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "18px", fontWeight: 600, color: "var(--sage-dark)" }}>{p.rent}</span>
            <span style={{ fontSize: "11px", color: "var(--sage-mid)" }}>{p.lookingFor}</span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--sage-mid)", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.activeDot, display: "inline-block" }} />
            {p.activeStatus}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Deck with its own timer. Each cycle the front card swipes off to the left and
   reappears at the back of the fan; everyone else shifts forward one slot. */
const DECK_SLOTS = [
  { rotate: 0,  x: 0,  y: 0,   scale: 1,    z: 40, opacity: 1 },
  { rotate: 4,  x: 32, y: -15, scale: 0.96, z: 30, opacity: 0.97 },
  { rotate: 8,  x: 64, y: -30, scale: 0.92, z: 20, opacity: 0.94 },
  { rotate: 12, x: 96, y: -45, scale: 0.88, z: 10, opacity: 0.9 },
];

function ProfileDeck() {
  const n = profiles.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((v) => v + 1), 3200);
    return () => clearInterval(t);
  }, []);

  const leaving = step === 0 ? -1 : (step - 1 + n) % n;

  return (
    <div style={{ position: "relative", width: "466px", height: "500px", flexShrink: 0 }}>
      {profiles.map((profile, i) => {
        const slot = DECK_SLOTS[(i - (step % n) + n) % n];
        const isLeaving = i === leaving;
        return (
          <div
            key={profile.id}
            style={{
              position: "absolute", left: 0, bottom: 0,
              transformOrigin: "center center",
              transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`,
              zIndex: slot.z,
              opacity: slot.opacity,
              transition: isLeaving ? "none" : "transform 1s cubic-bezier(0.22,1,0.36,1), opacity 1s ease",
              animation: isLeaving ? "swipeToBack 1s cubic-bezier(0.4,0,0.2,1) both" : undefined,
            }}
          >
            <ProfileCardTall p={profile} />
          </div>
        );
      })}
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
        @keyframes orbitDot { from{transform:rotate(0deg) translateX(78px) rotate(0deg)} to{transform:rotate(360deg) translateX(78px) rotate(-360deg)} }
        @keyframes orbitDot2 { from{transform:rotate(120deg) translateX(78px) rotate(-120deg)} to{transform:rotate(480deg) translateX(78px) rotate(-480deg)} }
        @keyframes orbitDot3 { from{transform:rotate(240deg) translateX(78px) rotate(-240deg)} to{transform:rotate(600deg) translateX(78px) rotate(-600deg)} }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        .chip-btn { background: var(--ivory); border: 1.5px solid rgba(168,184,168,0.6); color: var(--sage-deep); font-family: Inter, sans-serif; font-size: 12px; font-weight: 500; padding: 5px 14px; border-radius: 100px; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .chip-btn:hover { background: var(--sage); border-color: var(--sage-deep); color: var(--sage-dark); }
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

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: "0 24px", overflow: "hidden", minHeight: 0,
        }}>

          <div style={{
            flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",
            alignItems: "center", justifyItems: "center",
            minHeight: 0, width: "100%",
          }}>

          {/* ── LEFT HALF ── */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            animation: "slideIn 0.6s ease both",
            width: "100%",
            maxWidth: "460px",
            padding: "0 16px 0 24px",
          }}>
            {/* Simple tagline text instead of badge */}
            <p style={{
              fontSize: "12px", fontWeight: 500, letterSpacing: "0.3px",
              color: "var(--sage-mid)", marginBottom: "14px",
            }}>
              A space built for women, by women.
            </p>

            <h1 className="font-display" style={{
              fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700,
              color: "var(--sage-dark)", lineHeight: 1.1,
              letterSpacing: "-1px", margin: "0 0 20px 0",
            }}>
              Find a flatmate<br />
              who <span style={{ color: "var(--sage-deep)", fontStyle: "italic" }}>fits</span> your<br />
              life.
            </h1>

            <p style={{ fontSize: "14px", color: "var(--sage-deep)", lineHeight: 1.65, maxWidth: "360px", margin: "0 0 24px 0" }}>
              Matched by lifestyle, habits, and deal-breakers — not just who&apos;s available.
            </p>

            {/* ── SOCIAL PROOF: overlapping avatars + stat ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {[44, 68, 90].map((n, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={n}
                    src={`https://randomuser.me/api/portraits/women/${n}.jpg`}
                    alt=""
                    style={{
                      width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover",
                      border: "2.5px solid var(--sage)",
                      marginLeft: i === 0 ? 0 : "-15px",
                      position: "relative", zIndex: 3 - i,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "13px", color: "var(--sage-deep)", lineHeight: 1.4 }}>
                <strong style={{ fontWeight: 600, color: "var(--sage-dark)" }}>500+</strong> women already searching
              </span>
            </div>

          </div>

          {/* ── RIGHT HALF: Animation — 50% bigger ── */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%", minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}>
            {/* Orbit rings — 1.5x bigger: 340→510, 240→360 */}
            <div style={{ position: "absolute", width: "510px", height: "510px", borderRadius: "50%", border: "1px solid rgba(107,127,107,0.12)", animation: "spinRing 18s linear infinite" }} />
            <div style={{ position: "absolute", width: "360px", height: "360px", borderRadius: "50%", border: "1px dashed rgba(107,127,107,0.18)", animation: "spinRing 12s linear infinite reverse" }} />

            {/* Center match % bubble — 120→180 */}
            <div style={{
              position: "relative", zIndex: 2,
              width: "180px", height: "180px", borderRadius: "50%",
              background: "rgba(107,127,107,0.08)", border: "1.5px solid rgba(107,127,107,0.25)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
              animation: "pulse 3s ease-in-out infinite",
            }}>
              <div className="font-display" style={{ fontSize: "42px", fontWeight: 700, color: "var(--sage-deep)", animation: "matchPop 2.4s ease infinite" }}>{matchPct}%</div>
              <div style={{ fontSize: "11px", color: "var(--sage-mid)", letterSpacing: "1px", textTransform: "uppercase" }}>match</div>
            </div>

            {/* Orbiting avatars — translateX 52→78 (already updated in keyframes) */}
            {[
              { photo: "https://randomuser.me/api/portraits/women/44.jpg", anim: "orbitDot 8s linear infinite" },
              { photo: "https://randomuser.me/api/portraits/women/68.jpg", anim: "orbitDot2 8s linear infinite" },
              { photo: "https://randomuser.me/api/portraits/women/90.jpg", anim: "orbitDot3 8s linear infinite" },
            ].map((o, i) => (
              <div key={i} style={{ position: "absolute", zIndex: 3, animation: o.anim, transformOrigin: "center center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.photo} alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--ivory)", boxShadow: "0 4px 12px rgba(45,58,45,0.15)" }} />
              </div>
            ))}

            {/* Floating profile cards */}
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

          </div>
          </div>

          {/* ── CENTRED SEARCH ── */}
          <div style={{
            flexShrink: 0, width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "14px", paddingBottom: "clamp(28px, 7vh, 72px)",
          }}>
            <div style={{
              background: "var(--ivory)",
              border: "2px solid rgba(168,184,168,0.5)",
              borderRadius: "16px",
              padding: "6px 6px 6px 18px",
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", maxWidth: "460px",
              boxShadow: "0 4px 24px rgba(45,58,45,0.08)",
            }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--sage-mid)" strokeWidth={2} style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Where do you want to live?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  border: "none", outline: "none", background: "transparent",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  color: "var(--sage-dark)", width: "100%", padding: "10px 0",
                }}
              />
              <button className="btn-primary" style={{ padding: "11px 22px", fontSize: "13px", flexShrink: 0, borderRadius: "12px" }}>
                Search
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "11px", color: "var(--sage-mid)", fontWeight: 500, whiteSpace: "nowrap" }}>Quick search:</span>
              {locationChips.map((city) => (
                <button key={city} className="chip-btn" onClick={() => setSearchValue(city)}>{city}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHO YOU'LL FIND ── */}
      <section id="screen-2" className="snap-section" style={{ background: "var(--ivory)", display: "flex", flexDirection: "column" }}>

        <div style={{
          flex: 1, minHeight: 0, overflow: "hidden",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 6vw, 96px)", alignItems: "center",
          padding: "clamp(20px, 3vh, 40px) clamp(24px, 4vw, 64px) 0",
        }}>

          {/* ── LEFT: rotating fanned deck ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0, height: "100%" }}>
            <ProfileDeck />
          </div>

          {/* ── LEFT: how it works + safety, kept short ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "34px", maxWidth: "400px", justifySelf: "center", height: "100%" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--sage-mid)" }}>
                How it works
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {[
                  ["Answer", "Twelve questions. Ninety seconds."],
                  ["Match", "Ranked by how much you overlap."],
                  ["Meet", "You choose who is worth a chat."],
                ].map(([title, line], i) => (
                  <div key={title} style={{ display: "flex", gap: "13px", alignItems: "baseline" }}>
                    <span className="font-display" style={{
                      fontSize: "13px", fontWeight: 700, color: "var(--sage-mid)",
                      width: "16px", flexShrink: 0,
                    }}>{i + 1}</span>
                    <div>
                      <span className="font-display" style={{ fontSize: "21px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.3px" }}>{title}</span>
                      <span style={{ fontSize: "13px", color: "var(--sage-deep)", marginLeft: "10px" }}>{line}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: "1px", background: "rgba(168,184,168,0.4)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--sage-mid)" }}>
                Safety
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                {[
                  "Women only.",
                  "Every profile verified by selfie.",
                  "Nobody messages you uninvited.",
                  "Block or report in one tap.",
                ].map((line) => (
                  <div key={line} style={{ display: "flex", gap: "11px", alignItems: "center" }}>
                    <span style={{
                      width: "17px", height: "17px", borderRadius: "50%", flexShrink: 0,
                      background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="var(--sage-deep)" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "14px", color: "var(--sage-dark)" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Link href="/browse" className="btn-primary">Browse profiles →</Link>
              <Link href="/signup" className="btn-ghost">Create a profile</Link>
            </div>
          </div>

        </div>

        {/* ── STORY STRIP: one quote, rotating ── */}
        <div style={{
          flexShrink: 0, borderTop: "1px solid rgba(168,184,168,0.28)",
          margin: "0 clamp(24px, 4vw, 56px)", padding: "18px 0",
          display: "flex", alignItems: "center", gap: "16px", minHeight: "62px",
        }}>
          <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: "var(--sand)", fontSize: "12px" }}>★</span>)}
          </div>
          <p key={tick % stories.length} className="font-display" style={{
            fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--sage-dark)",
            fontStyle: "italic", lineHeight: 1.5, animation: "slideIn 0.5s ease both",
            flex: 1, minWidth: 0,
          }}>
            &ldquo;{stories[tick % stories.length].text}&rdquo;
          </p>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--sage-mid)", whiteSpace: "nowrap", flexShrink: 0 }}>
            — {stories[tick % stories.length].name}
          </span>
        </div>

        <footer style={{ padding: "14px clamp(24px, 4vw, 56px)", borderTop: "1px solid rgba(168,184,168,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span className="font-display" style={{ fontSize: "13px", color: "var(--sage-mid)", fontWeight: 600 }}>© 2026 FemmeFlats</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms", "Contact Us"].map((l) => <a key={l} href="#" className="footer-link">{l}</a>)}
          </div>
        </footer>
      </section>
    </main>
  );
}