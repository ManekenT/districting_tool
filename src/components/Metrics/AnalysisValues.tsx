import { Disclosure } from "@headlessui/react"
import { DistrictSchema } from "../../classes/DistrictSchema"
import { GeoMap } from "../../classes/Map"
import { efficiencyGap } from "../../util/metrics"
import { closerToZero, greater } from "../../util/util"
import { decimalToPercentString } from "../../util/util"
import { Title } from "../UI/Title"
import { ValueComparison } from "./ValueComparison"

interface Props {
    map?: GeoMap
    districtsOld?: DistrictSchema
    districtsNew?: DistrictSchema
}

export function AnalysisValues(props: Props) {
    let efficiencyGapOld;
    if (props.map !== undefined && props.districtsOld !== undefined) {
        efficiencyGapOld = efficiencyGap(props.map, props.districtsOld);
    }
    let efficiencyGapNew;
    if (props.map !== undefined && props.districtsNew !== undefined) {
        efficiencyGapNew = efficiencyGap(props.map, props.districtsNew);
    }
    return <div className="w-1/6 h-screen text-slate-50">
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
        </div>

    </div>
}