import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CyberQuest — Track Your Cybersecurity Journey",
  description: "A personal cybersecurity progress tracker. Level up one day at a time.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-secondary font-sans antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
              borderRadius: "99px",
              fontWeight: 600,
              fontSize: "0.85rem",
            },
            success: {
              iconTheme: { primary: "#22d3ee", secondary: "#0f172a" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#0f172a" },
            },
          }}
        />
      </body>
    </html>
  );
}
