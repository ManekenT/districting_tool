import { DistrictSchema } from "../../classes/DistrictSchema";
import { GeoMap } from "../../classes/Map";
import { getDirectionsOfDistrictBorders } from "../../util/districtGenerator";
import { Title } from "../UI/Title";
import { Legend } from "./Legend";

const mapResX = 900;
const mapResY = 600;
const borderSize = 6;

const districtColors = ["fill-red-200", "fill-green-200", "fill-blue-200"];

interface Props {
    map?: GeoMap
    showNewDistricts: boolean
    setShowNewDistricts: (value: boolean) => void
    districtsOld?: DistrictSchema
    districtsNew?: DistrictSchema
}

export function SvgMap(props: Props) {
    let districtsToDraw = props.showNewDistricts ? props.districtsNew : props.districtsOld;

    let mapContent;
    if (props.map !== undefined) {
        let citizens = props.map;
        mapContent = citizens.map((citizen, coordinates) => {
            let indexX = coordinates.x
            let indexY = coordinates.y
            const width = mapResX / citizens.width
            const height = mapResY / citizens.height
            const x = indexX * width
            const y = indexY * height
            let color = citizen.vote === undefined ? "fill-slate-500" : citizen.vote.color;
            let districtColor = "fill-slate-200";
            if (districtsToDraw !== undefined) {
                districtColor = districtColors[districtsToDraw.get({ x: indexX, y: indexY })];
            }
            return <g key={citizen.id}>
                <rect className={"" + districtColor} x={x} y={y} width={width} height={height} />
                <circle className={"" + color} cx={x + width / 2} cy={y + height / 2} r={width / 4}></circle>
                <text className="text-lg fill-slate-700" x={x + width / 10} y={y + height - height / 15}>{districtsToDraw && districtsToDraw.get({ x: indexX, y: indexY })}</text>
            </g>

        });
    }

    let districtBorders;
    if (districtsToDraw !== undefined) {
        let districts = districtsToDraw
        districtBorders = districts.map((_id, coordinate) => {
            let indexX = coordinate.x;
            let indexY = coordinate.y;
            const width = mapResX / districts.width
            const height = mapResY / districts.height
            const x = indexX * width
            const y = indexY * height
            return getDirectionsOfDistrictBorders(coordinate, districts).map(direction => {
                if (direction === "North") {
                    return <rect key={"borderNorth" + indexX + indexY} className="fill-slate-700" x={x - borderSize / 2} y={y - borderSize / 2} width={width + borderSize} height={borderSize}></rect>
                } else if (direction === "East") {
                    return <rect key={"borderEast" + indexX + indexY} className="fill-slate-700" x={x + width - borderSize / 2} y={y - borderSize / 2} width={borderSize} height={height + borderSize}></rect>
                }
                return null;
            })

        });
    }
    return <div className="w-4/6 bg-slate-500 text-slate-50">
        <Title title="Karte"></Title>
        <div className="flex justify-center pt-16 shadow-inner">
            <div className="w-5/6 border-8 border-slate-700 shadow-2xl">
                <svg className="" viewBox={"0 0 " + mapResX + " " + mapResY} >
                    {mapContent}
                    {districtBorders}
                </svg >
            </div>
        </div>
        <Legend showNewDistricts={props.showNewDistricts} setShowNewDistricts={props.setShowNewDistricts}></Legend>
    </div >
}