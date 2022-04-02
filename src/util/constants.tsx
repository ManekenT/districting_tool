import { Party, Algorithm } from "../types"

export const parties: Party[] = [
    {
        id: 1,
        name: "Yellow Party",
        color: "fill-yellow-500",
    }, {
        id: 2,
        name: "Blue Party",
        color: "fill-blue-500",
    }
]

export const algorithms: Algorithm[] = [{
    name: "Simulated Annealing",
    algorithm: () => [],
},
{
    name: "Anderer Algorithmus",
    algorithm: () => [],
}]