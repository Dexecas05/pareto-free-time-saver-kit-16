import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import { Brain, Bot, Zap, Check, ArrowRight, Lock, ChevronLeft } from "lucide-react";
import {
  submitLead,
  REVENUE_TIERS,
  DELEGATION_APPROACHES,
  HOURS_LOST,
  BOTTLENECKS,
} from "@/lib/leads.functions";

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
  { n: "40+ Hours", label: "Pre-Trained AI & Systems Stack", body: "Every Right Hand undergoes 10 days (40+ hours) of intensive training in SOP building, n8n automations, Claude prompt engineering, and CRM architecture before ever touching your business." },
  { n: "15–20 Hrs", label: "Reclaimed Founder Capacity / Wk", body: "Clients win back 10–15 hours/week in their first 30 days, scaling to 20+ hours/week as their Right Hand builds custom automations and takes full outcome ownership." },
  { n: "3.6x ROI", label: "Instant Capacity Value", body: "At a $200/hr founder rate, saving 12.5 hours/week unlocks $10,750/month in recovered growth capacity — an immediate 3.6x return on your investment." },
  { n: "93%", label: "12-Month Client Retention", body: "Sourced through a 1-in-1,000 selection process and Predictive Index (PI) behavioral matching, our operator placements stay handed off permanently." },
];

const authority = [
  ["100+ Scaling Founders", "actively supported across 7- & 8-figure businesses."],
  ["250+ AI-Powered Operators", "backing your Right Hand 24/7 in our private peer network."],
  ["The Freedom 40 Guarantee:", "Get 40 hours back in your first 30 days, or month 2 is completely free."],
];

function OptionRow({
  name,
  value,
  selected,
  onSelect,
  children,
}: {
  name: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`block cursor-pointer rounded-md border p-4 transition ${
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-background hover:border-primary/50"
      }`}
    >
      <span className="flex items-start gap-3">
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected}
          onChange={() => onSelect(value)}
          className="sr-only"
        />
        <span
          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-primary" : "border-input"
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
        </span>
        <span className="text-[15px] leading-relaxed text-foreground">{children}</span>
      </span>
    </label>
  );
}

function QualifyingForm() {
  const submitLeadFn = useServerFn(submitLead);

  const [step, setStep] = useState<1 | 2>(1);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [revenueTier, setRevenueTier] = useState("");
  const [delegationApproach, setDelegationApproach] = useState("");
  const [hoursLost, setHoursLost] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const onQuestionsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitLeadFn({
        data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          revenueTier: revenueTier as (typeof REVENUE_TIERS)[number],
          delegationApproach: delegationApproach as (typeof DELEGATION_APPROACHES)[number],
          hoursLost: hoursLost as (typeof HOURS_LOST)[number],
          bottleneck: bottleneck as (typeof BOTTLENECKS)[number],
        },
      });
      setStatus("idle");
      setStep(1);
      setContact({ firstName: "", lastName: "", email: "", phone: "" });
      setRevenueTier("");
      setDelegationApproach("");
      setHoursLost("");
      setBottleneck("");
      setSubmitted(true);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <Check className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-2xl font-bold">You're in.</h3>
        <p className="mt-2 text-body">Check your inbox — your SOP Kit is on its way.</p>
      </div>
    );
  }

  const questionsComplete = revenueTier && delegationApproach && hoursLost && bottleneck;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-foreground">Step {step} of 2</span>
          <span className="text-muted-foreground">{step === 1 ? "Your details" : "Qualifying questions"}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={onContactSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[15px] font-medium">First Name</span>
              <input
                required
                type="text"
                name="firstName"
                maxLength={80}
                autoComplete="given-name"
                value={contact.firstName}
                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                className="field"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[15px] font-medium">Last Name</span>
              <input
                required
                type="text"
                name="lastName"
                maxLength={80}
                autoComplete="family-name"
                value={contact.lastName}
                onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                className="field"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[15px] font-medium">Business Email</span>
              <input
                required
                type="email"
                name="email"
                maxLength={255}
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="field"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[15px] font-medium">Phone Number</span>
              <input
                required
                type="tel"
                name="phone"
                maxLength={30}
                autoComplete="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="field"
              />
            </label>
          </div>
          <button type="submit" className="btn-cta w-full gap-2">
            Continue to Step 2 <ArrowRight className="h-5 w-5" />
          </button>
          <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-success" /> 100% Free. No credit card required.
          </p>
        </form>
      ) : (
        <form onSubmit={onQuestionsSubmit} className="space-y-6">
          <div>
            <p className="text-[15px] font-semibold text-foreground">
              1. What is your business's current annual revenue tier?
            </p>
            <div className="mt-3 space-y-2.5">
              {REVENUE_TIERS.map((tier) => (
                <OptionRow
                  key={tier}
                  name="revenueTier"
                  value={tier}
                  selected={revenueTier === tier}
                  onSelect={setRevenueTier}
                >
                  {tier}
                </OptionRow>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[15px] font-semibold text-foreground">
              2. When delegating core operations, which statement best reflects your approach?
            </p>
            <div className="mt-3 space-y-2.5">
              {DELEGATION_APPROACHES.map((approach) => (
                <OptionRow
                  key={approach}
                  name="delegationApproach"
                  value={approach}
                  selected={delegationApproach === approach}
                  onSelect={setDelegationApproach}
                >
                  "{approach}"
                </OptionRow>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[15px] font-semibold text-foreground">
              3. How many hours per week are you personally losing to routine administration, firefighting, and tasks running strictly out of your head?
            </p>
            <div className="mt-3 space-y-2.5">
              {HOURS_LOST.map((option) => (
                <OptionRow
                  key={option}
                  name="hoursLost"
                  value={option}
                  selected={hoursLost === option}
                  onSelect={setHoursLost}
                >
                  {option}
                </OptionRow>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[15px] font-semibold">4. Current Operational Bottleneck</span>
            <select
              required
              className="field"
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
            >
              <option value="" disabled>
                Select…
              </option>
              {BOTTLENECKS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {status === "error" && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting" || !questionsComplete}
              className="btn-cta flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get the Free SOP Kit Now"}
            </button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-success" /> 100% Free. No credit card required. Instant digital delivery.
          </p>
        </form>
      )}
    </div>
  );
}

function Index() {
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
          <p className="eyebrow text-center">Battle-tested operational leverage</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-2xl font-bold leading-tight text-foreground md:text-[32px]">Built on Proven Systems. Backed by Hard Numbers.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg">Creating an SOP is only 10% of the battle. Here is why 7- and 8-figure founders trust Pareto Talent to execute, automate, and scale their operational systems.</p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-ink-foreground/10 bg-ink p-7 text-ink-foreground shadow-xl">
                <div className="font-display text-[36px] font-extrabold leading-tight text-accent">{s.n}</div>
                <div className="mt-1 font-semibold">{s.label}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 border-t border-border pt-10 md:grid-cols-3">
            {authority.map(([b, t]) => (
              <div key={b} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-success" /><p className="leading-relaxed"><strong className="text-foreground">{b}</strong> {t}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-kit" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-accent">Instant access</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-[40px]">Reclaim 15–20 Hours of Your Week Starting Today.</h2>
            <p className="mt-5 text-lg text-ink-foreground/75">Two quick steps: enter your details, answer 4 short questions, and get instant access to <b className="text-ink-foreground">The 10-Minute Brain-Dump SOP Kit</b> (Notion Template + Master AI Prompt Kit).</p>
          </div>
          <div className="rounded-lg bg-card p-8 text-card-foreground shadow-2xl">
            <QualifyingForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-foreground/10 bg-ink py-8 text-center text-sm text-ink-foreground/50">© {new Date().getFullYear()} Pareto Talent. All rights reserved.</footer>
    </div>
  );
}
