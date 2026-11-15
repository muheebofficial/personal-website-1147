/**
 * Muheeb Sulaiman — website lead capture (Google Apps Script web app)
 *
 * What it does, for every lead the website sends:
 *   1. Appends a row to the "Leads" tab of the Website Leads sheet
 *   2. Emails the owner an alert with every detail + a click-to-WhatsApp link
 *   3. Emails the lead a welcome / auto-reply saying Muheeb will reach out shortly
 *
 * The website never talks to the sheet directly. It posts to this script's
 * web-app URL from its own server (never from the browser), together with a
 * shared secret that lives in Script Properties, not in this file.
 *
 * Setup: see README.md in this folder.
 */

const CONFIG = {
  SPREADSHEET_ID: '1CP4HDeLjyVtpkdaO-5llxkRKtXYj-ocVIqBs1bWdutg',
  SHEET_NAME: 'Leads',
  // Where the "new lead" alert goes. Change this one line to use another inbox.
  OWNER_EMAIL: 'muheeb@muheebsulaiman.com',
  SENDER_NAME: 'Muheeb Sulaiman',
  WHATSAPP_NUMBER: '2349110172901',
  SITE_URL: 'https://www.muheebsulaiman.com',
  TIMEZONE: 'Africa/Lagos',
};

// Column order must match the header row of the sheet.
const COLUMNS = [
  'submittedAt', 'leadSource', 'serviceTitle', 'pagePath',
  'firstName', 'lastName', 'phone', 'email',
  'challenge', 'business', 'website', 'businessType', 'budget',
  'preferredContact', 'message', 'attribution', 'consent', 'status', 'notes',
];

/** Health check: open the web-app URL in a browser and you should see {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'muheeb-lead-capture' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const expected = PropertiesService.getScriptProperties().getProperty('LEAD_SECRET');
    if (!expected || data.secret !== expected) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    const lead = clean_(data);
    if (!lead.firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return json_({ ok: false, error: 'invalid' });
    }

    // The sheet is the source of truth: if this fails, the website must show an error.
    saveRow_(lead);

    // Emails are best-effort. A failed email must never lose a saved lead.
    let notified = false;
    let welcomed = false;
    try { sendOwnerAlert_(lead); notified = true; } catch (err) { console.error('Owner alert failed: ' + err); }
    try { sendWelcome_(lead); welcomed = true; } catch (err) { console.error('Welcome email failed: ' + err); }

    return json_({ ok: true, saved: true, notified: notified, welcomed: welcomed });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  }
}

/**
 * Run this once from the editor (Run ▸ testSubmission) BEFORE deploying.
 * It forces Google's permission prompt and sends both emails to the owner
 * address only, so you can see exactly what a lead and you will receive.
 */
function testSubmission() {
  const lead = clean_({
    leadSource: 'service-page',
    serviceTitle: 'Agentic AI Automation',
    pagePath: '/services/test',
    firstName: 'Test',
    lastName: 'Lead',
    phone: '+234 800 000 0000',
    email: CONFIG.OWNER_EMAIL,
    challenge: 'Too much manual follow-up',
    business: 'Test Business Ltd',
    website: 'example.com',
    businessType: 'Nigerian SME',
    budget: '₦200,000 – ₦500,000 / month',
    preferredContact: 'whatsapp',
    message: 'This is a test submission from the Apps Script editor.',
    attribution: '{"utm_source":"test"}',
    consent: true,
  });
  saveRow_(lead);
  sendOwnerAlert_(lead);
  sendWelcome_(lead);
  console.log('Test lead saved and both emails sent to ' + CONFIG.OWNER_EMAIL);
}

// ---------------------------------------------------------------- helpers

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function str_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);
}

function clean_(d) {
  return {
    leadSource: str_(d.leadSource, 40) || 'website',
    serviceTitle: str_(d.serviceTitle, 160),
    pagePath: str_(d.pagePath, 200),
    firstName: str_(d.firstName, 80),
    lastName: str_(d.lastName, 80),
    phone: str_(d.phone, 30),
    email: str_(d.email, 120).toLowerCase(),
    challenge: str_(d.challenge, 200),
    business: str_(d.business, 150),
    website: str_(d.website, 200),
    businessType: str_(d.businessType, 100),
    budget: str_(d.budget, 100),
    preferredContact: str_(d.preferredContact, 60),
    message: str_(d.message, 1500),
    attribution: str_(d.attribution, 1500),
    consent: d.consent === true,
  };
}

function esc_(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Stops "=HYPERLINK(...)" style formula injection from visitor-typed text. */
function safeCell_(v) {
  const s = String(v == null ? '' : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function pageLabel_(lead) {
  if (lead.leadSource === 'contact-page') return 'Contact page';
  return lead.serviceTitle || 'Website';
}

function saveRow_(lead) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab "' + CONFIG.SHEET_NAME + '" not found');

  const values = Object.assign({}, lead, {
    submittedAt: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
    serviceTitle: pageLabel_(lead),
    consent: lead.consent ? 'Yes' : 'No',
    status: 'New',
    notes: '',
  });
  const row = COLUMNS.map(function (key) { return safeCell_(values[key]); });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function waLink_(phone, text) {
  let digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.charAt(0) === '0') digits = '234' + digits.slice(1);
  const base = digits ? 'https://wa.me/' + digits : 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER;
  return text ? base + '?text=' + encodeURIComponent(text) : base;
}

// ----------------------------------------------------------- owner alert

function sendOwnerAlert_(lead) {
  const fullName = (lead.firstName + ' ' + lead.lastName).trim();
  const where = pageLabel_(lead);
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/' + CONFIG.SPREADSHEET_ID + '/edit';

  const rows = [
    ['Came from', where + (lead.pagePath ? ' (' + lead.pagePath + ')' : '')],
    ['Name', fullName],
    ['WhatsApp / phone', lead.phone],
    ['Email', lead.email],
    ['Biggest challenge', lead.challenge],
    ['Business', lead.business],
    ['Website', lead.website],
    ['Business type', lead.businessType],
    ['Monthly budget', lead.budget],
    ['Best way to reach', lead.preferredContact],
    ['Message', lead.message],
    ['Attribution', lead.attribution],
  ].filter(function (r) { return r[1]; });

  const tableRows = rows.map(function (r) {
    return '<tr><td style="padding:8px 12px;border-bottom:1px solid #EDE8DE;color:#7A7570;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">' +
      esc_(r[0]) + '</td><td style="padding:8px 12px;border-bottom:1px solid #EDE8DE;color:#0A0908;font-size:15px;">' +
      esc_(r[1]).replace(/\n/g, '<br>') + '</td></tr>';
  }).join('');

  const waText = 'Hi ' + lead.firstName + ', it\'s Muheeb Sulaiman. I got your request' +
    (lead.serviceTitle && lead.leadSource !== 'contact-page' ? ' about ' + lead.serviceTitle : '') + '. ';
  const html =
    '<div style="background:#F5F0E8;padding:24px;font-family:Arial,Helvetica,sans-serif;">' +
    '<div style="max-width:620px;margin:0 auto;background:#FDFCFA;border:1px solid #EDE8DE;">' +
    '<div style="background:#0A0908;padding:20px 24px;"><span style="font-family:Georgia,serif;font-size:20px;color:#F5F0E8;">New lead</span>' +
    '<span style="color:#C9A76C;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin-left:12px;">' + esc_(where) + '</span></div>' +
    '<table style="width:100%;border-collapse:collapse;">' + tableRows + '</table>' +
    '<div style="padding:20px 24px;">' +
    '<a href="' + esc_(waLink_(lead.phone, waText)) + '" style="display:inline-block;background:#C9A76C;color:#0A0908;text-decoration:none;font-weight:bold;padding:12px 20px;margin-right:8px;">Reply on WhatsApp</a>' +
    '<a href="mailto:' + esc_(lead.email) + '" style="display:inline-block;border:1px solid #0A0908;color:#0A0908;text-decoration:none;padding:11px 20px;margin-right:8px;">Email them</a>' +
    '<a href="' + esc_(sheetUrl) + '" style="display:inline-block;color:#7A7570;text-decoration:underline;padding:12px 4px;">Open the sheet</a>' +
    '</div></div></div>';

  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') + '\n\nSheet: ' + sheetUrl;

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    subject: 'New lead: ' + fullName + ' — ' + where,
    body: text,
    htmlBody: html,
    name: 'Website Leads',
    replyTo: lead.email,
  });
}

// ----------------------------------------------------- lead auto-reply

function sendWelcome_(lead) {
  const first = lead.firstName || 'there';
  const topic = lead.leadSource !== 'contact-page' && lead.serviceTitle
    ? lead.serviceTitle
    : 'growing your business';
  const waHref = waLink_('', 'Hi Muheeb, I just sent a request on your website' +
    (lead.leadSource !== 'contact-page' && lead.serviceTitle ? ' about ' + lead.serviceTitle : '') + '.');

  const subject = first + ', I\'ve got your request. Here\'s what happens next';

  const step = function (n, title, body) {
    return '<tr><td style="vertical-align:top;padding:0 14px 16px 0;font-family:Georgia,serif;font-size:26px;color:#C9A76C;width:34px;">' + n +
      '</td><td style="padding:0 0 16px 0;font-size:15px;line-height:1.6;color:#0A0908;"><strong>' + title + '</strong><br>' +
      '<span style="color:#4A4640;">' + body + '</span></td></tr>';
  };

  const html =
    '<div style="background:#F5F0E8;padding:24px;font-family:Arial,Helvetica,sans-serif;">' +
    '<div style="display:none;max-height:0;overflow:hidden;">I\'ll personally reach out shortly. Here\'s what to expect.</div>' +
    '<div style="max-width:620px;margin:0 auto;background:#FDFCFA;border:1px solid #EDE8DE;">' +
    '<div style="background:#0A0908;padding:26px 28px;">' +
    '<div style="font-family:Georgia,serif;font-style:italic;font-size:24px;color:#F5F0E8;">Muheeb <span style="color:#C9A76C;">Sulaiman</span></div>' +
    '<div style="color:#C9A76C;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-top:4px;">Agentic AI &amp; Growth Systems</div></div>' +
    '<div style="padding:30px 28px;">' +
    '<p style="font-family:Georgia,serif;font-size:26px;line-height:1.25;margin:0 0 18px;color:#0A0908;">Hi ' + esc_(first) + ', you just made a smart move.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:#0A0908;margin:0 0 14px;">Thanks for reaching out about <strong>' + esc_(topic) + '</strong>. I have your details, and I\'ll personally reach out to you shortly.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:#0A0908;margin:0 0 22px;">Here\'s the straight truth: most businesses don\'t have a traffic problem or an AI problem. They have a <strong>systems problem</strong>. Leads come in, follow-up is slow, and the competitor who replied first takes the sale. Fixing exactly that is what I do.</p>' +
    '<div style="border-top:1px solid #EDE8DE;padding-top:22px;">' +
    '<div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#C9A76C;margin-bottom:14px;font-weight:bold;">What happens next</div>' +
    '<table style="width:100%;border-collapse:collapse;">' +
    step('1', 'I review your details personally', 'No assistant, no sales script. I read what you sent.') +
    step('2', 'I reach out to you shortly', 'By WhatsApp, email or call, and always within 24 hours, to book your free 30-minute diagnostic call.') +
    step('3', 'You get a clear read on your situation', 'What is leaking revenue, what would move the needle, and whether we are a fit. No pitch, no fluff.') +
    '</table></div>' +
    '<div style="background:#F9F6F0;border-left:3px solid #C9A76C;padding:16px 18px;margin:8px 0 24px;">' +
    '<div style="font-size:15px;line-height:1.6;color:#0A0908;"><strong>Don\'t want to wait?</strong> Message me directly and we can start the conversation right now.</div></div>' +
    '<a href="' + esc_(waHref) + '" style="display:inline-block;background:#C9A76C;color:#0A0908;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 26px;">Chat with me on WhatsApp</a>' +
    '<p style="font-size:15px;line-height:1.7;color:#0A0908;margin:28px 0 4px;">Talk soon,</p>' +
    '<p style="font-family:Georgia,serif;font-style:italic;font-size:22px;margin:0;color:#0A0908;">Muheeb Sulaiman</p>' +
    '<p style="font-size:12px;line-height:1.6;color:#7A7570;margin:4px 0 0;">Agentic AI Workflow Architect &middot; Founder, Correct Marketer NG</p>' +
    '</div>' +
    '<div style="background:#F9F6F0;padding:14px 28px;font-size:11px;color:#7A7570;line-height:1.6;">You received this because you submitted a request at ' + esc_(CONFIG.SITE_URL.replace('https://', '')) +
    '. Just reply to this email if you\'d like to add anything.</div>' +
    '</div></div>';

  const text =
    'Hi ' + first + ',\n\n' +
    'Thanks for reaching out about ' + topic + '. I have your details, and I\'ll personally reach out to you shortly.\n\n' +
    'Most businesses don\'t have a traffic problem or an AI problem. They have a systems problem. Leads come in, follow-up is slow, and the competitor who replied first takes the sale. Fixing exactly that is what I do.\n\n' +
    'What happens next:\n' +
    '1. I review your details personally.\n' +
    '2. I reach out shortly (WhatsApp, email or call, always within 24 hours) to book your free 30-minute diagnostic call.\n' +
    '3. You get a clear read on what is leaking revenue and what would move the needle. No pitch, no fluff.\n\n' +
    'Don\'t want to wait? Message me on WhatsApp: ' + waHref + '\n\n' +
    'Talk soon,\nMuheeb Sulaiman\nAgentic AI Workflow Architect · Founder, Correct Marketer NG';

  MailApp.sendEmail({
    to: lead.email,
    subject: subject,
    body: text,
    htmlBody: html,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.OWNER_EMAIL,
  });
}
