export function PopulationEqualityHelp() {
    return <>
        <h1>Bevölkerungsgleichheit</h1>
        <p>
            Diese Metrik repräsentiert die Gleichheit der Einwohnerzahlen in den generierten Bezirken.
            Optimalerweise besitzen alle Wahlbezirke nach dieser Metrik genau gleich viele Einwohner.
        </p>
        <h2>Funktionsweise</h2>
        <p>
            Zur Berechnung des Maßes der Bevölkerungsgleichheit, wird die aktuelle Differenz zwischen der Einwohnerzahl
            des Bezirks und der zu erreichenden optimalen Bevölkerungszahl ins Verhältnis zur größtmöglichen Differenz dieser Zahlen gesetzt.
            Die größtmögliche Abweichung kommt dann zustande, wenn alle Einwohner in einem Bezirk wohnen.
        </p>
    </>
}