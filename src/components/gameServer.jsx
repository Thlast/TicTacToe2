import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Board } from "./board";
import { confetti } from "./confetti";
import { NextPlayer } from "./nextPlayer";

export function GameServer() {
    const [socket, setSocket] = useState(null);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState();
    const [winnerSquares, setWinnerSquares] = useState();
    const [player, setPlayer] = useState(null);
    const [nextToDisapearX, setNextToDisapearX] = useState();
    const [nextToDisapearO, setNextToDisapearO] = useState();
    const [playerMoves, setPlayerMoves] = useState();

    //const url = "http://localhost:4000/";
    const url = "https://server-socket-t21o.onrender.com";
    useEffect(() => {
        if (playerMoves) {
            if (player == "X" && playerMoves['X']?.length == 3) {
                setNextToDisapearX(playerMoves['X'][0]);
            } else if (player == "O" && playerMoves['O']?.length == 3) {
                setNextToDisapearO(playerMoves['O'][0]);
            }
        }
    }, [playerMoves])
    //console.log(nextToDisapearX, nextToDisapearO, history, player)
    useEffect(() => {
        const newSocket = io(url, {
            transports: ["websocket"],
            withCredentials: false,
        });

        setSocket(newSocket);
        newSocket.on("init", ({ history, xIsNext, player, playerMoves }) => {
            setHistory(history);
            setXIsNext(xIsNext);
            setPlayer(player);
            setPlayerMoves(playerMoves)
        });

        newSocket.on("move", ({ history, xIsNext, playerMoves }) => {
            setHistory(history);
            setXIsNext(xIsNext);
            console.log(playerMoves)
            setPlayerMoves(playerMoves)
            //console.log("PLAYERMOVES",playerMoves['X'].length == 3)
            console.log(history)
        });

        newSocket.on("winner", ({ winner, winnerSquares }) => {
            setWinner(winner);
            setWinnerSquares(winnerSquares);
            confetti();
        });

        newSocket.on("gameRestarted", ({ history, xIsNext, playerMoves }) => {
            setHistory(history);
            setXIsNext(xIsNext);
            setPlayerMoves(playerMoves);
            // Reiniciar nextToDisapearX y nextToDisapearO
            setNextToDisapearX(null);
            setNextToDisapearO(null);
            setWinnerSquares(null)
            setWinner(null)
        });

        return () => newSocket.disconnect();
    }, []);

    const handleClickUsuario = (i) => {
        if ((player === 'X' && xIsNext) || (player === 'O' && !xIsNext)) {
            socket.emit("move", i);
        }
    };

    const handleRestartClick = () => {
        socket.emit("restart");
    };

    return (
        <div className="game">
            <div className="game-info">
                {winner ? (winner && winner === player) ? `¡Has ganado!` : `¡Has perdido!` : null}
                <NextPlayer status={`Eres: ${player}`} />
                <NextPlayer status={`Turno de: ${xIsNext ? "X" : "O"}`} />
                <br />
                {/* {winner ? ( // Mostrar el botón solo si hay un ganador o el juego ha sido reiniciado
                    <button onClick={handleRestartClick}>Reiniciar juego</button>
                ) : null} */}
            </div>
            <div className="game-board">
                <Board
                    winnerSquares={winnerSquares}
                    xIsNext={xIsNext}
                    nextToDisapearX={nextToDisapearX}
                    nextToDisapearO={nextToDisapearO}
                    squares={history[history.length - 1]}
                    onClick={handleClickUsuario}
                />
            </div>
        </div>
    );
}
