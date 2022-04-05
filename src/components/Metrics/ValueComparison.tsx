
interface Props {
    title: string
    value1?: number
    value2?: number
    comparisonFunction: (a: number, b: number) => number
    displayString?: (value?: number) => string
}

export function ValueComparison(props: Props) {
    let color1;
    let color2;
    if (props.value1 !== undefined && props.value2 !== undefined) {
        if (props.comparisonFunction(props.value1, props.value2) > 0) {
            color1 = "bg-green-500";
            color2 = "bg-red-500";
        } else if (props.comparisonFunction(props.value1, props.value2) < 0) {
            color1 = "bg-red-500";
            color2 = "bg-green-500";
        } else {
            color1 = "bg-yellow-500";
            color2 = "bg-yellow-500";
        }
    }
    let value1String: string = props.value1 === undefined ? "N/A" : props.value1.toString();
    let value2String: string = props.value2 === undefined ? "N/A" : props.value2.toString();
    if (props.displayString !== undefined) {
        value1String = props.displayString(props.value1);
        value2String = props.displayString(props.value2);
    }
    return <div className="grid grid-cols-2">
        <div className=" col-span-2 text-center bg-slate-700 h-12 flex justify-center items-center">{props.title}</div>
        <div className={"text-center p-2 " + color1}>{value1String}</div>
        <div className={"text-center p-2 " + color2}>{value2String}</div>
    </div>
}