import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth';

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


  //useEffect to set userid in localstorage once the user is logged in
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      console.log('hey, the useEffect is running.')
      axiosWithAuth()
        .get('/users/getuserinfo')
        .then(res => {
          const userID = res.data.userid;
          localStorage.setItem('userID', userID);
          history.push('/dash');
        })
        .catch(err => console.log(err))
    }
  }, [history, successMessage])

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
      .post('https://my-potluck-planner.herokuapp.com/api/login', 
        `grant_type=password&username=${formValues.username}&password=${formValues.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      
      )
      .then(res => {
        console.log('Login Post Response', res)

        const token = res.data.access_token;
        localStorage.setItem('token', token);
        setErrorMessage('');
        setSuccessMessage('Welcome back')
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Invalid username or password');
      })
  }


  // const logout = e => {
  //   e.preventDefault();
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userID');
  //   setSuccessMessage('');
  //   history.push('/login');
  // };

  const routeToSignUp = e => {
    e.preventDefault();
    history.push('/signup');
  };

  // const routeToDashboard = e => {
  //   e.preventDefault();
  //   history.push('/dash');
  // };

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
          <p>Don't have an account? <button className="cta" onClick={routeToSignUp}>sign up!</button></p>
        </div>
      }


      {successMessage !== '' ? <p id='login-success'>{successMessage}</p> : ''}

    </div >
  )
};
export default Login;