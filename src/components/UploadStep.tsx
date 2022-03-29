import { MapData, State } from "../types";
import { Button } from "./Button";
import { Step } from "./Step";
import { generateMap } from "../util/districtGenerator";

interface Props {
    onUploadDone: (data: MapData) => void
    mapData?: MapData
}

export function UploadStep(props: Props) {

    function onUploadMapData() {
        let mapData: MapData = generateMap(12, 8);
        props.onUploadDone(mapData)
    }

    let bottomComponent;
    let topComponent;
    let state: State;
    if (props.mapData !== undefined) {
        topComponent = "Andere Kartendaten auswählen"
        bottomComponent = <Button onClick={onUploadMapData} title="Ersetzen"></Button>
        state = "finished"
    } else {
        topComponent = "Kartendaten auswählen"
        bottomComponent = <Button onClick={onUploadMapData} title="Laden"></Button>
        state = "todo"
    }

    return <Step state={state} stepIndex={1} title="Kartendaten laden">
        <div className="border-2 border-slate-400 rounded-xl h-32 flex items-center justify-center">
            {topComponent}
        </div>
        <div className="flex justify-end mt-4">
            {bottomComponent}
        </div>
    </Step>
}