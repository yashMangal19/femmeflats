import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FemmeFlats — Find Your People, Find Your Place",
  description: "Female-only flatmate matching. Verified profiles, real preferences, zero compromises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
