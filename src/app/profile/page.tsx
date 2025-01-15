import { getSignOut, getUserInfo } from '@/utils/supabase/actions'

const ProfilePage = async () => {
  const user = await getUserInfo()

  console.log(Boolean(user))
  return (
    <div className="flex justify-center h-full">
      <form action={getSignOut}>
        <button>Logout</button>
      </form>
    </div>
  )
}

export default ProfilePage
