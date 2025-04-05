export const getNews = async (keyword: string, page: number) => {
  const res = await fetch(`/api/naver/news?query=${keyword}&page=${page}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('뉴스 불러오기 실패')
  return await res.json()
}
