import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  // state
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({ username: '', password: '' });

  const [disabled, setDisabled] = useState(true);


  // onChange Handler
  const change = (evt) => {
    const { value, name } = evt.target;

    const valueToUse = value;

    setErrors(name, valueToUse);

    setFormValues({ ...formValues, [name]: valueToUse });
  };

  // onSubmit Handler
  const submit = (evt) => {
    evt.preventDefault()
  }

  // JSX
  return (
    <div className='login-container'>
      <h1>Login</h1>

      <form className='login-formValues' onSubmit={submit}>
        <input
          onChange={change}
          value={formValues.username}
          name='username'
          placeholder='Enter your username'
          type='text'
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
    </div >
  )
};
export default Login;