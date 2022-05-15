import { InfoModal } from "./InfoModal"

interface Props {
    title: string
    helpText: React.ReactNode
}

export function Title(props: Props) {
    return <div className="h-12 bg-slate-700 text-slate-50  gap-2 flex justify-center items-center">
        <div className="text-xl font-semibold">
            {props.title}
        </div>
        <InfoModal>{props.helpText}</InfoModal>
    </div>
}