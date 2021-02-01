import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { Route, Switch, useHistory, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Form from './components/Form'
import axios from 'axios'
import schema from './validation/formSchema'
import Pizza from './components/Pizza'

const StyledHeader = styled.header`
  display: flex;
  background-color: whitesmoke;
  justify-content: space-between;
  font-family: monospace;
  align-items: center;
  h1 {
    margin-left: 5%;
  }
  nav {
    display: flex;
    width: 30%;
    margin-right: 5%;
  }

  .nav-btn {
    text-decoration: none;
    border: 1.5px solid black;
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 3%;
    transition: all 0.5s ease-in-out;
  }
  .nav-btn:visited,
  .nav-btn:active {
    color: inherit;
  }
  .nav-btn:hover {
    background-color: black;
    color: white;
  }
`

const StyledDiv = styled.div`
  height: 40vh;
  display: flex;
  background: url('https://go.bellavitatravels.com/hubfs/naples%20-%20neapolitan%20pizza.jpg');
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  font-family: monospace;
  margin: 0 2%;
  text-align: center;

  button {
    text-decoration: none;
    padding: 1% 4%;
    background-color: whitesmoke;
    border: 2.5px solid black;
    border-radius: 10px;
    transition: all 0.5s ease-in-out;
    font-weight: bold;
  }
  button:visited,
  button:active {
    color: inherit;
  }
  button:hover {
    background-color: black;
    color: white;
    border: 2px solid white;
  }
`

const initialValues = {
  name: '',
  size: '',
  pepperoni: false,
  bacon: false,
  caramelizedOnions: false,
  mushrooms: false,
  specialInstructions: '',
}

const initialFormErrors = {
  name: '',
  size: '',
}

const App = () => {
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [pizzas, setPizzas] = useState([])
  const [disabled, setDisabled] = useState(true)

  const history = useHistory()

  const routeToForm = () => {
    history.push('/pizza')
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: '' })
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] })
      })
  }

  const change = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const postNewData = (newData) => {
    axios
      .post('https://reqres.in/api/pizzas', newData)
      .then((res) => {
        setPizzas([res.data, ...pizzas])
        setFormValues(initialValues)
      })
      .catch((err) => {
        console.error(err)
        debugger
      })
  }

  const submit = (evt) => {
    const newData = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: ['pepperoni', 'bacon', 'caramelizedOnions', 'mushrooms'].filter(
        (topping) => formValues[topping]
      ),
      specialInstructions: formValues.specialInstructions,
    }
    postNewData(newData)
    history.push('/confirm')

  }

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App Container">
      <StyledHeader>
        <h1>Lambda Eats</h1>
        <nav>
          <NavLink className="nav-btn" to="/">
            Home
          </NavLink>
          <NavLink className="nav-btn" to="/pizza">
            Form
          </NavLink>
        </nav>
      </StyledHeader>
      <Switch>
        <Route path={'/pizza'}>
          <Form
            formValues={formValues}
            change={change}
            submit={submit}
            buttonDisabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route path={'/confirm'}>
          <h2>Your Pizza is on the way!</h2>
          {pizzas.map((pizza) => {
            return <Pizza key={pizza.id} pizza={pizza} />
          })}
        </Route>
        <Route exact path="/">
          <StyledDiv>
            <h1>
              Your favorite food,
              <br /> delivered while coding.
            </h1>
            <button onClick={routeToForm}>Pizza?</button>
          </StyledDiv>
        </Route>
      </Switch>
    </div>
  )
}
export default App
