# Client Onboarding Checklist — Joe Peck AI Services

Use this before your first working session with any new client.
Complete what you can before the kickoff call. Fill in the rest on the call.

---

## SECTION 1: Company Context (All Engagements)

- [ ] Company name and website
- [ ] Industry / vertical
- [ ] Current ARR or revenue range
- [ ] Number of full-time sales reps (SDRs, AEs, AMs separately)
- [ ] Current CRM (Salesforce / HubSpot / Pipedrive / other)
- [ ] Sales methodology in use (MEDDPICC / SPICED / Sandler / Challenger / none)
- [ ] Average deal size (ACV)
- [ ] Average sales cycle length
- [ ] Primary ICP (ideal customer profile — company size, title, vertical)

---

## SECTION 2: Deal Coach Setup

*Needed to run MEDDPICC coaching on their actual deals.*

- [ ] What CRM are they using? (affects how you export deal notes)
- [ ] Do reps log call notes in the CRM, or elsewhere (Gong, Notion, email)?
- [ ] What sales methodology do they use? (customize the prompt for their language)
- [ ] Get access to 3–5 sample deal records with notes to test the tool
- [ ] Confirm: do they want coaching on all deals or just deals above a certain ACV?

**Day 1 delivery:** Rep pastes deal notes manually → gets MEDDPICC coaching
**Upgraded delivery:** n8n pulls new deals nightly → emails coaching to rep automatically

---

## SECTION 3: GTM Blueprint Setup

*Needed to generate a custom GTM blueprint for their business.*

- [ ] Product/solution description (how do they describe it in one sentence?)
- [ ] Primary target market (who do they sell to — company size, title, vertical)
- [ ] Current company stage and ARR
- [ ] Current team size and structure
- [ ] Average deal size and sales cycle
- [ ] Primary sales motion (outbound / inbound / PLG / channel / field)

**Day 1 delivery:** Run the tool live on the kickoff call — fill in the form together, generate the blueprint in real time. That's the demo AND the deliverable.

---

## SECTION 4: Forecast Truth Machine Setup

*Needed to score their actual pipeline vs. rep-submitted forecasts.*

- [ ] What CRM? (determines how to export pipeline)
- [ ] How often do they do forecast reviews? (weekly / bi-weekly / monthly)
- [ ] What fields does their CRM track? Minimum needed:
  - [ ] Deal name
  - [ ] Stage
  - [ ] Amount / ACV
  - [ ] Close date
  - [ ] Last activity date
  - [ ] Rep name
- [ ] Do they track champion / EB engagement in the CRM? (nice to have)
- [ ] Who receives the forecast scoring — just the manager, or the reps too?
- [ ] Export a sample pipeline CSV from their CRM (test it before the first real run)

**Day 1 delivery:** They export pipeline CSV → you paste into the tool → share scored output
**Upgraded delivery:** n8n pulls from their CRM nightly → auto-scores pipeline → emails manager

---

## SECTION 5: Access & Logistics

- [ ] Primary contact name, email, Slack/Teams handle
- [ ] Who else will be in working sessions? (ops, RevOps, reps?)
- [ ] Preferred communication channel (email / Slack / Telegram)
- [ ] Preferred meeting cadence (weekly / bi-weekly)
- [ ] Do they have a shared drive for deliverables? (Google Drive / Notion / Confluence)
- [ ] Billing contact and preferred invoicing method

---

## SECTION 6: Quick Wins to Identify on Kickoff Call

Ask these to find the fastest value you can deliver:

1. What's the single biggest pain in the sales org right now?
2. What would "fixed in 30 days" look like?
3. Which tool would make the biggest difference fastest — coaching, blueprint, or forecast?
4. Is there a specific deal, team, or process you want to start with?

---

## Minimum to Get Started (Day 1)

| Tool | Minimum viable setup |
|------|---------------------|
| Deal Coach | 3 deal records with notes pasted manually |
| GTM Blueprint | 5-minute form fill on the call |
| Forecast Machine | One CSV export from their CRM |

You can run all three tools for a client in the first week with zero technical integration. Everything starts manual. Automation comes after they see the value.

---

*Last updated: March 2026*
