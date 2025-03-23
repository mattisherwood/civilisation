import { Slot, Terrain } from "./types/global"

export const terrainOptions: { name: Terrain; color: string; icon: string }[] =
  [
    { name: "water", color: "#0077be", icon: "🌊" },
    { name: "grass", color: "#00a86b", icon: "" },
    { name: "stone", color: "#a8a8a8", icon: "🪨" },
    { name: "sand", color: "#f0e68c", icon: "" },
    { name: "forest", color: "#228b22", icon: "🌲" },
  ]

export const slotOptions: Slot[] = [
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
