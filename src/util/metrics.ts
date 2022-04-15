import { DistrictSchema } from "../classes/DistrictSchema";
import { GeoMap } from "../classes/GeoMap";
import { Votes, WeightingValues } from "../types";
import { calculateVotesPerDistrict, calculateWastedVotesPerDistrict, sumDistrictVotes } from "./districtGenerator";
import { getDirectionsOfDistrictBorders } from "./districtGenerator";

export function efficiencyGap(map: GeoMap, districts: DistrictSchema): { gap: number, wastedVotes: Votes } {
    let votes = calculateVotesPerDistrict(map, districts)
    let totalVotes = sumDistrictVotes(votes)
    let totalVoteCount = totalVotes.blue + totalVotes.yellow;
    let wastedVotes = calculateWastedVotesPerDistrict(votes)
    let totalWastedVotes = sumDistrictVotes(wastedVotes)

    let voteDifferences = totalWastedVotes.blue - totalWastedVotes.yellow;

    let efficiencyGap = voteDifferences / totalVoteCount;
    return {
        gap: efficiencyGap,
        wastedVotes: totalWastedVotes
    }
}

function normalizeEfficiencyGap(value: number) {
    return Math.abs(value)
}

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

function normalizeCompactness(value: number) {
    return value
}

export function populationEquality(districts: DistrictSchema): number {
    let equalPopulationAmount = districts.getPopulationCount() / districts.getDistrictCount()
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
        return a + getPopulationEqualityValue(value, equalPopulationAmount);
    });
    return populationEquality / 1000
}

function getPopulationEqualityValue(population: number, expectedPopulation: number): number {
    return Math.pow((1 - population / expectedPopulation) * (1 / 0.05), 2)
}

function normalizePopulationEquaity(value: number) {
    return value
}

export function getOptimizationValue(map: GeoMap, districts: DistrictSchema, weightingValues: WeightingValues) {
    let populationEqualityValue = populationEquality(districts);
    let compactnessValue = compactness(districts);
    let efficiencyGapValue = efficiencyGap(map, districts);
    let value = weightingValues.populationEquality * normalizePopulationEquaity(populationEqualityValue) +
        weightingValues.compactness * normalizeCompactness(compactnessValue) +
        weightingValues.efficiencyGap * normalizeEfficiencyGap(efficiencyGapValue.gap);
    return value
}