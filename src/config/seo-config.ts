export const SEO_CONFIG = {
  // 网站基础信息
  site: {
    name: 'Recomby.ai',
    url: 'https://blog.recomby.ai',
    description: 'Get Recommended by AI, Not Left Behind by the Times',
    email: 'contact@recomby.ai',
  },

  // AI爬虫配置
  aiCrawlers: {
    // 允许的AI爬虫
    allowed: [
      'GPTBot',           // OpenAI
      'ChatGPT-User',
      'ClaudeBot',        // Anthropic
      'Claude-Web',
      'Google-Extended',  // Google Gemini
      'Perplexitybot',
      'PerplexityBot',
      'Amazonbot',
      'Applebot-Extended',
      'FacebookBot',
      'Bytespider',       // ByteDance
    ],
    
    // 禁止的爬虫
    blocked: [
      'AhrefsBot',
      'SemrushBot',
      'DotBot',
      'MJ12bot',
    ],
  },

  // 内容区域
  contentAreas: {
    blog: {
      path: '/',
      description: 'In-depth articles about GEO, AI Search, and content marketing',
    },
    about: {
      path: '/about',
      description: 'About Recomby.ai and our mission',
    },
    tags: {
      path: '/tags',
      description: 'Browse articles by topics',
    },
  },

  // 社交链接
  social: {
    github: 'https://github.com/hanjinchi7-droid/Generative-Engine-Optimization-GEO-blog-template',
    reddit: 'https://www.reddit.com/r/recomby_ai/',
  },
};