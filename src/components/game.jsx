import { useState, useEffect } from "react";
import { Board } from "./board";
import { calculateWinner } from "./calculateWinner";
import { isFull } from "./isFull";
import { NextPlayer } from "./nextPlayer";
import { AIPlayer } from "./ia";
import { confetti } from "./confetti";
import { calculateWinnerSquares } from "./casillasGanadoras";

export function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [historyX, setHistoryX] = useState([]);
    const [historyO, setHistoryO] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [nextToDisapearX, setNextToDisapearX] = useState();
    const [nextToDisapearO, setNextToDisapearO] = useState();
    const [jugarContraIA, setJugarContraIA] = useState(false);
    const [winnerSquares, setWinnerSquares] = useState();

    useEffect(() => {
        actualizar()
    }, [stepNumber])

    const actualizar = () => {
        if (historyX?.length > 2) {
            setNextToDisapearX(historyX[0])
        }
        if (historyO?.length > 2) {
            setNextToDisapearO(historyO[0])
        }
        // if(historyX?.length < 3 && historyO?.length < 3) {
        //     setNextToDisapearX()
        //     setNextToDisapearO()
        // }
    }

    const eliminarMovimiento = async (squares) => {
        if (xIsNext && nextToDisapearX !== null) {

            squares[nextToDisapearX] = null

        } else if (!xIsNext && nextToDisapearO !== null) {
            squares[nextToDisapearO] = null

        }
    }

    const handleClickUsuario = async (i) => {
        if (jugarContraIA && xIsNext || !jugarContraIA) {

            const current = history[stepNumber].slice();
            const squares = current.slice();
            await eliminarMovimiento(squares)

            if (calculateWinner(squares) || squares[i]) {
                return;
            }

            squares[i] = xIsNext ? 'X' : 'O';
            const newHistory = history.concat([squares]);
            setHistory(newHistory);

            if (xIsNext) {
                const newHistoryX = historyX.concat(i);
                setHistoryX(newHistoryX.slice(-3)); // Limitar a 3 movimientos
            } else {
                const newHistoryO = historyO.concat(i);
                setHistoryO(newHistoryO.slice(-3)); // Limitar a 3 movimientos
            }
            setStepNumber(newHistory.length - 1);
            setXIsNext(!xIsNext);
            actualizar()
        }
    };

    const handleClickIA = async (i) => {
        if (jugarContraIA) {

            const current = history[stepNumber].slice();
            const squares = current.slice();
            await eliminarMovimiento(squares)

            if (calculateWinner(squares) || squares[i]) {
                return;
            }

            squares[i] = xIsNext ? 'X' : 'O';
            const newHistory = history.concat([squares]);
            setHistory(newHistory);

            if (xIsNext) {
                const newHistoryX = historyX.concat(i);
                setHistoryX(newHistoryX.slice(-3)); // Limitar a 3 movimientos
            } else {
                const newHistoryO = historyO.concat(i);
                setHistoryO(newHistoryO.slice(-3)); // Limitar a 3 movimientos
            }
            setStepNumber(newHistory.length - 1);
            setXIsNext(!xIsNext);
            actualizar()
        }
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);

        const newHistoryX = historyX.slice(0, step + 1);
        setHistoryX(newHistoryX);

        const newHistoryO = historyO.slice(0, step + 1);
        setHistoryO(newHistoryO);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    // console.log(isFull(history[stepNumber]))
    // console.log(history[stepNumber])
    // console.log(historyO, historyX)
    const reiniciarJuego = () => {
        setHistory([Array(9).fill(null)])
        setHistoryX([]);
        setHistoryO([]);
        setStepNumber(0);
        setXIsNext(true);
        setNextToDisapearX();
        setNextToDisapearO();
        setWinnerSquares();
    }
    useEffect(() => {
        if (winner) {
            setWinnerSquares(calculateWinnerSquares(current))
            console.log(winner)
            confetti()
        }
    }, [winner])


    return (
        <>
            <button onClick={() => setJugarContraIA(!jugarContraIA)}>{jugarContraIA ? "Jugar solo" : "Jugar con IA"}</button>
            <div className="game">
                <div className="game-board">
                    <div className="game-info">
                        <NextPlayer status={status} />
                        {/* <ol>{moves}</ol> */}
                        <br></br>
                        <button onClick={reiniciarJuego}>Reiniciar juego</button>
                    </div>
                    <Board
                        winnerSquares={winnerSquares}
                        xIsNext={xIsNext}
                        nextToDisapearX={nextToDisapearX}
                        nextToDisapearO={nextToDisapearO}
                        squares={current}
                        onClick={handleClickUsuario}
                    />
                </div>
                {jugarContraIA &&
                    <AIPlayer
                        history={history}
                        stepNumber={stepNumber}
                        xIsNext={xIsNext}
                        onClick={handleClickIA}
                    />
                }
            </div>
        </>
    );
}
