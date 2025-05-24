export interface RssItem {
  author: string
  categories: string[]
  content: string
  contentSnippet: string
  creator: string

  title: string
  link: string
  pubDate: string
  'media:content': {
    $: {
      medium: string
      url: string
    }
  }
  no: string
  isoDate: string
}

export interface RssFeed {
  copyright: string
  description: string
  items: RssItem[]
  language: string
  lastBuildDate: string
  link: string
  title: string
}

export type NewsItem = Pick<
  RssItem,
  'no' | 'title' | 'content' | 'pubDate' | 'link' | 'contentSnippet'
>

export type RssNewsType = NewsItem & { enclosureUrl?: string }
