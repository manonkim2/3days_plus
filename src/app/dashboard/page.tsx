import Image from 'next/image'

import Badge from '@/components/common/Badge'
import Box from '@/components/common/Box'
import Button from '@/components/common/Button'
import Link from 'next/link'

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
    `https://newsapi.org/v2/everything?q=사회&sortBy=publishedAt&pageSize=6&page=1&apiKey=${process.env.NEWS_API_KEY}`,
  ).then((res) => res.json())
}

const DashBoardPage = async () => {
  const news: NewsResponse = await getNews()
  console.log(news)
  return (
    <div>
      <div className="grid grid-cols-[2fr,1.5fr,3fr] h-[400px] gap-3">
        <Box color="secondary" border="white" />
        <Box />
        <Box />
      </div>
      {/* news btn */}
      <div className="flex gap-3 justify-center my-8">
        <Button text="All" variant="secondary" />
        <Button text="business" variant="secondary" />
        <Button text="Entertainment" variant="secondary" />
        <Button text="Science" variant="secondary" />
        <Button text="Technology" variant="secondary" />
      </div>
      {/* news */}
      {/* <div className="grid grid-cols-[2fr,3fr] gap-3 h-[740px]">
        <Box color="secondary">
          <span className="text-2xl pb-4">Top Stories</span>
          <div className="border w-full relative h-full rounded-xl overflow-hidden">
            <Image src="/sample.jpg" alt="sample-img" fill objectFit="cover" />
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <span className="text-base text-fontSecondary">2024. 12. 19</span>
            <span className="text-2xl">
              탁핵 불확실성 코스피 코스닥 연주 ㅇ최저...성난 개미들 1조원
              던졋다.
            </span>
            <span className="text-base">
              탄핵 정국으로 인한 정치 불확실성이 커지면서 코스피가 2% 넘게
              급락해 연저점을 기록했다.일 한국거래소에 따르면 이날 코스피는 전일
              대비 67.58포인트(2.78%) 하락한 2,360.58에 거래를 마감했다. 개인
              투자자들이 1조원 넘게 팔아치우는 등 패닉셀링(공황 매도)이
              나타나면서 ‘블랙먼데이’ 공포가 현실화 됐다.
            </span>
          </div>
        </Box>
      </div> */}
      <div className="grid grid-cols-2 gap-3 h-[1140px]">
        {news.articles.map(({ title, urlToImage, publishedAt, url }) => (
          <Link href={url} key={urlToImage} target="_blank">
            <Box>
              <div className="flex flex-col h-full gap-3">
                <div className="border w-full relative h-full rounded-xl overflow-hidden">
                  <Image
                    src={urlToImage}
                    alt="sample-img"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-fontSecondary text-base">
                    {publishedAt}
                  </span>
                  {/* <Badge text={section} /> */}
                </div>
                <span className="text-md">{title}</span>
              </div>
            </Box>
          </Link>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Button text="more" variant="secondary" />
      </div>
    </div>
  )
}

export default DashBoardPage
