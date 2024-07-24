import type { Metadata } from 'next'

import '@/styles/globals.css'
import Navigation from '@/components/navigation'
import { notoSansJP } from '@/styles/fonts'

export const metadata: Metadata = {
  title: 'JOPT',
  description: 'Togawa Lab Poker Score Management App',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="jp">
      <body className={notoSansJP.className}>
        <Navigation>{children}</Navigation>
      </body>
    </html>
  )
}

export default RootLayout
