'use client'

import { Button } from '@/components/ui/button'
import { type FC, useState } from 'react'
import { signIn } from 'next-auth/react'

type Props = {
  searchParams: {
    redirectTo: string
  }
}

type State = 'idle' | 'loading' | 'error'

const LoginPage: FC<Props> = ({ searchParams }) => {
  const [state, setState] = useState<State>('idle')

  const handleLogin = async () => {
    try {
      setState('loading')
      await signIn('github', { callbackUrl: searchParams.redirectTo ?? '/' })
    } catch (err) {
      setState('error')
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button onClick={handleLogin} variant="outline" disabled={state === 'loading'}>
        Login Now
      </Button>
    </div>
  )
}

export default LoginPage
