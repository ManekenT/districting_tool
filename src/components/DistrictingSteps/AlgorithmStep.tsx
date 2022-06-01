import { RadioGroup } from "@headlessui/react";
import { algorithms } from "../../App";
import { NewAlgorithmHelp } from "../../helptexts/algorithms/newAlgorithm";
import { AlgorithmsHelp } from "../../helptexts/steps/algorithms";
import { Algorithm } from "../../types";
import { Button } from "../UI/Button";
import { InfoModal } from "../UI/InfoModal";
import { Step } from "./Step";

interface Props {
    setAlgorithm: (algorithm: Algorithm) => void
    algorithm?: Algorithm
}

export function AlgorithmStep(props: Props) {

    return <Step finished={props.algorithm !== undefined} stepIndex={2} title="Algorithmus wählen" helpText={<AlgorithmsHelp />}>
        <div className="w-full h-full space-y-4">
            <RadioGroup value={props.algorithm} onChange={props.setAlgorithm}>
                <div className="space-y-2">
                    {algorithms.map((algo) => {
                        return AlgoOption(algo)
                    })}
                    { }
                </div>
            </RadioGroup>
        </div>
    </Step >
}

function AlgoOption(algo: Algorithm) {
    return <div className="flex items-center gap-x-2" key={algo.name}>
        <RadioGroup.Option value={algo} key={algo.name}
            className={({ active, checked }) =>
                `${active ? 'ring-1 ring-offset-1 ring-offset-slate-200 ring-slate-300' : ''} 
                            ${checked ? 'bg-slate-200 text-slate-700' : 'bg-slate-700'} 
                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none grow`
            }
        >
            {({ active, checked }) => (
                <>
                    <div className="flex items-center justify-between w-full text-sm">
                        <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-slate-700 border-slate-700' : 'text-slate-50'}`}
                        >
                            {algo.name}
                        </RadioGroup.Label>
                    </div>
                </>
            )}
        </RadioGroup.Option>
        <InfoModal >
            {algo.helpText}
        </InfoModal>
    </div>
}

