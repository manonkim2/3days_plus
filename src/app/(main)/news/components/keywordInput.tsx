'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Plus } from 'lucide-react'
import { useActionState, useState } from 'react'
import { createNewsKeyword, INewsKeyword } from '../actions'
import { Badge } from '@/components/ui'
import { useSelectedKeyword } from '../context'

const KeywordInput = ({ keywordsData }: { keywordsData: INewsKeyword[] }) => {
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
    <div className="flex flex-col gap-sm pt-md">
      <FormActionWrapper
        formAction={formAction}
        placeholder="Add news keyword"
        isPending={isPending}
        button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
      />
      <div className="flex gap-xs pb-sm">
        {keywords.map(({ id, keyword }) => (
          <Badge
            key={id}
            className="cursor-pointer"
            onClick={() => handleClickKeyword(keyword)}
            variant={selectedKeyword === keyword ? 'default' : 'outline'}
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default KeywordInput
