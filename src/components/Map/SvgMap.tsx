import { Directions } from "../../classes/Directions";
import { DistrictSchema } from "../../classes/DistrictSchema";
import { GeoMap } from "../../classes/GeoMap";
import { MapHelp } from "../../helptexts/map";
import { Coordinate, Direction } from "../../types";
import { getDirectionsOfDistrictBorders } from "../../util/districtGenerator";
import { deepCopyArray } from "../../util/util";
import { Title } from "../UI/Title";
import { Block } from "./Block";
import { DistrictSwitch } from "./DistrictSwitch";
import { Results } from "./Results";

const mapResX = 900;
const mapResY = 600;
const borderSize = 6;

const districtColors = [{
    color: "fill-red-200",
    hoverColor: "hover:fill-red-200"
},
{
    color: "fill-blue-200",
    hoverColor: "hover:fill-blue-200"
},
{
    color: "fill-green-200",
    hoverColor: "hover:fill-green-200"
}]

interface Props {
    map?: GeoMap
    showNewDistricts: boolean
    setShowNewDistricts: (value: boolean) => void
    districtsOld?: DistrictSchema
    setNewDistricts: (districts: DistrictSchema) => void
    districtsNew?: DistrictSchema
}

export function SvgMap(props: Props) {
    if (!props.districtsOld && !props.districtsNew) {
        return <div className="w-7/12 bg-slate-500 text-slate-50">
            <Title title="Karte" helpText={<MapHelp />}></Title>
            <div className=" m-8 flex flex-col items-center align-middle ">
                <div className="prose bg-slate-50 rounded-md p-4 w-fit">
                    <h1>
                        Willkommen im Districting Tool
                    </h1>
                    <p>
                        Mit diesem Tool können Sie algorithmusgestützt Wahlkreiseinteilungen anhand eigens ausgewählter Parameter erstellen.
                        Folgen sie den Schritten auf der linken Seite um eine neue Einteilung zu erstellen
                    </p>
                    <p>
                        <b>
                            Die ?-Knöpfe liefern Erklärungen zu einzelnen Schritten oder Auswahlmöglichkeiten.
                        </b>
                    </p>
                </div>
            </div>
        </div>
    }

    let districtsToDraw = props.showNewDistricts ? props.districtsNew : props.districtsOld;

    function onDirectionClicked(coordinate: Coordinate, direction: Direction) {
        if (props.districtsNew && props.showNewDistricts) {
            let districts = deepCopyArray(props.districtsNew)
            if (districts.has(direction(coordinate))) {
                districts.set(coordinate, districts.get(direction(coordinate)))
            }
            props.setNewDistricts(districts);
        }
    }

    let mapContent;
    if (props.map !== undefined) {
        let citizens = props.map;
        mapContent = citizens.map((citizen, coordinate) => {
            function onHover(direction: Direction) {
                if (districtsToDraw === undefined) {
                    return "hover:fill-slate-200"
                }
                if (!districtsToDraw.has(direction(coordinate))) {
                    return districtColors[districtsToDraw.get(coordinate)].hoverColor
                }
                return districtColors[districtsToDraw.get(direction(coordinate))].hoverColor
            }
            let indexX = coordinate.x
            let indexY = coordinate.y
            const width = mapResX / citizens.width
            const height = mapResY / citizens.height
            const x = indexX * width
            const y = indexY * height
            let color = citizen.vote === undefined ? "fill-slate-500" : citizen.vote.color;
            let districtColor = "fill-slate-200";
            if (districtsToDraw !== undefined) {
                districtColor = districtColors[districtsToDraw.get({ x: indexX, y: indexY })].color;
            }
            return <Block key={citizen.id}
                color={color}
                districtColor={districtColor}
                x={x}
                y={y}
                width={width}
                height={height}
                districtId={districtsToDraw && districtsToDraw.get({ x: indexX, y: indexY })}
                interactive={props.showNewDistricts}
                onDirectionClicked={(direction) => onDirectionClicked(coordinate, direction)}
                onHover={(direction) => onHover(direction)}
            />
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
                if (direction === Directions.NORTH) {
                    return <rect key={"borderNorth" + indexX + indexY} className="fill-slate-700" x={x - borderSize / 2} y={y - borderSize / 2} width={width + borderSize} height={borderSize}></rect>
                } else if (direction === Directions.EAST) {
                    return <rect key={"borderEast" + indexX + indexY} className="fill-slate-700" x={x + width - borderSize / 2} y={y - borderSize / 2} width={borderSize} height={height + borderSize}></rect>
                }
                return null;
            })

        });
    }
    return <div className="w-7/12 bg-slate-500 text-slate-50">
        <Title title="Karte" helpText={<MapHelp />}></Title>
        <div className="shadow-inner">
            <Results districts={districtsToDraw} map={props.map}></Results>
            <div className="flex justify-center">
                <div className="w-5/6 border-8 border-slate-700 shadow-2xl">
                    <svg className="" viewBox={"0 0 " + mapResX + " " + mapResY} >
                        {mapContent}
                        {districtBorders}
                    </svg >
                </div>
            </div>
        </div>
        {props.districtsNew &&
            <DistrictSwitch showNewDistricts={props.showNewDistricts} setShowNewDistricts={props.setShowNewDistricts}></DistrictSwitch>
        }
    </div >
}

