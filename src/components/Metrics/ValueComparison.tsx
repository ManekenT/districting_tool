import { decimalToPercentString } from "../../util/util"
import { InfoModal } from "../UI/InfoModal"

interface Props {
    title: string
    value1?: number
    value2?: number
    helpText: React.ReactNode
}

export function ValueComparison(props: Props) {
    let color1;
    let color2;
    if (props.value1 !== undefined && props.value2 !== undefined) {
        if (props.value1 - props.value2 < 0) {
            color1 = "bg-green-500";
            color2 = "bg-red-500";
        } else if (props.value1 - props.value2 > 0) {
            color1 = "bg-red-500";
            color2 = "bg-green-500";
        } else {
            color1 = "bg-yellow-500";
            color2 = "bg-yellow-500";
        }
    }
    let value1String: string = props.value1 === undefined ? "N/A" : decimalToPercentString(1 - props.value1);
    let value2String: string = props.value2 === undefined ? "N/A" : decimalToPercentString(1 - props.value2);
    return <div className="grid grid-cols-2">
        <div className=" col-span-2 text-center bg-slate-700 h-12 flex justify-center items-center">
            <div className="flex gap-2 items-center">
                {props.title}
                <InfoModal>{props.helpText}</InfoModal>
            </div>
        </div>
        <div className={`text-center p-2 ${color1}`}>{value1String}</div>
        <div className={`text-center p-2 ${color2}`}>{value2String}</div>
    </div>
}

