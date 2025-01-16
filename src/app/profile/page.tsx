import Button from '@/components/Button'
import { signOut } from '@/utils/supabase/actions'

const ProfilePage = async () => {
  return (
    <div className="flex justify-center h-full">
      <form action={signOut}>
        <Button text="SignOut" variant="secondary" size="sm" />
      </form>
    </div>
  )
}

export default ProfilePage
