import React from "react";

type CarteNombreTotalProps = {
  total: number;
};

export const CarteNombreTotal = ({ total }: CarteNombreTotalProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0px",
        padding: "20px",
        width: "150px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        margin: "10px",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#555",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          POKEMON
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          {total}
        </p>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          Pokemon List
        </p>
      </div>
    </div>
  );
};
