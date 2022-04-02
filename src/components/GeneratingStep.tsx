import { Configuration, Districts, GeoMap } from "../types";
import { Button } from "./Button";
import { Step } from "./Step";

interface Props {
    onGeneratingDone: (districts: Districts) => void
    map?: GeoMap
    configuration?: Configuration
    districtsNew?: Districts
}

export function GeneratingStep(props: Props) {

    function onGeneratingDistrictingData() {
        let districts: Districts = []
        props.onGeneratingDone(districts)
    }
    let prerequisitesMet = props.map !== undefined && props.configuration !== undefined

    let bottomComponent;
    if (props.districtsNew !== undefined) {
        bottomComponent = <div>Bezirke generiert</div>
    } else if (prerequisitesMet) {
        bottomComponent = <Button onClick={onGeneratingDistrictingData} title="Bezirke generieren"></Button>
    } else {
        bottomComponent = <Button title="Daten aus vorangegangenen Schritten fehlen" disabled={true}></Button>
    }

    return <Step finished={props.districtsNew !== undefined} stepIndex={3} title="Bezirke generieren">
        <div className="flex justify-end mt-4">
            {bottomComponent}
        </div>
    </Step>
}