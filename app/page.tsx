"use client";

import { useEffect, useState } from "react";

// --- KONFIG ---
const profile = {
  name: "jaanmangib",
  title: "Eesti rollimängu profesionaal kelle ees kohkub ka wortexi admin vasja",
  discordId: "1038503233947181237",
  support: {
    paypalDonateLink: "https://paypal.me/jaanmangib",
  },
};

// --- Lanyard tüübid ---
type LanyardUser = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
};
type LanyardData = {
  discord_user: LanyardUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{ id: string; name: string; type: number; state?: string; details?: string }>;
};
type LanyardResponse = { success: boolean; data?: LanyardData };

// --- Abi: avatar URL ---
function avatarUrl(u?: LanyardUser) {
  if (!u?.avatar || !u?.id) return "/favicon.svg";
  const ext = u.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=256`;
}

// --- Staatuse ikoon ---
function StatusIcon({ status }: { status: string }) {
  const common = "inline-block w-3 h-3 rounded-full mr-2";
  switch (status) {
    case "online":
      return <span className={`${common} bg-green-500`} title="Online" />;
    case "idle":
      return <span className={`${common} bg-yellow-400`} title="Idle" />;
    case "dnd":
      return <span className={`${common} bg-red-500`} title="Do Not Disturb" />;
    default:
      return <span className={`${common} bg-gray-500`} title="Offline" />;
  }
}

export default function Home() {
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("25.00");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.discordId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: LanyardResponse = await res.json();
        if (!json.success) throw new Error("Lanyard vastas success=false");
        if (mounted) {
          setLanyard(json.data ?? null);
          setErr(null);
        }
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? "Viga andmete laadimisel");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const iv = setInterval(load, 15000);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, []);

  const status = lanyard?.discord_status ?? "offline";
  const user = lanyard?.discord_user;
  const displayName = user?.global_name || user?.username || "Discord";

  const statusLabel =
    status === "online" ? "Linnas sees" : status === "idle" ? "Magab" : status === "dnd" ? "Ära sega" : "Piiri taga";

  const paypalWithAmount = (() => {
    const base = profile.support.paypalDonateLink;
    if (!base) return "";
    const n = Number(amount);
    if (!isFinite(n) || n <= 0) return base;
    const fixed = n.toFixed(2);
    const trimmed = fixed.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
    return `${base}/${trimmed}`;
  })();

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url(/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-10 bg-white/70 px-8 py-16 backdrop-blur-sm dark:bg-black/50 sm:items-start sm:px-16">

        {/* HERO */}
        <section className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white drop-shadow md:text-yellow md:drop-shadow-none">
            <span className="text-blue-200 md:text-blue-600">Jaani</span> kodulehekülg.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-white/90 md:text-zinc-600">
            {profile.title}
          </p>
        </section>

        {/* DISCORD */}
        <section id="discord" className="w-full">
          <h2 className="mb-4 text-2xl font-semibold text-white md:text-zinc-50">Discord</h2>

          <article className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/40">
                <img src={avatarUrl(user)} alt="Discord avatar" className="h-full w-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-black dark:text-zinc-50">{displayName}</h3>
                  <span
                    className={
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs border-white/20 dark:border-white/20"
                    }
                  >
                    <StatusIcon status={status} />
                    {statusLabel}
                  </span>
                </div>

                {lanyard?.activities?.[0]?.name && (
                  <p className="mt-1 text-sm opacity-70 text-black dark:text-zinc-300">
                    Aktiivne: {lanyard.activities[0].name}
                  </p>
                )}

                <a
                  href={`https://discord.com/users/${profile.discordId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm underline"
                >
                  Profiil
                </a>

                {loading && <p className="mt-1 text-sm opacity-60">Laen Discordi andmeid...</p>}
                {err && (
                  <p className="mt-1 text-sm text-red-400 md:text-red-600">
                    Viga: {err}. (Kontrolli ID-d või Lanyardit)
                  </p>
                )}
              </div>
            </div>
          </article>
        </section>

        {/* KLIKITAV BÄNNER */}
        <section className="w-full">
          <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/50 backdrop-blur">
            <a href="/wortex" aria-label="Mine wortex lehele">
              <img src="/banner.png" alt="Banner" className="h-56 w-full object-cover transition hover:opacity-90" />
            </a>
          </div>

          <div className="mt-3 flex">
            <a
              href="/wortex"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-yellow-600 px-6 py-3 text-white shadow-lg shadow-green/30 backdrop-blur hover:from-fuchsia-500 hover:to-red-500 transition"
            >
              Jaan wortexi adminiks
            </a>
          </div>
        </section>

        {/* MAKSA VÕLG ÄRA */}
        <section id="debt" className="w-full">
          <h2 className="mb-4 text-2xl font-semibold text-white md:text-zinc-50">Maksa võlg ära</h2>
          <article className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10">
            <p className="text-sm text-black/80 dark:text-zinc-300">Sisesta summa ja saada rahad jaanini!</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label className="block text-sm font-medium text-black dark:text-zinc-200">Summa (€)</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white px-3 py-2 text-black shadow-inner dark:border-white/20 dark:bg-zinc-900 dark:text-zinc-100"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="nt 25.00"
                />
              </div>
            </div>

            <div className="mt-4">
              <a
                href={paypalWithAmount}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Raha saatma
              </a>
            </div>

            <p className="mt-4 text-xs text-white/80 md:text-zinc-500">Märkus: JAAN RAHASI TAGASI EI SAADA.</p>
          </article>
        </section>

        <footer className="w-full border-t border-white/30 pt-6 text-sm text-white/80 md:text-zinc-500">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </div>
  );
}
