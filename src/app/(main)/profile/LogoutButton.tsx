'use client'

import { createSupabaseClient } from '@/lib/supabase/browser'
import { Button } from '@/components/shared'

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const supabase = createSupabaseClient()
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
