import { Link } from "../link";

export function EfficiencyGapHelp() {
    return <>
        <h1>Efficiency Gap</h1>
        <p>
            Das <Link href="https://en.wikipedia.org/wiki/Wasted_vote#Efficiency_gap">Efficiency Gap</Link> berechnet das Verhältnis der verschwendeten Stimmen der beiden
            Parteien zueinander. Verschwendete Stimmen sind dabei Stimmen die in einem Bezirk für die unterlegene Partei abgegeben worden sind und Stimmen, die
            über die benötigte Mehrheit der Stimmen für die Gewinnerpartei hinausgehen.
        </p>
        <h2>Abwägungen</h2>
        <p>
            Das Efficiency Gap ist relativ simple Methode mit einem leicht zu interpretierenden Ergebnis. Es wird daher häufig in juristischen
            Verfahren zur Identifizierung von Gerrymandering herangezogen.
            Das Verfahren ist jedoch nicht fehlerfrei. Eine Analyse der Nachteile des Efficiency Gap findet
            sich in <Link href="https://arxiv.org/abs/1705.10812">A formula goes to court: Partisan gerrymandering and the efficiency gap</Link> von Bernstein und Duchin.
        </p>
    </>
}