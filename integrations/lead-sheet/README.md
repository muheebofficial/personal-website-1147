# Lead capture: Google Sheet + Apps Script

Every lead from a `/services/*` page or `/contact` goes:

```
Browser → POST /api/lead (your site, server side)
        → Apps Script web app (this folder's Code.gs)
        → row in the "Website Leads" sheet
        → alert email to you + welcome email to the lead
```

The sheet's **Service Page** column records where each lead came from
(the service name, or `Contact page`). The browser never sees the script URL or the secret.

## One-time setup (about 5 minutes)

1. Open the **Muheeb Sulaiman — Website Leads** sheet → **Extensions ▸ Apps Script**.
2. Delete the placeholder code and paste in the whole of `Code.gs`. Save.
3. Check `CONFIG.OWNER_EMAIL` at the top (where your "new lead" alerts go).
4. **Project Settings (gear icon) ▸ Script properties ▸ Add property**
   - Name: `LEAD_SECRET`
   - Value: a long random string (e.g. 40+ random characters). Keep a copy; the site needs the same value.
5. Pick `testSubmission` in the function dropdown and click **Run**. Google will ask you to
   authorise access to Sheets and Mail. Allow it. You should get a test row in the sheet plus both emails.
6. **Deploy ▸ New deployment ▸ type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the **Web app URL** (ends in `/exec`).
7. Add two environment variables to the Vercel project (Production **and** Preview):
   - `LEAD_WEBHOOK_URL` = the Web app URL
   - `LEAD_WEBHOOK_SECRET` = the same value as `LEAD_SECRET`

Without those two variables the form shows an honest error and a WhatsApp fallback. It never pretends a lead was saved.

## Changing the script later

Edit the code, then **Deploy ▸ Manage deployments ▸ pencil ▸ Version: New version ▸ Deploy**.
The URL stays the same. Creating a *new* deployment changes the URL.

## Limits worth knowing

- Gmail sends at most about 100 emails a day through Apps Script. Each lead uses two, so roughly 50 leads/day.
- Emails send from the Google account that owns the script. Replies from leads go to `OWNER_EMAIL`.
- No email-sending service key is needed for this route.
