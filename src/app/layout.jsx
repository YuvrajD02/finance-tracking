import "./globals.css";

import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/sidebar";

export default function RootLayout({ children }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Finance Dashboard";

  return (
    <html lang="en">
      <body className="bw-dark-surface text-slate-900">
        <div className="mx-auto min-h-screen max-w-[1280px] p-3 sm:p-5 lg:p-7">
          <div className="relative flex min-h-[calc(100vh-3.5rem)] overflow-hidden rounded-[28px] border border-white/70 bg-[#f6f4fb] shadow-[0_22px_70px_-24px_rgba(67,24,255,0.35)]">
            <Sidebar appName={appName} />

            <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col md:ml-[248px]">
              <Navbar appName={appName} />

              <main className="flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}