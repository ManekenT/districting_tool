import { DistrictSchema } from "../classes/DistrictSchema";
import { getDirectionsOfDistrictBorders } from "./districtGenerator";

export function compactness(districts: DistrictSchema): number {
    let compactnessPerDistrict: Map<number, { perimiter: number, area: number }> = new Map();
    districts.forEach((id, coordinate) => {
        let districtValues = compactnessPerDistrict.get(id);
        if (districtValues === undefined) {
            districtValues = { perimiter: 0, area: 0 };
        }
        districtValues.area++;
        districtValues.perimiter += getDirectionsOfDistrictBorders(coordinate, districts, true).length / 4;
        compactnessPerDistrict.set(id, districtValues);
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

export function populationEquality(districts: DistrictSchema, expectedPopulation: number): number {
    let populationPerDistrict: Map<number, number> = new Map();
    districts.forEach((id) => {
        let districtValue = populationPerDistrict.get(id);
        if (districtValue === undefined) {
            districtValue = 0;
        }
        districtValue++;
        populationPerDistrict.set(id, districtValue);
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