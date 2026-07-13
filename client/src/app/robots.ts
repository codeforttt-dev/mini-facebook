import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vaaknow.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/video', '/login', '/signup', '/friends', '/profile', '/messages', '/llms.txt'],
        disallow: ['/api/*'],
      },
      {
        userAgent: ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'Applebot-Extended', 'Amazonbot', 'Omgilibot'],
        allow: ['/', '/video', '/login', '/signup', '/friends', '/profile', '/messages', '/llms.txt'],
        disallow: ['/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
