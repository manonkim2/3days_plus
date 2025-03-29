'use client'

import { Button, Input } from '@/components/ui'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { IPhotos } from '@/types/unsplash'
import { fetcher } from '@/utils/fetcher'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const TitleImageSheet = () => {
  const [search, setSearch] = useState('')

  const {
    data: images,
    isLoading,
    refetch,
  } = useQuery<IPhotos>({
    queryKey: ['unsplash', search],
    queryFn: () =>
      fetcher('/search/photos', {
        baseUrl: 'https://api.unsplash.com',
        query: {
          query: search,
          orientation: 'landscape',
          per_page: 10,
        },
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!}`,
        },
        showToastOnError: true,
        fallbackErrorMessage: '이미지를 불러오는 데 실패했습니다.',
      }),
    enabled: false,
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="bg-transparent border-fontTertiary text-fontTertiary"
        >
          Change Image
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Customize Your Title Image</SheetTitle>
          <SheetDescription className="whitespace-pre-line">
            {
              'Search any keyword and find an image you like.\nSet it as the background for your dashboard title.'
            }
          </SheetDescription>
        </SheetHeader>
        <Input
          type="text"
          value={search}
          placeholder="Enter keyword"
          className="my-md"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && search.trim()) {
              refetch()
            }
          }}
          onSave={() => search.trim() && refetch()}
          button={<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
        {isLoading ? (
          <ImageSkeleton />
        ) : (
          <div className="mt-4 max-h-screen overflow-y-auto grid grid-cols-2 gap-2 pr-1">
            {images?.results?.map((img) => (
              <div key={img.id} className="w-full aspect-[3/2] rounded">
                <Image
                  src={img.urls.small}
                  alt={img.alt_description}
                  className="w-full h-full object-cover cursor-pointer"
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

const ImageSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          className="w-full bg-gray-200  border rounded-md shadow-lg hover:shadow-xl transition-all h-[100px]"
          key={index}
        />
      ))}
    </div>
  )
}

export default TitleImageSheet
