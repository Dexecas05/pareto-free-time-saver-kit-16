import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Brain, Bot, Zap, Check, ArrowRight, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The 10-Minute Brain-Dump SOP Kit | Pareto Talent" },
      { name: "description", content: "Extract any workflow from your head in under 10 minutes. Free SOP kit for 7- and 8-figure founders." },
      { property: "og:title", content: "The 10-Minute Brain-Dump SOP Kit | Pareto Talent" },
      { property: "og:description", content: "Turn raw voice notes into execution-ready SOPs. Free kit from Pareto Talent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const kit = [
  { icon: Brain, title: "The 3-Minute Voice-Note Brain-Dump Framework", body: "A simple, friction-free verbal checklist that lets you ramble through any complex workflow, edge case, or decision tree into your phone while walking or driving.", bold: "Zero manual writing, zero formatting, and zero prep required." },
  { icon: Bot, title: "The Master AI Architect Prompt (Claude & ChatGPT)", body: "Our pre-engineered, senior-tier operations prompt parses your raw audio transcript, strips out conversational fluff, and auto-formats it into an enterprise-grade SOP.", bold: "Complete with decision trees and clear \"Definitions of Done.\"" },
  { icon: Zap, title: "10-Minute Execution Protocol", body: "A step-by-step workflow designed for overwhelmed founders working 70+ hours a week. Go from raw, unwritten knowledge to a complete SOP.", bold: "Handoff-ready in under 600 seconds." },
];

const forYou = [
  <>You work <b>70+ hours a week</b> because fulfillment and administrative blazes consume your normal business hours.</>,
  <>Your company has <b>zero documented SOPs</b>, so every routine question, vendor issue, or client edge case requires your personal intervention.</>,
  <>You want to delegate, but default to <i>"If you want it done right, do it yourself"</i> because explaining workflows takes longer than doing them.</>,
  <>You are tired of acting as a full-time supervisor to generic VAs who wait for micro-instructions instead of owning outcomes.</>,
];

const stats = [
  { n: "100+", label: "Founders Served", body: "Trusted by 7- and 8-figure entrepreneurs across dozens of industries to eliminate operational constraints." },
  { n: "93%", label: "12-Month Retention Rate", body: "The industry-leading benchmark proving our delegation systems create permanent, compounding founder leverage." },
  { n: "$2.1M+", label: "Paid to Top 1% Talent", body: "Sourcing, vetting, and deploying the top 0.1% of Latin American operators (\"Right Hands\") trained on modern ops and AI." },
];

function Index() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="font-sans text-body">
      <header className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-lg font-extrabold tracking-tight">Pareto<span className="text-accent">.</span>Talent</span>
          <a href="#get-kit" className="text-sm font-semibold text-ink-foreground/80 hover:text-ink-foreground">Get the free kit →</a>
        </div>
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-14 text-center">
          <p className="eyebrow !text-accent">Free Kit · The 10-Minute Brain-Dump SOP Kit</p>
          <h1 className="mt-5 font-display text-[32px] font-extrabold leading-[1.15] md:text-[48px]">
            Stop Running Your $1M+ Business From Memory. <span className="text-accent">Extract Any Workflow From Your Head in Under 10 Minutes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-foreground/75">
            You are not trapped by a lack of time — you are trapped in the "Heroic Bottleneck." Discover the exact 3-step brain-dump method to instantly turn raw voice notes into execution-ready SOPs without writing a single line manually.
          </p>
          <a href="#get-kit" className="btn-cta mt-10 gap-2">Get the Free SOP Kit Now <ArrowRight className="h-5 w-5" /></a>
          <figure className="mx-auto mt-14 max-w-2xl border-l-4 border-accent pl-6 text-left">
            <blockquote className="text-lg italic text-ink-foreground/90">"Being the center of your operational universe feels like leadership; it is a disease disguised as heroism."</blockquote>
            <figcaption className="mt-3 text-sm text-ink-foreground/60"><b className="text-ink-foreground">Kasim Aslam</b>, Co-Founder of Pareto Talent & Author of <i>HIRE</i></figcaption>
          </figure>
        </section>
      </header>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow text-center">What's inside the free kit</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-2xl font-bold leading-tight text-foreground md:text-[32px]">Everything You Need to Stop Acting as a $20/hr Process Manager Today</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {kit.map(({ icon: Icon, title, body, bold }, i) => (
              <div key={title} className="rounded-lg border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                  <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-primary">{title}</h3>
                <p className="mt-3 leading-relaxed">{body}</p>
                <p className="mt-3 font-semibold text-foreground">{bold}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="eyebrow">Who it's for</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground md:text-[32px]">Designed for The Memory-Bound Firefighter</h2>
            <p className="mt-5 text-lg leading-relaxed">Built for <b className="text-foreground">7- and 8-figure founders, CEOs, and serial entrepreneurs</b> who are actively bottlenecking their own growth because their entire company lives inside their head.</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-semibold text-foreground">This is for you if:</p>
            <ul className="mt-5 space-y-5">
              {forYou.map((item, i) => (
                <li key={i} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-success" /><span className="leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow text-center">Proof & authority</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-2xl font-bold leading-tight text-foreground md:text-[32px]">Built on Battle-Tested Systems That Power Top-Tier Founders</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg">Pareto Talent doesn't deal in theory or generic outsourcing templates. Our frameworks have been battle-tested across hundreds of scaling businesses.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-ink-foreground/10 bg-ink p-7 text-ink-foreground shadow-xl">
                <div className="font-display text-[42px] font-extrabold text-accent">{s.n}</div>
                <div className="font-semibold">{s.label}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-kit" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-accent">Instant access</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-[40px]">Reclaim 15–20 Hours of Your Week Starting Today.</h2>
            <p className="mt-5 text-lg text-ink-foreground/75">Enter your details to get instant access to <b className="text-ink-foreground">The 10-Minute Brain-Dump SOP Kit</b> (Notion Template + Master AI Prompt Kit).</p>
          </div>
          <div className="rounded-lg bg-card p-8 text-card-foreground shadow-2xl">
            {sent ? (
              <div className="py-10 text-center">
                <Check className="mx-auto h-12 w-12 text-success" />
                <h3 className="mt-4 font-display text-2xl font-bold">You're in.</h3>
                <p className="mt-2 text-body">Check your inbox — your SOP Kit is on its way.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {[["Full Name", "text", "name"], ["Business Email", "email", "email"], ["Mobile Phone", "tel", "phone"]].map(([l, t, n]) => (
                  <label key={n} className="block"><span className="mb-1.5 block text-[15px] font-medium">{l}</span><input required type={t} name={n} className="field" /></label>
                ))}
                <label className="block"><span className="mb-1.5 block text-[15px] font-medium">Annual Revenue Tier</span>
                  <select required defaultValue="" className="field"><option value="" disabled>Select…</option><option>Under $250k</option><option>$250k–$1M</option><option>$1M–$5M</option><option>$5M+</option></select>
                </label>
                <label className="block"><span className="mb-1.5 block text-[15px] font-medium">Current Operational Bottleneck</span>
                  <select required defaultValue="" className="field"><option value="" disabled>Select…</option><option>Running everything from memory / No SOPs</option><option>Drowning in $20/hr admin work</option><option>Burned by VAs in the past</option></select>
                </label>
                <button type="submit" className="btn-cta w-full">Get the Free SOP Kit Now</button>
                <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground"><Lock className="h-3.5 w-3.5 text-success" /> 100% Free. No credit card required. Instant digital delivery.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-foreground/10 bg-ink py-8 text-center text-sm text-ink-foreground/50">© {new Date().getFullYear()} Pareto Talent. All rights reserved.</footer>
    </div>
  );
}
