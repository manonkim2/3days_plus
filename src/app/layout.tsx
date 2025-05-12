import type { Metadata } from 'next'
import './globals.css'
import { Montserrat, Poppins } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import ReactQueryProvider from '@/components/ReactQueryProvider'
import { Toaster } from '@/components/ui/toaster'
import { ToastProvider } from '@/components/ui/toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--montserrat-text',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--poppins-text',
})

export const metadata: Metadata = {
  title: '3Days+ | Habit Dashboard',
  description:
    'Track your daily routines and tasks. Small steps each day lead to lasting habits. Stay consistent with 3Days+.',
  openGraph: {
    title: '3Days+',
    description:
      '3일을 반복하면 습관이 된다. 루틴과 할 일을 꾸준히 기록해보세요.',
    url: 'https://3daysplus.vercel.app/',
    siteName: '3Days+',
    images: [
      {
        /**
         * @todo og-image public에 넣기
         */
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '3Days+ OG Image',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        <ReactQueryProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
