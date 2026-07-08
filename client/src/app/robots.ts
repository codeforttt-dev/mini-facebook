import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nestra.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/video', '/login', '/signup', '/friends', '/profile', '/llms.txt'],
        disallow: ['/api/*'],
      },
      {
        userAgent: ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: ['/', '/video', '/login', '/signup', '/friends', '/profile', '/llms.txt'],
        disallow: ['/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
