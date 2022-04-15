import { Coordinate, Direction } from "../types";

export class Directions {
    static NORTH: Direction = (coordinate: Coordinate) => {
        return { x: coordinate.x, y: coordinate.y - 1 }
    }
    static SOUTH: Direction = (coordinate: Coordinate) => {
        return { x: coordinate.x, y: coordinate.y + 1 }
    }
    static WEST: Direction = (coordinate: Coordinate) => {
        return { x: coordinate.x - 1, y: coordinate.y }
    }
    static EAST: Direction = (coordinate: Coordinate) => {
        return { x: coordinate.x + 1, y: coordinate.y }
    }
}