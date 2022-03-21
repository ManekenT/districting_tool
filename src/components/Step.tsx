interface Props {
    state: "todo" | "finished" | "error"
}

export function Step(props: Props) {
    let color: string = "bg-slate-200";
    if (props.state === "todo") {
        color = "bg-slate-500";
    } else if (props.state === "finished") {
        color = "bg-green-500";
    } else if (props.state === "error") {
        color = "bg-red-500";
    }
    return <div className={"h-96 " + color} >
    </div >
}