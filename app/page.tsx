"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaDiscord, FaPaypal, FaTimes, FaTwitch, FaYoutube } from "react-icons/fa";

const copy = {
  domain: "jaanmangib.dev",
  statusLine: "Igapäevane sõnum: wkndrp.ee",
  name: "Jaan Mängib",
  intro: "Vaieldamatu eesti rollimängu professionaal, kelle ees kohkub iga eesti rollimängu serveri admin.",
  alias: "jaanmangib",
  descriptionTitle: "Kirjeldus",
  description: "Jaan Mängib on internetiavarustes tegutsev Eesti rollimängu tegelane, kelle nimi käib serverites ringi kiiremini kui admini timeout.",
  discordTitle: "Discord",
  archiveTitle: "Arhiiv",
  archiveName: "RIP Wortex 2019-2025",
  donateTitle: "Maksa elatisvõlg ära!",
  donateBody: "Ära ole nagu rastamartti ja maksa elatisvõlg oma tütrele ära.",
  openDiscord: "Ava Discordi profiil",
  currentPrefix: "Praegu:",
  pay: "Maksma",
} as const;

const profile = {
  discordId: "1038503233947181237",
  support: {
    paypalDonateLink: "https://paypal.me/jaanmangib",
  },
};

const quickAmounts = ["5", "15", "25", "50"];
const defaultDiscordAvatar = "https://cdn.discordapp.com/embed/avatars/0.png";

type LanyardUser = {
  id: string;
  username: string;
  global_name?: string | null;
};

type LanyardData = {
  discord_user: LanyardUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{ id: string; name: string; type: number; state?: string; details?: string }>;
};

type LanyardResponse = { success: boolean; data?: LanyardData };

function statusLabel(status: LanyardData["discord_status"]) {
  switch (status) {
    case "online":
      return "Online";
    case "idle":
      return "Idle";
    case "dnd":
      return "Do not disturb";
    default:
      return "Offline";
  }
}

function statusColor(status: LanyardData["discord_status"]) {
  switch (status) {
    case "online":
      return "bg-emerald-400";
    case "idle":
      return "bg-amber-300";
    case "dnd":
      return "bg-rose-400";
    default:
      return "bg-zinc-500";
  }
}

export default function Home() {
  const [amount, setAmount] = useState("25.00");
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [isWortexOpen, setIsWortexOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.discordId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          return;
        }

        const json: LanyardResponse = await res.json();

        if (mounted && json.success) {
          setLanyard(json.data ?? null);
        }
      } catch {
        // Discord võib vaikselt ebaõnnestuda ilma lehte rikkumata.
      }
    };

    load();
    const intervalId = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isWortexOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isWortexOpen]);

  const user = lanyard?.discord_user;
  const displayName = user?.global_name || user?.username || copy.name;
  const status = lanyard?.discord_status ?? "offline";
  const activity = lanyard?.activities.find((item) => item.name)?.name;

  const paypalWithAmount = (() => {
    const base = profile.support.paypalDonateLink;
    const parsedAmount = Number(amount);

    if (!base || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return base;
    }

    const fixed = parsedAmount.toFixed(2);
    const trimmed = fixed.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
    return `${base}/${trimmed}`;
  })();

  return (
    <>
      <div className="bg-[#111827] text-white">
        <div className="bg-shapes">
          <div className="mx-auto max-w-screen-xl px-4 py-4">
            <header className="mt-2 rounded-2xl bg-[#1b2d46] px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] ring-1 ring-cyan-400/10">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={defaultDiscordAvatar} alt="Discord default avatar" fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">{copy.domain}</h1>
                  <p className="mt-1 text-sm text-cyan-100/85">{copy.statusLine}</p>
                </div>
              </div>
            </header>
          </div>

          <section className="relative flex min-h-[82vh] items-center">
            <div className="mx-auto grid max-w-screen-xl gap-10 px-4 py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
              <div className="place-self-center lg:col-span-7">
                <h2 className="text-5xl font-extrabold leading-none text-white sm:text-6xl">{copy.name}</h2>
                <p className="mt-4 text-3xl font-bold text-white">{copy.intro}</p>
                <p className="mt-3 text-xl italic text-gray-400">aka {copy.alias}</p>
              </div>

              <div className="flex justify-center lg:col-span-5 lg:mt-0">
                <div className="relative h-80 w-80 rounded-full p-1 ring-4 ring-cyan-500/80 lg:h-96 lg:w-96">
                  <Image src={defaultDiscordAvatar} alt="Jaani profiilipilt" fill className="rounded-full object-cover" sizes="384px" priority />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
              <svg className="relative block h-20 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="fill-slate-700"
                />
              </svg>
            </div>
          </section>
        </div>

        <section className="bg-slate-700 px-4 py-12">
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-4 rounded-2xl border border-gray-200/10 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{copy.descriptionTitle}</h3>
              <p className="text-base text-gray-700 dark:text-white">{copy.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-gray-200/10 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{copy.discordTitle}</h3>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image src={defaultDiscordAvatar} alt="Discord avatar" fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{displayName}</p>
                    <div className="mt-1 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className={`h-2.5 w-2.5 rounded-full ${statusColor(status)}`} aria-hidden="true" />
                      {statusLabel(status)}
                    </div>
                  </div>
                </div>

                {activity && (
                  <div className="mt-5 rounded-xl bg-gray-100 p-4 dark:bg-slate-700">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {copy.currentPrefix} {activity}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`https://discord.com/users/${profile.discordId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7289DA] px-5 py-2.5 text-white transition hover:bg-[#5a73cc]"
                  >
                    <FaDiscord className="h-4 w-4" />
                    {copy.openDiscord}
                  </a>
                  <a
                    href="https://twitch.tv/jaanmangib"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#9146FF] px-5 py-2.5 text-white transition hover:bg-[#7b31eb]"
                  >
                    <FaTwitch className="h-4 w-4" />
                    Twitch - jaanmangib
                  </a>
                  <a
                    href="https://youtube.com/@jaanmangib"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000] px-5 py-2.5 text-white transition hover:bg-[#df0000]"
                  >
                    <FaYoutube className="h-4 w-4" />
                    YouTube - jaanmangib
                  </a>
                </div>
              </article>

              <div className="grid gap-4">
                <article className="rounded-2xl border border-gray-200/10 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{copy.archiveTitle}</h3>
                  <button type="button" onClick={() => setIsWortexOpen(true)} className="group block w-full overflow-hidden rounded-xl text-left">
                    <div className="relative min-h-[12rem]">
                      <Image
                        src="/banner.png"
                        alt="Wortex"
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h4 className="text-2xl font-bold text-white">{copy.archiveName}</h4>
                      </div>
                    </div>
                  </button>
                </article>

                <article id="support" className="rounded-2xl border border-gray-200/10 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{copy.donateTitle}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{copy.donateBody}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount)}
                        className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                      >
                        {quickAmount} €
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-4 dark:bg-slate-700">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">€</span>
                    <input
                      id="amount"
                      className="w-full bg-transparent text-xl font-semibold text-slate-900 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
                      inputMode="decimal"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      placeholder="25.00"
                    />
                  </div>

                  <a
                    href={paypalWithAmount}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    <FaPaypal className="h-4 w-4" />
                    {copy.pay}
                  </a>
                </article>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-slate-700 px-4 pb-6">
          <div className="mx-auto max-w-screen-xl border-t border-white/10 pt-4 text-center text-sm text-slate-400">
            Copyright {new Date().getFullYear()} {copy.domain}
          </div>
        </footer>
      </div>

      {isWortexOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/68 px-4 py-6 backdrop-blur-[2px]" onClick={() => setIsWortexOpen(false)}>
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsWortexOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
              aria-label="Sulge Wortex"
            >
              <FaTimes className="h-4 w-4" />
            </button>
            <div className="relative aspect-[16/10] w-full bg-slate-950">
              <Image src="/wortex.png" alt="Wortex" fill className="object-contain" sizes="90vw" priority />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
