import { Dialog } from "@headlessui/react"
import { Fragment, useState } from "react"

interface Props {
    children?: React.ReactNode
}

export function InfoModal(props: Props) {
    let [isOpen, setIsOpen] = useState(false)
    return <>
        <button type="button" className="text-base font-bold rounded-2xl border-2 px-2 hover:bg-slate-50 hover:text-slate-900" onClick={() => setIsOpen(true)} >?</button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} as="div" className="fixed inset-0 z-10 overflow-auto">
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0" />

                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 shadow-xl rounded-2xl">

                    <div className="mt-2 prose prose-slate">
                        {props.children}
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 mt-6 text-sm font-medium text-slate-900 bg-slate-300 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Fertig
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    </>
}