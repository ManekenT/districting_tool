import { RadioGroup } from "@headlessui/react";
import { Algorithm, ConfigurationData, State } from "../types";
import { Step } from "./Step";

interface Props {
    onConfigurationDone: (configurationData: ConfigurationData) => void
    configurationData?: ConfigurationData
}

export function ConfigurationStep(props: Props) {

    function onConfigurationDone(algorithm: Algorithm) {
        if (algorithm !== undefined) {
            console.log(algorithm);
            let configurationData: ConfigurationData = {
                algorithm: algorithm,
                weightingValues: "Gewichtung"
            }
            props.onConfigurationDone(configurationData)
        }
    }

    let state: State;
    if (props.configurationData !== undefined) {
        state = "finished"
    } else {
        state = "todo"
    }

    return <Step state={state} stepIndex={2} title="Algorithmus auswählen und Variablen gewichten">
        <RadioGroup value={props.configurationData?.algorithm} onChange={onConfigurationDone}>
            <RadioGroup.Label>Algorithmus</RadioGroup.Label>
            <RadioGroup.Option value="Algorithmus 1">
                {({ checked }) => (
                    <span className={checked ? 'bg-blue-200' : ''}>Algorithmus 1</span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Algorithmus 2">
                {({ checked }) => (
                    <span className={checked ? 'bg-blue-200' : ''}>Algorithmus 2</span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Algorithmus 3">
                {({ checked }) => (
                    <span className={checked ? 'bg-blue-200' : ''}>Algorithmus 3</span>
                )}
            </RadioGroup.Option>
        </RadioGroup>
    </Step>
}