import { DistrictSchema } from "../classes/DistrictSchema";
import { Constraints, Coordinate } from "../types";
import { findNeighboursRecursive } from "./util";

export function checkConstraints(districtsOld: DistrictSchema, districtsNew: DistrictSchema, constraints: Constraints): boolean {

    let contiguity = true;
    let districtCount = true;
    if (constraints.contiguity) {
        contiguity = checkContiguity(districtsNew);
    }
    if (constraints.keepDistrictCount) {
        districtCount = checkDistrictCount(districtsNew, districtsOld.getDistrictCount());
    }

    return contiguity && districtCount
}

function checkContiguity(districts: DistrictSchema) {
    let districtSizes = districts.getDistrictSizes();
    let districtsChecked: Map<number, boolean> = new Map();

    for (let y = 0; y < districts.height; y++) {
        for (let x = 0; x < districts.width; x++) {
            let coordinate = { x: x, y: y }
            let id = districts.get(coordinate)
            let checked = districtsChecked.get(id);
            if (checked === undefined) {
                checked = false
            }
            if (!checked) {
                districtsChecked.set(id, true)
                let neighbours: Coordinate[] = [];
                findNeighboursRecursive(districts, coordinate, neighbours);
                if (neighbours.length !== districtSizes.get(id)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function checkDistrictCount(districts: DistrictSchema, numberOfDistricts: number) {
    return districts.getDistrictCount() === numberOfDistricts;
}