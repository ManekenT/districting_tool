import { Districts, GeoMap } from "../../types";
import { Button } from "../UI/Button";
import { Step } from "./Step";
import { generateInitialDistricts, generateMap } from "../../util/districtGenerator";
import { Slider } from "../UI/Slider";
import { useState } from "react";

interface Props {
    onUploadDone: (map: GeoMap, districts: Districts) => void
    map?: GeoMap
    districtsOld?: Districts
}

export function UploadStep(props: Props) {

    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(6);

    function onUploadMapData() {
        let map = generateMap(width, height);
        let districts = generateInitialDistricts(map);
        props.onUploadDone(map, districts);
    }

    return <Step finished={props.map !== undefined && props.districtsOld !== undefined} stepIndex={1} title="Initialisieren">
        <div className="flex gap-2 flex-col">
            <div className="">Höhe</div>
            <Slider onChange={setHeight} defaultValue={height} max={16} min={0}></Slider>
            <div className="">Breite</div>
            <Slider onChange={setWidth} defaultValue={width} max={16} min={0}></Slider>
        </div>
        <div className="flex justify-end mt-4">
            <Button onClick={onUploadMapData} title="Laden"></Button>
        </div>
    </Step>
}