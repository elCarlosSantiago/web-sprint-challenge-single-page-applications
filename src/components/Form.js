import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .toppings-div {
    display: flex;
    flex-flow: column wrap;
  }
  .text-box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`
const StyledErr = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: red;
  font-family: monospace;
  font-size:0.8rem;
`;

export default function Form(props) {
  const { formValues, change, submit, buttonDisabled, errors } = props

  const onChange = (evt) => {
    const { name, type, checked, value } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    submit()
  }
  


  return (
    <div>
      <StyledErr>
        <div>{errors.name}</div>
        <div>{errors.specialInstructions}</div>
        <div>{errors.size}</div>

      </StyledErr>
      <StyledForm onSubmit={onSubmit}>
        <label>
          Name
          <input 
          type="text" 
          name="name" 
          value={formValues.name}
          onChange={onChange}
          placeholder='Full Name'
          />
        </label>
        <label>
          Size
          <select name="size" value={formValues.size} onChange={onChange}>
            <option value="">- Select Size -</option>
            <option value="personal">Personal 8in</option>
            <option value="medium">Medium 12in</option>
            <option value="large">Large 14in</option>
          </select>
        </label>
        <div className="toppings-div">
          <h3>Toppings</h3>
          <label>
            Pepperoni
            <input
              type="checkbox"
              name="pepperoni"
              checked={formValues.pepperoni}
              onChange={onChange}
            />
          </label>
          <label>
            Bacon
            <input
              type="checkbox"
              name="bacon"
              checked={formValues.bacon}
              onChange={onChange}
            />
          </label>
          <label>
            Caramelized Onions
            <input
              type="checkbox"
              name="caramelizedOnions"
              checked={formValues.caramelizedOnions}
              onChange={onChange}
            />
          </label>
          <label>
            Mushrooms
            <input
              type="checkbox"
              name="mushrooms"
              checked={formValues.mushrooms}
              onChange={onChange}
            />
          </label>
        </div>
        <div className="text-box">
          <label>
            Special Instructions <br />
            <textarea
              value={formValues.specialInstructions}
              type="text"
              name="specialInstructions"
              cols="40"
              rows="5"
              placeholder="Add any additional requests in here!"
              onChange={onChange}
            />
          </label>
        </div>
        <button disabled={buttonDisabled}>Add to Order!</button>
      </StyledForm>
    </div>
  )
}
