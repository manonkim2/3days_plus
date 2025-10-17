'use client'

import { useEffect, useState } from 'react'
import { CircleUser } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/browser'

const UserImage = () => {
  const [user, setUser] = useState('')
  const supabase = createSupabaseClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error fetching user:', error.message)
        return
      }

      if (data.user?.email === 'guest@3days.plus') {
        setUser('/user.png')
      } else {
        setUser(data.user?.user_metadata.avatar_url)
      }
    }

    fetchUser()
  }, [supabase.auth])

  return (
    <Link className="rounded-full overflow-hidden" href="/profile">
      {user ? (
        <Image src={user || ''} alt="user_image" width={36} height={36} />
      ) : (
        <CircleUser
          className="h-8 w-8 opacity-70"
          strokeWidth={1.3}
          aria-label="user_icon"
        />
      )}
    </Link>
  )
}

export default UserImage
