import { Terrain } from "@/types/global"
import { Tile } from "../Tile/Tile"
import styles from "./Row.module.css"

type Props = {
  alterResource: ({ food, wood }: { food?: number; wood?: number }) => void
  terrain: Terrain[]
}

export const Row = ({ alterResource, terrain }: Props) => (
  <div className={styles.row} style={{ transformStyle: "preserve-3d" }}>
    {terrain.map((t, index) =>
      t ? (
        <Tile alterResource={alterResource} key={index} terrain={t} />
      ) : (
        <Spacer key={index} />
      )
    )}
  </div>
)

const Spacer = () => (
  <div
    style={{
      width: "var(--tileSize)",
      height: "var(--tileSize)",
      flex: "0 0 var(--tileSize)",
    }}
  />
)
