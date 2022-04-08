interface Props {
    title: string
    disabled?: boolean
    onClick?: () => void
    className?: string
}

export function Button(props: Props) {
    return <button
        type="button"
        disabled={props.disabled}
        onClick={props.onClick}
        className={`disabled:text-slate-50/60 disabled:border-slate-50/30 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent hover:bg-slate-50 hover:text-slate-700 border-2 px-4 rounded-lg border-slate-50 p-2 ${props.className}`}
    >
        {props.title}
    </button>
}