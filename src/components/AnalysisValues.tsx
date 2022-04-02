import { Districts, GeoMap } from "../types"
import { calculateEfficiencyGap } from "../util/districtGenerator"
import { Title } from "./Title"
import { ValueComparison } from "./ValueComparison"

interface Props {
    map?: GeoMap
    districtsOld?: Districts
    districtsNew?: Districts
}

export function AnalysisValues(props: Props) {
    if (props.map !== undefined && props.districtsOld !== undefined) {
        calculateEfficiencyGap(props.map, props.districtsOld);
    }
    return <div className="w-1/6 h-screen bg-slate-600 text-slate-50">
        <Title title="Kennzahlen" />
        <div className="grid grid-cols-2 text-center">
            <div className="p-2">Alte Wahlbezirke</div>
            <div className="p-2 font-semibold">Neue Wahlbezirke</div>
            <ValueComparison title="Partisan Symmetry" value1={3} value2={2}></ValueComparison>
            <ValueComparison title="Responsiveness (Swing Ratio)" value1={1} value2={2}></ValueComparison>
            <ValueComparison title="Equal Vote Weight" value1={4} value2={4}></ValueComparison>
            <ValueComparison title="Declination" value1={5} value2={2}></ValueComparison>
            <ValueComparison title="Efficiency Gap" value1={20} value2={23}></ValueComparison>
        </div>
    </div>
}