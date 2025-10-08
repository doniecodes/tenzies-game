import React from 'react'

const Die = (props) => {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  }

  return (
    <>
      <button style={styles}
      onClick={()=> props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
      ${props.isHeld ? "held" : "not held"}`}
            >
        {props.value}
      </button>
    </>
  )
}

export default Die