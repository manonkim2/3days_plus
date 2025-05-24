import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Poppins } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import ReactQueryProvider from '@/components/ReactQueryProvider'
import { Toaster } from '@/components/ui/toaster'
import { ToastProvider } from '@/components/ui/toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--poppins-text',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://3daysplus.vercel.app/'),
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
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ReactQueryProvider>
          <ToastProvider>
            <Navbar />
            <main>
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
            <Toaster />
            <Footer />
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
