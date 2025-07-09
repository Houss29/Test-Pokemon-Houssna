import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "../types/Pokemon";

export function useListePokemons() {
  const [tab, setTab] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon")
      .then((res) => {
        setTab(res.data);
        console.log("test des pokemons", res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { tab, loading };
}
