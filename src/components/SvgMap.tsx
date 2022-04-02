import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Districts, GeoMap } from "../types"
import { getDirectionsOfDistrictBorders } from "../util/districtGenerator";
import { Title } from "./Title";

const mapResX = 600;
const mapResY = 500;
const borderSize = 4;

interface Props {
    map?: GeoMap
    districtsOld?: Districts
    districtsNew?: Districts
}

export function SvgMap(props: Props) {
    let mapContent;
    if (props.map !== undefined) {
        let citizens = props.map;
        mapContent = citizens.map((citizenRows, indexY) => {
            return citizenRows.map((citizen, indexX) => {
                const x = indexX * (mapResX / citizenRows.length)
                const y = indexY * (mapResY / citizens.length)
                const width = mapResX / citizenRows.length
                const height = mapResY / citizens.length
                let color = citizen.vote === undefined ? "fill-slate-500" : citizen.vote.color;
                return <g key={citizen.id}>
                    <rect className={"" + color} x={x} y={y} width={width} height={height} />
                    <text className="text-xs fill-slate-700" x={x + width / 10} y={y + height - height / 15}>{citizen.id}</text>
                </g>

            });
        });
    }

    let districtBorders;
    if (props.districtsOld !== undefined) {
        let districts = props.districtsOld
        districtBorders = districts.map((districtRows, indexY) => {
            return districtRows.map((district, indexX) => {
                const x = indexX * (mapResX / districtRows.length)
                const y = indexY * (mapResY / districts.length)
                const width = mapResX / districtRows.length
                const height = mapResY / districts.length
                return getDirectionsOfDistrictBorders(indexX, indexY, districts).map(direction => {
                    if (direction === "North") {
                        return <rect key={"borderNorth" + indexX + indexY} className="fill-slate-700" x={x - borderSize / 2} y={y - borderSize / 2} width={width + borderSize} height={borderSize}></rect>
                    } else if (direction === "East") {
                        return <rect key={"borderEast" + indexX + indexY} className="fill-slate-700" x={x + width - borderSize / 2} y={y - borderSize / 2} width={borderSize} height={height + borderSize}></rect>
                    }
                    return null;
                })

            });
        });
    }

    return <div className="w-4/6 h-screen bg-slate-500 text-slate-50">
        <Title title="Karte"></Title>
        <svg viewBox={"0 0 " + mapResX + " " + mapResY} >
            {mapContent}
            {districtBorders}
            <g>
                <rect key={"north"} className="fill-slate-700" x={0} y={0} width={mapResX} height={borderSize} />
                <rect key={"west"} className="fill-slate-700" x={0} y={0} width={borderSize} height={mapResY} />
                <rect key={"south"} className="fill-slate-700" x={0} y={mapResY - borderSize} width={mapResX} height={borderSize} />
                <rect key={"east"} className="fill-slate-700" x={mapResX - borderSize} y={0} width={borderSize} height={mapResY} />
            </g>
        </svg >
    </div>
}