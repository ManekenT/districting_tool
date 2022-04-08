import { DistrictSchema } from "../../classes/DistrictSchema";
import { GeoMap } from "../../classes/Map";
import { Algorithm } from "../../types";
import { Button } from "../UI/Button";
import { Step } from "./Step";

interface Props {
    setDistrictsNew: (districts: DistrictSchema) => void
    map?: GeoMap
    algorithm?: Algorithm
    populationEquality?: number
    compactness?: number
    contiguity?: boolean
    keepDistrictCount?: boolean
    districtsOld?: DistrictSchema
    districtsNew?: DistrictSchema
}

export function GeneratingStep(props: Props) {

    function checkPrerequisites() {
        return props.map !== undefined
            && props.algorithm !== undefined
            && props.populationEquality !== undefined
            && props.compactness !== undefined
            && props.contiguity !== undefined
            && props.keepDistrictCount !== undefined
            && props.districtsOld !== undefined
    }

    function onGeneratingDistrictingData() {
        if (!checkPrerequisites()) {
            return
        }
        let districtsOld = props.districtsOld!
        let weighting = {
            populationEquality: props.populationEquality!,
            compactness: props.compactness!
        }
        let constraints = {
            contiguity: props.contiguity!,
            keepDistrictCount: props.keepDistrictCount!
        }

        let districts = props.algorithm!.algorithm(districtsOld, weighting, constraints);
        props.setDistrictsNew(districts)
    }

    let title;
    let disabled;
    if (checkPrerequisites()) {
        title = "Bezirke generieren";
        disabled = false;
    } else {
        title = "Daten aus vorangegangenen Schritten fehlen"
        disabled = true
    }

    return <Step finished={props.districtsNew !== undefined} stepIndex={5} title="Generieren">
        <div className="flex justify-end mt-4">
            <Button className="grow h-20 text-xl font-semibold mx-4" onClick={onGeneratingDistrictingData} title={title} disabled={disabled}></Button>
        </div>
    </Step>
}

