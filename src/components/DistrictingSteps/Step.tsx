import { InfoModal } from "../UI/InfoModal";

interface Props {
    finished: boolean
    children?: React.ReactNode
    stepIndex: number
    title: string
    helpText: React.ReactNode
}

export function Step(props: Props) {
    let color = props.finished ? "bg-green-500" : "bg-slate-700";
    return <div className="text-slate-50 border-slate-50 mb-4" >
        <div className={`text-xl font-semibold flex items-center px-4 py-2 transition-colors ${color}`}>
            {props.stepIndex + ". " + props.title}
            <div className="flex-grow" />
            <InfoModal>{props.helpText}</InfoModal>
        </div>
        <div className="p-4">
            {props.children}
        </div>
    </div >
}