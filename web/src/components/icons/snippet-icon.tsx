import { type FC, type SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement>

const SnippetIcon: FC<Props> = (props) => (
  <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19.5003 17.3334L23.8337 13L19.5003 8.66671M6.50033 8.66671L2.16699 13L6.50033 17.3334M15.7087 4.33337L10.292 21.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SnippetIcon
