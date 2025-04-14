'use client'

import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui'

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('[Logout Error]:', error.message)
        throw error
      }

      window.location.href = '/'
    } catch (error) {
      alert('로그아웃 중 오류가 발생했어요!')
      console.error(error)
    }
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      로그아웃
    </Button>
  )
}
