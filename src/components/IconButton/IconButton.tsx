import { ButtonHTMLAttributes } from "react"
import styles from "./IconButton.module.css"

type Props = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...rest }: Props) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
)
