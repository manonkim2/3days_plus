import Navbar from '@/components/Navbar'
import { formatDate } from '@/utils/formatDate'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <div className="mt-16 mb-7">
          <div className="flex justify-end">
            <span className="text-3xl font-extralight pr-2">Hello,</span>
            <span className="text-3xl font-semibold">Manon</span>
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
