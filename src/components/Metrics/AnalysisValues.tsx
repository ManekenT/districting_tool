import { Disclosure } from "@headlessui/react"
import { Districts, GeoMap } from "../../types"
import { calculateEfficiencyGap, closerToZero, greater } from "../../util/districtGenerator"
import { decimalToPercentString } from "../../util/util"
import { Title } from "../UI/Title"
import { ValueComparison } from "./ValueComparison"

interface Props {
    map?: GeoMap
    districtsOld?: Districts
    districtsNew?: Districts
}

export function AnalysisValues(props: Props) {
    let efficiencyGapOld;
    if (props.map !== undefined && props.districtsOld !== undefined) {
        efficiencyGapOld = calculateEfficiencyGap(props.map, props.districtsOld);
    }
    let efficiencyGapNew;
    if (props.map !== undefined && props.districtsNew !== undefined) {
        efficiencyGapNew = calculateEfficiencyGap(props.map, props.districtsNew);
    }
    return <div className="w-1/6 h-screen bg-slate-600 text-slate-50">
        <Title title="Kennzahlen" />
        <div className="text-center">
            <div className="grid grid-cols-2 h-14 items-center">
                <div className="p-2">Alte Wahlbezirke</div>
                <div className="p-2 font-semibold">Neue Wahlbezirke</div>
            </div>
            <Disclosure>
                <Disclosure.Button className="w-full">
                    <ValueComparison title="Efficiency Gap" comparisonFunction={closerToZero} displayString={decimalToPercentString} value1={efficiencyGapOld?.gap} value2={efficiencyGapNew?.gap}></ValueComparison>
                </Disclosure.Button>
                <Disclosure.Panel>
                    <ValueComparison title="Wasted Votes Blue" comparisonFunction={greater} value1={efficiencyGapOld?.wastedVotes.blue} value2={efficiencyGapNew?.wastedVotes.blue}></ValueComparison>
                    <ValueComparison title="Wasted Votes Yellow" comparisonFunction={greater} value1={efficiencyGapOld?.wastedVotes.yellow} value2={efficiencyGapNew?.wastedVotes.yellow}></ValueComparison>

                </Disclosure.Panel>
            </Disclosure>
            <ValueComparison title="Partisan Symmetry" value1={3} value2={2} comparisonFunction={greater}></ValueComparison>
        </div>

    </div>
}