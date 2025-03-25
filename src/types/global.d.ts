export type Resource = "fish" | "stone" | "wheat" | "wood"
export type Terrain = "water" | "grass" | "stone" | "sand" | "forest"
export type SlotName = "farm" | "lumberyard" | "quarry" | "boat"

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
