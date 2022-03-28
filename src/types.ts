export type State = "todo" | "finished" | "error"
export type MapData = {
    data: any
}
export type ConfigurationData = {
    algorithm: Algorithm
    weightingValues: string
}
export type Algorithm = "Algo1" | "Algo2" | "Algo3"
export type DistrictingData = {
    data: string
}