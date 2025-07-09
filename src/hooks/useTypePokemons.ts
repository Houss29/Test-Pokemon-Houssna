import { useEffect, useState } from "react";
import axios from "axios";

type TypeCount = {
  name: string;
  image: string;
  count: number;
};

const useTypePokemons = () => {
  const [types, setTypes] = useState<TypeCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://pokebuildapi.fr/api/v1/pokemon").then((res) => {
      const data = res.data;
      const typeMap: Record<string, TypeCount> = {};
      const typesAutorises = [
        "Eau",
        "Plante",
        "Électrik",
        "Dragon",
        "Combat",
        "Feu",
      ];

      data.forEach((pokemon: any) => {
        pokemon.apiTypes.forEach((type: any) => {
          const key = type.name;
          if (!typeMap[key]) {
            typeMap[key] = {
              name: key,
              image: type.image,
              count: 1,
            };
          } else {
            typeMap[key].count += 1;
          }
        });
      });

      const typesFiltres = Object.values(typeMap).filter((type) =>
        typesAutorises.includes(type.name),
      );

      setTypes(typesFiltres);
      setLoading(false);
    });
  }, []);

  return { types, loading };
};

export default useTypePokemons;
