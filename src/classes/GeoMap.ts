import { Citizen, Coordinate } from "../types";
import { Parties } from "./Parties";

export class GeoMap {

    citizenMap: Citizen[][];
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.citizenMap = this.generateMap(width, height);
        this.width = width;
        this.height = height;
    }

    generateMap(width: number, height: number): Citizen[][] {
        var citizens: Citizen[][] = [];
        for (let y = 0; y < height; y++) {
            let citizenColumn = [];
            for (let x = 0; x < width; x++) {
                let isVoter = Math.random() < 0.9;
                let party;
                if (isVoter) {
                    party = Math.random() < 0.5 ? Parties.blue : Parties.yellow;
                }
                citizenColumn[x] = {
                    id: y * width + x,
                    vote: party
                }
            }
            citizens[y] = citizenColumn;
        }
        return citizens;
    }

    get(coordinate: Coordinate): Citizen {
        return this.citizenMap[coordinate.y][coordinate.x]
    }

    forEach(func: (citizen: Citizen, coordinate: Coordinate) => void) {
        this.citizenMap.forEach((citizenColumn, y) => {
            citizenColumn.forEach((citizen, x) => {
                func(citizen, { x: x, y: y });
            })
        })
    }

    map(func: (citizen: Citizen, coordinate: Coordinate) => any) {
        return this.citizenMap.map((citizenColumn, y) => {
            return citizenColumn.map((citizen, x) => {
                return func(citizen, { x: x, y: y });
            })
        })
    }
}