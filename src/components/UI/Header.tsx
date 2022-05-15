import { DistrictingToolHelp } from "../../helptexts/districtingTool";
import { InfoModal } from "./InfoModal";

export function Header() {
    return <div className="h-16 bg-slate-700 text-slate-50 gap-2 flex justify-center items-center">
        <div className="text-2xl font-bold">
            Districting Tool
        </div>
        <InfoModal>{<DistrictingToolHelp />}</InfoModal>
    </div>
}