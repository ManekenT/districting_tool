import { Configuration, Districts, GeoMap } from "../../types";
import { doSimulatedAnnealing } from "../../util/simulatedAnnealing";
import { Button } from "../UI/Button";
import { Step } from "./Step";

interface Props {
    onGeneratingDone: (districts: Districts) => void
    map?: GeoMap
    configuration?: Configuration
    districtsOld?: Districts
    districtsNew?: Districts
}

export function GeneratingStep(props: Props) {

    function onGeneratingDistrictingData() {
        if (props.map === undefined) {
            return
        }
        let districts = doSimulatedAnnealing(props.districtsOld!, props.configuration?.weightingValues!);
        props.onGeneratingDone(districts)
    }
    let prerequisitesMet = props.map !== undefined && props.configuration?.algorithm !== undefined

    let bottomComponent;
    if (prerequisitesMet) {
        bottomComponent = <Button onClick={onGeneratingDistrictingData} title="Bezirke generieren"></Button>
    } else {
        bottomComponent = <Button title="Daten aus vorangegangenen Schritten fehlen" disabled={true}></Button>
    }

    return <Step finished={props.districtsNew !== undefined} stepIndex={3} title="Generieren">
        <div className="flex justify-end mt-4">
            {bottomComponent}
        </div>
    </Step>
}