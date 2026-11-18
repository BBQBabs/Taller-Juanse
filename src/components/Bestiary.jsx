import { useEffect, useState } from "react";
import Card from "./Card.jsx";

const API = "https://www.dnd5eapi.co";
const PER_PAGE = 12;

// La API puede devolver la clase de armadura como número o como arreglo
function getArmorClass(m) {
  if (Array.isArray(m.armor_class)) return m.armor_class[0]?.value ?? "?";
  return m.armor_class ?? "?";
}

export default function Bestiary() {
  const [list, setList] = useState([]); // lista básica (nombre + url)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({}); // detalles por index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1) Cargar la lista de monstruos
  useEffect(() => {
    fetch(`${API}/api/monsters`)
      .then((r) => r.json())
      .then((data) => setList(data.results))
      .catch(() => setError("No se pudo conectar con la API de D&D."))
      .finally(() => setLoading(false));
  }, []);

  // 2) Filtrar por nombre y paginar
  const filtered = list.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  // 3) Cargar el detalle (estadísticas) de los monstruos visibles
  useEffect(() => {
    visible.forEach((m) => {
      if (details[m.index]) return;
      fetch(`${API}${m.url}`)
        .then((r) => r.json())
        .then((d) => setDetails((prev) => ({ ...prev, [m.index]: d })))
        .catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, search, page]);

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(0);
  }

  if (loading) return <p className="msg">Cargando monstruos...</p>;
  if (error) return <p className="msg error">{error}</p>;

  return (
    <section>
      <h2>Bestiario</h2>
      <input
        className="input"
        type="text"
        placeholder="Buscar monstruo (ej. dragon)..."
        value={search}
        onChange={handleSearch}
      />
      <p className="msg">{filtered.length} monstruos encontrados</p>

      <div className="grid">
        {visible.map((m) => {
          const d = details[m.index];
          if (!d) {
            return (
              <Card key={m.index} title={m.name}>
                <p className="msg">Cargando...</p>
              </Card>
            );
          }
          return (
            <Card
              key={m.index}
              title={d.name}
              subtitle={`${d.size} ${d.type}`}
              image={d.image ? `${API}${d.image}` : null}
              stats={[
                { label: "Clase de Armadura", value: getArmorClass(d) },
                { label: "Puntos de Golpe", value: d.hit_points },
                { label: "Nivel de Desafío", value: d.challenge_rating },
              ]}
            />
          );
        })}
      </div>

      <div className="pager">
        <button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
          ← Anterior
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          className="btn"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Siguiente →
        </button>
      </div>
    </section>
  );
}
