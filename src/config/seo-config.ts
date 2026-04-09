export const SEO_CONFIG = {
  site: {
    name: 'Recomby.ai',
    url: 'https://recomby.ai',
    description: 'Your AI employee for Generative Engine Optimization (GEO). 9 specialized skills that get your brand cited by ChatGPT, Perplexity, Gemini, and Google AI. Not a dashboard — an autonomous AI employee that works every day.',
    email: 'contact@recomby.ai',
  },

  aiCrawlers: {
    allowed: [
      'GPTBot',
      'ChatGPT-User',
      'ClaudeBot',
      'Claude-Web',
      'Google-Extended',
      'GoogleOther',
      'Perplexitybot',
      'PerplexityBot',
      'Amazonbot',
      'Applebot-Extended',
      'FacebookBot',
      'Bytespider',
    ],
    blocked: [
      'AhrefsBot',
      'SemrushBot',
      'DotBot',
      'MJ12bot',
    ],
  },

  contentAreas: {
    home: {
      path: '/',
      description: 'Why GEO matters — AI search cites the best match, not the biggest brand. Recomby.ai builds AI employees to make your expertise visible to AI.',
    },
    pricing: {
      path: '/pricing',
      description: 'Two plans: Scout ($99/month, 4 articles) and Spark ($299/month, 12 articles). All 9 skills included in both.',
    },
    howItWorks: {
      path: '/how-it-works',
      description: 'Meet your AI employee — 9 specialized skills: profiling, keyword mining, content writing, image creation, content adaptation, visibility tracking, GEO auditing, and reporting.',
    },
    geoAudit: {
      path: '/geo-audit',
      description: 'Free GEO Health Score — check your AI search readiness on a 100-point scale',
    },
    blog: {
      path: '/blog',
      description: 'Articles about Generative Engine Optimization, AI search, and Agent Commerce',
    },
  },

  social: {
    github: 'https://github.com/recomby-ai/ucp-onboard',
    reddit: 'https://www.reddit.com/r/recomby_ai/',
    twitter: 'https://x.com/recomby_ai',
    youtube: 'https://youtube.com/@recomby-ai',
  },
};
