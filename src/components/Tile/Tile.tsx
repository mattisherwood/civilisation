import { slotOptions, terrainOptions } from "@/config"
import { Slot, SlotName, Terrain } from "@/types/global"
import { useRef, useState } from "react"
import { BuildMenu } from "../BuildMenu/BuildMenu"
import { Button } from "../IconButton/IconButton"
import styles from "./Tile.module.css"

type Props = {
  alterResource: ({ food, wood }: { food?: number; wood?: number }) => void
  initialSlot?: SlotName
  terrain: Terrain
}

export const Tile = ({ alterResource, initialSlot, terrain }: Props) => {
  const [slot, setSlot] = useState<Slot | undefined>(
    slotOptions.find(({ name }) => name === initialSlot)
  )
  const [buildMenuOpen, setBuildMenuOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const availableSlots = slotOptions.filter(({ availableOn }) =>
    availableOn.includes(terrain)
  )

  return (
    <div
      className={styles.tile}
      style={{
        backgroundColor: terrainOptions.find(
          (terrainOption) => terrainOption.name === terrain
        )?.color,
      }}
      onMouseLeave={() => {
        setBuildMenuOpen(false)
      }}
    >
      {availableSlots.length ? (
        slot ? (
          <Button
            onClick={() => {
              alterResource(slot.salvageValue || {})
              setSlot(undefined)
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
              }
            }}
          >
            ❌
          </Button>
        ) : (
          <Button onClick={() => setBuildMenuOpen(!buildMenuOpen)}>🔨</Button>
        )
      ) : null}
      {buildMenuOpen && (
        <BuildMenu
          availableSlots={availableSlots}
          terrain={terrain}
          handleBuild={(slot) => {
            alterResource(slot.buildCost || {})
            setSlot(slot)
            intervalRef.current = setInterval(() => {
              alterResource(slot.output || {})
            }, 1000)
            setBuildMenuOpen(false)
          }}
        />
      )}
      {
        terrainOptions.find((terrainOption) => terrainOption.name === terrain)
          ?.icon
      }
      {slot && <h2 style={{ fontSize: "4rem" }}>{slot.icon}</h2>}
    </div>
  )
}
