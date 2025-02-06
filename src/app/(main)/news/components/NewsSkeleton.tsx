import { Skeleton } from '@/components/ui/skeleton'

const NewsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          className="bg-white border rounded-md p-4 shadow-lg hover:shadow-xl transition-all "
          key={index}
        >
          <Skeleton className="h-8 bg-gray-200 rounded w-full" />
          <Skeleton className="h-4 bg-gray-300 rounded w-1/4 mb-3 mt-1" />
          <Skeleton className="h-12 bg-gray-300 rounded w-full mb-4" />
          <Skeleton className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        </div>
      ))}
    </div>
  )
}

export default NewsCardSkeleton
