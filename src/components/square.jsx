import React, { useEffect, useState } from "react";
import { calculateWinnerSquares } from "./casillasGanadoras";

export function Square({ xIsNext, nextToDisapearX, nextToDisapearO, casilla, value, onClick, winnerSquares }) {
  const [debeVibrar, setDebeVibrar] = useState(false);
  const [debeCaer, setDebeCaer] = useState(false);

  useEffect(() => {
    console.log(winnerSquares)
  }, [winnerSquares])
  // Efecto de lado para verificar si la casilla debe vibrar
  useEffect(() => {
    if ((xIsNext && nextToDisapearX === casilla) || (!xIsNext && nextToDisapearO === casilla)) {
      setDebeVibrar(true);
    } else {
      setDebeVibrar(false);
    }
  }, [xIsNext, nextToDisapearX, nextToDisapearO, casilla]);

  // Efecto de lado para controlar la transición de la letra cuando debe caer
  useEffect(() => {
    if (debeCaer) {
      setTimeout(() => {
        setDebeCaer(false);
      }, 500); // Ajusta el tiempo según la duración de la animación de caída
    }
  }, [debeCaer]);

  // Controlador de clic para agregar o quitar la clase de caída
  useEffect(() => {
    if (debeVibrar) {
      setDebeCaer(true);
    }
  }, [xIsNext])

  return (
    <button
      style={{ color: winnerSquares?.includes(casilla) ? "green" : "black" }}
      className={`square ${debeVibrar ? "vibrar-letra" : ""} ${debeCaer ? "letra-caida" : ""}`}
      id={`square-${casilla}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
