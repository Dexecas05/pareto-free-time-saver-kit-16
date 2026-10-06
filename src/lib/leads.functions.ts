import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const REVENUE_TIERS = [
  "Under $250k/year",
  "$250k – $1M/year",
  "$1M – $5M/year",
  "$5M – $10M+/year",
] as const;

export const DELEGATION_APPROACHES = [
  "I want the cheapest offshore contractor ($5–$8/hr) to execute basic tasks I assign.",
  "I am ready to invest in a pre-trained, top 1% Latin American Right Hand ($3,000–$3,600/mo) who actively builds systems and closes open loops without being babysat.",
] as const;

export const HOURS_LOST = [
  "Under 5 hours/week",
  "5–15 hours/week",
  "15–30+ hours/week (I am the primary bottleneck holding back company growth)",
] as const;

export const BOTTLENECKS = [
  "Running everything from memory / No SOPs",
  "Drowning in $20/hr admin work",
  "Burned by VAs in the past",
] as const;

const leadInputSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Phone number is too short").max(30),
  revenueTier: z.enum(REVENUE_TIERS),
  delegationApproach: z.enum(DELEGATION_APPROACHES),
  hoursLost: z.enum(HOURS_LOST),
  bottleneck: z.enum(BOTTLENECKS),
});

type LeadInput = z.infer<typeof leadInputSchema>;

/**
 * Computes the internal qualification tier from the founder's answers.
 * Mirrors the ICP tiers defined in the offer spec:
 * - Qualified High-Value ICP: $5M–$10M+ AND Right-Hand mindset AND 15–30+ hrs/week
 * - Qualified ICP: $1M–$5M (or $5M+) AND Right-Hand mindset
 * - Nurture / Borderline: everything else that is not disqualified
 * - Unqualified: under $250k revenue OR cheapest-contractor mindset
 */
export function computeLeadTier(
  revenueTier: LeadInput["revenueTier"],
  delegationApproach: LeadInput["delegationApproach"],
  hoursLost: LeadInput["hoursLost"],
): string {
  if (revenueTier === "Under $250k/year") return "Unqualified";
  if (delegationApproach === DELEGATION_APPROACHES[0]) return "Unqualified";
  if (revenueTier === "$5M – $10M+/year" && hoursLost === HOURS_LOST[2]) {
    return "Qualified High-Value ICP";
  }
  if (revenueTier === "$1M – $5M/year" || revenueTier === "$5M – $10M+/year") {
    return "Qualified ICP";
  }
  return "Nurture / Borderline";
}

// Lightweight in-memory throttle: same email cannot submit twice within 30s.
const recentSubmissions = new Map<string, number>();

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const now = Date.now();
    const key = data.email.trim().toLowerCase();
    const last = recentSubmissions.get(key);
    if (last && now - last < 30_000) {
      throw new Response("Too many submissions. Please wait a moment and try again.", {
        status: 429,
      });
    }
    recentSubmissions.set(key, now);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("sop_kit_leads").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      revenue_tier: data.revenueTier,
      delegation_approach: data.delegationApproach,
      hours_lost: data.hoursLost,
      bottleneck: data.bottleneck,
      lead_tier: computeLeadTier(data.revenueTier, data.delegationApproach, data.hoursLost),
    });

    if (error) {
      throw new Error("We could not save your request. Please try again.");
    }

    return { ok: true as const };
  });
