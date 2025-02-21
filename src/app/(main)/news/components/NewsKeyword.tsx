'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Trash2 } from 'lucide-react'
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
    async (
      _: { keywords: INewsKeyword[]; errors: string[] },
      formData: FormData,
    ) => {
      const response = await createNewsKeyword(formData)
      const updatedKeywords = await getNewsKeyword()
      return { keywords: updatedKeywords, errors: response?.errors || [] }
    },
    { keywords: keywordsData, errors: [] },
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
    <div className="flex flex-col items-center gap-md py-xxl">
      <FormActionWrapper
        formAction={formAction}
        placeholder="관심 있는 뉴스 키워드를 등록하고 소식을 받아보세요."
        isPending={isPending}
        errors={keywords.errors}
      />

      <div className="flex flex-wrap gap-sm">
        <Button
          className="cursor-pointer text-sm"
          onClick={() => handleClickKeyword(DEFAULT_KEYWORD)}
          variant={selectedKeyword === DEFAULT_KEYWORD ? 'default' : 'outline'}
          size={'sm'}
        >
          {DEFAULT_KEYWORD}
        </Button>
        {keywords.keywords.length === 0 && (
          <div className="border border-dashed rounded-md text-sm text-gray-400 px-sm flex items-center justify-center">
            ex. 삼성전자
          </div>
        )}
        {keywords.keywords.map(({ id, keyword }) => {
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
    </div>
  )
}

export default NewsKeyword
