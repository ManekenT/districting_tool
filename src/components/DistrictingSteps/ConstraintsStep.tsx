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
    return <Step finished={finished} stepIndex={4} title="Einschränkungen wählen">
        <div className="w-full h-full space-y-4">
            <ValueBar title="Zusammenhängige Bezirke?" onChange={props.setContiguity} values={[false, true]} value={props.contiguity} displayValue={boolToString} />
            <ValueBar title="Anzahl Bezirke beibehalten?" onChange={props.setKeepDistrictCount} values={[false, true]} value={props.keepDistrictCount} displayValue={boolToString} />
        </div>
    </Step >
}

function boolToString(value: boolean) {
    return value ? "Ja" : "Nein"
}

