import type { Post } from '~/types';
import type {
  SchemaBlogPosting,
  SchemaFAQPage,
  SchemaHowTo,
  SchemaBreadcrumbList,
  SchemaOrganization,
  SchemaPerson,
} from '~/types/schema';
import { detectFAQ, detectHowTo, extractFirstImage } from './schema-detector';
import { SEO_CONFIG } from '~/config/seo-config';

export function generateOrganizationSchema(): SchemaOrganization {
  return {
    '@type': 'Organization',
    name: SEO_CONFIG.site.name,
    url: SEO_CONFIG.site.url,
    logo: `${SEO_CONFIG.site.url}/favicon.svg`,
    sameAs: [
      SEO_CONFIG.social.github,
      SEO_CONFIG.social.reddit,
    ].filter(Boolean),
  };
}

export function generatePersonSchema(authorName: string, url?: string): SchemaPerson {
  return {
    '@type': 'Person',
    name: authorName,
    ...(url ? { url } : {}),
  };
}

export function generateBlogPostingSchema(
  post: Post,
  url: string,
  content: string
): SchemaBlogPosting {
  const organization = generateOrganizationSchema();
  
  const authorUrl = (post as Post & { authorUrl?: string }).authorUrl;
  
  const author = post.author 
    ? generatePersonSchema(post.author, authorUrl) 
    : organization;

  const image = post.image
    ? typeof post.image === 'string'
      ? post.image
      : post.image.src
    : extractFirstImage(content);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: image || undefined,
    author,
    publisher: organization,
    datePublished: post.publishDate.toISOString(),
    dateModified: post.updateDate?.toISOString() || post.publishDate.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function generateFAQSchema(content: string): SchemaFAQPage | null {
  const faqItems = detectFAQ(content);
  if (!faqItems) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateHowToSchema(content: string, title: string): SchemaHowTo | null {
  const steps = detectHowTo(content);
  if (!steps) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      text: step.text,
      position: step.position,
    })),
  };
}

export function generateBreadcrumbSchema(post: Post, baseUrl: string): SchemaBreadcrumbList {
  const items: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }> = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ];

  if (post.category) {
    items.push({
      '@type': 'ListItem' as const,
      position: 2,
      name: post.category.title,
      item: `${baseUrl}/category/${post.category.slug}`,
    });
  }

  items.push({
    '@type': 'ListItem' as const,
    position: items.length + 1,
    name: post.title,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function generateAllSchemas(post: Post, url: string, content: string): (SchemaBlogPosting | SchemaFAQPage | SchemaHowTo | SchemaBreadcrumbList)[] {
  const schemas: (SchemaBlogPosting | SchemaFAQPage | SchemaHowTo | SchemaBreadcrumbList)[] = [];

  schemas.push(generateBlogPostingSchema(post, url, content));

  const faqSchema = generateFAQSchema(content);
  if (faqSchema) {
    schemas.push(faqSchema);
    console.log(`✅ 检测到FAQ格式，已生成FAQ Schema`);
  }

  const howtoSchema = generateHowToSchema(content, post.title);
  if (howtoSchema) {
    schemas.push(howtoSchema);
    console.log(`✅ 检测到HowTo格式，已生成HowTo Schema`);
  }

  schemas.push(generateBreadcrumbSchema(post, SEO_CONFIG.site.url));

  return schemas;
}