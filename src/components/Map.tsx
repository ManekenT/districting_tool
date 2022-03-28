import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet"
import { ConfigurationData, DistrictingData, MapData } from "../types"

interface Props {
    mapData?: MapData
    configurationData?: ConfigurationData
    districtingData?: DistrictingData
}

export function DistrictMap(props: Props) {

    return <div className="w-4/6 h-screen bg-slate-500 text-slate-50">
        <MapContainer center={[53.551086, 9.993682]} zoom={11} className="h-3/4">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {

                // @ts-ignore
                props.mapData && <GeoJSON data={props.mapData.data} />
            }
        </MapContainer>
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