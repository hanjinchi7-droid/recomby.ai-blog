interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  text: string;
  position: number;
}

export function detectFAQ(markdown: string): FAQItem[] | null {
  const faqPattern = /^###\s+(.+?[?？])\s*\n+(.+?)(?=\n###|$)/gms;
  const matches = [...markdown.matchAll(faqPattern)];

  if (matches.length < 2) return null;

  return matches.map(match => ({
    question: match[1].trim(),
    answer: match[2].trim().replace(/\n+/g, ' '),
  }));
}

export function detectHowTo(markdown: string): HowToStep[] | null {
  const howtoPattern = /^\d+\.\s+(.+)$/gm;
  const matches = [...markdown.matchAll(howtoPattern)];

  if (matches.length < 3) return null;

  return matches.map((match, index) => ({
    text: match[1].trim(),
    position: index + 1,
  }));
}

export function extractFirstImage(markdown: string): string | null {
  const imagePattern = /!\[.*?\]\((.+?)\)/;
  const match = markdown.match(imagePattern);
  return match ? match[1] : null;
}
