'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Trash2 } from 'lucide-react'
import React, { useActionState } from 'react'
import { createNewsKeyword, deleteNewsCategory, INewsKeyword } from '../actions'
import { Button } from '@/components/ui'
import { DEFAULT_KEYWORD, useNewsContext } from '@/context/NewsContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getNewsKeyword } from '../actions'

const NewsKeyword = () => {
  const queryClient = useQueryClient()
  const { selectedKeyword, setSelectedKeyword, setPage } = useNewsContext()

  const { data: keywords = [], isLoading } = useQuery<INewsKeyword[]>({
    queryKey: ['news-keywords'],
    queryFn: getNewsKeyword,
    staleTime: 1000 * 60 * 5,
  })

  const [formState, formAction, isPending] = useActionState<
    { newKeyword?: INewsKeyword; errors: string[] },
    FormData
  >(
    async (_: unknown, formData: FormData) => {
      const response = await createNewsKeyword(formData)
      await queryClient.invalidateQueries({ queryKey: ['news-keywords'] })
      return response
    },
    { errors: [] },
  )

  const handleClickKeyword = (keyword: string) => {
    setPage(1)
    setSelectedKeyword(keyword)
  }

  const handleDeleteTask = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation()
    await deleteNewsCategory(id)
    await queryClient.invalidateQueries({ queryKey: ['news-keywords'] })
    setSelectedKeyword(DEFAULT_KEYWORD)
  }

  return (
    <div className="flex flex-col items-center gap-md py-xxl">
      <FormActionWrapper
        formAction={formAction}
        placeholder="관심 있는 뉴스 키워드를 등록하고 소식을 받아보세요."
        isPending={isPending}
        errors={formState.errors}
      />

      <div className="flex flex-wrap gap-sm w-[80vw]">
        <Button
          className="cursor-pointer text-sm"
          onClick={() => handleClickKeyword(DEFAULT_KEYWORD)}
          variant={selectedKeyword === DEFAULT_KEYWORD ? 'default' : 'outline'}
          size={'sm'}
        >
          {DEFAULT_KEYWORD}
        </Button>
        {keywords.length === 0 && !isLoading && (
          <div className="border border-dashed rounded-md text-sm text-gray-400 px-sm flex items-center justify-center">
            ex. 삼성전자
          </div>
        )}

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
    </div>
  )
}

export default NewsKeyword
