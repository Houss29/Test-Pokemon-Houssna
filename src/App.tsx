import React, { useState } from "react";

import { useListePokemons } from "./hooks/useListePokemons";
import { TableauPokemons } from "./components/TableauPokemons";
import { CartesTypes } from "./components/CartesTypes";
import useTypePokemons from "./hooks/useTypePokemons";
import { CarteNombreTotal } from "./components/CarteNombreTotal";
import "./App.css";
function App() {
  const { tab, loading } = useListePokemons();
  const { types, loading: loadingTypes } = useTypePokemons();
  const [pageActuelle, setPageActuelle] = useState(1);
  const pokemonsParPage = 10;

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial", background: "gainsboro" }}
    >
      {" "}
      {}
      <h1 style={{ textAlign: "center" }}>Mon test technique</h1>
      {!loadingTypes && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            marginBottom: "10px",
          }}
        >
          <CarteNombreTotal total={tab.length} />

          {types.map((type) => (
            <CartesTypes
              key={type.name}
              icon={type.image}
              typeName={type.name}
              count={type.count}
            />
          ))}
        </div>
      )}
      {loading ? <p>test de chargement</p> : <TableauPokemons pokemons={tab} />}
    </div>
  );
}

export default App;
