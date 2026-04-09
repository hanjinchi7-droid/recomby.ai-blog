import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Why GEO',
      href: getPermalink('/'),
    },
    {
      text: 'Products',
      links: [
        { text: 'How It Works', href: getPermalink('/how-it-works') },
        { text: 'Free GEO Audit', href: getPermalink('/geo-audit') },
      ],
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Compare',
      links: [
        { text: 'vs GEO Service Provider', href: getPermalink('/vs/geo-service-provider') },
        { text: 'vs DIY with AI Agents', href: getPermalink('/vs/diy-agent') },
        { text: 'vs Hiring + Tools', href: getPermalink('/vs/hiring-and-tools') },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      text: 'Free Audit',
      href: getPermalink('/geo-audit'),
      variant: 'primary',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Products',
      links: [
        { text: 'How It Works', href: getPermalink('/how-it-works') },
        { text: 'Pricing', href: getPermalink('/pricing') },
        { text: 'Free GEO Audit', href: getPermalink('/geo-audit') },
      ],
    },
    {
      title: 'Compare',
      links: [
        { text: 'vs GEO Service Provider', href: getPermalink('/vs/geo-service-provider') },
        { text: 'vs DIY with AI Agents', href: getPermalink('/vs/diy-agent') },
        { text: 'vs Hiring + Tools', href: getPermalink('/vs/hiring-and-tools') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Connect',
      links: [
        { text: 'GitHub', href: 'https://github.com/recomby-ai/ucp-onboard' },
        { text: 'X / Twitter', href: 'https://x.com/recomby_ai' },
        { text: 'YouTube', href: 'https://youtube.com/@recomby-ai' },
        { text: 'Reddit', href: 'https://www.reddit.com/r/recomby_ai/' },
        { text: 'Email', href: 'mailto:contact@recomby.ai' },
      ],
    },
  ],

  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Terms of Service', href: getPermalink('/terms') },
  ],

  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/recomby-ai/ucp-onboard' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/recomby_ai' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://youtube.com/@recomby-ai' },
    { ariaLabel: 'Reddit', icon: 'tabler:brand-reddit', href: 'https://www.reddit.com/r/recomby_ai/' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:contact@recomby.ai' },
  ],

  footNote: `
    &copy; ${new Date().getFullYear()} <a class="text-blue-600 underline dark:text-muted" href="https://recomby.ai/">Recomby.ai</a> &middot; All rights reserved.
  `,
};
