import { Link } from "../link";

export function AlgorithmsHelp() {
    return <>
        <h1>Auswahl des Algorithmus</h1>
        <p>
            In diesem Schritt wird der zu verwendende Algorithmus ausgewählt, mit dem das Einteilungsproblem als <Link href="https://de.wikipedia.org/wiki/Optimierungsproblem">Optimierungsproblem</Link> gelöst wird.
            Der Algorithmus verwendet dabei die in den folgenden Schritten angegebenen Parameter um sein Ziel zu erreichen.
        </p>
        <p>
            Neben den bereits vorhandenen Algorithmen können auch weiter Algorithmen über den mit "+" beschrifteten Knopf hinzugefügt werden.
        </p>
        <p>
            Die Funktionsweisen der einzelnen Algorithmen werden in den jeweiligen Hilfetexten erläutert.
        </p>
    </>
}