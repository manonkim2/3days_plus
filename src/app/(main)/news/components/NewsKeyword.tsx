'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Plus } from 'lucide-react'
import { useActionState, useState } from 'react'
import { createNewsKeyword, INewsKeyword } from '../actions'
import { Button } from '@/components/ui'
import { useSelectedKeyword } from '../context'

const NewsKeyword = ({ keywordsData }: { keywordsData: INewsKeyword[] }) => {
  const [keywords, setKeywords] = useState<INewsKeyword[]>(keywordsData)
  const { selectedKeyword, setSelectedKeyword } = useSelectedKeyword()

  const [, formAction, isPending] = useActionState(
    async (prev: void | null, formData: FormData) => {
      const newKeyword = await createNewsKeyword(prev, formData)

      if (newKeyword) {
        setKeywords((prev) => [...prev, newKeyword])
      }
    },
    null,
  )

  const handleClickKeyword = (keyword: string) => {
    setSelectedKeyword(keyword)
  }

  return (
    <div className="flex items-center justify-between gap-sm py-md h-[100px]">
      <div className="flex flex-wrap gap-sm">
        {keywords.map(({ id, keyword }) => (
          <Button
            key={id}
            className="cursor-pointer text-sm"
            onClick={() => handleClickKeyword(keyword)}
            variant={selectedKeyword === keyword ? 'default' : 'outline'}
            size={'sm'}
          >
            {keyword}
          </Button>
        ))}
      </div>
      <div className="w-[200px]">
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add news keyword"
          isPending={isPending}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
      </div>
    </div>
  )
}

export default NewsKeyword
