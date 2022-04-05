import { Districts } from "../types";

export function toPercentString(number: number): string {
    return `${number * 100} %`
}

export function getRandomPoint(width: number, height: number): { x: number, y: number } {
    return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)

    }
}

export function deepCopyArray(districts: Districts): Districts {
    let deepCopy: Districts = [];
    districts.forEach((districtColumn, x) => {
        let districtColumnCopy: number[] = []
        districtColumn.forEach((districtId, y) => {
            districtColumnCopy[y] = districtId
        });
        deepCopy[x] = districtColumnCopy;
    })
    return deepCopy;
}

export function decimalToPercentString(number?: number): string {
    if (number === undefined) {
        return "";
    }
    return Math.abs((number * 100)).toFixed(4) + " %";
}
