import { Disclosure } from "@headlessui/react"

interface Props {
    title: string
    infotext: string
}

export function InfoDisclosure(props: Props) {
    return <Disclosure>
        <Disclosure.Button className="py-2">
            {props.title}
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
            {props.infotext}
        </Disclosure.Panel>
    </Disclosure>
}