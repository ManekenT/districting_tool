import { DistrictSchema } from '../classes/DistrictSchema';
import { Constraints, Coordinate, WeightingValues } from '../types';
import { checkConstraints } from './constraints';
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
        let valid = checkConstraints(oldDistricts, districts, constraints);
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
