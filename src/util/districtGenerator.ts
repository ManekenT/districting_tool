import { parties } from "../App";
import { Direction, Districts, GeoMap, Votes } from "../types";

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
                party = Math.random() < 0.5 ? parties.blue : parties.yellow;
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

export function getDirectionsOfDistrictBorders(x: number, y: number, districts: Districts, includeMapEdge: boolean = false): Direction[] {
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
    } else if (northId === undefined && includeMapEdge) {
        directions.push("North");
    }
    if (southId !== undefined && southId !== districtId) {
        directions.push("South");
    } else if (southId === undefined && includeMapEdge) {
        directions.push("South");
    }
    if (westId !== undefined && westId !== districtId) {
        directions.push("West");
    } else if (westId === undefined && includeMapEdge) {
        directions.push("West");
    }
    if (eastId !== undefined && eastId !== districtId) {
        directions.push("East");
    } else if (eastId === undefined && includeMapEdge) {
        directions.push("East");
    }
    return directions;
}

function calculateVotesPerDistrict(map: GeoMap, districts: Districts): Map<number, Votes> {
    let votes: Map<number, Votes> = new Map();
    map.forEach((citizenColumn, y) => {
        citizenColumn.forEach((citizen, x) => {
            if (citizen.vote !== undefined) {
                let district = districts[y][x]
                if (!votes.has(district)) {
                    votes.set(district, { yellow: 0, blue: 0 })
                }
                let partyVotes = votes.get(district)!

                if (citizen.vote === parties.blue) {
                    partyVotes.blue++
                } else if (citizen.vote === parties.yellow) {
                    partyVotes.yellow++;
                }
            }
        });
    });
    return votes;
}

function calculateWastedVotesPerDistrict(votes: Map<number, Votes>): Map<number, Votes> {
    let wastedVotes: Map<number, Votes> = new Map();
    Array.from(votes.keys()).forEach((district) => {
        let partyVotes = votes.get(district)!;
        let partyWastedVotes: Votes = { yellow: 0, blue: 0 };
        const totalVotes = partyVotes.blue + partyVotes.yellow
        const threshhold = Math.floor((totalVotes / 2) + 1)
        let winner = partyVotes.blue >= partyVotes.yellow ? parties.blue : parties.yellow;
        if (winner === parties.yellow) {
            partyWastedVotes = {
                yellow: partyVotes.yellow - threshhold,
                blue: partyVotes.blue
            }
        } else if (winner === parties.blue) {
            partyWastedVotes = {
                blue: partyVotes.blue - threshhold,
                yellow: partyVotes.yellow
            }
        }
        wastedVotes.set(district, partyWastedVotes);
    });
    return wastedVotes;
}

function sumDistrictVotes(votesPerDistrict: Map<number, Votes>): Votes {
    let totalVotes: Votes = {
        blue: Array.from(votesPerDistrict.keys()).reduce((a, b) => {
            return a + votesPerDistrict.get(b)!.blue
        }, 0),
        yellow: Array.from(votesPerDistrict.keys()).reduce((a, b) => {
            return a + votesPerDistrict.get(b)!.yellow
        }, 0)
    };
    return totalVotes;
}

export function calculateEfficiencyGap(map: GeoMap, districts: Districts): { gap: number, wastedVotes: Votes } {
    let votes = calculateVotesPerDistrict(map, districts)
    let totalVotes = sumDistrictVotes(votes)
    let totalVoteCount = totalVotes.blue + totalVotes.yellow;
    let wastedVotes = calculateWastedVotesPerDistrict(votes)
    let totalWastedVotes = sumDistrictVotes(wastedVotes)

    let voteDifferences = totalWastedVotes.blue - totalWastedVotes.yellow;

    let efficiencyGap = voteDifferences / totalVoteCount;
    return {
        gap: efficiencyGap,
        wastedVotes: totalWastedVotes
    }
}

export function closerToZero(a: number, b: number): number {
    return Math.abs(b) - Math.abs(a);
}

export function greater(a: number, b: number): number {
    return a - b;
}



