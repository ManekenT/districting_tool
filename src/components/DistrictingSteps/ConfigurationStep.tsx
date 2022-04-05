import { RadioGroup } from "@headlessui/react";
import { algorithms } from "../../App";
import { Algorithm, Configuration } from "../../types";
import { InfoModal } from "../UI/InfoModal";
import { Slider } from "../UI/Slider";
import { Step } from "./Step";

interface Props {
    onConfigurationDone: (configuration: Configuration) => void
    configuration: Configuration
}

export function ConfigurationStep(props: Props) {

    function updateAlgorithm(algorithm: Algorithm) {
        console.log(algorithm);
        let configurationData: Configuration = {
            algorithm: algorithm,
            weightingValues: props.configuration.weightingValues
        }
        props.onConfigurationDone(configurationData)
    }

    function updateCompactness(value: number) {
        let configurationData: Configuration = {
            algorithm: props.configuration.algorithm,
            weightingValues: {
                compactness: value,
                populationEquality: props.configuration.weightingValues.populationEquality,
                contiguity: props.configuration.weightingValues.contiguity
            }
        }
        props.onConfigurationDone(configurationData)
    }

    function updatePopulationEquality(value: number) {
        let configurationData: Configuration = {
            algorithm: props.configuration.algorithm,
            weightingValues: {
                compactness: props.configuration.weightingValues.compactness,
                populationEquality: value,
                contiguity: props.configuration.weightingValues.contiguity
            }
        }
        props.onConfigurationDone(configurationData)
    }

    function updateContiguity(value: number) {
        let configurationData: Configuration = {
            algorithm: props.configuration.algorithm,
            weightingValues: {
                compactness: props.configuration.weightingValues.compactness,
                populationEquality: props.configuration.weightingValues.populationEquality,
                contiguity: value
            }
        }
        props.onConfigurationDone(configurationData)
    }

    return <Step finished={props.configuration.algorithm !== undefined} stepIndex={2} title="Konfigurieren">
        <div className="w-full h-full space-y-4">
            <RadioGroup value={props.configuration?.algorithm} onChange={updateAlgorithm}>
                <div className="space-y-2">
                    {algorithms.map((algo) => {
                        return <RadioGroup.Option value={algo.name} key={algo.name}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-1 ring-offset-1 ring-offset-slate-200 ring-slate-300'
                                    : ''
                                }
                        ${checked ? 'bg-slate-200 text-slate-700' : 'bg-slate-700'
                                }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
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
                                        <InfoModal ></InfoModal>
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>
                    })
                    }
                </div>
            </RadioGroup>
            <div className="flex gap-2 flex-col">
                <div className="">Compactness</div>
                <Slider onChange={updateCompactness} defaultValue={0} max={10} min={0}></Slider>
                <div className="">Population Equality</div>
                <Slider onChange={updatePopulationEquality} defaultValue={0} max={10} min={0}></Slider>
                <div className="">Contiguity</div>
                <Slider onChange={updateContiguity} defaultValue={0} max={10} min={0}></Slider>
            </div>
        </div>
    </Step >
}