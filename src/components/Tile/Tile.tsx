import { resourceOptions, slotOptions, terrainOptions } from "@/config"
import { ResourceAmount, Slot, SlotName, Terrain } from "@/types/global"
import clsx from "clsx"
import { Fragment, useRef, useState } from "react"
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
  const [buildStatus, setBuildStatus] = useState<number | undefined>()
  const [buttonVisible, setButtonVisible] = useState(false)
  const [buildMenuOpen, setBuildMenuOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [output, setOutput] = useState<boolean>(false)

  const terrainIcon = terrainOptions.find(
    (terrainOption) => terrainOption.name === terrain
  )?.icon

  const availableSlots = slotOptions.filter(({ availableOn }) =>
    availableOn.includes(terrain)
  )

  const showOutput = () => {
    setOutput(true)
    setTimeout(() => {
      setOutput(false)
    }, 900)
  }

  return (
    <div
      className={clsx(styles.tile, styles[terrain])}
      onMouseEnter={() => {
        setButtonVisible(true)
      }}
      onMouseLeave={() => {
        setButtonVisible(false)
        setBuildMenuOpen(false)
      }}
    >
      <div className={styles.slot}>
        {slot || buildStatus !== undefined ? (
          slot ? (
            <h2 className={styles.object}>{slot.icon}</h2>
          ) : (
            <>
              <h2 className={styles.object}>🏗</h2>
              <progress
                className={styles.progress}
                value={buildStatus}
                max={100}
              />
            </>
          )
        ) : (
          terrainIcon && <h2 className={styles.object}>{terrainIcon}</h2>
        )}
        {availableSlots.length && buttonVisible ? (
          <Button
            onClick={
              slot
                ? () => {
                    alterResource(slot.salvageValue || {})
                    setSlot(undefined)
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current)
                      intervalRef.current = null
                    }
                  }
                : () => setBuildMenuOpen(!buildMenuOpen)
            }
            className={styles.button}
          >
            {slot ? <>❌</> : <>🔨</>}
          </Button>
        ) : null}
        {slot && output && <Output output={slot.output || {}} />}
        {buildMenuOpen && (
          <BuildMenu
            availableSlots={availableSlots}
            terrain={terrain}
            handleBuild={(slot) => {
              alterResource(slot.buildCost || {})
              setBuildStatus(0)
              const interval = setInterval(
                () => setBuildStatus((prev) => (prev || 0) + 1),
                100
              )
              setTimeout(() => {
                clearInterval(interval)
                setBuildStatus(undefined)
                setSlot(slot)
                intervalRef.current = setInterval(() => {
                  alterResource(slot.output || {})
                  showOutput()
                }, 2000)
              }, 10000)
              setBuildMenuOpen(false)
              setButtonVisible(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

const Output = ({ output }: { output: ResourceAmount }) => (
  <div className={styles.output}>
    {Object.keys(output).map((resource) => (
      <Fragment key={resource}>
        {resourceOptions.find(({ name }) => name === resource)?.icon}
      </Fragment>
    ))}
  </div>
)
