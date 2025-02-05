'use client'

import FormActionWrapper from '@/components/FormActionWrapper'
import { Plus } from 'lucide-react'
import { useActionState, useState } from 'react'
import { createNewsKeyword, INewsKeyword } from '../actions'

const KeywordInput = ({ keywordsData }: { keywordsData: INewsKeyword[] }) => {
  const [keywords, setKeywords] = useState<INewsKeyword[]>(keywordsData)

  const [, formAction, isPending] = useActionState(
    async (prev: void | null, formData: FormData) => {
      const newKeyword = await createNewsKeyword(prev, formData)

      if (newKeyword) {
        setKeywords((prev) => [...prev, newKeyword])
      }
    },
    null,
  )

  return (
    <div>
      <FormActionWrapper
        formAction={formAction}
        placeholder="Add your task"
        isPending={isPending}
        button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
      />
      <ul>
        {keywords.map((keyword) => (
          <li key={keyword.id}>{keyword.keyword}</li>
        ))}
      </ul>
    </div>
  )
}

export default KeywordInput
