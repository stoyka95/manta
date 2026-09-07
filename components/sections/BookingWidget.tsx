"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Check, ChevronLeft, ChevronRight, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- konstanty */

const LANES = [1, 2, 3, 4, 5, 6];
/** Provozní doba 11:00–24:00 → poslední začátek hry ve 23:00. */
const HOURS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const DAYS_AHEAD = 14;
const MAX_HOURS_PER_LANE = 3;

const WEEKDAYS_SHORT = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
const MONTHS = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];

/* ------------------------------------------------------------------ pomocné */

/** Reálný ceník Manty: Po–Pá 330/430/530, víkend a svátky 450/550 Kč za dráhu a hodinu. */
function priceFor(date: Date, hour: number) {
  const day = date.getDay();
  const weekend = day === 0 || day === 6;
  if (weekend) return hour >= 17 ? 550 : 450;
  if (hour >= 17) return 530;
  if (hour >= 14) return 430;
  return 330;
}

/** Deterministický hash — obsazenost je „náhodná“, ale pro stejný den/dráhu/hodinu vždy stejná. */
function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** Demo obsazenost — večery jsou plnější než dopoledne, víkend plnější než všední den. */
function isBusy(dateKey: string, lane: number, hour: number) {
  const day = Number(dateKey.slice(-2)) % 7;
  const weekendBoost = day === 0 || day === 6 ? 0.12 : 0;
  const load = (hour >= 19 ? 0.5 : hour >= 17 ? 0.38 : hour >= 14 ? 0.2 : 0.12) + weekendBoost;
  return hash(`${dateKey}|${lane}|${hour}`) < load;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function formatLong(d: Date) {
  return `${WEEKDAYS_SHORT[d.getDay()]} ${d.getDate()}. ${MONTHS[d.getMonth()]}`;
}

function hoursLabel(n: number) {
  if (n === 1) return "hodina";
  if (n >= 2 && n <= 4) return "hodiny";
  return "hodin";
}

function lanesLabel(n: number) {
  if (n === 1) return "dráha";
  if (n >= 2 && n <= 4) return "dráhy";
  return "drah";
}

/** Vrací true až po hydrataci — datum se počítá jen na klientovi (žádný hydration mismatch). */
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/* ---------------------------------------------------------------- komponenta */

type Slot = { lane: number; hour: number };

export function BookingWidget() {
  const isClient = useIsClient();
  /** Když dnes zbývají méně než 3 hrací hodiny, otevřeme rovnou zítřek. */
  const [dayOffset, setDayOffset] = useState(() =>
    typeof window === "undefined" ? 0 : new Date().getHours() > 20 ? 1 : 0
  );
  const [dayPage, setDayPage] = useState(0);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [step, setStep] = useState<"select" | "contact" | "done">("select");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => {
    if (!isClient) return [];
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, [isClient]);

  const selectedDate = days[dayOffset];
  const key = selectedDate ? dateKey(selectedDate) : "";
  const nowHour = isClient ? new Date().getHours() : 0;

  const total = selectedDate
    ? slots.reduce((sum, s) => sum + priceFor(selectedDate, s.hour), 0)
    : 0;
  const lanesUsed = new Set(slots.map((s) => s.lane)).size;

  function pickDay(index: number) {
    setDayOffset(index);
    setSlots([]);
    setStep("select");
  }

  function toggleSlot(lane: number, hour: number) {
    setSlots((prev) => {
      const exists = prev.some((s) => s.lane === lane && s.hour === hour);
      if (exists) return prev.filter((s) => !(s.lane === lane && s.hour === hour));
      const onLane = prev.filter((s) => s.lane === lane).length;
      if (onLane >= MAX_HOURS_PER_LANE) return prev;
      return [...prev, { lane, hour }];
    });
  }

  /* --------------------------------------------------------------- skeleton */

  if (!isClient || !selectedDate) {
    return (
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="h-[386px] animate-pulse rounded-3xl border border-line bg-white/60" />
        <div className="h-[386px] animate-pulse rounded-3xl border border-line bg-white/60" />
      </div>
    );
  }

  /* ------------------------------------------------------------- dny (strip) */

  const perPage = 7;
  const pages = Math.ceil(days.length / perPage);
  const visibleDays = days.slice(dayPage * perPage, dayPage * perPage + perPage);

  return (
    <div className="grid gap-4 pb-24 lg:grid-cols-[minmax(0,1fr)_310px] lg:pb-0">
      {/* ============================================ levý panel: den + mřížka */}
      <div className="min-w-0 rounded-3xl border border-line bg-white p-4 shadow-soft sm:p-5">
        {/* výběr dne */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDayPage((p) => Math.max(0, p - 1))}
            disabled={dayPage === 0}
            aria-label="Předchozí dny"
            className="flex size-8 flex-none items-center justify-center rounded-full border border-line text-ink-700 transition-colors hover:bg-ocean-100 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="grid flex-1 grid-cols-7 gap-1.5">
            {visibleDays.map((d) => {
              const index = days.indexOf(d);
              const active = index === dayOffset;
              const isToday = index === 0;
              return (
                <button
                  key={dateKey(d)}
                  type="button"
                  onClick={() => pickDay(index)}
                  className={cn(
                    "relative flex flex-col items-center rounded-xl px-1 py-1.5 transition-colors",
                    active
                      ? "bg-ink-900 text-white"
                      : "bg-ocean-100/60 text-ink-700 hover:bg-ocean-200"
                  )}
                >
                  <span className="text-[10px] font-semibold uppercase opacity-70">
                    {WEEKDAYS_SHORT[d.getDay()]}
                  </span>
                  <span className="font-display text-sm font-bold leading-tight">
                    {d.getDate()}.
                  </span>
                  {isToday && (
                    <span
                      className={cn(
                        "absolute -top-0.5 right-1 size-1.5 rounded-full",
                        active ? "bg-gold-500" : "bg-ocean-500"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setDayPage((p) => Math.min(pages - 1, p + 1))}
            disabled={dayPage >= pages - 1}
            aria-label="Další dny"
            className="flex size-8 flex-none items-center justify-center rounded-full border border-line text-ink-700 transition-colors hover:bg-ocean-100 disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* mřížka dráha × hodina */}
        <div className="-mx-1 mt-3 overflow-x-auto px-1 pb-1">
          <div className="min-w-[620px]">
            {/* hlavička s hodinami */}
            <div className="grid grid-cols-[52px_repeat(13,minmax(0,1fr))] gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">
                Dráha
              </span>
              {HOURS.map((h) => (
                <span
                  key={h}
                  className="text-center text-[10px] font-semibold text-ink-500 tabular-nums"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* řádky drah */}
            {LANES.map((lane) => (
              <div
                key={lane}
                className="mt-1 grid grid-cols-[52px_repeat(13,minmax(0,1fr))] items-center gap-1"
              >
                <span className="font-display text-xs font-bold text-ink-900">
                  č. {lane}
                </span>
                {HOURS.map((hour) => {
                  const past = dayOffset === 0 && hour <= nowHour;
                  const busy = past || isBusy(key, lane, hour);
                  const selected = slots.some((s) => s.lane === lane && s.hour === hour);
                  const laneFull =
                    !selected && slots.filter((s) => s.lane === lane).length >= MAX_HOURS_PER_LANE;
                  const price = priceFor(selectedDate, hour);

                  return (
                    <button
                      key={hour}
                      type="button"
                      disabled={busy || laneFull}
                      onClick={() => toggleSlot(lane, hour)}
                      aria-label={`Dráha ${lane}, ${hour}:00, ${
                        busy ? "obsazeno" : `${price} Kč`
                      }`}
                      aria-pressed={selected}
                      className={cn(
                        "h-8 rounded-lg text-[10px] font-semibold tabular-nums transition-all duration-150",
                        selected
                          ? "scale-[1.06] bg-gold-500 text-ink-900 shadow-soft"
                          : busy
                            ? "cursor-not-allowed bg-line/60 text-ink-500/40"
                            : laneFull
                              ? "cursor-not-allowed bg-ocean-100/40 text-ink-500/40"
                              : "bg-ocean-100 text-ocean-700 hover:bg-ocean-200 hover:shadow-soft"
                      )}
                    >
                      {selected ? <Check className="mx-auto size-3.5" /> : busy ? "—" : price}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* legenda */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-full bg-ocean-100 ring-1 ring-ocean-200" />
            Volno (číslo = cena za hodinu)
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-full bg-gold-500" />
            Vybráno
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-full bg-line" />
            Obsazeno
          </span>
          <span className="ml-auto hidden sm:inline">
            Max. {MAX_HOURS_PER_LANE} h na dráhu online
          </span>
        </div>
      </div>

      {/* =========================================================== souhrn
          desktop: pravý sloupec · mobil: fixní lišta u spodní hrany obrazovky */}
      <aside
        className={cn(
          "z-40 flex flex-col border border-line bg-ink-900 text-white shadow-lift",
          "fixed inset-x-3 bottom-3 rounded-2xl p-4",
          "lg:static lg:inset-auto lg:rounded-3xl lg:p-5"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {step === "select" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col"
            >
              {/* --- kompaktní varianta pro mobil --- */}
              <div className="flex items-center gap-3 lg:hidden">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] text-white/60">
                    {formatLong(selectedDate)} ·{" "}
                    {slots.length === 0
                      ? "vyberte čas v mřížce"
                      : `${slots.length} h · ${lanesUsed} ${lanesLabel(lanesUsed)}`}
                  </p>
                  <p className="font-display text-xl font-extrabold tabular-nums text-gold-400">
                    {total} Kč
                  </p>
                </div>
                <Button
                  type="button"
                  disabled={slots.length === 0}
                  onClick={() => setStep("contact")}
                  className="disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Pokračovat <CalendarCheck className="size-4" />
                </Button>
              </div>

              {/* --- plná varianta pro desktop --- */}
              <div className="hidden h-full flex-col lg:flex">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ocean-300">
                  Vaše rezervace
                </p>
                <p className="mt-1 font-display text-lg font-bold leading-tight">
                  {formatLong(selectedDate)}
                </p>

                <div className="mt-3 min-h-[112px] flex-1 space-y-1.5 overflow-y-auto text-sm">
                  {slots.length === 0 ? (
                    <p className="text-white/50">
                      Klepněte v mřížce na volný čas u dráhy. Cena se spočítá
                      automaticky podle denní doby.
                    </p>
                  ) : (
                    LANES.filter((l) => slots.some((s) => s.lane === l)).map((lane) => {
                      const laneHours = slots
                        .filter((s) => s.lane === lane)
                        .map((s) => s.hour)
                        .sort((a, b) => a - b);
                      const laneSum = laneHours.reduce(
                        (sum, h) => sum + priceFor(selectedDate, h),
                        0
                      );
                      return (
                        <div
                          key={lane}
                          className="flex items-baseline justify-between gap-2 rounded-xl bg-white/8 px-3 py-2"
                        >
                          <span>
                            <b className="font-display">Dráha {lane}</b>{" "}
                            <span className="text-white/60 tabular-nums">
                              {laneHours.map((h) => `${h}:00`).join(", ")}
                            </span>
                          </span>
                          <span className="flex-none font-semibold tabular-nums">
                            {laneSum} Kč
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-3 border-t border-white/15 pt-3">
                  <div className="flex items-end justify-between">
                    <span className="text-xs text-white/60">
                      {slots.length} {hoursLabel(slots.length)}
                      {lanesUsed > 0 && ` · ${lanesUsed} ${lanesLabel(lanesUsed)}`}
                    </span>
                    <span className="font-display text-2xl font-extrabold tabular-nums text-gold-400">
                      {total} Kč
                    </span>
                  </div>
                  <Button
                    type="button"
                    disabled={slots.length === 0}
                    onClick={() => setStep("contact")}
                    className="mt-3 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Pokračovat <CalendarCheck className="size-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ocean-300">
                Poslední krok
              </p>
              <p className="mt-1 font-display text-lg font-bold leading-tight">
                Kam poslat potvrzení?
              </p>

              <div className="mt-3 flex-1 space-y-2.5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jméno a příjmení"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold-400 focus:outline-none"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  inputMode="tel"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold-400 focus:outline-none"
                />
                <p className="rounded-xl bg-white/8 px-3 py-2 text-xs text-white/60">
                  {formatLong(selectedDate)} · {slots.length} {hoursLabel(slots.length)} ·{" "}
                  <b className="text-gold-400">{total} Kč</b>
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="h-11 flex-none rounded-full px-4 font-display text-[15px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Zpět
                </button>
                <Button
                  type="button"
                  disabled={name.trim().length < 2 || phone.trim().length < 9}
                  onClick={() => setStep("done")}
                  className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Rezervovat
                </Button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-gold-500 text-ink-900">
                <Check className="size-6" />
              </span>
              <p className="mt-3 font-display text-lg font-bold">Máme to zapsané!</p>
              <p className="mt-1.5 text-sm text-white/60">
                {formatLong(selectedDate)} · {slots.length} {hoursLabel(slots.length)} ·{" "}
                <b className="text-gold-400">{total} Kč</b>
              </p>
              <p className="mt-2 text-xs text-white/40">
                Demo ukázka — rezervace se nikam neodesílá.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSlots([]);
                  setName("");
                  setPhone("");
                  setStep("select");
                }}
                className="mt-4"
              >
                Nová rezervace
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* ============================================== spodní lišta s poznámkou */}
      <div className="hidden flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-500 lg:col-span-2 lg:flex">
        <span className="flex items-center gap-1.5">
          <Info className="size-3.5 flex-none text-gold-600" />
          Interaktivní demo — obsazenost je ilustrativní, nic se neodesílá.
        </span>
        <a
          href={site.phoneHref}
          className="flex items-center gap-1.5 font-semibold text-ocean-700 hover:text-ocean-600"
        >
          <Phone className="size-3.5" />
          Větší akce a firemní večírky: {site.phone}
        </a>
      </div>
    </div>
  );
}
