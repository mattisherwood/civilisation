"use client"

import { Terrain } from "@/types/global"
import Image from "next/image"
import { useState } from "react"
import { Board } from "../Board/Board"
import { Header } from "../Header/Header"
import { ResourceBar } from "../ResourceBar/ResourceBar"
import { Row } from "../Row/Row"
import { Settings } from "../Settings/Settings"
import { View } from "../View/View"
import styles from "./Game.module.css"

type Props = {
  map: Terrain[][]
}

export const Game = ({ map }: Props) => {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("2D")
  const [bread, setBread] = useState(0)
  const [fish, setFish] = useState(0)
  const [iron, setIron] = useState(0)
  const [meat, setMeat] = useState(0)
  const [stone, setStone] = useState(0)
  const [wheat, setWheat] = useState(0)
  const [wood, setWood] = useState(0)
  const resources = { bread, fish, iron, meat, stone, wheat, wood }

  const alterResource = ({
    bread,
    fish,
    iron,
    meat,
    stone,
    wheat,
    wood,
  }: {
    bread?: number
    fish?: number
    iron?: number
    meat?: number
    stone?: number
    wheat?: number
    wood?: number
  }) => {
    if (bread) setBread((prevBread) => prevBread + bread)
    if (fish) setFish((prevFish) => prevFish + fish)
    if (iron) setIron((prevIron) => prevIron + iron)
    if (meat) setMeat((prevMeat) => prevMeat + meat)
    if (stone) setStone((prevStone) => prevStone + stone)
    if (wheat) setWheat((prevWheat) => prevWheat + wheat)
    if (wood) setWood((prevWood) => prevWood + wood)
  }

  return (
    <>
      <Header>
        <ResourceBar resources={resources} />
        <h1 className={styles.title}>
          <Image
            style={{ marginBottom: -22 }}
            src='icon0.svg'
            width='50'
            height='50'
            alt='Civilisation'
          />
        </h1>
        <Settings viewMode={viewMode} setViewMode={setViewMode} />
      </Header>
      <View viewMode={viewMode}>
        <Board
          viewMode={viewMode}
          // cameraPosition={{ x: cameraPosition.x, y: cameraPosition.y }}
        >
          {map.map((row, index) => (
            <Row
              key={index}
              alterResource={alterResource}
              rowIndex={index}
              resources={resources}
              terrain={row}
            />
          ))}
        </Board>
      </View>
    </>
  )
}
