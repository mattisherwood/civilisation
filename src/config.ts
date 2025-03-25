import { Slot, Terrain } from "./types/global"

export const terrainOptions: { name: Terrain; color: string; icon: string }[] =
  [
    { name: "water", color: "#0077be", icon: "" },
    { name: "grass", color: "#00a86b", icon: "" },
    { name: "stone", color: "#a8a8a8", icon: "🪨" },
    { name: "sand", color: "#f0e68c", icon: "" },
    { name: "forest", color: "#228b22", icon: "🌲" },
  ]

export const resourceOptions: { name: string; icon: string }[] = [
  { name: "fish", icon: "🐟" },
  { name: "stone", icon: "🪨" },
  { name: "wheat", icon: "🌾" },
  { name: "wood", icon: "🪵" },
]

export const slotOptions: Slot[] = [
  {
    name: "farm",
    icon: "🧑‍🌾",
    availableOn: ["grass"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { wheat: 1 },
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
    name: "quarry",
    icon: "⛏️",
    availableOn: ["stone"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { stone: 1 },
  },
  {
    name: "boat",
    icon: "🚣",
    availableOn: ["water"],
    buildCost: { wood: -1 },
    salvageValue: { wood: 0.5 },
    output: { fish: 1 },
  },
]

const randomTerrain = (area: "coastal" | "inland" = "inland"): Terrain => {
  const terrains = {
    inland: [
      ...Array(5).fill("grass"),
      ...Array(3).fill("forest"),
      "stone",
      "water",
    ],
    coastal: ["water", "stone", "grass", ...Array(7).fill("sand")],
  }

  return terrains[area][Math.floor(Math.random() * 10)]
}

export const map: Terrain[][] = [
  Array(14).fill("water"),
  [
    ...Array(3).fill("water"),
    ...Array.from({ length: 8 }, () => randomTerrain("coastal")),
    ...Array(3).fill("water"),
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    ...Array(2).fill("water"),
    randomTerrain("coastal"),
    ...Array.from({ length: 8 }, () => randomTerrain()),
    randomTerrain("coastal"),
    ...Array(2).fill("water"),
  ],
  [
    ...Array(3).fill("water"),
    ...Array.from({ length: 8 }, () => randomTerrain("coastal")),
    ...Array(3).fill("water"),
  ],
  Array(14).fill("water"),
]
