import clsx from "clsx"
import styles from "./Board.module.css"

type Props = {
  children: React.ReactNode
  viewMode: "2D" | "3D"
  cameraPosition?: { x: number; y: number }
}

export const Board = ({ children, viewMode, cameraPosition }: Props) => (
  <div className={clsx(styles.board, viewMode === "3D" && styles.with3D)}>
    {children}
  </div>
)
