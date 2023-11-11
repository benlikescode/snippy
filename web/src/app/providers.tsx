'use client'

import { SessionProvider } from 'next-auth/react'
import { type FC, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Providers
