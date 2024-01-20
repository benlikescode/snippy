'use client'

import { Button } from '@/components/ui/button'
import { type FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import { GitHubIcon } from '@/components/icons'
import AppLogo from '@/components/app-logo'

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
    <div className="h-full w-full overflow-y-auto">
      <div className="mx-auto flex max-w-[650px] flex-col items-center px-4 py-8 md:py-16">
        <AppLogo className="h-[60px] w-[60px]" />

        <div className="mt-20 flex flex-col items-center">
          <h1 className="text-3xl font-semibold sm:text-5xl">Sign in to Snippy</h1>
          <p className="mt-4 hidden text-[#a3a3a3] sm:block">
            A Visual Studio Code extension to accelerate development.
          </p>
        </div>

        <video
          src="snippy-demo.mov"
          className="my-12 rounded-2xl border bg-black"
          autoPlay
          loop
          muted
          playsInline
        />

        <Button
          onClick={handleLogin}
          className="h-12 w-full shrink-0 rounded-lg border border-[rgba(255,_255,_255,_0.1)]"
          disabled={state === 'loading'}
        >
          <GitHubIcon className="mr-3 h-5 w-5 fill-[#fff]" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
