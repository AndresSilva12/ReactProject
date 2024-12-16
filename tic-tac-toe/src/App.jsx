import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import {TURNS} from './constants.js'
import {checkWinner, checkEndGame} from './logic/board.js'
import { Board } from './components/BoardComponent.jsx'
import { removeFromStorage, saveInStorage } from './logic/storage/index.js'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return turnFromStorage
    return TURNS.X
  })

  const [winner, setWinner] = useState(null)


  const updateBoard = (index) => {
    const newBoard = [...board]

    if (newBoard[index] != null || winner) return

    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)

    saveInStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
      removeFromStorage()
    } else if (checkEndGame(newBoard)){
      setWinner(false)
      removeFromStorage()
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    removeFromStorage()
  }

  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <Board updateBoard={updateBoard} board={board}></Board>

      <section className='turn'>
        <Square
          isSelected={turn == TURNS.X}
        >
          {TURNS.X}
        </Square>
        <Square
          isSelected={turn == TURNS.O}
        >
          {TURNS.O}
        </Square>
      </section>

      <button onClick={resetGame}>Reiniciar Juego</button>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App