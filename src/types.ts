import { DistrictSchema } from "./classes/DistrictSchema"
import { GeoMap } from "./classes/GeoMap"

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
    algorithm: (map: GeoMap, districstOld: DistrictSchema, weighting: WeightingValues, constraints: Constraints) => DistrictSchema
}

export type WeightingValues = {
    compactness: number
    populationEquality: number,
    efficiencyGap: number
}

export type Constraints = {
    contiguity: boolean
    keepDistrictCount: boolean
}

export type Direction = (coordinate: Coordinate) => Coordinate
