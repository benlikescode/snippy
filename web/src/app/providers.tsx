'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from 'next-auth/react'
import { type FC, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  )
}

export default Providers
