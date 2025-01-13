import { formatDate } from '@/utils/formatDate'
import { serverCreateClient } from '@/utils/supabase/server'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await serverCreateClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
