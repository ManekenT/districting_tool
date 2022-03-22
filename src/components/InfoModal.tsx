import { Dialog } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Button } from "./Button"

export function InfoModal() {
    let [isOpen, setIsOpen] = useState(false)
    return <>
        <button type="button" className="text-base rounded-lg border-2 py-1 px-3 hover:bg-slate-50 hover:text-slate-900" onClick={() => setIsOpen(true)} >Hilfe</button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} as="div" className="fixed inset-0 z-10 overflow-auto">
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0" />

                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 shadow-xl rounded-2xl">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-slate-900"
                    >
                        Hilfedialog
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-slate-500">
                            Hier stehen hilfreiche Texte zu den jeweiligen Bereichen!
                        </p>
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-300 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
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