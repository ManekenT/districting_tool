import { ValueBar } from "../UI/ValueBar";
import { Step } from "./Step";

interface Props {
    setPopulationEquality: (value: number) => void
    setCompactness: (value: number) => void
    populationEquality?: number
    compactness?: number
}

export function WeightingStep(props: Props) {
    let finished = props.populationEquality !== undefined && props.compactness !== undefined
    return <Step finished={finished} stepIndex={3} title="Gewichtung wählen">
        <div className="w-full h-full space-y-4">
            <ValueBar title="Kompaktheit" value={props.compactness} onChange={props.setCompactness} values={[0, 1, 2, 3, 4, 5]} />
            <ValueBar title="Gleiche Einwohnerzahl" value={props.populationEquality} onChange={props.setPopulationEquality} values={[0, 1, 2, 3, 4, 5]} />
        </div>
    </Step >
}

