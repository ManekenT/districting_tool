import { ValueBar } from "../UI/ValueBar";
import { Step } from "./Step";

interface Props {
    setPopulationEquality: (value: number) => void
    setCompactness: (value: number) => void
    setEfficiencyGap: (value: number) => void
    populationEquality?: number
    compactness?: number
    efficiencyGap?: number
}

const scale = [0, 1, 2, 3, 4, 5]

export function WeightingStep(props: Props) {
    let finished = props.efficiencyGap !== undefined && props.populationEquality !== undefined && props.compactness !== undefined
    return <Step finished={finished} stepIndex={3} title="Gewichtung wählen">
        <div className="w-full h-full space-y-4">
            <ValueBar title="Kompaktheit" value={props.compactness} onChange={props.setCompactness} values={scale} />
            <ValueBar title="Gleiche Einwohnerzahl" value={props.populationEquality} onChange={props.setPopulationEquality} values={scale} />
            <ValueBar title="Efficiency Gap" value={props.efficiencyGap} onChange={props.setEfficiencyGap} values={scale} />
        </div>
    </Step >
}

