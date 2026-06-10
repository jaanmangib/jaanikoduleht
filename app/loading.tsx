export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#09111d_0%,#0a1320_45%,#09111d_100%)] px-6">
      <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-white/6 px-10 py-9 backdrop-blur-xl">
        <div className="flex gap-2">
          <span className="h-3 w-3 animate-[pulse_900ms_ease-in-out_infinite] rounded-full bg-cyan-300" />
          <span className="h-3 w-3 animate-[pulse_900ms_ease-in-out_150ms_infinite] rounded-full bg-cyan-300/80" />
          <span className="h-3 w-3 animate-[pulse_900ms_ease-in-out_300ms_infinite] rounded-full bg-cyan-300/60" />
        </div>
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-100/75">jaanmangib.dev</p>
          <p className="mt-2 text-sm text-white/62">Laen lehte...</p>
        </div>
      </div>
    </div>
  );
}
