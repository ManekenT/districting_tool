import { InfoModal } from "./InfoModal";

interface Props {
    state: "todo" | "finished" | "error"
    children?: React.ReactNode
    stepIndex: number
    title: string
}

export function Step(props: Props) {
    let color: string = "bg-slate-50";
    if (props.state === "todo") {
        color = "bg-slate-700";
    } else if (props.state === "finished") {
        color = "bg-green-500";
    } else if (props.state === "error") {
        color = "bg-red-500";
    }
    return <div className="text-slate-50 border-slate-50" >
        <div className={"text-xl font-semibold flex items-center px-4 py-2 transition-colors " + color}>
            {props.stepIndex + ". " + props.title}
            <div className="flex-grow" />
            <InfoModal></InfoModal>
        </div>
        <div className="p-4">
            {props.children}

        </div>
    </div >
}