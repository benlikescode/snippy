import { FC, SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement>

const CogIcon: FC<Props> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M22.2621 9.77493C22.2394 9.67068 22.1948 9.57245 22.1311 9.48682C22.0675 9.40119 21.9863 9.33011 21.8931 9.27834L19.6641 8.04103C19.5406 7.80174 19.4061 7.56833 19.2609 7.34156L19.304 4.79034C19.3058 4.68363 19.2848 4.57778 19.2424 4.47984C19.2 4.3819 19.1372 4.29413 19.0582 4.2224C17.9484 3.21306 16.6337 2.45526 15.2041 2.00081C15.1025 1.96831 14.9951 1.95786 14.8892 1.97015C14.7832 1.98244 14.6811 2.01718 14.5897 2.07206L12.4036 3.38362C12.1346 3.37082 11.8652 3.37063 11.5962 3.38306L9.40828 2.07028C9.31678 2.01537 9.21461 1.98061 9.10861 1.96832C9.0026 1.95604 8.8952 1.9665 8.79356 1.99903C7.36454 2.45552 6.05092 3.21517 4.9425 4.22606C4.86352 4.29779 4.80076 4.38555 4.75841 4.48347C4.71605 4.58139 4.69507 4.68723 4.69687 4.7939L4.73981 7.34296C4.59429 7.56951 4.4594 7.80269 4.33556 8.04178L2.10469 9.28021C2.01138 9.33202 1.93021 9.40314 1.8666 9.48883C1.80298 9.57451 1.75838 9.67279 1.73578 9.77709C1.41653 11.2428 1.41755 12.7602 1.73878 14.2255C1.76142 14.3298 1.80604 14.428 1.86965 14.5136C1.93327 14.5993 2.01442 14.6703 2.10769 14.7221L4.33669 15.9594C4.46013 16.1987 4.59465 16.4321 4.73981 16.6589L4.69687 19.2101C4.69508 19.3168 4.71608 19.4227 4.75847 19.5206C4.80086 19.6186 4.86367 19.7063 4.94269 19.7781C6.05244 20.7874 7.36705 21.5452 8.79666 21.9997C8.89826 22.0322 9.00564 22.0426 9.11161 22.0303C9.21758 22.018 9.31971 21.9833 9.41119 21.9284L11.5972 20.6168C11.8661 20.6295 12.1362 20.6298 12.4045 20.6174L14.5925 21.9302C14.684 21.9851 14.7862 22.0199 14.8922 22.0322C14.9982 22.0445 15.1056 22.034 15.2073 22.0014C16.6363 21.545 17.9498 20.7853 19.0582 19.7745C19.1372 19.7028 19.2 19.615 19.2423 19.5171C19.2847 19.4192 19.3057 19.3133 19.3039 19.2067L19.2609 16.6576C19.4065 16.431 19.5413 16.1979 19.6652 15.9588L21.8961 14.7203C21.9894 14.6685 22.0705 14.5974 22.1342 14.5117C22.1978 14.426 22.2424 14.3278 22.265 14.2235C22.5842 12.7577 22.5832 11.2403 22.262 9.77503L22.2621 9.77493ZM12.0005 16.1252C11.1846 16.1252 10.3871 15.8833 9.70874 15.43C9.03039 14.9767 8.50168 14.3325 8.18946 13.5788C7.87725 12.825 7.79556 11.9956 7.95473 11.1954C8.11389 10.3953 8.50676 9.66026 9.08365 9.08337C9.66054 8.50648 10.3955 8.11361 11.1957 7.95444C11.9959 7.79528 12.8253 7.87697 13.579 8.18918C14.3328 8.50139 14.977 9.0301 15.4303 9.70846C15.8835 10.3868 16.1255 11.1843 16.1255 12.0002C16.1242 13.0938 15.6892 14.1423 14.9159 14.9156C14.1426 15.6889 13.0941 16.1239 12.0005 16.1252Z"
      fill="currentColor"
    />
  </svg>
)

export default CogIcon
