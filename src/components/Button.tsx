interface Props {
    title: string
    disabled?: boolean
    onClick?: () => void
}

export function Button(props: Props) {
    return <button type="button" disabled={props.disabled} onClick={props.onClick} className="disabled:bg-gray-200 disabled:text-slate-500 disabled:border-gray-200  hover:bg-slate-50 hover:text-slate-700 border-2 px-4 rounded-lg border-slate-50 p-2">{props.title}</button>
}