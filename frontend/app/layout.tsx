import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Incident Reporter",
  description: "Workplace incident reporting and tracking",
};

export default function RootLayout({
  children,
}:{
  childent: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5x1 px-6 py-4">
            <h1 className="text-lg font-semibold tracking-tight">
              Incident Reporter
            </h1>
          </div>
        </header>
        <main id="main-context" className="mx-auto max-w-5x1 px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}