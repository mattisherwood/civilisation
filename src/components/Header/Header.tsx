import styles from "./Header.module.css"

export const Header = ({ children }: { children: React.ReactNode }) => (
  <header className={styles.header}>{children}</header>
)
