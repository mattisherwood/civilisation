"use client"

import { Terrain } from "@/types/global"
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
  const [fish, setFish] = useState(0)
  const [stone, setStone] = useState(0)
  const [wheat, setWheat] = useState(0)
  const [wood, setWood] = useState(0)

  const alterResource = ({
    fish,
    stone,
    wheat,
    wood,
  }: {
    fish?: number
    stone?: number
    wheat?: number
    wood?: number
  }) => {
    if (fish) setFish((prevFish) => prevFish + fish)
    if (stone) setStone((prevStone) => prevStone + stone)
    if (wheat) setWheat((prevWheat) => prevWheat + wheat)
    if (wood) setWood((prevWood) => prevWood + wood)
  }

  return (
    <>
      <Header>
        <ResourceBar resources={{ fish, stone, wheat, wood }} />
        <h1 className={styles.title}>Civilisation</h1>
        <Settings viewMode={viewMode} setViewMode={setViewMode} />
      </Header>
      <View viewMode={viewMode}>
        <Board
          viewMode={viewMode}
          // cameraPosition={{ x: cameraPosition.x, y: cameraPosition.y }}
        >
          {map.map((row, index) => (
            <Row key={index} alterResource={alterResource} terrain={row} />
          ))}
        </Board>
      </View>
    </>
  )
}
