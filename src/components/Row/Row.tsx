import { ResourceAmount, Terrain } from "@/types/global"
import { Tile } from "../Tile/Tile"
import styles from "./Row.module.css"

type Props = {
  alterResource: ({ food, wood }: { food?: number; wood?: number }) => void
  rowIndex: number
  resources: ResourceAmount
  terrain: Terrain[]
}

export const Row = ({ alterResource, rowIndex, resources, terrain }: Props) => (
  <div className={styles.row} style={{ transformStyle: "preserve-3d" }}>
    {terrain.map((t, tileIndex) =>
      t ? (
        <Tile
          key={tileIndex}
          alterResource={alterResource}
          initialSlot={rowIndex === 4 && tileIndex === 0 ? "boat" : undefined}
          resources={resources}
          terrain={t}
        />
      ) : (
        <Spacer key={tileIndex} />
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
