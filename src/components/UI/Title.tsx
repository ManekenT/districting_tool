interface Props {
    title: string
}

export function Title(props: Props) {
    return <div className="h-12 bg-slate-700 text-slate-50 flex justify-center items-center">
        <div className="text-xl font-semibold">
            {props.title}
        </div>
    </div>
}