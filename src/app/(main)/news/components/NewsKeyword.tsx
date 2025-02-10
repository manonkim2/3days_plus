'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Plus, Trash2 } from 'lucide-react'
import React, { useActionState, useState } from 'react'
import { createNewsKeyword, deleteNewsCategory, INewsKeyword } from '../actions'
import { Button } from '@/components/ui'
import { useSelectedKeyword } from '../context'

const NewsKeyword = ({ keywordsData }: { keywordsData: INewsKeyword[] }) => {
  const [keywords, setKeywords] = useState<INewsKeyword[]>(keywordsData)
  const { selectedKeyword, setSelectedKeyword } = useSelectedKeyword()

  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const newKeyword = await createNewsKeyword(formData)

      if (newKeyword) {
        setKeywords((prev) => [...prev, newKeyword])
      }
    },
    null,
  )

  const handleClickKeyword = (keyword: string) => {
    setSelectedKeyword(keyword)
  }

  const handleDeleteTask = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation()

    await deleteNewsCategory(id)
    setKeywords((prev) => prev.filter((k) => k.id !== id))
  }

  return (
    <div className="flex items-center justify-between gap-sm pb-xxl">
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
            <div
              onClick={(event) => handleDeleteTask(id, event)}
              className="cursor-pointer"
            >
              <Trash2 className="h-4 w-4 opacity-50" />
            </div>
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
