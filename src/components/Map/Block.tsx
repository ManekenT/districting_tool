import { Direction } from "../../types"

interface Props {
    color: string
    districtColor: string
    x: number
    y: number
    width: number
    height: number
    districtId?: number
    onDirectionClicked: (direction: Direction) => void
}

export function Block(props: Props) {
    const { color, districtColor, x, y, width, height, districtId, onDirectionClicked } = props;
    return <g>
        <polygon className={districtColor} points={`${x},${y} ${x + width},${y} ${x + width / 2},${y + height / 2}`} onClick={() => onDirectionClicked("North")}></polygon>
        <polygon className={districtColor} points={`${x + width},${y} ${x + width},${y + height} ${x + width / 2},${y + height / 2}`} onClick={() => onDirectionClicked("East")}></polygon>
        <polygon className={districtColor} points={`${x + width},${y + height} ${x},${y + height} ${x + width / 2},${y + height / 2}`} onClick={() => onDirectionClicked("South")}></polygon>
        <polygon className={districtColor} points={`${x},${y + height} ${x},${y} ${x + width / 2},${y + height / 2}`} onClick={() => onDirectionClicked("West")}></polygon>
        <circle className={"" + color} cx={x + width / 2} cy={y + height / 2} r={width / 4}></circle>
        <text className="text-lg fill-slate-700" x={x + width / 10} y={y + height - height / 15}>{districtId}</text>
    </g>
}