import Link from 'next/link'
import Image from 'next/image'

import Box from '@/components/Box'

interface NewsResponse {
  status: string
  totalResults: number
  articles: {
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
  }[]
}

const getNews = async () => {
  return await fetch(
    `https://newsapi.org/v2/everything?q=경제&sortBy=publishedAt&pageSize=6&page=1&apiKey=${process.env.NEWS_API_KEY}`,
  ).then((res) => res.json())
}

const News = async () => {
  const news: NewsResponse = await getNews()

  return (
    <>
      <div className="grid grid-cols-2 gap-3 h-[1140px]">
        {news.articles.map(({ title, urlToImage, publishedAt, url }, index) => (
          <Link href={url} key={urlToImage + index} target="_blank">
            <Box>
              <div className="flex flex-col h-full gap-3">
                <div className="border w-full h-full relative rounded-xl overflow-hidden">
                  <Image
                    src={urlToImage}
                    alt="sample-img"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-fontSecondary">{publishedAt}</span>
                  {/* <Badge text={section} /> */}
                </div>
                <span>{title}</span>
              </div>
            </Box>
          </Link>
        ))}
      </div>
    </>
  )
}

export default News
