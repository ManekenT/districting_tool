import { RadioGroup } from "@headlessui/react"

interface Props {
    title: string
    onChange: (value: any) => void
    values: any[]
    value: any
    displayValue?: (value: any) => string
}

export function ValueBar(props: Props) {
    return <RadioGroup value={props.value} onChange={props.onChange} className="space-y-2">
        <RadioGroup.Label
            as={"p"}
            className="text-slate-50 border-slate-700"
        >
            {props.title}
        </RadioGroup.Label>
        <div className="flex">
            {props.values.map((value, index) => {
                let displayString = props.displayValue !== undefined ? props.displayValue(value) : value
                return <RadioGroup.Option value={value} key={value}
                    className={({ active, checked }) =>
                        `${checked ? "bg-slate-200 text-slate-700" : 'bg-slate-700'} 
                        ${index === 0 ? "rounded-l-lg" : ""} 
                        ${index === props.values.length - 1 ? "rounded-r-lg" : ""} 
                        grow shadow-md px-5 py-2 cursor-pointer flex focus:outline-none`
                    }
                >
                    {({ active, checked }) => (
                        <div className="flex items-center justify-center w-full text-sm">
                            <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${checked ? 'text-slate-700 border-slate-700' : 'text-slate-50'}`}
                            >
                                {displayString}
                            </RadioGroup.Label>
                        </div>
                    )}
                </RadioGroup.Option>
            })
            }
        </div>
    </RadioGroup>
}