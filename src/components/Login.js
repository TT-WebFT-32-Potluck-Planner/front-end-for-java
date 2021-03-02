import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialFormValues = {
  username: '',
  password: ''
}

const Login = () => {
  // state
  const [formValues, setFormValues] = useState(initialFormValues);
  const [successMessage, setSuccessMessage] = useState('')

  const [errors, setErrors] = useState({ username: '', password: '' });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory()


  // onChange Handler
  const change = evt => {
    const { value, name } = evt.target;

    // Good use of the spread operator to keep previous form value state
    setFormValues({ ...formValues, [name]: value });

    const valueToUse = value;

    setErrors(name, valueToUse);


    if (formValues.username && formValues.password !== '') {
      setDisabled(false)
    }
  };

  // onSubmit Handler
  const submitLogin = evt => {
    evt.preventDefault()

    axios
      .post('https://tt-webft-32-potluck-planner.herokuapp.com/api/auth/login', formValues)
      .then(res => {
        console.log('Login Post Response', res)

        const token = res.data.token

        localStorage.setItem('token', token)

        setSuccessMessage(res.data.message)

        history.push('/dash')
      })
      .catch(err => console.log(err))
  }

  // JSX
  return (
    <div className='form-container'>
      <h1>Login</h1>

      <form onSubmit={submitLogin}>
        <input
          onChange={change}
          value={formValues.username}
          name='username'
          placeholder='Enter your username'
          type='text'
          autoComplete='off'
        />

        <div> {errors.username} </div>

        <input
          onChange={change}
          value={formValues.password}
          name='password'
          placeholder='Enter your password'
          type='password'
        />

        <div> {errors.password} </div>

        <button disabled={disabled}>Login</button>
      </form>

      {successMessage !== '' ? <p><p id='login-success'>{successMessage}</p></p> : ''}

    </div >
  )
};
export default Login;