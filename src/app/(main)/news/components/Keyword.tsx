'use client'

import React, { useActionState } from 'react'
import { Trash2 } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createNewsKeyword,
  deleteNewsCategory,
  getNewsKeyword,
  INewsKeyword,
} from '../actions'
import { Button, FormActionWrapper } from '@/components/shared'
import { useNewsStore } from '@/stores/useNewsStore'

const Keyword = ({ isUser }: { isUser: boolean }) => {
  const queryClient = useQueryClient()

  const selectedKeyword = useNewsStore((s) => s.selectedKeyword)
  const setSelectedKeyword = useNewsStore((s) => s.setSelectedKeyword)
  const setPage = useNewsStore((s) => s.setPage)

  const { data: keywords = [], isLoading } = useQuery<INewsKeyword[] | null>({
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

  const handleClickKeyword = (keyword: string | null) => {
    setPage(1)
    setSelectedKeyword(keyword)
  }

  const handleDeleteTask = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation()
    await deleteNewsCategory(id)
    await queryClient.invalidateQueries({ queryKey: ['news-keywords'] })
    setSelectedKeyword(null)
  }

  return (
    <div className="flex flex-col items-center gap-md py-[5vh]">
      <div className="w-full sm:w-[480px]">
        <FormActionWrapper
          formAction={formAction}
          placeholder={`${!isUser ? '로그인 후' : ''} 나만의 뉴스 키워드를 등록하고 맞춤 소식을 받아보세요!`}
          disabled={isPending || !isUser}
          errors={formState.errors}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-sm w-[80vw]">
        <Button
          className="cursor-pointer text-sm"
          onClick={() => handleClickKeyword(null)}
          variant={selectedKeyword === null ? 'default' : 'outline'}
          size={'sm'}
        >
          오늘의 뉴스
        </Button>
        {((keywords?.length === 0 && !isLoading) || !isUser) && (
          <div className="border border-dashed rounded-md text-sm text-gray-400 px-sm flex items-center justify-center">
            ex. 삼성전자
          </div>
        )}

        {keywords?.map(({ id, keyword }) => {
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

export default Keyword
