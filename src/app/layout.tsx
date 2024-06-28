import type { Metadata } from 'next'

import '@/styles/globals.css'
import Navigation from '@/components/navigation'
import { notoSansJP } from '@/styles/fonts'

export const metadata: Metadata = {
  title: 'Poker T-League',
  description: 'this site manages multiplayer points in T-League',
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
