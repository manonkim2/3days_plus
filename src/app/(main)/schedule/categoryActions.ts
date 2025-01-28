'use server'

import db from '@/utils/db'

export const createCategory = async (prev: undefined, formData: FormData) => {
  const content = formData.get('content') as string

  if (!content || content.trim() === '') {
    return
  }

  try {
    await db.category.create({
      data: {
        title: content,
      },
    })
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}
