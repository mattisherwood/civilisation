import styles from "./Board.module.css"

type Props = {
  children: React.ReactNode
}

export const Board = ({ children }: Props) => (
  <div className={styles.board}>{children}</div>
)
