import { ConfigurationData, DistrictingData, MapData, State } from "../types";
import { Button } from "./Button";
import { Step } from "./Step";

interface Props {
    onGeneratingDone: (districtingData: DistrictingData) => void
    mapData?: MapData
    configurationData?: ConfigurationData
    districtingData?: DistrictingData
}

export function GeneratingStep(props: Props) {

    function onGeneratingDistrictingData() {
        let districtingData: DistrictingData = { data: "Wahlbezirke" }
        props.onGeneratingDone(districtingData)
    }
    let prerequisitesMet = props.mapData !== undefined && props.configurationData !== undefined

    let bottomComponent;
    let state: State;
    if (props.districtingData !== undefined) {
        bottomComponent = <div>Bezirke generiert</div>
        state = "finished"
    } else if (prerequisitesMet) {
        bottomComponent = <Button onClick={onGeneratingDistrictingData} title="Bezirke generieren"></Button>
        state = "todo"
    } else {
        bottomComponent = <Button title="Daten aus vorangegangenen Schritten fehlen" disabled={true}></Button>
        state = "todo"
    }

    return <Step state={state} stepIndex={3} title="Bezirke generieren">
        <div className="flex justify-end mt-4">
            {bottomComponent}
        </div>
    </Step>
}