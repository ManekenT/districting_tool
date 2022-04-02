import { Configuration, Districts, GeoMap } from "../types";
import { GeneratingStep } from "./GeneratingStep";
import { UploadStep } from "./UploadStep";
import { ConfigurationStep } from "./ConfigurationStep";
import { Title } from "./Title";

interface Props {
    onUploadDone: (map: GeoMap, districts: Districts) => void
    map?: GeoMap
    districtsOld?: Districts
    onConfigurationDone: (configuration: Configuration) => void
    configuration: Configuration
    onGeneratingDone: (districtingData: Districts) => void
    districtsNew?: Districts
}

export function ProcessBar(props: Props) {
    return <div className="w-1/6 h-screen bg-slate-600">
        <Title title="Anleitung" />
        <UploadStep onUploadDone={props.onUploadDone} map={props.map} districtsOld={props.districtsOld} />
        <ConfigurationStep onConfigurationDone={props.onConfigurationDone} configuration={props.configuration} />
        <GeneratingStep onGeneratingDone={props.onGeneratingDone} map={props.map} configuration={props.configuration} districtsNew={props.districtsNew} />
    </div>
}