import { Link } from "../link";

export function CompactnessHelp() {
    return <>
        <h1>Kompaktheit</h1>
        <p>
            Mit dieser Metrik wird die Kompaktheit des Wahlbezirks dargestellt.
            Ein Bezirk ist möglichst kompakt, wenn sich seine Form der eines Kreises annähert.
        </p>
        <h2>Funktionsweise</h2>
        <p>
            Zur Berechnung der Kompaktheit wird der <Link href="https://en.wikipedia.org/wiki/Polsby–Popper_test">Polsby-Popper Test</Link> verwendet.
            Der Test misst das Verhältnis der Fläche des Bezirks zu einem Kreis mit dem gleichen Umfang wie der des Bezirks.
        </p>
    </>
}