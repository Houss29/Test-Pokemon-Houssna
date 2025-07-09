// src/hooks/useSearchFilter.ts
import { useState, useMemo } from "react";
import { Pokemon } from "../types/Pokemon";

export function useSearchFilter(pokemons: Pokemon[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return pokemons;

    try {
      const [field, operation, ...rest] = query.trim().split(" ");
      const value = rest.join(" ").replace(/"/g, "");

      return pokemons.filter((pokemon) => {
        if (field === "name" && operation === "contain") {
          return pokemon.name.toLowerCase().includes(value.toLowerCase());
        }

        if (field === "type" && operation === "include") {
          return pokemon.apiTypes.some(
            (type) => type.name.toLowerCase() === value.toLowerCase(),
          );
        }

        if (field === "id" && operation === ">") {
          return pokemon.id > Number(value);
        }

        return true;
      });
    } catch (err) {
      return pokemons;
    }
  }, [query, pokemons]);

  return { query, setQuery, filtered };
}
