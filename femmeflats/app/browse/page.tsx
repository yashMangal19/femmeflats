"use client";
import { useState } from "react";
import Link from "next/link";

const allProfiles = [
  { id: 1, name: "Ananya S.", age: 24, photo: "https://randomuser.me/api/portraits/women/44.jpg", location: "Koramangala, Bengaluru", rent: "₹12,000", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Veg only", "Early riser", "WFH", "No pets"], lookingFor: "1BHK share", verified: true },
  { id: 2, name: "Priya M.", age: 27, photo: "https://randomuser.me/api/portraits/women/68.jpg", location: "Baner, Pune", rent: "₹9,500", activeStatus: "Active yesterday", activeDot: "#FFC107", preferences: ["Occ. smoker ok", "Any diet", "Night owl", "Office goer", "Cat ok"], lookingFor: "2BHK share", verified: true },
  { id: 3, name: "Riya K.", age: 22, photo: "https://randomuser.me/api/portraits/women/90.jpg", location: "Malviya Nagar, Delhi", rent: "₹8,000", activeStatus: "Active 3 days ago", activeDot: "#9E9E9E", preferences: ["Non-smoker", "Veg preferred", "Flexible timing", "Student", "No pets"], lookingFor: "PG / room share", verified: false },
  { id: 4, name: "Meera T.", age: 29, photo: "https://randomuser.me/api/portraits/women/31.jpg", location: "Juhu, Mumbai", rent: "₹18,000", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Any diet", "Early riser", "Freelancer", "Dog lover"], lookingFor: "2BHK share", verified: true },
  { id: 5, name: "Kavya R.", age: 25, photo: "https://randomuser.me/api/portraits/women/55.jpg", location: "HSR Layout, Bengaluru", rent: "₹11,000", activeStatus: "Active today", activeDot: "#4CAF50", preferences: ["Non-smoker", "Any diet", "Flexible", "WFH", "No pets"], lookingFor: "1BHK share", verified: true },
  { id: 6, name: "Diya P.", age: 23, photo: "https://randomuser.me/api/portraits/women/78.jpg", location: "Andheri, Mumbai", rent: "₹14,500", activeStatus: "Active 2 days ago", activeDot: "#9E9E9E", preferences: ["Occ. smoker ok", "Non-veg ok", "Night owl", "Office goer", "No pets"], lookingFor: "2BHK share", verified: false },
];

export default function BrowsePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);

  const toggle = (id: number, type: "wishlist" | "reject") => {
    if (type === "wishlist") {
      setWishlist((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      setRejected((prev) => prev.filter(x => x !== id));
    } else {
      setRejected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      setWishlist((prev) => prev.filter(x => x !== id));
    }
  };

  const active = allProfiles.filter(p => !rejected.includes(p.id));
  const rejectedProfiles = allProfiles.filter(p => rejected.includes(p.id));

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sage)" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(168,184,168,0.25)",
        background: "rgba(232,237,230,0.9)",
        backdropFilter: "blur(8px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="font-display" style={{ fontSize: "18px", fontWeight: 700, color: "var(--sage-dark)" }}>FemmeFlats</span>
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/login" className="btn-ghost" style={{ fontSize: "12px", padding: "8px 16px" }}>Log in</Link>
          <Link href="/signup" className="btn-primary" style={{ fontSize: "12px", padding: "8px 16px" }}>Join free</Link>
        </div>
      </nav>

      {/* Browse header */}
      <div style={{ padding: "20px 20px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "20px", fontWeight: 600, color: "var(--sage-dark)" }}>
              Bengaluru
            </h1>
            <p style={{ fontSize: "12px", color: "var(--sage-mid)", marginTop: "2px" }}>
              {active.length} profiles · Scroll to explore
            </p>
          </div>
          {wishlist.length > 0 && (
            <div style={{
              background: "var(--sage-deep)",
              color: "white",
              fontSize: "11px",
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}>
              <span>♡</span>
              <span>{wishlist.length} saved</span>
            </div>
          )}
        </div>

        {/* Signup nudge */}
        <div style={{
          background: "rgba(196,168,130,0.15)",
          borderRadius: "12px",
          padding: "10px 14px",
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <p style={{ fontSize: "11px", color: "var(--sage-dark)", lineHeight: 1.6 }}>
            Sign up to see full profiles and send match requests.
          </p>
          <Link href="/signup" className="btn-primary" style={{ fontSize: "11px", padding: "7px 14px", flexShrink: 0 }}>
            Join free
          </Link>
        </div>
      </div>

      {/* Profile list — scroll up/down */}
      <div style={{ padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {active.map((p) => (
          <div key={p.id} style={{
            background: "var(--ivory)",
            borderRadius: "20px",
            border: "1px solid rgba(168,184,168,0.25)",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Wishlist badge */}
            {wishlist.includes(p.id) && (
              <div style={{
                position: "absolute", top: "12px", right: "12px",
                background: "var(--sand)",
                color: "white",
                fontSize: "10px",
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: "100px",
                zIndex: 2,
              }}>
                Saved ♡
              </div>
            )}

            {/* Top row */}
            <div style={{ padding: "16px 16px 12px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--sage)" }} />
                {p.verified && (
                  <span style={{ position: "absolute", bottom: -1, right: -1, background: "var(--sage-deep)", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--ivory)" }}>
                    <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--sage-dark)" }}>{p.name}, {p.age}</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--sage-mid)", marginTop: "2px" }}>{p.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.activeDot, display: "inline-block" }} />
                  <span style={{ fontSize: "10px", color: "var(--sage-mid)" }}>{p.activeStatus}</span>
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--sage-dark)" }}>{p.rent}</div>
                <div style={{ fontSize: "10px", color: "var(--sage-mid)", marginTop: "2px" }}>/ month</div>
                <div style={{ fontSize: "10px", color: "var(--sage-mid)", marginTop: "2px" }}>{p.lookingFor}</div>
              </div>
            </div>

            {/* Preferences */}
            <div style={{ padding: "0 16px 14px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {p.preferences.map((pref) => (
                  <span key={pref} className="preference-tag">{pref}</span>
                ))}
              </div>
            </div>

            {/* Action blur overlay — nudge to sign up */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(168,184,168,0.15)", display: "flex", gap: "8px" }}>
              <button
                onClick={() => toggle(p.id, "reject")}
                style={{
                  flex: 1,
                  padding: "9px",
                  border: "1.5px solid rgba(168,184,168,0.3)",
                  borderRadius: "100px",
                  background: "transparent",
                  fontSize: "12px",
                  color: "var(--sage-mid)",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Not for me
              </button>
              <button
                onClick={() => toggle(p.id, "wishlist")}
                style={{
                  flex: 1,
                  padding: "9px",
                  border: "1.5px solid var(--sage-mid)",
                  borderRadius: "100px",
                  background: wishlist.includes(p.id) ? "rgba(107,127,107,0.08)" : "transparent",
                  fontSize: "12px",
                  color: "var(--sage-deep)",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                {wishlist.includes(p.id) ? "♡ Saved" : "♡ Wishlist"}
              </button>
              <Link
                href="/signup"
                style={{
                  flex: 1.4,
                  padding: "9px",
                  borderRadius: "100px",
                  background: "var(--sage-deep)",
                  fontSize: "12px",
                  color: "var(--ivory)",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Send request →
              </Link>
            </div>
          </div>
        ))}

        {/* Rejected profiles queue */}
        {rejectedProfiles.length > 0 && (
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 0",
            }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(168,184,168,0.3)" }} />
              <span style={{ fontSize: "11px", color: "var(--sage-mid)", fontWeight: 500 }}>
                Skipped ({rejectedProfiles.length})
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(168,184,168,0.3)" }} />
            </div>
            {rejectedProfiles.map((p) => (
              <div key={p.id} style={{
                background: "var(--ivory)",
                borderRadius: "16px",
                border: "1px solid rgba(168,184,168,0.2)",
                padding: "12px 16px",
                opacity: 0.6,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", filter: "grayscale(30%)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--sage-dark)" }}>{p.name}, {p.age}</div>
                  <div style={{ fontSize: "11px", color: "var(--sage-mid)" }}>{p.location}</div>
                </div>
                <button
                  onClick={() => toggle(p.id, "wishlist")}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(168,184,168,0.4)",
                    borderRadius: "100px",
                    padding: "5px 12px",
                    fontSize: "11px",
                    color: "var(--sage-deep)",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Reconsider
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
