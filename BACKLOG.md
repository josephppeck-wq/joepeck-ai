# joepeck.ai — Build Backlog

Items captured here are ready to build when Joe gives the go-ahead.
To trigger any item: "Build [item name] from the backlog."

---

## 🔲 Forecast Machine — CSV Upload

**Status:** Not started — waiting for go-ahead
**Captured:** March 31, 2026
**Priority:** High (removes last friction point in pre-call demo flow)

**What it is:**
Add a CSV upload feature to the Forecast Machine demo at joepeck.ai/projects/forecast-machine. Currently the tool uses mock data only. This would let prospects upload their own pipeline export from any CRM and get real AI-scored forecast vs. rep-submitted forecast — no CRM access required, no sending data to a human.

**Why it matters:**
The Deal Coach and GTM Blueprint are already fully self-serve. The Forecast Machine is the only demo that doesn't work on real data. Adding CSV upload completes the self-serve demo flow and lets prospects experience all three tools on their own data before a sales call.

**How it works:**
- User exports standard pipeline report from their CRM (Salesforce, HubSpot, Pipedrive) as CSV
- Uploads to the Forecast Machine page
- Tool maps columns (deal name, stage, amount, close date, last activity, rep name)
- Returns AI confidence scoring alongside rep-submitted forecast
- Shows gap analysis — where AI and rep disagree most

**Minimum viable columns needed from CRM:**
- Deal name
- Stage
- Amount / ACV
- Close date
- Last activity date
- Rep name
- (Optional) Champion engaged, EB engaged

**Build complexity:** Half-day. Frontend CSV parser + column mapper + feed into existing scoring logic.

---

## 🔲 Resume PDF Upload

**Status:** Not started
**Captured:** March 28, 2026
**Priority:** Medium

Add Joe's resume as a downloadable PDF on joepeck.ai. Currently the download button links to /#contact as a fallback. Joe needs to upload the PDF file and wire up the button.

**What's needed from Joe:** Upload a PDF resume to ~/Projects/joepeck-ai/public/joe-peck-resume.pdf, then I'll wire up the button.

---

## 🔲 Headshot / Photo

**Status:** Not started
**Captured:** March 28, 2026
**Priority:** Medium

Add Joe's headshot to the About section on joepeck.ai. Currently no photo exists on the site.

**What's needed from Joe:** Provide a headshot photo file.

---

## 🔲 Testimonials

**Status:** Not started
**Captured:** March 28, 2026
**Priority:** Medium

Collect 2–3 short testimonials from LinkedIn connections who've worked with Joe. Add to the site for social proof.

**What's needed from Joe:** Reach out to connections, collect quotes, send to me to add to the site.

---

## 🔲 Calendly — Notifications/Reminders

**Status:** Partially done (basic setup complete)
**Captured:** March 28, 2026
**Priority:** Low

Add email reminders (24hr and 1hr before) in Calendly settings so neither Joe nor the prospect misses a call. Currently no reminders configured beyond the default confirmation.

---

*Add new items by telling Joe Pen Claw: "Add [description] to the backlog."*
