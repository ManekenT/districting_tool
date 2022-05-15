import { Link } from "../link";

export function SimulatedAnnealingHelp() {
    return <>
        <h1>Simulated Annealing</h1>
        <p>
            <Link href="https://de.wikipedia.org/wiki/Simulated_Annealing">Simulated Annealing</Link> ist ein Näherungsverfahren zur Lösung von Optimierungsproblemen.
            Die Funktionsweise orientiert sich dabei an Abkühlungsprozessen, wie sie beispielsweise in der Metallurgie vorkommen.
        </p>

        <h2>Funktionsweise</h2>
        <p>
            Ausgehend von einer Startlösung (der importierten Wahlkreiseinteilung) generiert der Algorithmus potenzielle Lösungen durch das
            Auswählen eines zufälligen Wahlblocks und der Änderung des zugewiesenen Wahlkreises zu einem zufälligen Nachbarwahlkreis.
            Anschließend wird die Effektivität der Lösung anhand der gewichteten Metriken (der <Link href="https://de.wikipedia.org/wiki/Fitnessfunktion">Fitnessfunktion</Link>) errechnet.
            Ist die Lösung besser als die vorherige beste Lösung wird sie als neue beste Lösung akzeptiert.
            Ist sie schlechter, wird sie mit einer, von der "Temperatur" abhängigen Wahrscheinlichkeit dennoch akzeptiert.
            Diese Temperatur startet hoch und verringert sich mit jeder Iteration des Algorithmus.
            Während zu Beginn also auch das Ausprobieren schlechterer Lösungen möglich ist, wird diese Wahrscheinlichkeit mit sinkender Temperatur immer kleiner.
            So wie sich die Atome in einem abkühlenden Metall über die Zeit zu einer energiearmen, optimalen Konstellation ordnen können, findet auch der Algorithmus mit der Zeit ein immer besseres Ergebnis.
            Diese Funktionsweise soll verhindern, dass der Algorithmus in <Link href="https://de.wikipedia.org/wiki/Extremwert">lokalen Minima</Link> stecken bleibt.
        </p>
        <h2>Hinweise</h2>
        <ul>
            <li>Die zufällige Generierung der potenziellen Lösungen sorgt dafür, dass auch die Endergebnisse mit jeder Anwendung anders aussehen.</li>
            <li>Simulated Annealing wurde unter anderem vom <Link href="https://en.wikipedia.org/wiki/Instituto_Nacional_Electoral">Instituto Nacional Electoral</Link> in Mexiko zur Einteilung der Wahlbezirke benutzt </li>
        </ul>
    </>
}