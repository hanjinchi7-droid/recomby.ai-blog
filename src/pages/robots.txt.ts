import type { APIRoute } from 'astro';
import { SEO_CONFIG } from '../config/seo-config';

export const GET: APIRoute = () => {
  const { site, aiCrawlers } = SEO_CONFIG;
  
  const robotsTxt = `
# Robots.txt for ${site.name}
# Generated: ${new Date().toISOString()}

# ===== AI Crawlers =====
${aiCrawlers.allowed.map(bot => `
User-agent: ${bot}
Allow: /
Crawl-delay: 1`).join('\n')}

# ===== Search Engines =====
User-agent: *
Allow: /
Disallow: /api/

# ===== Blocked Crawlers =====
${aiCrawlers.blocked.map(bot => `
User-agent: ${bot}
Disallow: /`).join('\n')}

# ===== Sitemap =====
Sitemap: ${site.url}/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};