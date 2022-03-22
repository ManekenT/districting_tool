interface Props {
    title: string
    value1?: number
    value2?: number
}

export function ValueComparison(props: Props) {
    let color1;
    let color2;
    if (props.value1 !== undefined && props.value2 !== undefined) {
        if (props.value1 > props.value2) {
            color1 = "bg-green-500";
            color2 = "bg-red-500";
        } else if (props.value2 > props.value1) {
            color1 = "bg-red-500";
            color2 = "bg-green-500";
        } else {
            color1 = "bg-yellow-500";
            color2 = "bg-yellow-500";
        }
    }
    return <>
        <div className="col-span-2 text-center bg-slate-700 h-12 flex justify-center items-center">{props.title}</div>
        <div className={"text-center p-2 " + color1}>{props.value1}</div>
        <div className={"text-center p-2 " + color2}>{props.value2}</div>
    </>
}