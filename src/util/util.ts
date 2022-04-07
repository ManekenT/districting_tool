import { DistrictSchema } from "../classes/DistrictSchema";
import { Coordinate, WeightingValues } from "../types";

export function toPercentString(number: number): string {
    return `${number * 100} %`
}

export function getRandomPoint(width: number, height: number): Coordinate {
    return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)

    }
}

export function deepCopyArray(districts: DistrictSchema): DistrictSchema {
    let deepCopy: number[][] = [];
    districts.forEach((id, coordinate) => {
        if (deepCopy[coordinate.y] === undefined) {
            deepCopy[coordinate.y] = []
        }
        deepCopy[coordinate.y][coordinate.x] = id;
    });
    return new DistrictSchema(districts.width, districts.height, deepCopy);
}

export function decimalToPercentString(number?: number): string {
    if (number === undefined) {
        return "";
    }
    return Math.abs((number * 100)).toFixed(4) + " %";
}

export function closerToZero(a: number, b: number): number {
    return Math.abs(b) - Math.abs(a);
}

export function greater(a: number, b: number): number {
    return a - b;
}

export function weightingValuesNonZero(weighting: WeightingValues) {
    return weighting.compactness !== 0 || weighting.populationEquality !== 0
}
