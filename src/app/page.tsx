"use client"

import { Board } from "@/components/Board/Board"
import { ResourceBar } from "@/components/ResourceBar/ResourceBar"
import { Tile } from "@/components/Tile/Tile"
import Link from "next/link"
import { useState } from "react"
import styles from "./page.module.css"

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
        <h1 className={styles.title}>Civilisation</h1>

        <ResourceBar resources={{ wood, food }} />

        <Board>
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
        </Board>
      </main>

      <footer className={styles.footer}>
        Made by
        <Link
          href='
        https://github.com/mattisherwood/'
        >
          @mattisherwood
        </Link>
      </footer>
    </div>
  )
}
