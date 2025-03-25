import { Game } from "@/components/Game/Game"
import { map } from "@/config"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <Game map={map} />
    </div>
  )
}
