export type Resource =
  | "bread"
  | "fish"
  | "iron"
  | "meat"
  | "stone"
  | "wheat"
  | "wood"
export type Terrain = "forest" | "grass" | "ore" | "sand" | "stone" | "water"
export type SlotName =
  | "boat"
  | "dairyFarm"
  | "lumberyard"
  | "mill"
  | "mine"
  | "quarry"
  | "wheatField"

export type ResourceAmount = {
  [key in Resource]?: number
}

export type Slot = {
  name: SlotName
  icon: string
  availableOn: Terrain[]
  buildCost: ResourceAmount
  salvageValue?: ResourceAmount
  input?: ResourceAmount
  output?: ResourceAmount
}
