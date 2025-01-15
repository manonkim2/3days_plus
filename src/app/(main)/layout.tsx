import { formatDate } from '@/utils/formatDate'
import { getUserInfo } from '@/utils/supabase/actions'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserInfo()

  return (
    <div>
      <main className="container mx-auto">
        <div className="mt-16 mb-7">
          <div className="flex justify-end">
            <span className="text-3xl font-extralight pr-2">Hello,</span>
            <span className="text-3xl font-semibold">
              {user?.user_metadata.full_name || 'Everybody'}
            </span>
          </div>
          <div className="flex justify-end">
            <span className="text-3xl font-extralight pr-2">Today is</span>
            <span className="text-3xl font-semibold">{formatDate()}</span>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
