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

export function findNeighboursRecursive(districts: DistrictSchema, coordinate: Coordinate, knownCoordinates: Coordinate[]) {
    const x = coordinate.x;
    const y = coordinate.y;
    const districtId = districts.get(coordinate)
    const coordNorth = { x: x, y: y - 1 };
    const coordSouth = { x: x, y: y + 1 }
    const coordWest = { x: x - 1, y: y }
    const coordEast = { x: x + 1, y: y }
    let northId;
    let southId;
    let westId;
    let eastId;
    if (y > 0) {
        northId = districts.get(coordNorth)
    }
    if (y < districts.height - 1) {
        southId = districts.get(coordSouth)
    }
    if (x > 0) {
        westId = districts.get(coordWest)
    }
    if (x < districts.width - 1) {
        eastId = districts.get(coordEast)
    }
    if (knownCoordinates.find((element) => element.x === x && element.y === y)) {
        return;
    }
    knownCoordinates.push(coordinate);
    if (northId !== undefined && northId === districtId) {
        findNeighboursRecursive(districts, coordNorth, knownCoordinates)
    }
    if (southId !== undefined && southId === districtId) {
        findNeighboursRecursive(districts, coordSouth, knownCoordinates);
    }
    if (westId !== undefined && westId === districtId) {
        findNeighboursRecursive(districts, coordWest, knownCoordinates);
    }
    if (eastId !== undefined && eastId === districtId) {
        findNeighboursRecursive(districts, coordEast, knownCoordinates);
    }
}
