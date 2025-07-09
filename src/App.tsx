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

  const isLoading = loading || loadingTypes;

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial", background: "gainsboro" , height: "100vh"}}
    >
      {isLoading ? (
        <div className="loader-container">
          <img
            src="/assets/Types/PikachuLoader.png"
            alt="Chargement..."
            className="pikachu-spinner"
          />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
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

          <TableauPokemons pokemons={tab} />
        </>
      )}
    </div>
  );
}

export default App;
