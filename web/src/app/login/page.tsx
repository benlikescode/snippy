'use client'

import { type FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import AppLogo from '@/components/app-logo'
import { GitHubIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Spinner from '@/components/spinner'

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
    <div className="h-full w-full overflow-y-auto bg-[length:30px_30px] bg-[linear-gradient(to_right,_rgb(21,_21,_21)_1px,_transparent_1px),_linear-gradient(rgb(21,_21,_21)_1px,_transparent_1px)]">
      <div className="mx-auto flex max-w-[650px] flex-col items-center px-4 py-8 md:py-16">
        <AppLogo className="h-[60px] w-[60px]" />

        <div className="mt-20 flex flex-col items-center">
          <h1 className="text-2xl font-semibold sm:text-5xl">Sign in to Snippy</h1>
          <p className="mt-4 text-center text-xs text-[#a3a3a3] sm:text-base">
            A Visual Studio Code extension to accelerate development.
          </p>
        </div>

        <Image src="/snippy-demo.gif" alt="Snippy extension demo" height={433} width={800} className='mb-8 mt-12 rounded-2xl border border-[rgba(255,_255,_255,_0.2)] bg-black' />
    
        <Button
          variant="ghost"
          onClick={handleLogin}
          className="h-14 w-full shrink-0 rounded-lg border border-[rgba(255,_255,_255,_0.05)] bg-[linear-gradient(180deg,_rgba(9,_88,_242,_0.40)_0%,_rgba(114,_66,_250,_0.40)_100%)]"
          disabled={state === 'loading'}
        >
          {state === 'loading' ? (
            <Spinner />
          ) : (
            <>
              <GitHubIcon className="mr-3 h-5 w-5 fill-[#fff]" />
              Sign in with GitHub
            </>
          )}
         
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
