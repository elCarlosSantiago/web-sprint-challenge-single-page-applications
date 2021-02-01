import React from 'react'
import styled from 'styled-components'

const StyledPizza = styled.div`
  font-family: monospace;
`

export default function Pizza(props) {
  const { pizza } = props
  if (!pizza) {
    return <h2>Fetching pizza order!</h2>
  }

  return (
    <StyledPizza>
      <h2>{pizza.name}'s Pizza</h2>
      <p>Size: {pizza.size}</p>
      {
        !!pizza.toppings && !!pizza.toppings.length &&
        <div>
          Toppings:
          <ul>
            {pizza.toppings.map((topping, idx) => <li key={idx}>{topping}</li>)}
          </ul>
        </div>
      }
      {pizza.specialInstructions ? <p>Special Instructions: {pizza.specialInstructions}</p> : <p>No special instructions</p>}
    </StyledPizza>
  )
}
