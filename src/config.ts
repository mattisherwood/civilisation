import { Slot, Terrain } from "./types/global"

export const terrainOptions: { name: Terrain; color: string; icon: string }[] =
  [
    { name: "water", color: "#0077be", icon: "" },
    { name: "grass", color: "#00a86b", icon: "" },
    { name: "stone", color: "#a8a8a8", icon: "🏔️" },
    { name: "ore", color: "#585858", icon: "⛰️" },
    { name: "sand", color: "#f0e68c", icon: "" },
    { name: "forest", color: "#228b22", icon: "🌲" },
  ]

export const resourceOptions: { name: string; icon: string }[] = [
  { name: "bread", icon: "🍞" },
  { name: "fish", icon: "🐟" },
  { name: "iron", icon: "▀" },
  { name: "meat", icon: "🍖" },
  { name: "stone", icon: "🪨" },
  { name: "wheat", icon: "🌾" },
  { name: "wood", icon: "🪵" },
]

export const slotOptions: Slot[] = [
  {
    name: "boat",
    icon: "🚣",
    availableOn: ["water"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { fish: 1 },
  },
  {
    name: "dairyFarm",
    icon: "🐄",
    availableOn: ["grass"],
    buildCost: { wood: -1, wheat: -1 },
    salvageValue: { wood: 0.5 },
    input: { wheat: -3 },
    output: { meat: 1 },
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
    name: "mill",
    icon: "🍞",
    availableOn: ["grass"],
    buildCost: { wood: -1, wheat: -1 },
    salvageValue: { wood: 0.5 },
    input: { wheat: -2 },
    output: { bread: 1 },
  },
  {
    name: "mine",
    icon: "⛏️",
    availableOn: ["ore"],
    buildCost: { stone: -1, wood: -2 },
    salvageValue: { stone: 0.5, wood: 1 },
    output: { iron: 1 },
  },
  {
    name: "quarry",
    icon: "🧨",
    availableOn: ["stone"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { stone: 1 },
  },
  {
    name: "wheatField",
    icon: "🌾",
    availableOn: ["grass"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { wheat: 1 },
  },
]

const randomTerrain = (area: "coastal" | "inland" = "inland"): Terrain => {
  const terrains = {
    inland: [
      ...Array(4).fill("grass"),
      ...Array(3).fill("forest"),
      "stone",
      "ore",
      "water",
    ],
    coastal: ["water", "grass", ...Array(8).fill("sand")],
  }

  return terrains[area][Math.floor(Math.random() * 10)]
}

export const map: Terrain[][] = [
  [null, null, ...Array(10).fill("water"), null, null],
  [
    null,
    ...Array(2).fill("water"),
    ...Array.from({ length: 8 }, () => randomTerrain("coastal")),
    ...Array(2).fill("water"),
    ,
    null,
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    ...Array(1).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 10 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(1).fill("water"),
  ],
  [
    ...Array(1).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 10 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(1).fill("water"),
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    null,
    ...Array(2).fill("water"),
    ...Array.from({ length: 8 }, () => randomTerrain("coastal")),
    ...Array(2).fill("water"),
    null,
  ],
  [null, null, ...Array(10).fill("water"), null, null],
]
