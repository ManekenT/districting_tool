import { Directions } from "../../classes/Directions"
import { Direction } from "../../types"

interface Props {
    color: string
    districtColor: string
    x: number
    y: number
    width: number
    height: number
    districtId?: number
    interactive: boolean
    onDirectionClicked: (direction: Direction) => void
    onHover: (direction: Direction) => string
}

export function Block(props: Props) {
    const { color, districtColor, x, y, width, height, districtId, interactive, onDirectionClicked, onHover } = props;

    const clickedFunction = (direction: Direction) => interactive ? () => onDirectionClicked(direction) : undefined;
    const hoverFunction = (direction: Direction) => interactive ? onHover(direction) : "";
    return <g>
        <polygon className={`${districtColor} ${hoverFunction(Directions.NORTH)} transition-colors`} points={`${x},${y} ${x + width},${y} ${x + width / 2},${y + height / 2}`} onClick={clickedFunction(Directions.NORTH)}></polygon>
        <polygon className={`${districtColor} ${hoverFunction(Directions.EAST)} transition-colors`} points={`${x + width},${y} ${x + width},${y + height} ${x + width / 2},${y + height / 2}`} onClick={clickedFunction(Directions.EAST)}></polygon>
        <polygon className={`${districtColor} ${hoverFunction(Directions.SOUTH)} transition-colors`} points={`${x + width},${y + height} ${x},${y + height} ${x + width / 2},${y + height / 2}`} onClick={clickedFunction(Directions.SOUTH)}></polygon>
        <polygon className={`${districtColor} ${hoverFunction(Directions.WEST)} transition-colors`} points={`${x},${y + height} ${x},${y} ${x + width / 2},${y + height / 2}`} onClick={clickedFunction(Directions.WEST)}></polygon>
        <circle className={"" + color} cx={x + width / 2} cy={y + height / 2} r={width / 4}></circle>
        <text className="text-lg fill-slate-700" x={x + width / 10} y={y + height - height / 15}>{districtId}</text>
    </g>
}