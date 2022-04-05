import { Districts, WeightingValues } from '../types';
import { getDirectionsOfDistrictBorders } from './districtGenerator';
import { compactness } from './objectives';
import { deepCopyArray, getRandomPoint } from './util';

export function doSimulatedAnnealing(initialDistricts: Districts, weightingValues: WeightingValues): Districts {
    var simulatedAnnealing = require('simulated-annealing');
    var result = simulatedAnnealing({
        initialState: deepCopyArray(initialDistricts),
        tempMax: 15,
        tempMin: 0.001,
        newState: newState,
        getTemp: getTemp,
        getEnergy: getEnergy,
    });
    console.log(result);
    return result;
}

function getEnergy(districts: Districts) {
    return compactness(districts);
}

function newState(districts: Districts): Districts {
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


