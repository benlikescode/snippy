import Sidebar from '@/components/sidebar/sidebar'
import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import Providers from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Snippy',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Sidebar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
