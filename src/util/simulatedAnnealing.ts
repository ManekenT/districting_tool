import { DistrictSchema } from '../classes/DistrictSchema';
import { GeoMap } from '../classes/GeoMap';
import { Constraints, WeightingValues } from '../types';
import { checkConstraints } from './constraints';
import { getDirectionsOfDistrictBorders } from './districtGenerator';
import { getOptimizationValue } from './metrics';
import { deepCopyArray, getRandomPoint } from './util';

export function doSimulatedAnnealing(map: GeoMap, initialDistricts: DistrictSchema, weightingValues: WeightingValues, constraints: Constraints): DistrictSchema {
    var simulatedAnnealing = require('simulated-annealing');
    let result = simulatedAnnealing({
        initialState: initialDistricts,
        tempMax: 15,
        tempMin: 0.001,
        newState: (districts: DistrictSchema) => newState(districts, constraints),
        getTemp: getTemp,
        getEnergy: (districts: DistrictSchema) => getOptimizationValue(map, districts, weightingValues),
    });
    return result;
}
function newState(oldDistricts: DistrictSchema, constraints: Constraints): DistrictSchema {
    let districts = deepCopyArray(oldDistricts);
    let randomPoint = getRandomPoint(districts.width, districts.height);
    let neighbourPoint = { x: 0, y: 0 };
    let neighbourDirections = getDirectionsOfDistrictBorders(randomPoint, districts)

    if (neighbourDirections.length !== 0) {
        let randomDirection = neighbourDirections[Math.floor(Math.random() * neighbourDirections.length)]
        neighbourPoint = randomDirection(randomPoint)

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
