import Image from 'next/image'
import Parser from 'rss-parser'

const News = async () => {
  const parser = new Parser()
  const feed = await parser.parseURL(
    'https://www.yonhapnewstv.co.kr/category/news/headline/feed/',
  )

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feed.items.map((item) => (
        <a
          key={item.guid}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border hover:border-blue-500"
        >
          {item.enclosure?.url && (
            <div className="relative aspect-video w-full">
              <Image
                src={item.enclosure.url}
                alt={item.title || ''}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500">{item.pubDate}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

export default News
