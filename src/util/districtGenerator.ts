import { DistrictSchema } from "../classes/DistrictSchema";
import { GeoMap } from "../classes/Map";
import { Parties } from "../classes/Parties";
import { Coordinate, Direction, Votes } from "../types";

export function getDirectionsOfDistrictBorders(coordinate: Coordinate, districts: DistrictSchema, includeMapEdge: boolean = false): Direction[] {
    let directions: Direction[] = [];
    let x = coordinate.x
    let y = coordinate.y
    const districtId = districts.get(coordinate);
    const coordNorth = { x: x, y: y - 1 };
    const coordSouth = { x: x, y: y + 1 }
    const coordWest = { x: x - 1, y: y }
    const coordEast = { x: x + 1, y: y }
    let northId;
    let southId;
    let westId;
    let eastId;
    if (y > 0) {
        northId = districts.get(coordNorth);
    }
    if (y < districts.height - 1) {
        southId = districts.get(coordSouth);
    }
    if (x > 0) {
        westId = districts.get(coordWest)
    }
    if (x < districts.width - 1) {
        eastId = districts.get(coordEast);
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

export function calculateVotesPerDistrict(map: GeoMap, districts: DistrictSchema): Map<number, Votes> {
    let votes: Map<number, Votes> = new Map();
    map.forEach((citizen, coordinate) => {
        if (citizen.vote !== undefined) {
            let district = districts.get(coordinate)
            if (!votes.has(district)) {
                votes.set(district, { yellow: 0, blue: 0 })
            }
            let partyVotes = votes.get(district)!

            if (citizen.vote === Parties.blue) {
                partyVotes.blue++
            } else if (citizen.vote === Parties.yellow) {
                partyVotes.yellow++;
            }
        }
    });
    return votes;
}

export function calculateWastedVotesPerDistrict(votes: Map<number, Votes>): Map<number, Votes> {
    let wastedVotes: Map<number, Votes> = new Map();
    Array.from(votes.keys()).forEach((district) => {
        let partyVotes = votes.get(district)!;
        let partyWastedVotes: Votes = { yellow: 0, blue: 0 };
        const totalVotes = partyVotes.blue + partyVotes.yellow
        const threshhold = Math.floor((totalVotes / 2) + 1)
        let winner = partyVotes.blue >= partyVotes.yellow ? Parties.blue : Parties.yellow;
        if (winner === Parties.yellow) {
            partyWastedVotes = {
                yellow: partyVotes.yellow - threshhold,
                blue: partyVotes.blue
            }
        } else if (winner === Parties.blue) {
            partyWastedVotes = {
                blue: partyVotes.blue - threshhold,
                yellow: partyVotes.yellow
            }
        }
        wastedVotes.set(district, partyWastedVotes);
    });
    return wastedVotes;
}

export function sumDistrictVotes(votesPerDistrict: Map<number, Votes>): Votes {
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






