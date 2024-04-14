import React, { useState, useEffect } from 'react';
import { calculateWinner } from './calculateWinner';
import { isFull } from './isFull';

export function AIPlayer({ history, stepNumber, xIsNext, onClick }) {
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (!xIsNext) {
      // Si es el turno de la IA, se simula su movimiento después de un breve retraso
      setThinking(true);
      const timer = setTimeout(() => {
        hacerMovimientoIA();
        setThinking(false);
      }, 1000); // Retraso simulado para la "decisión" de la IA
      return () => clearTimeout(timer);
    }
  }, [history, stepNumber, xIsNext]); // Se ejecuta cada vez que cambian estos valores

  const hacerMovimientoIA = () => {
    const current = history[stepNumber];
    const squares = [...current];
  
    // Array de estrategias ordenadas según su prioridad
    const estrategias = [
      // 1. Ganar el juego si es posible
      { valor: 10, obtenerMovimiento: () => obtenerMovimientoGanador(squares) },
      // 2. Bloquear al oponente si está a punto de ganar
      { valor: 8, obtenerMovimiento: () => obtenerMovimientoBloqueo(squares) },
      // 3. Ocupar el centro si está disponible
      { valor: 5, obtenerMovimiento: () => obtenerMovimientoCentro(squares) },
      // 4. Ocupar una esquina si está disponible
      { valor: 3, obtenerMovimiento: () => obtenerMovimientoEsquina(squares) },
      // 5. Ocupar un lado si está disponible
      { valor: 1, obtenerMovimiento: () => obtenerMovimientoLado(squares) }
    ];
  
    // Ordenar las estrategias de mayor a menor valor
    estrategias.sort((a, b) => b.valor - a.valor);
  
    // Recorrer las estrategias y elegir la primera válida
    for (let estrategia of estrategias) {
      const movimiento = estrategia.obtenerMovimiento();
      if (movimiento !== null) {
        onClick(movimiento);
        return;
      }
    }
  };
  
  // Estrategia: Ganar el juego si es posible
  const obtenerMovimientoGanador = (squares) => {
    return obtenerMovimientoGanadorOBloqueo(squares, 'O'); // Comprobar si la IA puede ganar
  };
  
  // Estrategia: Bloquear al oponente si está a punto de ganar
  const obtenerMovimientoBloqueo = (squares) => {
    return obtenerMovimientoGanadorOBloqueo(squares, 'X'); // Comprobar si el oponente está a punto de ganar
  };
  
  const obtenerMovimientoGanadorOBloqueo = (squares, marca) => {
    // Comprobar filas, columnas y diagonales para obtener el movimiento ganador o de bloqueo
    // Implementa la lógica para encontrar la mejor jugada aquí
    return null; // Retorna null si no se encuentra una jugada ganadora o de bloqueo
  };
  
  // Estrategia: Ocupar el centro si está disponible
  const obtenerMovimientoCentro = (squares) => {
    if (!squares[4]) {
      return 4; // Retorna el índice del centro
    }
    return null;
  };
  
  // Estrategia: Ocupar una esquina si está disponible
  const obtenerMovimientoEsquina = (squares) => {
    const esquinasDisponibles = [0, 2, 6, 8].filter((i) => !squares[i]); // Filtrar las esquinas disponibles
    return esquinasDisponibles.length ? esquinasDisponibles[0] : null; // Retorna la primera esquina disponible o null si no hay ninguna
  };
  
  // Estrategia: Ocupar un lado si está disponible
  const obtenerMovimientoLado = (squares) => {
    const ladosDisponibles = [1, 3, 5, 7].filter((i) => !squares[i]); // Filtrar los lados disponibles
    return ladosDisponibles.length ? ladosDisponibles[0] : null; // Retorna el primer lado disponible o null si no hay ninguno
  };
  

  return (
    <div className="ai-player">
      {thinking && <p>Thinking...</p>}
    </div>
  );
}
