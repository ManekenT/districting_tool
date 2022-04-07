import { RadioGroup } from "@headlessui/react";
import { ValueBar } from "../UI/ValueBar";
import { Step } from "./Step";

interface Props {
    setContiguity: (contiguity: boolean) => void
    contiguity?: boolean
}

export function ConstraintStep(props: Props) {
    let finished = props.contiguity !== undefined
    return <Step finished={finished} stepIndex={4} title="Einschränkungen wählen">
        <div className="w-full h-full space-y-4">
            <ValueBar title="Zusammenhängig" onChange={props.setContiguity} values={[false, true]} value={props.contiguity} displayValue={boolToString} />
        </div>
    </Step >
}

function boolToString(value: boolean) {
    return value ? "Ja" : "Nein"
}

