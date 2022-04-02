import { parties } from "../App";
import { GeoMap, Direction, Party, Districts } from "../types";



export function generateInitialDistricts(map: GeoMap): Districts {
    let districts: Districts = []
    map.forEach((citizenColumn, y) => {
        let districtColumn: number[] = []
        citizenColumn.forEach((citizen, x) => {
            if (x >= 4 && y >= 3) {
                districtColumn[x] = 2;
            } else if (x < 2 && y < 3) {
                districtColumn[x] = 0;
            } else {
                districtColumn[x] = 1;
            }
        })
        districts[y] = districtColumn;
    })
    return districts;
}

export function generateMap(width: number, height: number): GeoMap {
    var citizens: GeoMap = [];
    for (let y = 0; y < height; y++) {
        let citizenRow = [];
        for (let x = 0; x < width; x++) {
            let isVoter = Math.random() < 0.9;
            let party;
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

export function getDirectionsOfDistrictBorders(x: number, y: number, districts: Districts): Direction[] {
    let directions: Direction[] = [];
    const districtId = districts[y][x];
    let northId;
    let southId;
    let westId;
    let eastId;
    if (y > 0) {
        northId = districts[y - 1][x]
    }
    if (y < districts.length - 1) {
        southId = districts[y + 1][x]
    }
    if (x > 0) {
        westId = districts[y][x - 1]
    }
    if (x < districts[0].length - 1) {
        eastId = districts[y][x + 1]

    }
    if (northId !== undefined && northId !== districtId) {
        directions.push("North");
    }
    if (southId !== undefined && southId !== districtId) {
        directions.push("South");
    }
    if (westId !== undefined && westId !== districtId) {
        directions.push("West");
    }
    if (eastId !== undefined && eastId !== districtId) {
        directions.push("East");
    }
    return directions;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function calculateVotesPerDistrict(map: GeoMap, districts: Districts): Map<Party, Map<number, number>> {
    let votes: Map<Party, Map<number, number>> = new Map();
    map.forEach((citizenColumn, y) => {
        citizenColumn.forEach((citizen, x) => {
            if (citizen.vote !== undefined) {
                // has party been voted for yet?
                if (!votes.has(citizen.vote)) {
                    votes.set(citizen.vote, new Map())
                }
                let voteMap = votes.get(citizen.vote)!;

                let district = districts[y][x]
                if (!voteMap.has(district)) {
                    voteMap.set(district, 0)
                }
                let voteCount = voteMap.get(district)!
                voteMap.set(district, voteCount + 1)
            }
        });
    });
    return votes;
}

function calculateWastedVotesPerDistrict(votes: Map<Party, Map<number, number>>): Map<Party, Map<number, number>> {
    let partyVotes: Map<Party, number> = new Map();
    votes.forEach((value, key) => {
        partyVotes.set(key, Array.from(value.values()).reduce((i, j) => { return i + j }, 0))
    })
    let winner = Array.from(partyVotes.keys()).reduce((a, b) => { return partyVotes.get(a)! > partyVotes.get(b)! ? a : b });
    console.log(winner);
    const totalVotes = Array.from(partyVotes.values()).reduce((a, b) => { return a + b });
    const threshhold = Math.floor(totalVotes / votes.keys.length) + 1 // or divide by 2?
    let wastedVotes: Map<Party, Map<number, number>> = new Map();

    return wastedVotes;
}

export function calculateEfficiencyGap(map: GeoMap, districts: Districts) {
    console.log(map);
    console.log(districts);
    let votes = calculateVotesPerDistrict(map, districts)
    console.log(votes);

    //let votes = calculateVotes(districts);
    //let wastedVotes: number[][] = [];
    //votes.forEach((votesInDistrict, index) => {
    //wastedVotes[index.] = calculateWastedVotes(votesInDistrict);
    //});
    //console.log(votes)
    //console.log(wastedVotes)
}