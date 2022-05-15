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
    efficiencyGap = normalizeEfficiencyGap(efficiencyGap)
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
        districtValues.perimiter += getDirectionsOfDistrictBorders(coordinate, districts, true).length;
        compactnessPerDistrict.set(id, districtValues);
    });
    let compactness = 0;
    Array.from(compactnessPerDistrict.keys()).forEach(index => {
        let values = compactnessPerDistrict.get(index)!;
        compactness += getCompactnessValue(values.area, values.perimiter)
    });
    compactness = compactness / districts.getDistrictCount()
    return normalizeCompactness(compactness);
}

function getCompactnessValue(area: number, perimiter: number): number {
    return 4 * Math.PI * area / Math.pow(perimiter, 2)
}

function normalizeCompactness(value: number) {
    return 1 - value
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
    let populationEquality = 0;
    Array.from(populationPerDistrict.keys()).forEach(index => {
        let value = populationPerDistrict.get(index)!;
        populationEquality += getPopulationEqualityValue(value, equalPopulationAmount)
    });
    populationEquality = populationEquality / districts.getDistrictCount()
    return normalizePopulationEquality(populationEquality, districts.getPopulationCount(), equalPopulationAmount);
}

function getPopulationEqualityValue(population: number, expectedPopulation: number): number {
    return Math.abs(population - expectedPopulation)
}

function normalizePopulationEquality(value: number, popCount: number, equalPopAmount: number) {
    let maxDifference = popCount - equalPopAmount
    if (maxDifference === 0) {
        return 0;
    }
    return value / maxDifference
}

export function getOptimizationValue(map: GeoMap, districts: DistrictSchema, weightingValues: WeightingValues) {
    let populationEqualityValue = populationEquality(districts);
    let compactnessValue = compactness(districts);
    let efficiencyGapValue = efficiencyGap(map, districts);
    let value = weightingValues.populationEquality * populationEqualityValue +
        weightingValues.compactness * compactnessValue +
        weightingValues.efficiencyGap * efficiencyGapValue.gap;
    return value
}