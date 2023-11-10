import { FC, SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement>

const ShapesIcon: FC<Props> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10.4616 17.0128C10.4991 17.1256 10.5094 17.2456 10.4915 17.3631C10.4736 17.4806 10.428 17.5921 10.3585 17.6886C10.289 17.785 10.1976 17.8635 10.0918 17.9176C9.98599 17.9718 9.86884 18 9.75 18H2.25C2.13115 18 2.01401 17.9718 1.90822 17.9176C1.80242 17.8635 1.71101 17.785 1.64152 17.6886C1.57203 17.5921 1.52644 17.4806 1.50852 17.3631C1.4906 17.2456 1.50085 17.1256 1.53844 17.0128L5.28844 5.76281C5.33819 5.61344 5.43369 5.48352 5.5614 5.39145C5.68911 5.29938 5.84256 5.24984 6 5.24984C6.15744 5.24984 6.31088 5.29938 6.4386 5.39145C6.56631 5.48352 6.66181 5.61344 6.71156 5.76281L10.4616 17.0128ZM19.5 7.125C19.5 6.16082 19.2141 5.21829 18.6784 4.4166C18.1427 3.61491 17.3814 2.99007 16.4906 2.62109C15.5998 2.25211 14.6196 2.15557 13.6739 2.34367C12.7283 2.53178 11.8596 2.99608 11.1779 3.67786C10.4961 4.35964 10.0318 5.22828 9.84367 6.17394C9.65557 7.11959 9.75211 8.09979 10.1211 8.99058C10.4901 9.88137 11.1149 10.6427 11.9166 11.1784C12.7183 11.7141 13.6608 12 14.625 12C15.9175 11.9985 17.1566 11.4844 18.0705 10.5705C18.9844 9.65659 19.4985 8.41748 19.5 7.125ZM21 13.5H12.75C12.5511 13.5 12.3603 13.579 12.2197 13.7197C12.079 13.8603 12 14.0511 12 14.25V19.5C12 19.6989 12.079 19.8897 12.2197 20.0303C12.3603 20.171 12.5511 20.25 12.75 20.25H21C21.1989 20.25 21.3897 20.171 21.5303 20.0303C21.671 19.8897 21.75 19.6989 21.75 19.5V14.25C21.75 14.0511 21.671 13.8603 21.5303 13.7197C21.3897 13.579 21.1989 13.5 21 13.5Z"
      fill="currentColor"
    />
  </svg>
)

export default ShapesIcon
