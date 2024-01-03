/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { type FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import { GitHubIcon } from '@/components/icons'

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
    <div className="mx-auto flex h-full w-full max-w-[600px] flex-col items-center px-4 py-16">
      <div className="mb-20 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[linear-gradient(180deg,_#0958F2_0%,_#7242FA_100%)] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.30)]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_565_134)">
            <path
              d="M7.83963 6.76364L8.91037 1.77739C8.97797 1.46358 9.15108 1.18241 9.40083 0.98074C9.65058 0.779067 9.96188 0.669067 10.2829 0.669067C10.6039 0.669067 10.9152 0.779067 11.165 0.98074C11.4147 1.18241 11.5878 1.46358 11.6554 1.77739L12.7235 6.76364C12.781 7.02763 12.9133 7.26949 13.1046 7.4603C13.2958 7.6511 13.538 7.78279 13.8021 7.83961L18.7884 8.91035C19.1029 8.9767 19.3851 9.14915 19.5875 9.3988C19.79 9.64845 19.9005 9.96013 19.9005 10.2816C19.9005 10.603 19.79 10.9147 19.5875 11.1643C19.3851 11.414 19.1029 11.5864 18.7884 11.6528L13.8021 12.7235C13.5377 12.7805 13.2953 12.9126 13.1039 13.1039C12.9126 13.2952 12.7806 13.5376 12.7235 13.8021L11.6554 18.7884C11.5878 19.1022 11.4147 19.3833 11.165 19.585C10.9152 19.7867 10.6039 19.8967 10.2829 19.8967C9.96188 19.8967 9.65058 19.7867 9.40083 19.585C9.15108 19.3833 8.97797 19.1022 8.91037 18.7884L7.83963 13.8021C7.78372 13.5376 7.65233 13.2949 7.46137 13.1035C7.27041 12.912 7.02807 12.7801 6.76366 12.7235L1.77741 11.6528C1.46289 11.5864 1.18075 11.414 0.978269 11.1643C0.775789 10.9147 0.665283 10.603 0.665283 10.2816C0.665283 9.96013 0.775789 9.64845 0.978269 9.3988C1.18075 9.14915 1.46289 8.9767 1.77741 8.91035L6.76366 7.83961C7.02772 7.78325 7.26984 7.65166 7.46076 7.46074C7.65169 7.26981 7.78327 7.0277 7.83963 6.76364Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_565_134">
              <rect
                width="19.2233"
                height="19.2233"
                fill="white"
                transform="translate(0.669922 0.669922)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <h1 className="text-2xl font-semibold sm:text-5xl">Sign in to Snippy</h1>
      <p className="mt-4 text-center text-[#a3a3a3]">
        Login or register to start saving on development time.
      </p>

      <div className="relative my-8 h-72 w-full overflow-hidden rounded-[20px] bg-[#000]">
        <img
          src="https://i.pinimg.com/originals/c8/cb/ec/c8cbecadc9ffb14fde3570bc99efe7fb.gif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <Button
        onClick={handleLogin}
        className="h-12 rounded-lg border border-[rgba(255,_255,_255,_0.1)]"
        disabled={state === 'loading'}
      >
        <GitHubIcon className="mr-3 h-5 w-5 fill-[#fff]" />
        Sign in with GitHub
      </Button>
    </div>
  )
}

export default LoginPage
