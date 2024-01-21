'use client'

import { type FC, type ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SessionProvider } from 'next-auth/react'
import { TooltipProvider } from '@/components/ui/tooltip'

type Props = {
  children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SessionProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </SessionProvider>
    </DndProvider>
  )
}

export default Providers
