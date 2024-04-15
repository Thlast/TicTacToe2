import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Board } from "./board";
import { confetti } from "./confetti";

export function GameServer() {
    const [socket, setSocket] = useState(null);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [winnerSquares, setWinnerSquares] = useState();
    const [player, setPlayer] = useState(null); // Agregamos el estado para almacenar el tipo de jugador

    useEffect(() => {
        const newSocket = io("http://localhost:4000", {
            transports: ["websocket"],
            withCredentials: true,
        });
        setSocket(newSocket);
        newSocket.on("init", ({ history, xIsNext, player }) => {
            setHistory(history);
            setXIsNext(xIsNext);
            setPlayer(player); // Almacenamos el tipo de jugador
        });

        newSocket.on("move", ({ history, xIsNext }) => {
            setHistory(history);
            setXIsNext(xIsNext);
        });

        newSocket.on("winner", ({ winnerSquares }) => {
            setWinnerSquares(winnerSquares);
            confetti();
        });

        return () => newSocket.disconnect();
    }, []);

    const handleClickUsuario = (i) => {
        if ((player === 'X' && xIsNext) || (player === 'O' && !xIsNext)) {
            // Verificamos si es el turno del jugador antes de enviar el movimiento al servidor
            socket.emit("move", i);
        }
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    winnerSquares={winnerSquares}
                    xIsNext={xIsNext}
                    squares={history[history.length - 1]}
                    onClick={handleClickUsuario}
                />
            </div>
        </div>
    );
}
