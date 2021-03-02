import React, { useState } from 'react'
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

        const token = res.data.token;
        const userID = res.data.user.userid;
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);

        setSuccessMessage(res.data.message)
      })
      .catch(err => console.log(err))
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  };

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

      {successMessage !== '' ? <p id='login-success'>{successMessage}</p> : ''}

      {localStorage.getItem('token') && <button onClick={logout}>Logout</button>}

    </div >
  )
};
export default Login;