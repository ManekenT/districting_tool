import { Button, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface Props {
    children?: React.ReactNode;
}

export function InfoModal(props: Props) {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                type="button"
                className="text-base font-bold rounded-full border border-slate-200 text-slate-200 px-2 hover:bg-slate-200 hover:text-slate-900"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none shadow-2xl"
                onClose={() => setIsOpen(false)}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-slate-50 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className="mt-2 prose prose-slate">{props.children}</div>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Fertig
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            {/* <div className="min-h-screen px-4 text-center">
                    <div className="fixed inset-0" />

                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 shadow-xl rounded-2xl">
                        <div className="mt-2 prose prose-slate">{props.children}</div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 mt-6 text-sm font-medium text-slate-900 bg-slate-300 border border-transparent rounded-md hover:bg-slate-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                                onClick={() => setIsOpen(false)}
                            >
                                Fertig
                            </button>
                        </div>
                    </div>
                </div> */}
        </>
    );
}
