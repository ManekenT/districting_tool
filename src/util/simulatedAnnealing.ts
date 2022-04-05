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
    let energy = weightingValues.populationEquality * populationEquality(districts, expectedPopulation) + weightingValues.compactness * compactness(districts);
    console.log(energy);
    return energy;
}

function newState(oldDistricts: Districts): Districts {
    let districts = deepCopyArray(oldDistricts);
    let randomPoint = getRandomPoint(districts[0].length, districts.length);
    let neighbourDirections = getDirectionsOfDistrictBorders(randomPoint.x, randomPoint.y, districts)
    if (neighbourDirections.length !== 0) {
        let randomDirection = neighbourDirections[Math.floor(Math.random() * neighbourDirections.length)]
        if (randomDirection === "North") {
            let otherDistrictId = districts[randomPoint.y - 1][randomPoint.x]
            districts[randomPoint.y][randomPoint.x] = otherDistrictId;
            //districts[randomPoint.y - 1][randomPoint.x] = districtId;
        } else if (randomDirection === "South") {
            let otherDistrictId = districts[randomPoint.y + 1][randomPoint.x]
            districts[randomPoint.y][randomPoint.x] = otherDistrictId;
            //districts[randomPoint.y + 1][randomPoint.x] = districtId;
        } else if (randomDirection === "West") {
            let otherDistrictId = districts[randomPoint.y][randomPoint.x - 1]
            districts[randomPoint.y][randomPoint.x] = otherDistrictId;
            //districts[randomPoint.y][randomPoint.x - 1] = districtId;
        } else if (randomDirection === "East") {
            let otherDistrictId = districts[randomPoint.y][randomPoint.x + 1]
            districts[randomPoint.y][randomPoint.x] = otherDistrictId;
            //districts[randomPoint.y][randomPoint.x + 1] = districtId;
        }
    }
    return districts;
}

// linear temperature decreasing
function getTemp(prevTemperature: number) {
    return prevTemperature - 0.001;
}


