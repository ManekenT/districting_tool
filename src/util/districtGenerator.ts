import { MapData, Party, Citizen, Direction } from "../types";

export const parties: Party[] = [
    {
        name: "Yellow Party",
        color: "bg-yellow-500",
        borderColor: "border-yellow-500"
    }, {
        name: "Blue Party",
        color: "bg-blue-500",
        borderColor: "border-blue-500"
    }
]

export const noVote: Party = {
    name: "No Party",
    color: "bg-slate-500",
    borderColor: "border-slate-500"
}

function generateInitialDistricts(citizens: Citizen[][]) {
    return citizens.map((citizenColumn, y) => {
        return citizenColumn.map((citizen, x) => {
            if (x >= 4 && y >= 3) {
                citizen.districId = 0;
            } else if (x < 2 && y < 3) {
                citizen.districId = 2;
            } else {
                citizen.districId = 1;
            }
            return citizen;
        })
    })
}

function generateCitizens(width: number, height: number): Citizen[][] {
    var citizens: Citizen[][] = [];
    for (let y = 0; y < height; y++) {
        let citizenRow = [];
        for (let x = 0; x < width; x++) {
            let isVoter = Math.random() < 0.9;
            let party = noVote;
            if (isVoter) {
                party = parties[getRandomInt(parties.length)];
            }
            citizenRow[x] = {
                id: y * width + x,
                vote: party
            }
        }
        citizens[y] = citizenRow;
    }
    return citizens;
}

export function generateMap(width: number, height: number): MapData {
    let citizens = generateCitizens(width, height);
    let citizensWithDistricts = generateInitialDistricts(citizens);

    return {
        citizens: citizensWithDistricts,
    };
}

export function getDirectionsOfDistrictBorders(x: number, y: number, mapData: MapData): Direction[] {
    let directions: Direction[] = [];
    const citizens = mapData.citizens;
    const citizen = citizens[y][x];
    let northId;
    let southId;
    let westId;
    let eastId;
    if (y > 0) {
        northId = citizens[y - 1][x].districId
    }
    if (y < citizens.length - 1) {
        southId = citizens[y + 1][x].districId
    }
    if (x > 0) {
        westId = citizens[y][x - 1].districId
    }
    if (x < citizens[0].length - 1) {
        eastId = citizens[y][x + 1].districId

    }
    if (northId !== undefined && northId !== citizen.districId) {
        directions.push("North");
    }
    if (southId !== undefined && southId !== citizen.districId) {
        directions.push("South");
    }
    if (westId !== undefined && westId !== citizen.districId) {
        directions.push("West");
    }
    if (eastId !== undefined && eastId !== citizen.districId) {
        directions.push("East");
    }
    return directions;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
