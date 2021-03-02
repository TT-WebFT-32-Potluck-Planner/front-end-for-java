import React, { useState } from 'react'
import axios from 'axios'

const initialFormValues = {
  username: '',
  password: ''
}

const Signup = () => {
  //STATE
  const [formValues, setFormValues] = useState(initialFormValues)

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [disabled, setDisabled] = useState(true);

  // ONCHANGE
  const change = (evt) => {
    const { value, name } = evt.target;
    setFormValues({ ...formValues, [name]: value });

    const valueToUse = value;

    setErrors(name, valueToUse);

    if (formValues.username && formValues.password !== '') {
      setDisabled(false)
    }
  }

  const submit = evt => {
    evt.preventDefault()

    axios
      .post('https://tt-webft-32-potluck-planner.herokuapp.com/api/auth/register', formValues)
      .then(res => {
        console.log(res)

        const userID = res.data.userid
        localStorage.setItem('userID', userID)
      })
      .catch(err => console.log(err))
  }

  //JSX 
  return (
    <div className="form-container">
      <h1>Signup</h1>

      <form onSubmit={submit}>
        <input
          onChange={change}
          value={formValues.username}
          name="username"
          placeholder="Enter your username"
          type="text"
          autoComplete='off'
        />

        <div> {errors.username} </div>

        <div> {errors.email} </div>

        <input
          onChange={change}
          value={formValues.password}
          placeholder="Password"
          name="password"
          type="password"
        />

        <div>{errors.password}</div>

        <button disabled={disabled}>Signup</button>
      </form>
    </div>
  )
};


export default Signup;
