"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import styles from "./page.module.css"

type Resource = "wood" | "food"
type Terrain = "water" | "grass" | "stone" | "sand" | "forest"
type SlotName = "farm" | "lumberyard" | "boat"

export default function Home() {
  const [wood, setWood] = useState(0)
  const [food, setFood] = useState(0)

  const alterResource = ({ food, wood }: { food?: number; wood?: number }) => {
    if (food) setFood((prevFood) => prevFood + food)
    if (wood) setWood((prevWood) => prevWood + wood)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Resources</h2>
        <p>Wood: {wood}</p>
        <p>Food: {food}</p>
        <div className={styles.board}>
          <Tile alterResource={alterResource} key={0} terrain='water' />
          <Tile
            alterResource={alterResource}
            key={1}
            terrain='water'
            initialSlot='boat'
          />
          <Tile alterResource={alterResource} key={2} terrain='sand' />
          <Tile alterResource={alterResource} key={3} terrain='stone' />
          <Tile alterResource={alterResource} key={4} terrain='forest' />
          {Array.from({ length: 10 }).map((_, i) => (
            <Tile alterResource={alterResource} key={i + 2} terrain='grass' />
          ))}
          <Tile alterResource={alterResource} key={16} terrain='water' />
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}

export type ResourceAmount = {
  [key in Resource]?: number
}

type Slot = {
  name: SlotName
  icon: string
  availableOn: Terrain[]
  buildCost: ResourceAmount
  salvageValue?: ResourceAmount
  output?: ResourceAmount
}

const terrainOptions: { name: Terrain; color: string; icon: string }[] = [
  { name: "water", color: "#0077be", icon: "🌊" },
  { name: "grass", color: "#00a86b", icon: "" },
  { name: "stone", color: "#a8a8a8", icon: "🪨" },
  { name: "sand", color: "#f0e68c", icon: "" },
  { name: "forest", color: "#228b22", icon: "🌲" },
]

const slotOptions: Slot[] = [
  {
    name: "farm",
    icon: "🧑‍🌾",
    availableOn: ["grass"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { food: 1 },
  },
  {
    name: "lumberyard",
    icon: "🪚",
    availableOn: ["forest"],
    buildCost: { wood: -0.5 },
    salvageValue: { wood: 0.5 },
    output: { wood: 1 },
  },
  {
    name: "boat",
    icon: "🚣",
    availableOn: ["water"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
  },
]

const Tile = ({
  alterResource,
  initialSlot,
  terrain,
}: {
  alterResource: ({ food, wood }: { food?: number; wood?: number }) => void
  initialSlot?: SlotName
  terrain: Terrain
}) => {
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
          <button
            className={styles.button}
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
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => setBuildMenuOpen(!buildMenuOpen)}
          >
            🔨
          </button>
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

const BuildMenu = ({
  availableSlots,
  terrain,
  handleBuild,
}: {
  availableSlots: Slot[]
  terrain: Terrain
  handleBuild: (slot: Slot) => void
}) => {
  return (
    <>
      {slotOptions
        .filter((slot) => slot.availableOn.includes(terrain))
        .map((slot, i) => (
          <button
            className={styles.button}
            key={slot.name}
            onClick={() => handleBuild(slot)}
            style={{
              transformOrigin: "50% calc(50% + 45px)",
              transform: "translateY(-45px) rotate(var(--rotate))",
              "--rotate": `${(i * 360) / availableSlots.length}deg`,
            }}
          >
            <div style={{ transform: "rotate(calc(-1 * var(--rotate)))" }}>
              {slot.icon}
            </div>
          </button>
        ))}
    </>
  )
}
