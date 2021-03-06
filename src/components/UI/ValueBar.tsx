import { RadioGroup } from "@headlessui/react"
import { InfoModal } from "./InfoModal"

interface Props {
    title: string
    onChange: (value: any) => void
    values: any[]
    value: any
    displayValue?: (value: any) => string
    helpText: React.ReactNode
}

export function ValueBar(props: Props) {
    return <div className="flex gap-2">
        <RadioGroup value={props.value} onChange={props.onChange} className={"space-y-1 flex items-center grow"}>
            <RadioGroup.Label
                as={"p"}
                className="text-slate-50 border-slate-700 pl-2 grow"
            >
                {props.title}
            </RadioGroup.Label>
            <div className="flex">
                {props.values.map((value, index) => {
                    let displayString = props.displayValue !== undefined ? props.displayValue(value) : value
                    return <RadioGroup.Option value={value} key={value}
                        className={({ active, checked }) =>
                            `${checked ? "bg-slate-200 text-slate-700 shadow-inner" : 'bg-slate-700'} 
                        shadow-md px-5 py-1 cursor-pointer flex focus:outline-none first:rounded-l-lg last:rounded-r-lg`
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
        <InfoModal>{props.helpText}</InfoModal>
    </div>
}
