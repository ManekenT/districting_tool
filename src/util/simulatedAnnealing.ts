import { Districts, WeightingValues } from '../types';
import { getDirectionsOfDistrictBorders } from './districtGenerator';
import { compactness, populationEquality } from './objectives';
import { deepCopyArray, getRandomPoint } from './util';

export function doSimulatedAnnealing(initialDistricts: Districts, weightingValues: WeightingValues): Districts {
    var simulatedAnnealing = require('simulated-annealing');
    let districtIdSet = new Set();
    let populationSize = initialDistricts.length * initialDistricts[0].length
    initialDistricts.forEach((districtColumn) => {
        districtColumn.forEach((id => {
            districtIdSet.add(id);
        }))
    })
    let expectedPopulation = populationSize / districtIdSet.size;
    var result = simulatedAnnealing({
        initialState: deepCopyArray(initialDistricts),
        tempMax: 15,
        tempMin: 0.001,
        newState: newState,
        getTemp: getTemp,
        getEnergy: (districts: Districts) => getEnergy(districts, weightingValues, expectedPopulation),
    });
    console.log(result);
    return result;
}

function getEnergy(districts: Districts, weightingValues: WeightingValues, expectedPopulation: number) {
    let populationEqualityValue = populationEquality(districts, expectedPopulation);
    let compactnessValue = compactness(districts);
    console.log(populationEqualityValue, compactnessValue)
    let energy = weightingValues.populationEquality * populationEqualityValue + weightingValues.compactness * compactnessValue;
    return energy;
}

function newState(oldDistricts: Districts): Districts {
    let districts = deepCopyArray(oldDistricts);
    let randomPoint = getRandomPoint(districts[0].length, districts.length);
    let neighbourPoint = { x: 0, y: 0 };
    let neighbourDirections = getDirectionsOfDistrictBorders(randomPoint.x, randomPoint.y, districts)

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

        let districtId = districts[randomPoint.y][randomPoint.x];
        let neighbourId = districts[neighbourPoint.y][neighbourPoint.x]
        districts[randomPoint.y][randomPoint.x] = neighbourId
        let valid = checkConstraints(districts);
        if (!valid) {
            //reset ID
            districts[randomPoint.y][randomPoint.x] = districtId
        }
    }
    return districts;
}

// linear temperature decreasing
function getTemp(prevTemperature: number) {
    console.log(prevTemperature);
    return prevTemperature - 0.001;
}

function checkConstraints(districts: Districts): boolean {
    let districtSizes = getDistrictSizes(districts);
    let districtsChecked: Map<number, boolean> = new Map();
    for (let y = 0; y < districts.length; y++) {
        let districtColumn = districts[y];
        for (let x = 0; x < districtColumn.length; x++) {
            let districtId = districtColumn[x]
            let checked = districtsChecked.get(districtId);
            if (checked === undefined) {
                checked = false
            }
            if (!checked) {
                districtsChecked.set(districtId, true)
                let neighbours: { x: number, y: number }[] = [];
                findNeighboursRecursive(districts, { x: x, y: y }, neighbours);
                if (neighbours.length !== districtSizes.get(districtId)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function findNeighboursRecursive(districts: Districts, coordinates: { x: number, y: number }, knownCoordinates: { x: number, y: number }[]) {
    const x = coordinates.x;
    const y = coordinates.y;
    const districtId = districts[y][x]
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
    if (knownCoordinates.find((element) => element.x === x && element.y === y)) {
        return;
    }
    knownCoordinates.push(coordinates);
    if (northId !== undefined && northId === districtId) {
        findNeighboursRecursive(districts, { x: x, y: y - 1 }, knownCoordinates)
    }
    if (southId !== undefined && southId === districtId) {
        findNeighboursRecursive(districts, { x: x, y: y + 1 }, knownCoordinates);
    }
    if (westId !== undefined && westId === districtId) {
        findNeighboursRecursive(districts, { x: x - 1, y: y }, knownCoordinates);
    }
    if (eastId !== undefined && eastId === districtId) {
        findNeighboursRecursive(districts, { x: x + 1, y: y }, knownCoordinates);
    }
}

function getDistrictSizes(districts: Districts): Map<number, number> {
    let districtSizes: Map<number, number> = new Map();
    districts.forEach((districtColumns, y) => {
        districtColumns.forEach((districtId, x) => {
            let size = districtSizes.get(districtId);
            if (size === undefined) {
                size = 0
            }
            size = size + 1;
            districtSizes.set(districtId, size);
        })
    });
    return districtSizes
}


