import { ConfigurationData, DistrictingData, MapData } from "../types";
import { GeneratingStep } from "./GeneratingStep";
import { UploadStep } from "./UploadStep";
import { ConfigurationStep } from "./ConfigurationStep";
import { Title } from "./Title";

interface Props {
    onUploadDone: (data: MapData) => void
    mapData?: MapData
    onConfigurationDone: (configurationData: ConfigurationData) => void
    configurationData?: ConfigurationData
    onGeneratingDone: (districtingData: DistrictingData) => void
    districtingData?: DistrictingData
}

export function ProcessBar(props: Props) {
    return <div className="w-1/6 h-screen bg-slate-600">
        <Title title="Anleitung" />
        <UploadStep onUploadDone={props.onUploadDone} mapData={props.mapData} />
        <ConfigurationStep onConfigurationDone={props.onConfigurationDone} configurationData={props.configurationData} />
        <GeneratingStep onGeneratingDone={props.onGeneratingDone} mapData={props.mapData} configurationData={props.configurationData} districtingData={props.districtingData} />
    </div>
}