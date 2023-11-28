import { type FC, type SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement>

const TemplateIcon: FC<Props> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55229 3.44772 10 4 10H20C20.5523 10 21 9.55229 21 9V4C21 3.44772 20.5523 3 20 3Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H11C11.5523 21 12 20.5523 12 20V15C12 14.4477 11.5523 14 11 14Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 14H17C16.4477 14 16 14.4477 16 15V20C16 20.5523 16.4477 21 17 21H20C20.5523 21 21 20.5523 21 20V15C21 14.4477 20.5523 14 20 14Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default TemplateIcon
