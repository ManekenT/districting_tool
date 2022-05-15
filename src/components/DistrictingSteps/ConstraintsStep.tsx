import { ContiguityHelp } from "../../helptexts/constraints/contiguity";
import { KeepDistrictCountHelp } from "../../helptexts/constraints/keepDistrictCount";
import { ConstraintsHelp } from "../../helptexts/steps/constraints";
import { ValueBar } from "../UI/ValueBar";
import { Step } from "./Step";

interface Props {
    setContiguity: (contiguity: boolean) => void
    setKeepDistrictCount: (keepDistrictCount: boolean) => void
    contiguity?: boolean
    keepDistrictCount?: boolean
}

export function ConstraintStep(props: Props) {
    let finished = props.contiguity !== undefined && props.keepDistrictCount !== undefined
    return <Step finished={finished} stepIndex={4} title="Einschränkungen wählen" helpText={<ConstraintsHelp />}>
        <div className="w-full h-full space-y-4">
            <ValueBar title="Zusammenhängige Bezirke?" onChange={props.setContiguity} values={[true, false]} value={props.contiguity} displayValue={boolToString} helpText={<ContiguityHelp />} />
            <ValueBar title="Anzahl Bezirke beibehalten?" onChange={props.setKeepDistrictCount} values={[true, false]} value={props.keepDistrictCount} displayValue={boolToString} helpText={<KeepDistrictCountHelp />} />
        </div>
    </Step >
}

function boolToString(value: boolean) {
    return value ? "Ja" : "Nein"
}
