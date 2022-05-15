interface Props {
    href: string
    children: string
}

export function Link(props: Props) {
    return <a href={props.href} target="_blank" rel="noreferrer noopener">{props.children}</a>
}