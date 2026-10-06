CREATE TABLE public.sop_kit_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  revenue_tier TEXT NOT NULL,
  delegation_approach TEXT NOT NULL,
  hours_lost TEXT NOT NULL,
  bottleneck TEXT NOT NULL,
  lead_tier TEXT NOT NULL DEFAULT 'Unqualified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.sop_kit_leads TO service_role;

ALTER TABLE public.sop_kit_leads ENABLE ROW LEVEL SECURITY;