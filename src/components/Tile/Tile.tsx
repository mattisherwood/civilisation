import { resourceOptions, slotOptions, terrainOptions } from "@/config"
import {
  Resource,
  ResourceAmount,
  Slot,
  SlotName,
  Terrain,
} from "@/types/global"
import clsx from "clsx"
import { Fragment, useRef, useState } from "react"
import { BuildMenu } from "../BuildMenu/BuildMenu"
import { Button } from "../IconButton/IconButton"
import styles from "./Tile.module.css"

type Props = {
  alterResource: ({ food, wood }: { food?: number; wood?: number }) => void
  initialSlot?: SlotName
  resources: ResourceAmount
  terrain: Terrain | null
}

const canBuildHere = (slot: Slot, terrain: Terrain) =>
  slot.availableOn.includes(terrain)

const canAffordToBuild = (slot: Slot, resources: ResourceAmount) =>
  Object.entries(slot.buildCost || {}).every(
    ([resource, cost]) => (resources[resource as Resource] || 0) >= cost * -1
  )

export const Tile = ({
  alterResource,
  initialSlot,
  resources,
  terrain,
}: Props) => {
  if (!terrain) return <div className={styles.spacer} />
  const [slot, setSlot] = useState<Slot | undefined>(
    slotOptions.find(({ name }) => name === initialSlot)
  )
  const [buildStatus, setBuildStatus] = useState<number>(initialSlot ? 100 : 0)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [buildMenuOpen, setBuildMenuOpen] = useState(false)
  const [visibleOutput, setVisibleOutput] = useState<boolean>(false)

  const producingInterval = useRef<NodeJS.Timeout | null>(null)
  const buildingInterval = useRef<NodeJS.Timeout | null>(null)

  const getCurrentResources = () => resources

  const startProduction = (
    slot: Slot,
    getCurrentResources: () => ResourceAmount
  ) => {
    producingInterval.current = setInterval(() => {
      const currentResources = getCurrentResources()
      const canAffordInput = Object.entries(slot.input || {}).every(
        ([resource, cost]) => {
          console.log(
            `${currentResources[resource as Resource]} is ${
              (currentResources[resource as Resource] || 0) >= cost * -1
                ? ""
                : "not "
            }bigger or equal to ${cost * -1}`
          )
          return (currentResources[resource as Resource] || 0) >= cost * -1
          // TODO: The problem with this is that it uses the value of resources when the interval was started, not the current value
          // The solution is to use a ref to store the current value of resources
          // and update it every time the resources change
          // This should be done in the parent component
        }
      )
      if (canAffordInput) {
        alterResource(slot.input || {})
        alterResource(slot.output || {})
        showOutput()
      }
    }, 2000)
  }
  const stopProduction = () => {
    if (producingInterval.current) {
      clearInterval(producingInterval.current)
      producingInterval.current = null
    }
  }
  const startBuilding = (slot: Slot) => {
    alterResource(slot.buildCost || {})
    setSlot(slot)
    if (buildingInterval.current === null)
      buildingInterval.current = setInterval(() => {
        setBuildStatus((prev) => {
          if (prev >= 99) {
            startProduction(slot, getCurrentResources)
            stopBuilding()
            return 100
          }
          return (prev || 0) + 1
        })
      }, 100)
  }
  const stopBuilding = () => {
    if (buildingInterval.current) {
      clearInterval(buildingInterval.current)
      buildingInterval.current = null
    }
  }

  const terrainIcon = terrainOptions.find(
    (terrainOption) => terrainOption.name === terrain
  )?.icon

  const availableSlots = slotOptions
    .filter((slot) => canBuildHere(slot, terrain))
    .filter((slot) => canAffordToBuild(slot, resources))

  const showOutput = () => {
    setVisibleOutput(true)
    setTimeout(() => {
      setVisibleOutput(false)
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
        {slot ? (
          <>
            <h2 className={styles.object}>
              {buildStatus < 100 ? <>🏗</> : slot.icon}
            </h2>
            {buildStatus < 100 && (
              <progress
                className={styles.progress}
                value={buildStatus}
                max={100}
              />
            )}
          </>
        ) : (
          terrainIcon && <h2 className={styles.object}>{terrainIcon}</h2>
        )}
        {slot && visibleOutput && <OutputPinger output={slot.output || {}} />}
        {buildMenuOpen && (
          <BuildMenu
            availableSlots={availableSlots}
            handleBuild={(slot) => {
              startBuilding(slot)
              setBuildMenuOpen(false)
              setButtonVisible(false)
            }}
          />
        )}
        {slot && buttonVisible && (
          <Button
            onClick={() => {
              alterResource(slot.salvageValue || {})
              setSlot(undefined)
              stopBuilding()
              setBuildStatus(0)
              stopProduction()
            }}
          >
            ❌
          </Button>
        )}
        {!slot && availableSlots.length && buttonVisible ? (
          <Button onClick={() => setBuildMenuOpen(!buildMenuOpen)}>🔨</Button>
        ) : null}
      </div>
    </div>
  )
}

const OutputPinger = ({ output }: { output: ResourceAmount }) => (
  <div className={styles.output}>
    {Object.keys(output).map((resource) => (
      <Fragment key={resource}>
        {resourceOptions.find(({ name }) => name === resource)?.icon}
      </Fragment>
    ))}
  </div>
)
