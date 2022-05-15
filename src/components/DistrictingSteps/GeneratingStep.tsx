import { DistrictSchema } from "../../classes/DistrictSchema";
import { GeoMap } from "../../classes/GeoMap";
import { GenerateHelp } from "../../helptexts/steps/generate";
import { Algorithm } from "../../types";
import { Button } from "../UI/Button";
import { Step } from "./Step";

interface Props {
    setDistrictsNew: (districts: DistrictSchema) => void
    map?: GeoMap
    algorithm?: Algorithm
    populationEquality?: number
    compactness?: number
    efficiencyGap?: number
    contiguity?: boolean
    keepDistrictCount?: boolean
    districtsOld?: DistrictSchema
    districtsNew?: DistrictSchema
}

export function GeneratingStep(props: Props) {

    function checkPrerequisites() {
        return props.map !== undefined
            && props.algorithm !== undefined
            && props.compactness !== undefined
            && props.populationEquality !== undefined
            && props.efficiencyGap !== undefined
            && props.contiguity !== undefined
            && props.keepDistrictCount !== undefined
            && props.districtsOld !== undefined
    }

    function onGeneratingDistrictingData() {
        if (!checkPrerequisites()) {
            return
        }
        let map = props.map!
        let districtsOld = props.districtsOld!
        let weighting = {
            populationEquality: props.populationEquality!,
            compactness: props.compactness!,
            efficiencyGap: props.efficiencyGap!
        }
        let constraints = {
            contiguity: props.contiguity!,
            keepDistrictCount: props.keepDistrictCount!
        }

        let districts = props.algorithm!.algorithm(map, districtsOld, weighting, constraints);
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

    return <Step finished={props.districtsNew !== undefined} stepIndex={5} title="Generieren" helpText={<GenerateHelp />}>
        <div className="flex justify-end mt-4">
            <Button className="grow text-xl font-semibold mx-4" onClick={onGeneratingDistrictingData} title={title} disabled={disabled}></Button>
        </div>
    </Step>
}

