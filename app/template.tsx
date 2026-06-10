"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFadeOut(true), 400);
    const hideTimer = window.setTimeout(() => setShowLoader(false), 650);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#111827] transition-opacity duration-200 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-md px-6">
            <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.28em] text-cyan-100/75">jaanmangib.dev</p>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full origin-left animate-[loaderBar_650ms_ease-out_forwards] rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
