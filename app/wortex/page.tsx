import Image from "next/image";

export default function WortexPage() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/bg.png)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(113,228,255,0.18),transparent_30%),linear-gradient(180deg,rgba(4,8,15,0.72)_0%,rgba(4,8,15,0.95)_100%)]" />

      <main className="w-full max-w-5xl rounded-[2.25rem] border border-white/10 bg-[rgba(10,20,36,0.72)] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6">
        <div className="overflow-hidden rounded-[1.8rem] border border-white/10">
          <Image
            src="/wortex.png"
            alt="Wortex"
            width={1600}
            height={1600}
            className="max-h-[82vh] w-full object-contain bg-[radial-gradient(circle_at_top,rgba(113,228,255,0.12),transparent_34%),linear-gradient(180deg,rgba(8,17,31,0.1)_0%,rgba(8,17,31,0.5)_100%)]"
            priority
          />
        </div>
      </main>
    </div>
  );
}
