export type Resource = "wood" | "food"
export type Terrain = "water" | "grass" | "stone" | "sand" | "forest"
export type SlotName = "farm" | "lumberyard" | "boat"

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
