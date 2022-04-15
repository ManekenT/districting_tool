import { Switch } from "@headlessui/react"

interface Props {
    showNewDistricts: boolean;
    setShowNewDistricts: (value: boolean) => void
}

export function DistrictSwitch(props: Props) {

    return <div className="px-4 text-lg h-14 flex justify-center">
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4">Alte Bezirke</Switch.Label>
                <Switch
                    checked={props.showNewDistricts}
                    onChange={props.setShowNewDistricts}
                    className={`${props.showNewDistricts ? 'bg-slate-700' : 'bg-slate-200'
                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${props.showNewDistricts ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-slate-50 rounded-full transition-transform`}
                    />
                </Switch>
                <Switch.Label className="ml-4 font-semibold">Neue Bezirke</Switch.Label>
            </div>
        </Switch.Group>

    </div>
}