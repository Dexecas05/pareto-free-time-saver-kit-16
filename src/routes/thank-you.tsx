import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Your SOP Kit is Ready | Pareto Talent" },
      { name: "description", content: "Download The 10-Minute Brain-Dump SOP Kit — Notion Template + Claude AI Prompt Kit." },
      { property: "og:title", content: "Your SOP Kit is Ready | Pareto Talent" },
      { property: "og:description", content: "Your free 10-Minute Brain-Dump SOP Kit is ready for immediate download." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYou,
});

const resources = [
  {
    title: "The HIRE Framework",
    body: "Read Kasim Aslam's guide on why traditional hiring fails and how to select top 0.1% talent.",
    action: "Read the Framework",
    href: "https://thehirebook.com/",
  },
  {
    title: "The 3X Freedom Philosophy",
    body: "Discover how to move from freedom from limitation to freedom of purpose.",
    action: "Explore 3X Freedom",
    href: "https://www.skool.com/3xf",
  },
];

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary font-sans text-body">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link to="/" className="font-display text-sm font-extrabold tracking-wide text-foreground">
            PARETO TALENT
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-[720px] rounded-xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <Check className="h-8 w-8 text-success" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-display text-[28px] font-extrabold leading-tight text-foreground md:text-[32px]">Your SOP Kit is Ready</h1>
          <p className="mt-4 text-lg leading-relaxed">
            Your free copy of 'The 10-Minute Brain-Dump SOP Kit' (Notion Template + Claude AI Prompt Kit) is ready for immediate download below.
          </p>
          <a
            href="https://docs.google.com/document/d/1XiZLYb0coAPo0XZJKeAzWjdQHNDbvKw8A4ZeL96vguM/edit?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-9 py-4 text-lg font-bold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            <Download className="h-5 w-5" /> DOWNLOAD THE 10-MINUTE SOP KIT NOW
          </a>
          <div className="mt-8 rounded-md border border-border bg-muted p-4 text-left text-sm leading-relaxed">
            📩 We've also dispatched a direct access link to your inbox. If you don't see it within 3 minutes, please check your spam or promotions folder.
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[720px]">
          <h3 className="text-center font-display text-xl font-bold text-foreground">While You Wait: Explore the Pareto Ecosystem</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {resources.map((r) => (
              <div key={r.title} className="flex flex-col rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary">
                <h4 className="font-display text-lg font-bold text-foreground">{r.title}</h4>
                <p className="mt-2 flex-1 leading-relaxed">{r.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-primary">
                  {r.action} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        Pareto Talent | Operational Freedom for Scaling Founders
      </footer>
    </div>
  );
}
