import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/book-call")({
  head: () => ({
    meta: [
      { title: "Schedule Your 15-Minute Freedom Audit | Pareto Talent" },
      { name: "description", content: "Book your 1-on-1 operational audit with a Pareto Talent strategist and map out your 30-day delegation plan." },
      { property: "og:title", content: "Schedule Your 15-Minute Freedom Audit | Pareto Talent" },
      { property: "og:description", content: "Qualified founders: pick a time to map your custom 30-day delegation plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookCall,
});

const cards = [
  { title: "⚡ 3 Matches in 24 Hours", body: "Founders receive 3 hand-picked, Predictive Index-matched candidate profiles within 24 hours of their discovery call." },
  { title: "🧠 100+ 7- & 8-Figure Mastermind Peers", body: "Clients get weekly access to Kasim Aslam's live Delegation Mastermind alongside 100+ scaling CEOs." },
];

function BookCall() {
  return (
    <div className="min-h-screen bg-background font-sans text-body">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link to="/" className="font-display text-sm font-extrabold tracking-wide text-foreground">
            PARETO TALENT <span className="mx-2 text-accent">|</span>
            <span className="font-semibold text-muted-foreground">OPERATIONAL FRAMEWORKS</span>
          </Link>
        </div>
      </header>

      <section className="px-6 pb-12 pt-16 text-center">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Congratulations — You Qualify for a Freedom Audit
        </span>
        <h1 className="mt-6 font-display text-[30px] font-extrabold leading-tight text-foreground md:text-[36px]">
          Schedule Your 15-Minute Freedom Audit
        </h1>
        <p className="mx-auto mt-5 max-w-[720px] text-lg leading-relaxed">
          You have officially qualified for a 1-on-1 operational audit with a Pareto Talent strategist. Select a date and time on the calendar below to map out your custom 30-day delegation plan and buy back 15–20 hours of your week.
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[900px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_10px_30px_color-mix(in_oklch,var(--foreground)_5%,transparent)]">
          {/* PASTE GHL CALENDAR IFRAME EMBED CODE HERE — replace the placeholder div below with the <iframe> (keep w-full, min-h-[700px]) */}
          <div className="flex min-h-[700px] w-full flex-col items-center justify-center gap-4 bg-muted">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
              <CalendarDays className="h-7 w-7 text-primary" />
            </div>
            <p className="font-display font-bold text-foreground">Loading Calendar...</p>
            <p className="text-sm text-muted-foreground">(GHL Embed Placeholder)</p>
          </div>
        </div>
      </section>

      <section className="bg-muted px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-extrabold text-foreground">What Happens After You Book</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cards.map((c) => (
              <div key={c.title} className="rounded-md border-l-4 border-primary bg-background p-7 shadow-sm">
                <h3 className="font-display text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-3 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © Pareto Talent. All Rights Reserved. Backed by the Freedom 40 Guarantee.
      </footer>
    </div>
  );
}
