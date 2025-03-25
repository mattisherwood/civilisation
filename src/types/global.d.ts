export type Resource = "fish" | "iron" | "stone" | "wheat" | "wood"
export type Terrain = "forest" | "grass" | "ore" | "sand" | "stone" | "water"
export type SlotName = "boat" | "farm" | "lumberyard" | "mine" | "quarry"

export type ResourceAmount = {
  [key in Resource]?: number
}

export type Slot = {
  name: SlotName
  icon: string
  availableOn: Terrain[]
  buildCost: ResourceAmount
  salvageValue?: ResourceAmount
  output?: ResourceAmount
}
