import { useSearchFilter } from "../hooks/useSearchFilter";
import { Pokemon } from "../types/Pokemon";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  pokemons: Pokemon[];
};

export function TableauPokemons({ pokemons }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { query, setQuery, filtered } = useSearchFilter(pokemons);

  const typeImageMap: Record<string, string> = {
    Combat: "fighting2",
    Eau: "water3",
    Électrik: "electric2",
    Fée: "fairy2",
    Plante: "grass2",
    Feu: "fire2",
    Psy: "psy2",
    Roche: "rock2",
    Glace: "ice2",
    Vol: "flying2",
    Acier: "steel2",
    Insecte: "bug2",
    Sol: "ground2",
    Spectre: "ghost2",
    Poison: "poison2",
    Dragon: "dragon2",
    Normal: "normal2",
    Ténèbres: "dark2",
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const SearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsPageLoading(false);
    }, 500); 
  };

  return (
    <div>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <SearchIcon className="search-icon-inside" />
      </div>

      {isPageLoading ? (
        <div className="loader-container">
          <img src="/assets/types/PikachuLoader.png" alt="Chargement..." className="pikachu-spinner" />
        </div>
      ) : paginatedData.length === 0 ? (
        <p>Erreur</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Base stats</th>
              <th>Generation</th>
              <th>Evolution</th>
              <th>PreEvolution</th>
              <th>Resistance</th>
              <th>Vulnerable</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td>
                  {pokemon.apiTypes.map((type, index) => (
                    <img
                      key={index}
                      src={type.image}
                      alt={type.name}
                      title={type.name}
                      width={24}
                      height={24}
                      style={{ marginRight: "6px", verticalAlign: "middle" }}
                    />
                  ))}
                </td>
                <td>
                  {pokemon.stats.HP +
                    pokemon.stats.attack +
                    pokemon.stats.defense +
                    pokemon.stats.special_attack +
                    pokemon.stats.special_defense +
                    pokemon.stats.speed}
                </td>
                <td>{pokemon.apiGeneration}</td>
                <td>{pokemon.apiEvolutions.map((evo) => evo.name).join(", ")}</td>
                <td>{pokemon.apiPreEvolution?.name || ""}</td>
                <td>
                  {(pokemon.apiResistances || [])
                    .filter((r) => r.damage_relation === "resistant")
                    .map((r, index) => (
                      <img
                        key={`res-${index}`}
                        src={`/assets/types/${typeImageMap[r.name]}.png`}
                        alt={r.name}
                        title={r.name}
                        width={24}
                        height={24}
                        style={{ verticalAlign: "middle", marginRight: "4px" }}
                      />
                    ))}
                </td>
                <td>
                  {(pokemon.apiResistances || [])
                    .filter((r) => r.damage_relation === "vulnerable")
                    .map((r, index) => (
                      <img
                        key={`vul-${index}`}
                        src={`/assets/types/${typeImageMap[r.name]}.png`}
                        alt={r.name}
                        title={r.name}
                        width={24}
                        height={24}
                        style={{ verticalAlign: "middle", marginRight: "4px" }}
                      />
                    ))}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={9} style={{ textAlign: "center", backgroundColor: "white", padding: "12px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
                  <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>‹</button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      if (page === 2 && currentPage > 4) return true;
                      if (page === totalPages - 1 && currentPage < totalPages - 3) return true;
                      return false;
                    })
                    .map((page, index, array) => {
                      const prevPage = array[index - 1];
                      const showDots = prevPage && page - prevPage > 1;

                      return (
                        <React.Fragment key={page}>
                          {showDots && <span style={{ padding: "4px 6px", color: "#bbb" }}>…</span>}
                          <button
                            onClick={() => handlePageChange(page)}
                            style={{
                              width: "28px",
                              height: "28px",
                              lineHeight: "28px",
                              borderRadius: "50%",
                              border: "none",
                              backgroundColor: currentPage === page ? "#fff3cd" : "transparent",
                              color: currentPage === page ? "#000" : "#bbb",
                              fontWeight: currentPage === page ? "bold" : "normal",
                              cursor: "pointer",
                            }}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>›</button>
                  <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
