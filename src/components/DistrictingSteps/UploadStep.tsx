import { Button } from "../UI/Button";
import { Step } from "./Step";
import { Slider } from "../UI/Slider";
import { useState } from "react";
import { GeoMap } from "../../classes/GeoMap";
import { DistrictSchema } from "../../classes/DistrictSchema";
import { UploadHelp } from "../../helptexts/steps/upload";

interface Props {
    setMap: (map: GeoMap) => void
    setDistrictsOld: (districts: DistrictSchema) => void
    map?: GeoMap
    districtsOld?: DistrictSchema
}

export function UploadStep(props: Props) {

    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(6);

    function onUploadMapData() {
        let map = new GeoMap(width, height);
        let districts = new DistrictSchema(width, height);
        props.setMap(map);
        props.setDistrictsOld(districts)
    }

    return <Step finished={props.map !== undefined && props.districtsOld !== undefined} stepIndex={1} title="Karte initialisieren" helpText={<UploadHelp />}>
        <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-x-4">

                <div className="">Höhe</div>
                <Slider onChange={setHeight} defaultValue={height} max={16} min={1}></Slider>
            </div>
            <div className="flex items-center gap-x-4">
                <div className="">Breite</div>
                <Slider onChange={setWidth} defaultValue={width} max={16} min={1}></Slider>
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <Button onClick={onUploadMapData} title="Laden"></Button>
        </div>
    </Step>
}