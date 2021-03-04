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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({ username: '', password: '' });

  const [disabled, setDisabled] = useState(true);
  const history = useHistory();


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
        setErrorMessage('');
        setSuccessMessage(res.data.message)

        history.push('/dash')
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Invalid username or password');
      })
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setSuccessMessage('');
    history.push('/login');
  };

  const routeToSignUp = e => {
    e.preventDefault();
    history.push('/signup');
  };

  const routeToDashboard = e => {
    e.preventDefault();
    history.push('/dash');
  };

  // JSX
  return (

    <div className='form-container'>
      {localStorage.getItem('token') ? '' :
        <div>
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
          <p className='error'>{errorMessage}</p>
          <br />
          <p>Don't have an account? <a onClick={routeToSignUp}>sign up!</a></p>
        </div>
      }


      {successMessage !== '' ? <p id='login-success'>{successMessage}</p> : ''}

      {localStorage.getItem('token') ?
        <div>
          <button onClick={routeToDashboard}>Go to Dashboard</button>
          <button onClick={logout}>Logout</button>
        </div> : ''
      }

    </div >
  )
};
export default Login;