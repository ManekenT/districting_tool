import ReactSlider from 'react-slider'

interface Props {
    defaultValue: number
    max: number
    min: number
    onChange: (value: number, index: number) => void
}

export function Slider(props: Props) {
    return <ReactSlider
        marks
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        className="h-8 flex items-center text-sm grow"
        thumbClassName="bg-slate-700 w-8 h-8 text-center flex justify-center items-center rounded-lg hover:cursor-grab"
        trackClassName="bg-slate-500 h-2 rounded-xl"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onAfterChange={props.onChange} />
}