export type State = "todo" | "finished" | "error"

export type ConfigurationData = {
    algorithm: Algorithm
    weightingValues: string
}

export type Algorithm = "Algo1" | "Algo2" | "Algo3"

export type DistrictingData = {
    data: string
}
export type MapData = {
    citizens: Citizen[][]
}

export type Party = {
    name: string
    color: string
    borderColor: string
}

export type Citizen = {
    id: number
    vote: Party
    districId?: number
}

export type Direction = "North" | "South" | "East" | "West"