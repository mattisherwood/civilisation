"use client"

import { Terrain } from "@/types/global"
import Image from "next/image"
import { useState } from "react"
import { Board } from "../Board/Board"
import { Header } from "../Header/Header"
import { HeaderButtons } from "../HeaderButtons/HeaderButtons"
import { ResourceBar } from "../ResourceBar/ResourceBar"
import { Tile } from "../Tile/Tile"
import { View } from "../View/View"
import styles from "./Game.module.css"

type Props = {
  map: Terrain[][]
}

export const Game = ({ map }: Props) => {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("2D")
  const [showResources, setShowResources] = useState(true)
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

  const toggleViewMode = () => setViewMode(viewMode === "3D" ? "2D" : "3D")
  const toggleShowResources = () => setShowResources(!showResources)

  return (
    <>
      <Header>
        <HeaderButtons
          buttons={[
            {
              icon: "🎒",
              onClick: () => toggleShowResources(),
              isActive: showResources,
            },
          ]}
          className={styles.resourceToggle}
        />

        <ResourceBar resources={resources} hidden={!showResources} />

        <h1 className={styles.title}>
          <Image
            className={styles.logo}
            src='icon0.svg'
            width='50'
            height='50'
            alt='Civilisation'
          />
        </h1>

        <HeaderButtons
          align='right'
          buttons={[
            {
              icon: "👁️",
              onClick: () => toggleViewMode(),
            },
          ]}
        />
      </Header>
      <View viewMode={viewMode}>
        <Board
          viewMode={viewMode}
          // cameraPosition={{ x: cameraPosition.x, y: cameraPosition.y }}
        >
          {map.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((terrain, tileIndex) => (
                <Tile
                  key={tileIndex}
                  alterResource={alterResource}
                  initialSlot={
                    rowIndex === 4 && tileIndex === 0 ? "boat" : undefined
                  }
                  resources={resources}
                  terrain={terrain}
                />
              ))}
            </div>
          ))}
        </Board>
      </View>
    </>
  )
}
