import Image from 'next/image'
import LogoutButton from './LogoutButton'
import { getUserInfo } from '@/lib/supabase/actions'

const ProfilePage = async () => {
  const user = await getUserInfo()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading user info...</p>
      </div>
    )
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
