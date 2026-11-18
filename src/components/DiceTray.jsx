import { useState } from "react";

const DICE = [4, 6, 8, 10, 12, 20, 100];

export default function DiceTray() {
  const [sides, setSides] = useState(20);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rollKey, setRollKey] = useState(0); // para reiniciar la animación

  function roll() {
    // Resultado entre 1 y el número de caras
    const value = Math.floor(Math.random() * sides) + 1;
    setResult({ value, sides });
    setRollKey((k) => k + 1);
    setHistory((h) => [`d${sides}: ${value}`, ...h].slice(0, 8));
  }

  const special =
    result && result.sides === 20
      ? result.value === 20
        ? "crit"
        : result.value === 1
        ? "fail"
        : ""
      : "";

  return (
    <section>
      <h2>Bandeja de Dados</h2>

      <div className="dice-buttons">
        {DICE.map((d) => (
          <button
            key={d}
            className={sides === d ? "die active" : "die"}
            onClick={() => setSides(d)}
          >
            d{d}
          </button>
        ))}
      </div>

      <button className="btn big" onClick={roll}>
        🎲 Lanzar d{sides}
      </button>

      <div className="result-box">
        {result ? (
          <div key={rollKey} className={`result ${special}`}>
            {result.value}
          </div>
        ) : (
          <p className="msg">Elige un dado y lánzalo</p>
        )}
        {special === "crit" && <p className="crit-text">¡Crítico!</p>}
        {special === "fail" && <p className="fail-text">¡Pifia!</p>}
      </div>

      {history.length > 0 && (
        <>
          <h3>Últimos lanzamientos</h3>
          <ul className="history">
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
