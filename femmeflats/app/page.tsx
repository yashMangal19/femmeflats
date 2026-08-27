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

type Flat = {
  id: number; photo: string; rent: string; title: string;
  area: string; tags: string[]; available: string; source: string;
};

const flats: Flat[] = [
  { id: 1, photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format&fit=crop",
    rent: "₹18,000", title: "Private room in 2BHK", area: "Koramangala, Bengaluru",
    tags: ["Furnished", "Attached bath"], available: "1 Oct", source: "Owner" },
  { id: 2, photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop",
    rent: "₹24,000", title: "Studio apartment", area: "Juhu, Mumbai",
    tags: ["Furnished", "Parking"], available: "15 Sep", source: "Owner" },
  { id: 3, photo: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&auto=format&fit=crop",
    rent: "₹12,500", title: "Shared room in 3BHK", area: "Baner, Pune",
    tags: ["Semi-furnished", "Balcony"], available: "Now", source: "Broker" },
  { id: 4, photo: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
    rent: "₹9,000", title: "PG bed, women only", area: "Malviya Nagar, Delhi",
    tags: ["Meals", "Laundry"], available: "Now", source: "PG" },
];

const navLinks = ["Discover", "How it works", "Flats", "About us"];
const locationChips = ["Mumbai", "Delhi", "Bengaluru", "Pune"];

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

const stroke = { fill: "none", stroke: "var(--sage-deep)", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconQuiz = (
  <svg width="27" height="27" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M4 7h10M4 12h12M4 17h6" />
    <circle cx="19" cy="17" r="2.3" fill="var(--sage-deep)" stroke="none" />
  </svg>
);
const IconVenn = (
  <svg width="27" height="27" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <circle cx="9.2" cy="12" r="5.8" /><circle cx="14.8" cy="12" r="5.8" />
  </svg>
);
const IconDoor = (
  <svg width="27" height="27" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M4 10.2 12 4l8 6.2V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M10 20v-4.6h4V20" />
  </svg>
);
const IconShield = (
  <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M12 3.5 19 6v5.6c0 4.3-2.9 7.5-7 8.9-4.1-1.4-7-4.6-7-8.9V6z" />
  </svg>
);
const IconBadge = (
  <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <circle cx="12" cy="12" r="8.2" /><path d="M8.6 12.2 11 14.6l4.4-4.6" />
  </svg>
);
const IconChat = (
  <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5a9.6 9.6 0 0 1-2.6-.35L5 20.5l1.1-3.2A6.2 6.2 0 0 1 4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5z" />
  </svg>
);
const IconBlock = (
  <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <circle cx="12" cy="12" r="8.2" /><path d="M6.3 6.3l11.4 11.4" />
  </svg>
);

const FOOTER_LINKS = ["Safety", "Contact us", "Privacy Policy", "Terms"];

const STEPS = [
  { label: "Answer", line: "Twelve questions", icon: IconQuiz, lift: 0 },
  { label: "Match",  line: "Ranked by overlap", icon: IconVenn, lift: 26 },
  { label: "Meet",   line: "You choose", icon: IconDoor, lift: 0 },
];

const SAFETY = [
  { icon: IconShield, text: "Women only" },
  { icon: IconBadge,  text: "Selfie verified" },
  { icon: IconChat,   text: "No cold DMs" },
  { icon: IconBlock,  text: "Block in one tap" },
];

/* Three steps on a dashed arc — the middle one lifted, so the flow reads as a
   curve rather than a list. */
function StepFlow() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "440px", paddingTop: "30px" }}>
      <svg viewBox="0 0 440 66" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: "absolute", top: "26px", left: 0, width: "100%", height: "66px", pointerEvents: "none" }}>
        <path d="M 64 37 Q 220 -15 376 37" fill="none" stroke="var(--sage-mid)" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.85" />
      </svg>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {STEPS.map((st) => (
          <div key={st.label} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            width: "128px", marginTop: `${-st.lift}px`,
          }}>
            <div style={{
              width: "66px", height: "66px", borderRadius: "50%", background: "var(--sage)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{st.icon}</div>
            <div style={{ textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: "18px", fontWeight: 700, color: "var(--sage-dark)" }}>{st.label}</div>
              <div style={{ fontSize: "11.5px", color: "var(--sage-mid)", marginTop: "3px" }}>{st.line}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingFlatCard({ photo, title, area, rent, delay, style }: {
  photo: string; title: string; area: string; rent: string;
  delay: number; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      position: "absolute",
      background: "rgba(248,246,240,0.96)", backdropFilter: "blur(12px)",
      borderRadius: "16px", padding: "10px",
      border: "1px solid rgba(168,184,168,0.35)",
      boxShadow: "0 8px 32px rgba(45,58,45,0.12)",
      animation: `floatCard 6s ease-in-out ${delay}s infinite`,
      width: "198px", zIndex: 10,
      ...style,
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" style={{ width: "100%", height: "74px", objectFit: "cover", borderRadius: "10px", display: "block" }} />
      <div style={{ marginTop: "9px" }}>
        <div style={{ fontWeight: 600, fontSize: "12px", color: "#2D3A2D" }}>{title}</div>
        <div style={{ fontSize: "10px", color: "#A8B8A8", marginTop: "1px" }}>{area}</div>
        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#6B7F6B", marginTop: "6px" }}>{rent} <span style={{ fontSize: "10px", fontWeight: 400, color: "#A8B8A8" }}>/ mo</span></div>
      </div>
    </div>
  );
}

/* One flat in the grid on screen 3. */
function FlatCard({ f }: { f: Flat }) {
  return (
    <div className="match-card" style={{
      background: "#fff", borderRadius: "20px", overflow: "hidden",
      border: "1px solid rgba(168,184,168,0.4)",
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={f.photo} alt="" style={{ width: "100%", height: "158px", objectFit: "cover", display: "block" }} />
        <span style={{
          position: "absolute", left: "12px", bottom: "12px",
          background: "rgba(248,246,240,0.95)", borderRadius: "100px",
          padding: "5px 11px", fontSize: "13px", fontWeight: 600, color: "var(--sage-dark)",
        }}>{f.rent} <span style={{ fontSize: "10px", fontWeight: 400, color: "var(--sage-mid)" }}>/ mo</span></span>
        <span style={{
          position: "absolute", right: "12px", top: "12px",
          background: "rgba(45,58,45,0.62)", borderRadius: "100px",
          padding: "3px 9px", fontSize: "9.5px", fontWeight: 600, color: "#fff", letterSpacing: "0.3px",
        }}>{f.source}</span>
      </div>
      <div style={{ padding: "14px 15px 15px", display: "flex", flexDirection: "column", gap: "9px", flex: 1 }}>
        <div>
          <div className="font-display" style={{ fontSize: "16px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.2px" }}>{f.title}</div>
          <div style={{ fontSize: "11px", color: "var(--sage-mid)", marginTop: "3px" }}>{f.area}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {f.tags.map((t) => <span key={t} className="preference-tag">{t}</span>)}
        </div>
        <div style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid rgba(168,184,168,0.3)", fontSize: "11px", color: "var(--sage-mid)" }}>
          Available {f.available}
        </div>
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
      width: "384px", height: "478px", borderRadius: "32px",
      background: "#fff", border: "1px solid rgba(168,184,168,0.45)",
      boxShadow: "0 20px 48px rgba(45,58,45,0.15)",
      padding: "22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "-124px", left: "50%", transform: "translateX(-50%)",
        width: "460px", height: "296px", borderRadius: "50%",
        background: "var(--sage)", opacity: 0.8,
      }} />

      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 3 }}>
        <MatchRing pct={p.match} size={64} />
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", flex: 1 }}>
        <div style={{ position: "relative", marginTop: "30px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.photo} alt="" style={{
            width: "168px", height: "168px", borderRadius: "50%", objectFit: "cover",
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
          <div className="font-display" style={{ fontSize: "29px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.4px" }}>
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
            <span style={{ fontSize: "20px", fontWeight: 600, color: "var(--sage-dark)" }}>{p.rent}</span>
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
    <div style={{ position: "relative", width: "540px", height: "552px", flexShrink: 0 }}>
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

      {/* ── FIXED NAV ── */}
      <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 32px", borderBottom: "1px solid rgba(168,184,168,0.25)",
          background: "rgba(232,237,230,0.88)", backdropFilter: "blur(10px)",
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: "var(--nav-h)", boxSizing: "border-box",
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

      {/* ── SECTION 1: HERO ── */}
      <section className="snap-section" style={{ background: "var(--sage)", display: "flex", flexDirection: "column" }}>

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
            <FloatingFlatCard
              photo="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop"
              title="Private room in 2BHK" area="Koramangala, Bengaluru" rent="₹18,000"
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
          display: "grid", gridTemplateColumns: "auto auto",
          justifyContent: "center", gap: "clamp(28px, 5vw, 84px)", alignItems: "center",
          padding: "clamp(28px, 4.5vh, 56px) clamp(24px, 4vw, 64px) clamp(24px, 3.5vh, 46px)",
        }}>

          {/* ── LEFT: rotating fanned deck ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0, height: "100%" }}>
            <ProfileDeck />
          </div>

          {/* ── LEFT: how it works + safety, kept short ── */}
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            gap: "clamp(22px, 3.4vh, 40px)", maxWidth: "470px",
            justifySelf: "center", height: "100%",
          }}>

            {/* ── HOW IT WORKS ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--sage-mid)" }}>How it works</span>
              <h2 className="font-display" style={{
                fontSize: "clamp(25px, 2.4vw, 33px)", fontWeight: 700, color: "var(--sage-dark)",
                lineHeight: 1.15, letterSpacing: "-0.7px",
              }}>
                Three steps.<br />
                <span style={{ color: "var(--sage-deep)", fontStyle: "italic" }}>Ninety seconds.</span>
              </h2>
              <StepFlow />
            </div>

            <div style={{ height: "1px", background: "rgba(168,184,168,0.45)" }} />

            {/* ── SAFETY ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--sage-mid)" }}>Safety</span>
              <h2 className="font-display" style={{
                fontSize: "clamp(25px, 2.4vw, 33px)", fontWeight: 700, color: "var(--sage-dark)",
                lineHeight: 1.15, letterSpacing: "-0.7px",
              }}>
                Verified, <span style={{ color: "var(--sage-deep)", fontStyle: "italic" }}>or not here.</span>
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "13px 18px" }}>
                {SAFETY.map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                    <span style={{
                      width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                      background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{item.icon}</span>
                    <span style={{ fontSize: "13.5px", color: "var(--sage-dark)", fontWeight: 500 }}>{item.text}</span>
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

      </section>

      {/* ── SECTION 3: FLATS ── */}
      <section id="screen-3" className="snap-section" style={{ background: "var(--ivory)", display: "flex", flexDirection: "column" }}>

        <div style={{
          flex: 1, minHeight: 0, overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: "clamp(18px, 2.6vh, 30px)",
          padding: "clamp(28px, 4.5vh, 56px) clamp(24px, 4vw, 64px) clamp(24px, 3.5vh, 46px)",
          maxWidth: "1300px", width: "100%", margin: "0 auto",
        }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--sage-mid)" }}>
                Flats &amp; PGs
              </span>
              <h2 className="font-display" style={{
                fontSize: "clamp(25px, 2.4vw, 33px)", fontWeight: 700, color: "var(--sage-dark)",
                lineHeight: 1.15, letterSpacing: "-0.7px",
              }}>
                Places, <span style={{ color: "var(--sage-deep)", fontStyle: "italic" }}>not just people.</span>
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: "13px", marginTop: "2px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {flats.slice(0, 3).map((f, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={f.id}
                      src={f.photo}
                      alt=""
                      style={{
                        width: "38px", height: "38px", borderRadius: "11px", objectFit: "cover",
                        border: "2.5px solid var(--ivory)",
                        marginLeft: i === 0 ? 0 : "-13px",
                        position: "relative", zIndex: 3 - i,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "13px", color: "var(--sage-deep)", lineHeight: 1.4 }}>
                  <strong style={{ fontWeight: 600, color: "var(--sage-dark)" }}>5,000+</strong> flats and PGs listed
                </span>
              </div>
            </div>
            <Link href="/browse" style={{ fontSize: "12.5px", color: "var(--sage-deep)", fontWeight: 500, textDecoration: "none", paddingBottom: "4px" }}>
              Browse all flats →
            </Link>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--sage-mid)", fontWeight: 500, marginRight: "2px" }}>Filter:</span>
            {["Bengaluru", "Mumbai", "Pune", "Delhi", "Under ₹15k", "Women-only PG"].map((f) => (
              <button key={f} className="chip-btn">{f}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(14px, 1.6vw, 22px)", minHeight: 0 }}>
            {flats.map((f) => <FlatCard key={f.id} f={f} />)}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{
          flexShrink: 0, background: "var(--sage)",
          borderTop: "1px solid rgba(168,184,168,0.32)",
          padding: "15px clamp(24px, 4vw, 64px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "20px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "13px" }}>
            <span className="font-display" style={{ fontSize: "15px", fontWeight: 700, color: "var(--sage-dark)", letterSpacing: "-0.2px" }}>
              FemmeFlats
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--sage-mid)" }}>© 2026</span>
          </div>
          <nav style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {FOOTER_LINKS.map((l) => (
              <a key={l} href="#" className="footer-link" style={{ fontSize: "12.5px" }}>{l}</a>
            ))}
          </nav>
        </footer>
      </section>
    </main>
  );
}