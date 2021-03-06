import { Coordinate } from "../types";

export class DistrictSchema {
    districts: number[][];
    width: number;
    height: number;

    constructor(width: number, height: number, districts?: number[][]) {
        if (districts === undefined) {
            this.districts = this.generateInitialDistricts(width, height);
        } else {
            this.districts = districts;
        }
        this.width = width;
        this.height = height;
    }

    generateInitialDistricts(width: number, height: number): number[][] {
        let districts: number[][] = []
        for (let y = 0; y < height; y++) {
            let districtColumn = [];
            for (let x = 0; x < width; x++) {
                if (x >= 4 && y >= 3) {
                    districtColumn[x] = 2;
                } else if (x < 2 && y < 3) {
                    districtColumn[x] = 0;
                } else {
                    districtColumn[x] = 1;
                }
            }
            districts[y] = districtColumn;
        }
        return districts;
    }

    get(coordinate: Coordinate) {
        return this.districts[coordinate.y][coordinate.x]
    }

    set(coordinate: Coordinate, id: number) {
        this.districts[coordinate.y][coordinate.x] = id;
    }

    has(coordinate: Coordinate) {
        return coordinate.x >= 0 && coordinate.x < this.width && coordinate.y >= 0 && coordinate.y < this.height
    }

    forEach(func: (id: number, coordinate: Coordinate) => void) {
        this.districts.forEach((districtColumn, y) => {
            districtColumn.forEach((id, x) => {
                func(id, { x: x, y: y });
            })
        })
    }

    map(func: (id: number, coordinate: Coordinate) => any) {
        return this.districts.map((districtColumn, y) => {
            return districtColumn.map((id, x) => {
                return func(id, { x: x, y: y });
            })
        })
    }

    getDistrictSizes(): Map<number, number> {
        let districtSizes: Map<number, number> = new Map();
        this.forEach((id) => {
            let size = districtSizes.get(id);
            if (size === undefined) {
                size = 0
            }
            size = size + 1;
            districtSizes.set(id, size);
        })
        return districtSizes
    }

    getDistrictCount(): number {
        let uniqueDistricts: Set<number> = new Set<number>()
        this.forEach(id => {
            uniqueDistricts.add(id);
        })
        return uniqueDistricts.size
    }

    getPopulationCount() {
        return this.width * this.height
    }

}