import { useState } from "react";
import Card from "./Card.jsx";

const API = "https://www.dnd5eapi.co";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateCoins(cr) {
  return {
    cp: rand(0, 20) * (cr + 1),
    sp: rand(0, 15) * (cr + 1),
    gp: rand(0, 10) * (cr + 1),
    pp: cr >= 5 ? rand(0, 5) * Math.floor(cr / 2) : 0,
  };
}

function itemCount(cr) {
  return rand(1, 1 + Math.floor(cr / 5) + 1);
}

function magicChance(cr) {
  if (cr < 5) return 0;
  if (cr < 11) return 0.4;
  return 0.85;
}

async function fetchRandomItem(endpoint) {
  const res = await fetch(`${API}/api/${endpoint}`);
  const data = await res.json();
  const pick = data.results[rand(0, data.results.length - 1)];
  const detail = await fetch(`${API}${pick.url}`).then((r) => r.json());
  return { ...detail, isMagic: endpoint === "magic-items" };
}

export default function LootGenerator() {
  const [cr, setCr] = useState(1);
  const [coins, setCoins] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    try {
      setCoins(generateCoins(cr));

      const count = itemCount(cr);
      const requests = [];
      for (let i = 0; i < count; i++) {
        const endpoint = Math.random() < magicChance(cr) ? "magic-items" : "equipment";
        requests.push(fetchRandomItem(endpoint));
      }
      setItems(await Promise.all(requests));
    } catch {
      setError("No se pudieron obtener los objetos de la API.");
    }
    setLoading(false);
  }

  return (
    <section>
      <h2>Generador de Botín</h2>

      <label className="label">
        Nivel de desafío del monstruo derrotado: <strong>{cr}</strong>
      </label>
      <input
        className="range"
        type="range"
        min="0"
        max="30"
        value={cr}
        onChange={(e) => setCr(Number(e.target.value))}
      />

      <button className="btn big" onClick={generate} disabled={loading}>
        {loading ? "Buscando tesoro..." : "Generar botín"}
      </button>

      {error && <p className="msg error">{error}</p>}

      {coins && (
        <>
          <h3>Monedas</h3>
          <div className="coins">
            <div className="coin cp">🟤 {coins.cp} <small>cobre</small></div>
            <div className="coin sp">⚪ {coins.sp} <small>plata</small></div>
            <div className="coin gp">🟡 {coins.gp} <small>oro</small></div>
            <div className="coin pp">🔷 {coins.pp} <small>platino</small></div>
          </div>
        </>
      )}

      {items.length > 0 && (
        <>
          <h3>Objetos</h3>
          <div className="grid">
            {items.map((it, i) => (
              <Card
                key={`${it.index}-${i}`}
                title={it.name}
                subtitle={it.isMagic ? `✨ Mágico · ${it.rarity?.name ?? ""}` : "Equipo"}
                stats={
                  it.isMagic
                    ? [{ label: "Categoría", value: it.equipment_category?.name ?? "-" }]
                    : [
                        { label: "Categoría", value: it.equipment_category?.name ?? "-" },
                        { label: "Costo", value: it.cost ? `${it.cost.quantity} ${it.cost.unit}` : "-" },
                      ]
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
