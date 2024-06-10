import { Children, useState } from 'react'
import './App.css'



const Square = ({children, isSelected, updateBoard, index }) =>{
  
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = ()=>{
    updateBoard(index);
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const COMBOS_WINNER = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],

]

function App() {

  const TURNS = {
    X: '❎',
    O: "🅾"
  }

  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null) 

  const check_winner = (BoardToCheck) => {
    for (const combo of COMBOS_WINNER) {
      const [a, b, c] = combo
        if(
          BoardToCheck[a] && // Miro que hay en la psosition 0 del array del board
          BoardToCheck[a] === BoardToCheck[b] && // Miro que hay en la posicion 1 del board
          BoardToCheck[a] === BoardToCheck[c] // Miro que hay en la poscion 2 del board
        ) {
          return BoardToCheck[a]
        }
    }

    return null
}

  const resetGame = ()=> {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
  }


  const updateBoard = (index) => {
    // No deja que se sobreescriban las turnos
    if (board[index] || winner) return;
  
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
  
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  
    // Revisar ganador
    const newWinner = check_winner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return(
    <main className='board'>
      <h1>TRES EN RAYA</h1>
      <footer>
                <button onClick={resetGame}>EMPEZAR DE NUEVO</button>
      </footer>
      <section className='game'>
        {
          board.map((_ , index)=>{
            return(
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'empate' 
                  : 'Gano:'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>EMPEZAR DE NUEVO</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
