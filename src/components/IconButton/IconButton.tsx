import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"
import styles from "./IconButton.module.css"

type Props = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className, ...rest }: Props) => (
  <button className={clsx(styles.button, className)} {...rest}>
    {children}
  </button>
)
