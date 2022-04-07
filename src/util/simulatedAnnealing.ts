import { DistrictSchema } from '../classes/DistrictSchema';
import { Constraints, Coordinate, WeightingValues } from '../types';
import { getDirectionsOfDistrictBorders } from './districtGenerator';
import { compactness, populationEquality } from './objectives';
import { deepCopyArray, getRandomPoint } from './util';

export function doSimulatedAnnealing(initialDistricts: DistrictSchema, weightingValues: WeightingValues, constraints: Constraints): DistrictSchema {
    var simulatedAnnealing = require('simulated-annealing');
    let districtIdSet = new Set();
    let populationSize = initialDistricts.width * initialDistricts.height
    initialDistricts.forEach((id) => {
        districtIdSet.add(id);
    })
    let expectedPopulation = populationSize / districtIdSet.size;
    let result = simulatedAnnealing({
        initialState: initialDistricts,
        tempMax: 15,
        tempMin: 0.001,
        newState: (districts: DistrictSchema) => newState(districts, constraints),
        getTemp: getTemp,
        getEnergy: (districts: DistrictSchema) => getEnergy(districts, weightingValues, expectedPopulation),
    });
    return result;
}

function getEnergy(districts: DistrictSchema, weightingValues: WeightingValues, expectedPopulation: number) {
    let populationEqualityValue = populationEquality(districts, expectedPopulation);
    let compactnessValue = compactness(districts);
    let energy = weightingValues.populationEquality * populationEqualityValue + weightingValues.compactness * compactnessValue;
    return energy;
}

function newState(oldDistricts: DistrictSchema, constraints: Constraints): DistrictSchema {
    let districts = deepCopyArray(oldDistricts);
    let randomPoint = getRandomPoint(districts.width, districts.height);
    let neighbourPoint = { x: 0, y: 0 };
    let neighbourDirections = getDirectionsOfDistrictBorders(randomPoint, districts)

    if (neighbourDirections.length !== 0) {
        let randomDirection = neighbourDirections[Math.floor(Math.random() * neighbourDirections.length)]

        if (randomDirection === "North") {
            neighbourPoint = { x: randomPoint.x, y: randomPoint.y - 1 }
        } else if (randomDirection === "South") {
            neighbourPoint = { x: randomPoint.x, y: randomPoint.y + 1 }
        } else if (randomDirection === "West") {
            neighbourPoint = { x: randomPoint.x - 1, y: randomPoint.y }
        } else if (randomDirection === "East") {
            neighbourPoint = { x: randomPoint.x + 1, y: randomPoint.y }
        }

        let districtId = districts.get(randomPoint);
        let neighbourId = districts.get(neighbourPoint)
        districts.set(randomPoint, neighbourId);
        let valid = checkConstraints(districts, constraints);
        if (!valid) {
            //reset ID
            districts.set(randomPoint, districtId)
        }
    }
    return districts;
}

function getTemp(prevTemperature: number) {
    return prevTemperature - 0.001;
}

function checkConstraints(districts: DistrictSchema, constraints: Constraints): boolean {
    let districtSizes = getDistrictSizes(districts);

    let contiguity = true;
    if (constraints.contiguity) {
        let districtsChecked: Map<number, boolean> = new Map();

        for (let y = 0; y < districts.height; y++) {
            for (let x = 0; x < districts.width; x++) {
                let coordinate = { x: x, y: y }
                let id = districts.get(coordinate)
                let checked = districtsChecked.get(id);
                if (checked === undefined) {
                    checked = false
                }
                if (!checked) {
                    districtsChecked.set(id, true)
                    let neighbours: Coordinate[] = [];
                    findNeighboursRecursive(districts, coordinate, neighbours);
                    if (neighbours.length !== districtSizes.get(id)) {
                        contiguity = false;
                    }
                }
            }
        }
    }

    let check = contiguity
    return check;
}

function findNeighboursRecursive(districts: DistrictSchema, coordinate: Coordinate, knownCoordinates: Coordinate[]) {
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

function getDistrictSizes(districts: DistrictSchema): Map<number, number> {
    let districtSizes: Map<number, number> = new Map();
    districts.forEach((id) => {
        let size = districtSizes.get(id);
        if (size === undefined) {
            size = 0
        }
        size = size + 1;
        districtSizes.set(id, size);
    })
    return districtSizes
}


