import { ConfigurationData, DistrictingData, MapData } from "../types"
import { Title } from "./Title"

interface Props {
    mapData?: MapData
    configurationData?: ConfigurationData
    districtingData?: DistrictingData
}

export function Map(props: Props) {
    return <div className="w-1/2 h-screen bg-slate-500 text-slate-50">
        <Title title="Karte" />
        <div className="flex gap-4 flex-col p-4 items-center text-2xl font-semibold">
            <div>
                {props.mapData !== undefined && props.mapData.data + " geladen"}
            </div>
            <div>
                {props.configurationData !== undefined && props.configurationData.algorithm + " + " + props.configurationData.weightingValues + " geladen"}
            </div>
            <div>
                {props.districtingData !== undefined && props.districtingData.data + " generiert"}
            </div>
        </div>
    </div>
}