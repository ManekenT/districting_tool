import { DistrictSchema } from "../../classes/DistrictSchema"
import { GeoMap } from "../../classes/GeoMap"
import { calculateVotesPerDistrict, calculateWonDistricts, sumDistrictVotes } from "../../util/districtGenerator"

interface Props {
    districts?: DistrictSchema
    map?: GeoMap
}

const width = 800

export function Results(props: Props) {
    let votes = {
        blue: 0,
        yellow: 0
    }
    let wonDistricts = {
        blue: 0,
        yellow: 0
    }
    if (props.districts !== undefined && props.map !== undefined) {
        let votesPerDistrict = calculateVotesPerDistrict(props.map, props.districts)
        votes = sumDistrictVotes(votesPerDistrict)
        wonDistricts = calculateWonDistricts(votesPerDistrict)
    }

    let totalVotes = votes.blue + votes.yellow
    let blueRatio = votes.blue / totalVotes

    let totalDistricts = wonDistricts.blue + wonDistricts.yellow
    let blueDistrictRatio = wonDistricts.blue / totalDistricts
    return <div className="flex-col flex items-center space-y-2 text-xl p-8">
        <div>Stimmen gesamt</div>
        <div className="flex justify-center items-center space-x-4">
            <div>{votes.blue}</div>
            <svg className="h-8" viewBox={`0 0 ${width} 100`}>
                {props.districts && props.map ?
                    <>
                        <rect className="fill-blue-500" x="0" y="0" width={width * blueRatio} height={100}></rect>
                        <rect className="fill-yellow-500" x={width * blueRatio} y="0" width={width - width * blueRatio} height={100}></rect>
                    </>
                    :
                    <rect className="fill-slate-200" x="0" y="0" width={width} height={100}></rect>
                }
            </svg>
            <div>{votes.yellow}</div>
        </div>
        <div>Gewonnene Bezirke</div>
        <div className="flex justify-center  items-center space-x-4">
            <div>{wonDistricts.blue}</div>
            <svg className="h-8" viewBox={`0 0 ${width} 100`}>
                {props.districts && props.map ?
                    <>
                        <rect className="fill-blue-500" x="0" y="0" width={width * blueDistrictRatio} height={100}></rect>
                        <rect className="fill-yellow-500" x={width * blueDistrictRatio} y="0" width={width - width * blueDistrictRatio} height={100}></rect>
                    </>
                    :
                    <rect className="fill-slate-200" x="0" y="0" width={width} height={100}></rect>
                }
            </svg>
            <div>{wonDistricts.yellow}</div>
        </div>
    </div>
}