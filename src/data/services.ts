export interface Service {
  slug: string;
  title: string;
  icon: string;
  category: string;
  intro: string;
  problem: string;
  outcomes: string[];
  includes: string[];
  fit: string;
}

const service = (slug: string, title: string, icon: string, category: string, includes: string[]): Service => ({
  slug,
  title,
  icon,
  category,
  intro: `${title} built around clear goals, practical execution, and measurable business results.`,
  problem: `A focused ${title.toLowerCase()} system helps remove friction, improve consistency, and turn more attention into meaningful business outcomes.`,
  outcomes: ['A clearer path from activity to business results', 'A practical system your team can understand and use', 'Better visibility into what is working and what to improve'],
  includes,
  fit: `Best for businesses ready to make ${title.toLowerCase()} a more dependable part of their growth system.`,
});

export const services: Service[] = [
  service('brand-strategy-positioning', 'Brand Strategy & Positioning', '🎯', 'Strategy', ['Market and competitor analysis', 'Audience segmentation and customer insight', 'Offer positioning and value proposition', 'Core messaging and brand narrative', '90-day growth roadmap']),
  service('aio-aeo-geo-seo-organic-growth', 'AIO, AEO, GEO, SEO & Organic Growth', '🔍', 'Organic growth', ['Technical SEO audit and fixes', 'Keyword, topic, and search-intent research', 'On-page optimisation and internal linking', 'AIO, AEO, and GEO content opportunities', 'Authority and backlink growth']),
  service('paid-ads-performance-marketing', 'Paid Ads & Performance Marketing', '📊', 'Paid acquisition', ['Meta and Instagram campaign strategy', 'Google Search and Display campaigns', 'Creative, audience, and offer testing', 'Retargeting and funnel sequencing', 'ROAS and profitability reporting']),
  service('content-strategy-copywriting', 'Content Strategy & Copywriting', '✍️', 'Content', ['Editorial and content planning', 'Ad, landing page, and website copy', 'Thought leadership and brand storytelling', 'Search-led content briefs', 'Content calendars and production systems']),
  service('website-design-conversion-funnels', 'Website Design & Conversion Funnels', '🌐', 'Conversion systems', ['Landing page design and optimisation', 'Lead magnet and opt-in funnels', 'Sales page and checkout flows', 'Booking and call funnel integration', 'Conversion copy and analytics requirements']),
  service('lead-generation-sales-systems', 'Lead Generation & Sales Systems', '📈', 'Revenue systems', ['Inbound and outbound lead systems', 'Lead qualification and scoring', 'CRM and pipeline structure', 'Lead nurture sequences', 'Sales handoff and follow-up logic']),
  service('email-whatsapp-crm-automation', 'Email, WhatsApp & CRM Automation', '💬', 'Lifecycle automation', ['Email marketing setup and flows', 'WhatsApp nurture automation', 'CRM integration and data capture', 'Lead routing and follow-up triggers', 'Lifecycle segmentation and reporting']),
  service('social-media-growth-systems', 'Social Media Growth Systems', '📱', 'Distribution', ['Content pillars and posting strategy', 'Audience growth and engagement systems', 'Creative direction and campaign support', 'Repurposing and distribution workflows', 'Social proof and authority building']),
  service('ai-automation-workflow-optimisation', 'AI Automation & Workflow Optimisation', '⚡', 'AI systems', ['AI content and research workflows', 'CRM and pipeline automation', 'Client onboarding and response flows', 'Reporting and analytics automation', 'Lead scoring and routing logic', 'Marketing task and scheduling systems']),
  service('agentic-ai-automation', 'Agentic AI Automation (n8n & Zapier)', '🧩', 'Agentic AI', ['Zapier and n8n workflow architecture', 'AI research, classification, and routing', 'Monday CRM, Salesforce, and Google Sheets integrations', 'WhatsApp automation flows', 'Human review and exception handling']),
  service('whatsapp-business-automation', 'WhatsApp Business Automation', '💬', 'Conversational systems', ['Lead capture', 'Qualification flows', 'Follow-up sequences', 'FAQs and customer support paths', 'Notifications and sales support', 'CRM handoff and conversation routing']),
  service('ai-sales-assistant', 'AI Sales Assistant', '🤖', 'Agentic AI', ['Assistant training', 'Qualification and next-step logic', 'Lead data capture', 'High-intent escalation rules', 'CRM or WhatsApp integration']),
  service('crm-automation', 'CRM Automation', '🗂️', 'Automation', ['Lead creation and assignment', 'Tagging and segmentation rules', 'Pipeline automation and reminders', 'Notification and escalation workflows', 'Two-way data synchronisation']),
  service('lead-generation-system', 'Lead Generation System', '🧲', 'Revenue systems', ['Channel and offer strategy', 'Landing page and form build', 'Traffic setup', 'Capture-to-CRM automation', 'Lead-source reporting']),
  service('high-converting-sales-funnel', 'High-Converting Sales Funnel', '🛤️', 'Conversion systems', ['Funnel mapping and stage strategy', 'Landing and offer page build', 'Lead capture and nurture sequencing', 'Objection handling and proof', 'Conversion tracking']),
  service('lead-nurturing-system', 'Lead Nurturing System', '🌱', 'Lifecycle automation', ['Buyer-stage nurture mapping', 'Email and WhatsApp content', 'Trust-building content', 'Behaviour-based triggers', 'Sales-readiness handoff']),
  service('whatsapp-lead-conversion-system', 'WhatsApp Lead Conversion System', '📲', 'Conversational systems', ['Conversation flow design', 'Segmentation and offer matching', 'Follow-up sequencing', 'FAQ and objection handling', 'CRM handoff']),
  service('meta-ads', 'Meta Ads', '📘', 'Paid acquisition', ['Campaign and audience strategy', 'Creative direction and ad build', 'Pixel and conversion tracking', 'Budget management', 'Performance reporting']),
  service('google-ads', 'Google Ads', '🔎', 'Paid acquisition', ['Keyword research', 'Campaign and bidding strategy', 'Ad copy and extensions', 'Landing page alignment', 'Optimisation and reporting']),
  service('linkedin-ads-b2b-lead-generation', 'LinkedIn Ads & B2B Lead Generation', '💼', 'Paid acquisition', ['ICP and audience targeting', 'Lead-gen campaign build', 'B2B offer messaging', 'Budget optimisation', 'Lead-quality reporting']),
  service('tiktok-ads', 'TikTok Ads', '🎵', 'Paid acquisition', ['Short-form creative development', 'Audience targeting', 'Campaign and budget testing', 'Retargeting sequences', 'Performance tracking']),
  service('paid-advertising-audit', 'Paid Advertising Audit', '🧾', 'Diagnostics', ['Account and targeting review', 'Tracking and attribution audit', 'Creative assessment', 'Landing page review', 'Prioritised recommendations']),
  service('seo-audit', 'SEO Audit', '🧪', 'Diagnostics', ['Technical SEO review', 'On-page and content assessment', 'Keyword gap analysis', 'Internal linking review', 'Competitor benchmarking']),
  service('seo-optimization', 'SEO Optimization', '📶', 'Organic growth', ['Technical fixes', 'Metadata optimisation', 'Internal linking improvements', 'Keyword-targeted content updates', 'Monthly tracking']),
  service('local-seo', 'Local SEO', '📍', 'Organic growth', ['Google Business Profile optimisation', 'Local citation consistency', 'Location-targeted content', 'Review signals', 'Local performance tracking']),
  service('aeo-ai-search-optimization', 'AEO / AI Search Optimization', '🧠', 'Organic growth', ['AI-answer-readiness audit', 'Structured data improvements', 'Direct-answer formatting', 'Authority signals', 'Ongoing monitoring']),
  service('wordpress-business-website', 'WordPress Business Website', '🖥️', 'Web development', ['Information architecture', 'Custom WordPress build', 'Mobile responsiveness', 'SEO foundations', 'CMS handover']),
  service('high-converting-landing-page', 'High-Converting Landing Page', '📄', 'Conversion systems', ['Audience-focused strategy', 'Persuasive copywriting', 'Trust and proof elements', 'Responsive design', 'Conversion tracking']),
  service('website-redesign', 'Website Redesign', '🔄', 'Web development', ['Current-site audit', 'Messaging refresh', 'Responsive redesign', 'Performance optimisation', 'Conversion improvements']),
  service('website-seo-conversion-optimization', 'Website SEO & Conversion Optimization', '📐', 'Conversion systems', ['SEO improvements', 'Conversion-focused copy', 'User-flow review', 'Testable improvements', 'Combined reporting']),
  service('shopify-store-development', 'Shopify Store Development', '🛍️', 'E-commerce', ['Store setup and theme customisation', 'Product and collection structure', 'Navigation optimisation', 'Payment and app integrations', 'Mobile performance']),
  service('woocommerce-development', 'WooCommerce Development', '🛒', 'E-commerce', ['WooCommerce setup', 'Product catalog structure', 'Payment and shipping integration', 'Responsive optimisation', 'Checkout flow']),
  service('ecommerce-seo', 'E-commerce SEO', '🏷️', 'E-commerce', ['Product and category optimisation', 'Technical SEO for catalogs', 'Purchase-intent keywords', 'Internal linking', 'Traffic tracking']),
  service('ecommerce-conversion-optimization', 'E-commerce Conversion Optimization', '💳', 'E-commerce', ['Shopping journey audit', 'Product page improvements', 'Navigation review', 'Offer presentation', 'Checkout optimisation']),
  service('email-marketing-automation', 'Email Marketing & Automation', '📧', 'Lifecycle automation', ['Lifecycle strategy', 'Welcome and nurture sequences', 'Abandoned-cart and win-back flows', 'Segmentation and personalisation', 'Performance optimisation']),
  service('leads-follow-up-automation', 'Leads Follow-up Automation', '⏱️', 'Lifecycle automation', ['Follow-up sequence design', 'Timed reminders', 'Escalation rules', 'Multi-channel follow-up', 'Response-time reporting']),
  service('linkedin-profile-optimization', 'LinkedIn Profile Optimization', '🧑‍💼', 'Personal brand', ['Headline and about rewrite', 'Credibility positioning', 'Discoverability keywords', 'Proof placement', 'Contact clarity']),
  service('linkedin-content-strategy', 'LinkedIn Content Strategy', '📝', 'Personal brand', ['Audience research', 'Content pillars', 'Topic and format planning', 'Publishing cadence', 'Performance iteration']),
  service('b2b-linkedin-lead-generation', 'B2B LinkedIn Lead Generation', '🤝', 'Revenue systems', ['ICP definition', 'Prospect research', 'Personalised outreach', 'Qualification scripts', 'Meeting handoff']),
  service('seo-blog-writing', 'SEO Blog Writing', '📚', 'Content', ['Topic and keyword research', 'Search-intent briefs', 'Article writing and editing', 'On-page SEO', 'Publishing and internal linking']),
  service('website-copywriting', 'Website Copywriting', '🖋️', 'Content', ['Homepage copy', 'Service and offer pages', 'About page storytelling', 'CTA messaging', 'Voice and tone consistency']),
];
