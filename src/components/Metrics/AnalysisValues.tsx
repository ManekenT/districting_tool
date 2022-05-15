import { DistrictSchema } from "../../classes/DistrictSchema"
import { GeoMap } from "../../classes/GeoMap"
import { CompactnessHelp } from "../../helptexts/metrics/compactness"
import { EfficiencyGapHelp } from "../../helptexts/metrics/efficiencyGap"
import { MetricsHelp } from "../../helptexts/metrics"
import { PopulationEqualityHelp } from "../../helptexts/metrics/populationEquality"
import { compactness, efficiencyGap, populationEquality } from "../../util/metrics"
import { closerToZero, roundedString } from "../../util/util"
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

    let compactnessOld = props.districtsOld ? compactness(props.districtsOld) : undefined;
    let compactnessNew = props.districtsNew ? compactness(props.districtsNew) : undefined;

    let populationEqualityOld = props.districtsOld ? populationEquality(props.districtsOld) : undefined;
    let populationEqualityNew = props.districtsNew ? populationEquality(props.districtsNew) : undefined;

    return <div className="w-2/12 h-screen text-slate-50">
        <Title title="Kennzahlen" helpText={<MetricsHelp />} />
        <div className="text-center">
            <div className="grid grid-cols-2 h-14 items-center">
                <div className="p-2">Alte Wahlbezirke</div>
                <div className="p-2 font-semibold">Neue Wahlbezirke</div>
            </div>
            <ValueComparison title="Kompaktheit" comparisonFunction={closerToZero} displayString={roundedString} value1={compactnessOld} value2={compactnessNew} helpText={<CompactnessHelp />} />
            <ValueComparison title="Bevölkerungsgleichheit" comparisonFunction={closerToZero} displayString={roundedString} value1={populationEqualityOld} value2={populationEqualityNew} helpText={<PopulationEqualityHelp />} />
            <ValueComparison title="Efficiency Gap" comparisonFunction={closerToZero} displayString={decimalToPercentString} value1={efficiencyGapOld?.gap} value2={efficiencyGapNew?.gap} helpText={<EfficiencyGapHelp />}></ValueComparison>
        </div>

    </div>
}