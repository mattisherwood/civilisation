import { Slot } from "@/types/global"
import { Button } from "../IconButton/IconButton"
import styles from "./BuildMenu.module.css"

type Props = {
  availableSlots: Slot[]
  handleBuild: (slot: Slot) => void
}

export const BuildMenu = ({ availableSlots, handleBuild }: Props) => (
  <div className={styles.buildMenu}>
    {availableSlots.map((slot, i) => (
      <Button
        key={slot.name}
        onClick={() => {
          handleBuild(slot)
        }}
        style={{
          transformOrigin: "50% calc(50% + 45px)",
          transform: "translateY(-45px) rotate(var(--rotate))",
          // @ts-expect-error --rotate is a valid CSS variable
          "--rotate": `${(i * 360) / availableSlots.length}deg`,
        }}
      >
        <div style={{ transform: "rotate(calc(-1 * var(--rotate)))" }}>
          {slot.icon}
        </div>
      </Button>
    ))}
  </div>
)
