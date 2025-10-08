import React, { useEffect, useState, useRef } from 'react'
import Die from '../components/Die';
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

const App = () => {

  // Generate RAndom Numbers
  const allNewDice = ()=> {
    let nums = [];
    for(let i = 0; i < 10; i++){
      const randomNum = Math.floor(Math.random() * 6 + 1);
      nums.push({
        value: randomNum,
        isHeld: false,
        id: nanoid(),
      });
    }
    return nums;
  };

  const [ randomNums, setRandomNums ] = useState(()=> allNewDice());
  
  // Hold the clicked die.
  const hold = (id)=> {
    setRandomNums((prev)=> {
      return prev.map((x)=> {
      if(x.id === id){
        return {
        ...x,
        isHeld: !x.isHeld,
        }
      } else {
        return x
      }
      })
      })
    }

  const diceElements = randomNums.map((x, index)=> (
    < Die key={x.id} value={x.value}
    isHeld={x.isHeld} hold={hold} id={x.id}/>
  ))

  // Game won (true / false)
  let gameWon = false;
  console.log(gameWon);

  // Roll DIce function.
  const rollDice = (text)=> {
    if(text === "Roll"){
      setRandomNums((prev)=> {
      return prev.map((x)=> {
        if(x.isHeld === true){
          return x;
        } else {
          return { ...x, value: Math.floor(Math.random() * 6 + 1) }
        }
      })
    })
    } else if(text === "New Game"){
      gameWon = false;
      setRandomNums(()=> allNewDice());
      rollDice();
    }
  }

  // GAme Status.
  const gameOver = ()=> {
    const isAllHeld = randomNums.every((y)=> y.isHeld === true);
    const firstValue = randomNums[0].value;
    const isAllSameValue = randomNums.every((y)=> y.value === firstValue);
    
    if(isAllHeld && isAllSameValue){
      gameWon = true;
      console.log("Game Over");
    }
  }
  gameOver(); 

    // Tab focus
  const buttonRef = useRef(null)     
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])


  return (
    <>

    {/* Confetti */}
    { gameWon && <Confetti /> }

    <main>

      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        { diceElements }
      </div>

      <button ref={buttonRef} onClick={(e)=> rollDice(e.target.innerText)}className="roll-btn">
          { gameWon ? "New Game" : "Roll" }
      </button>

    </main>
    </>
  )
}

export default App