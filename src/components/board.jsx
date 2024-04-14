import { Square } from "./square";


export function Board({ xIsNext, nextToDisapearX, nextToDisapearO, squares, onClick, winnerSquares }) {
    const renderSquare = (i) => {
      return <Square 
      winnerSquares={winnerSquares}
      xIsNext={xIsNext} 
      nextToDisapearX={nextToDisapearX} 
      nextToDisapearO={nextToDisapearO} 
      casilla={i} 
      value={squares[i]} 
      onClick={() => onClick(i)} />;
    };
  
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }