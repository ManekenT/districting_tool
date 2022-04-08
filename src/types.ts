import { DistrictSchema } from "./classes/DistrictSchema"

export type Coordinate = {
    x: number,
    y: number
}

export type Citizen = {
    id: number
    vote?: Party
}

export type Party = {
    name: string
    color: string
}

export type Parties = {
    yellow: Party
    blue: Party
}

export type Votes = {
    [Property in keyof Parties]: number
}

export type Algorithm = {
    name: string
    algorithm: (districstOld: DistrictSchema, weighting: WeightingValues, constraints: Constraints) => DistrictSchema
}

export type WeightingValues = {
    compactness: number
    populationEquality: number
}

export type Constraints = {
    contiguity: boolean
    keepDistrictCount: boolean
}

export type Direction = "North" | "South" | "East" | "West"
