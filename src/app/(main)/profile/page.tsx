export const dynamic = 'force-dynamic'

import Image from 'next/image'
import LogoutButton from './LogoutButton'
import { getUserInfo } from '@/lib/supabase/actions'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const user = await getUserInfo()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-md">
      <Image
        src={user?.image_url || '/default-profile.png'}
        alt="Profile Image"
        width={80}
        height={80}
        className="rounded-full border"
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{user?.name || 'Anonymous'}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <LogoutButton />
    </div>
  )
}

export default ProfilePage
