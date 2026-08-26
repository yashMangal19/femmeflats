"use client";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--sage)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      {/* Back */}
      <Link href="/" style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        textDecoration: "none",
        color: "var(--sage-deep)",
        fontSize: "13px",
        fontWeight: 500,
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div style={{
        background: "var(--ivory)",
        borderRadius: "24px",
        padding: "40px 32px",
        width: "100%",
        maxWidth: "360px",
        border: "1px solid rgba(168,184,168,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        alignItems: "center",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <span className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "var(--sage-dark)" }}>
            FemmeFlats
          </span>
          <p style={{ fontSize: "13px", color: "var(--sage-mid)", marginTop: "6px" }}>
            Join a community of verified women
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "rgba(168,184,168,0.2)" }} />

        {/* Google button */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              background: "white",
              border: "1.5px solid rgba(168,184,168,0.4)",
              borderRadius: "100px",
              padding: "13px 20px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--sage-dark)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--sage-deep)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(107,127,107,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(168,184,168,0.4)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {/* Google SVG */}
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Fine print */}
          <p style={{ fontSize: "11px", color: "var(--sage-mid)", textAlign: "center", lineHeight: 1.7 }}>
            By joining, you agree to our{" "}
            <a href="#" style={{ color: "var(--sage-deep)", textDecoration: "underline" }}>Terms</a>
            {" "}and{" "}
            <a href="#" style={{ color: "var(--sage-deep)", textDecoration: "underline" }}>Privacy Policy</a>.
            FemmeFlats is open to women only.
          </p>
        </div>

        {/* Verification note */}
        <div style={{
          background: "rgba(107,127,107,0.07)",
          borderRadius: "12px",
          padding: "12px 14px",
          width: "100%",
        }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--sage-deep)" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p style={{ fontSize: "11px", color: "var(--sage-deep)", lineHeight: 1.65 }}>
              Aadhaar and facial verification are only required when you want to chat or call someone. Browse freely first.
            </p>
          </div>
        </div>

        {/* Already have account */}
        <p style={{ fontSize: "12px", color: "var(--sage-mid)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--sage-deep)", fontWeight: 600, textDecoration: "none" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
