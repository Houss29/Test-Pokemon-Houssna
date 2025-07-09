import React from "react";

type CartesTypesProps = {
  icon: string;
  typeName: string;
  count: number;
};

export const CartesTypes = ({ icon, typeName, count }: CartesTypesProps) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "0px",
        padding: "20px",
        width: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        margin: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fdecea",
          borderRadius: "50%",
          padding: "10px",
        }}
      >
        <img src={icon} alt={typeName} width={30} height={30} />
      </div>

      <div style={{ textAlign: "right" }}>
        <p
          style={{
            margin: 0,
            color: "#999",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {typeName.toUpperCase()} TYPE
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#222",
          }}
        >
          {count}
        </p>
        <p style={{ margin: 0, fontSize: "14px", color: "#e63946" }}>
          Pokemons
        </p>
      </div>
    </div>
  );
};
