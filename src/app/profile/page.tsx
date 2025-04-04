'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { supabase } from '@/utils/supabase/client'

const ProfilePage = () => {
  const router = useRouter()
  const { setUser } = useUser()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('[Logout Error]:', error.message)
        throw error
      }

      setUser(null)
      router.push('/dashboard')
    } catch (error) {
      alert('로그아웃 중 오류가 발생했어요!')
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center h-full">
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
