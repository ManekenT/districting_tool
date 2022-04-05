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
    console.log(compactness);
    return compactness;
}

function getCompactnessValue(area: number, perimiter: number): number {
    return perimiter / Math.sqrt(area) - 1
}