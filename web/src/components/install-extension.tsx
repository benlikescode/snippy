import { type FC } from 'react'

type Props = {
  dontShow: boolean
}

const InstallExtension: FC<Props> = ({ dontShow }) => {
  if (dontShow) return null

  return (
    <div className="rounded-xl bg-[#171717]">
      <div className="px-6 pb-6">
        <div className="mt-[-24px] flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,_#0958F2_0%,_#7242FA_100%)] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.30)]">
            <svg
              width="20"
              height="20"
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

          <div className="ml-[-6px] flex h-12 w-12 items-center justify-center rounded-full bg-[#fff] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.30)]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100"
                height="100"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0)">
                <path
                  d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z"
                  fill="#0065A9"
                />
                <g filter="url(#filter0_d)">
                  <path
                    d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z"
                    fill="#007ACC"
                  />
                </g>
                <g filter="url(#filter1_d)">
                  <path
                    d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z"
                    fill="#1F9CF0"
                  />
                </g>
                <g style={{ mixBlendMode: 'overlay' }} opacity="0.25">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z"
                    fill="url(#paint0_linear)"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d"
                  x="-8.39411"
                  y="15.8291"
                  width="116.727"
                  height="92.2456"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="4.16667" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d"
                  x="60.4167"
                  y="-8.07558"
                  width="47.9167"
                  height="116.151"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="4.16667" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear"
                  x1="49.9392"
                  y1="0.257812"
                  x2="49.9392"
                  y2="99.7423"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold tracking-wide">Install Snippy</h2>

        <ol className="mb-8 mt-4 list-inside list-decimal text-sm font-medium text-[#737373]">
          <li>Install Extension</li>
          <li>Log in with GitHub</li>
          <li>Start snipping</li>
        </ol>

        <button className="h-14 w-full rounded-lg border border-[#0957f2] bg-[linear-gradient(180deg,_rgba(9,_88,_242,_0.20)_0%,_rgba(114,_66,_250,_0.20)_100%)]">
          Open in VS Code
        </button>
      </div>
    </div>
  )
}

export default InstallExtension
