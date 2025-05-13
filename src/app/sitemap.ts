import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://3daysplus.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://3daysplus.vercel.app/schedule',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://3daysplus.vercel.app/news',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ]
}
