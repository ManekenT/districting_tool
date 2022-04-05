import { Switch } from "@headlessui/react"
import { useState } from "react"
import { Button } from "../UI/Button"

interface Props {
    onToggleDistricts: () => void
}

export function Legend(props: Props) {
    const [enabled, setEnabled] = useState(false)

    function toggleDistricts(toggle: boolean) {
        setEnabled(toggle);
        props.onToggleDistricts();
    }

    return <div className="px-4 text-lg h-14 flex">
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4">Alte Bezirke</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={toggleDistricts}
                    className={`${enabled ? 'bg-slate-700' : 'bg-slate-200'
                        } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-slate-50 rounded-full`}
                    />
                </Switch>
                <Switch.Label className="ml-4">Neue Bezirke</Switch.Label>
            </div>
        </Switch.Group>

    </div>
}