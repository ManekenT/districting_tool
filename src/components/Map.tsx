import { Direction, DistrictingData, MapData } from "../types"
import { getDirectionsOfDistrictBorders } from "../util/districtGenerator"
import { Title } from "./Title"

interface Props {
    mapData?: MapData
    districtingData?: DistrictingData
}

function getCssBorderStringFromDirections(directions: Direction[]): string {
    let cssBorders = "";
    directions.forEach(direction => {
        if (direction === "North") {
            cssBorders = cssBorders.concat("border-t-slate-700 ")
        } else if (direction === "South") {
            cssBorders = cssBorders.concat("border-b-slate-700 ")
        } else if (direction === "West") {
            cssBorders = cssBorders.concat("border-l-slate-700 ")
        } else if (direction === "East") {
            cssBorders = cssBorders.concat("border-r-slate-700 ")
        }
    });
    return cssBorders;
}

export function DistrictMap(props: Props) {
    let mapGrid: any[] = []
    if (props.mapData !== undefined) {
        let mapData = props.mapData;
        mapGrid = mapData.citizens.map((citizenColumns, y) => {
            return <div key={y} className="flex justify-between w-full text-center">
                {
                    citizenColumns.map((citizen, x) => {
                        let borderString = getCssBorderStringFromDirections(getDirectionsOfDistrictBorders(x, y, mapData));
                        return <div className={"border-4 grow aspect-square flex justify-center items-center " + citizen.vote.borderColor + " " + citizen.vote.color + " " + borderString} key={citizen.id} >
                            <div className="w-2 h-2 flex justify-center items-center text-lg ">
                                {citizen.id}
                            </div>
                        </div>
                    })
                }
            </div>
        });
    }

    return <div className="w-4/6 h-screen bg-slate-500 text-slate-50">
        <Title title="Karte"></Title>
        <div className="flex gap-4 flex-col items-center text-2xl font-semibold">
            <div className="w-full">
                {mapGrid}
            </div>
        </div>
    </div>
}