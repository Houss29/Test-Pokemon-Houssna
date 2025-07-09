export type Stats = {
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};
export type Pokemon = {
  id: number;
  name: string;
  image: string;
  apiGeneration: number;

  apiEvolutions: {
    name: string;
    pokedexId: number;
  }[];
  apiTypes: { name: string; image: string }[];
  apiPreEvolution: {
    name: string;
    pokedexId: number;
  };
  apiResistances: {
    damage_multiplier: number;
    damage_relation: string;
    name: string;
  }[];
  stats: Stats;
};
