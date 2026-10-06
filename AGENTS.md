<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- Lead submissions are stored ONLY through the `submitLead` server function (src/lib/leads.functions.ts) using the server-side admin client; the `sop_kit_leads` table has no client access (deny-all RLS policy, no anon grants). Never read or write leads from browser code.
- The qualifying form's internal tier labels (Unqualified / Qualified ICP / etc.) are computed server-side and must never be rendered to visitors.
