import { Districts } from "../types";
import { getDirectionsOfDistrictBorders } from "./districtGenerator";

export function compactness(districts: Districts): number {
    let compactnessPerDistrict: Map<number, { perimiter: number, area: number }> = new Map();
    districts.forEach((districtColumns, y) => {
        districtColumns.forEach((districtId, x) => {
            let districtValues = compactnessPerDistrict.get(districtId);
            if (districtValues === undefined) {
                districtValues = { perimiter: 0, area: 0 };
            }
            districtValues.area++;
            districtValues.perimiter += getDirectionsOfDistrictBorders(x, y, districts, true).length / 4;
            compactnessPerDistrict.set(districtId, districtValues);
        });
    });
    let compactness = Array.from(compactnessPerDistrict.keys()).reduce((a, b) => {
        let values = compactnessPerDistrict.get(b)!;
        return a + getCompactnessValue(values.area, values.perimiter)
    });
    return compactness;
}

function getCompactnessValue(area: number, perimiter: number): number {
    return perimiter / Math.sqrt(area) - 1
}

export function populationEquality(districts: Districts, expectedPopulation: number): number {
    let populationPerDistrict: Map<number, number> = new Map();
    districts.forEach((districtColumns, y) => {
        districtColumns.forEach((districtId, x) => {
            let districtValue = populationPerDistrict.get(districtId);
            if (districtValue === undefined) {
                districtValue = 0;
            }
            districtValue++;
            populationPerDistrict.set(districtId, districtValue);
        });
    });
    let populationEquality = Array.from(populationPerDistrict.keys()).reduce((a, b) => {
        let value = populationPerDistrict.get(b)!;
        return a + getPopulationEqualityValue(value, expectedPopulation);
    });
    return populationEquality / 1000
}

function getPopulationEqualityValue(population: number, expectedPopulation: number): number {
    return Math.pow((1 - population / expectedPopulation) * (1 / 0.05), 2)
}