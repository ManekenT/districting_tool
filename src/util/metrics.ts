import { DistrictSchema } from "../classes/DistrictSchema";
import { GeoMap } from "../classes/Map";
import { Votes } from "../types";
import { calculateVotesPerDistrict, calculateWastedVotesPerDistrict, sumDistrictVotes } from "./districtGenerator";

export function efficiencyGap(map: GeoMap, districts: DistrictSchema): { gap: number, wastedVotes: Votes } {
    let votes = calculateVotesPerDistrict(map, districts)
    let totalVotes = sumDistrictVotes(votes)
    let totalVoteCount = totalVotes.blue + totalVotes.yellow;
    let wastedVotes = calculateWastedVotesPerDistrict(votes)
    let totalWastedVotes = sumDistrictVotes(wastedVotes)

    let voteDifferences = totalWastedVotes.blue - totalWastedVotes.yellow;

    let efficiencyGap = voteDifferences / totalVoteCount;
    return {
        gap: efficiencyGap,
        wastedVotes: totalWastedVotes
    }
}