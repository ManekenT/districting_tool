export function WeightingHelp() {
    return <>
        <h1>Metriken gewichten</h1>
        <p>
            In diesem Schritt können die verschiedenen Metriken, anhand denen der Algorithmus die Tauglichkeit einer generierten Zwischenlösung errechnet,
            nach ihrer Wichtigkeit gewichtet werden.
        </p>
        <p>
            Die Gewichtung findet dabei relativ zu den anderen Metriken statt.
            Werden alle Metriken mit 5 gewichtet ist dies gleichwertig mit einer Gewichtung aller Metriken mit 3.
            Wird eine Metrik mit 0 gewichtet, wird sie gar nicht beachtet.
        </p>
        <p>
            Die Funktionsweisen der einzelnen Metriken werden in den jeweiligen Hilfetexten erläutert.
        </p>
    </>
}