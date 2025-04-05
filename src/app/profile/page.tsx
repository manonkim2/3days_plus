'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { supabase } from '@/lib/supabase/client'

const ProfilePage = () => {
  const { setUser } = useUser()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('[Logout Error]:', error.message)
        throw error
      }

      setUser(null)
      window.location.href = '/'
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
