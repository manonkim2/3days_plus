export interface INaverNews {
  display: number
  items: {
    title: string
    originallink: string
    link: string
    description: string
    pubDate: string
  }[]
  lastBuildDate: string
  start: number
  total: number
}

const client_id = process.env.NEXT_PUBLIC_NAVER_NEWS_CLIENT_ID!
const client_secret = process.env.NEXT_PUBLIC_NAVER_NEWS_CLIENT_SECRET!

/**
 * 네이버 뉴스 API로 키워드 검색 결과 가져오기
 */
export const getNews = async (
  keyword: string,
  page: number,
): Promise<INaverNews | undefined> => {
  try {
    const display = 12
    const start = (page - 1) * display + 1
    const query = encodeURIComponent(keyword)
    const url = `https://openapi.naver.com/v1/search/news?query=${query}&start=${start}&display=${display}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
      cache: 'no-store', // 정적 캐싱 방지
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Error fetching news from Naver:', error)
  }
}
