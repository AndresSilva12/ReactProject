import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0})
  const [modal, setModal] = useState(false)

  useEffect(()=> {
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])


  return (
    <>
      <h3>Proyecto 3</h3>

      {enabled && <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px )`
      }}
      />}


      <button onClick={() => {setEnabled(!enabled)}}>
        {enabled ? 'Desactivar ' : 'Encender '}
        Puntero
        </button>

      <br />

      <button onClick={() => {setModal(!modal)}}>Abrir modal</button>

      {modal && (<div style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        borderRadius: '20px',
        position: 'fixed',
        left: 20,
        top: 20,
        transform: `translate( ${position.x}px, ${position.y}px)`
      }}
      
      >
        Hola soy la modal
      </div>)}
    </>
  )
}

export default App
