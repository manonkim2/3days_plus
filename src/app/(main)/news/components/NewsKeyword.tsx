'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Plus, Trash2 } from 'lucide-react'
import React, { startTransition, useActionState } from 'react'
import {
  createNewsKeyword,
  deleteNewsCategory,
  getNewsKeyword,
  INewsKeyword,
} from '../actions'
import { Button } from '@/components/ui'
import { DEFAULT_KEYWORD, useSelectedKeyword } from '../context'

const NewsKeyword = ({ keywordsData }: { keywordsData: INewsKeyword[] }) => {
  const { selectedKeyword, setSelectedKeyword } = useSelectedKeyword()

  const [keywords, formAction, isPending] = useActionState(
    async (_: INewsKeyword[], formData: FormData) => {
      await createNewsKeyword(formData)
      return await getNewsKeyword()
    },
    keywordsData,
  )

  const handleClickKeyword = (keyword: string) => {
    setSelectedKeyword(keyword)
  }

  const handleDeleteTask = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation()

    await deleteNewsCategory(id)

    startTransition(() => {
      formAction(new FormData())
      setSelectedKeyword(DEFAULT_KEYWORD)
    })
  }

  return (
    <div className="flex items-center justify-between gap-sm pb-xxl">
      <div className="flex flex-wrap gap-sm">
        <Button
          className="cursor-pointer text-sm"
          onClick={() => handleClickKeyword(DEFAULT_KEYWORD)}
          variant={selectedKeyword === DEFAULT_KEYWORD ? 'default' : 'outline'}
          size={'sm'}
        >
          {DEFAULT_KEYWORD}
        </Button>
        {keywords.map(({ id, keyword }) => {
          return (
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
          )
        })}
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
