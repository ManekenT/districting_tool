export type GeoMap = Citizen[][]

export type Citizen = {
    id: number
    vote?: Party
}

export type Party = {
    name: string
    color: string
}

export type Districts = number[][]

export type Configuration = {
    algorithm?: Algorithm
    weightingValues: WeightingValues
}

export type Algorithm = {
    name: string
    algorithm: (mapData: GeoMap) => Citizen[][]
}

export type WeightingValues = {
    compactness: number
    populationEquality: number
}

export type Direction = "North" | "South" | "East" | "West"

