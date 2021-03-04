import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'

const initialFormValues = {
  username: '',
  password: '',
}

const Signup = () => {
  //STATE
  const [formValues, setFormValues] = useState(initialFormValues)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [username, setUsername] = useState('')

  const history = useHistory()

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [disabled, setDisabled] = useState(true);

  const formSchema = yup.object().shape({
    username: yup.string().required("Add an username"),
    password: yup.string().required("Add a password"),
  })

  const changeHandler = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // const submitHandler = () => {
  //   setFormValues(initialFormValues);
  // };

  // ONCHANGE
  const change = (evt) => {
    const { value, name } = evt.target;
    changeHandler(name, value);
  };
  // const submit = (event) => {
  // event.preventDefault();
  // submitHandler();
  // };
  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formSchema, formValues]);


  //   setFormValues({ ...formValues, [name]: value });

  //   const valueToUse = value;

  //   setErrors(name, valueToUse);

  //   if (formValues.username && formValues.password !== '') {
  //     setDisabled(false)
  //   }
  // }

  const routeToLogin = e => {
    e.preventDefault();
    history.push('/login');
  };

  const submit = evt => {
    evt.preventDefault()

    axios
      .post('https://tt-webft-32-potluck-planner.herokuapp.com/api/auth/register', formValues)
      .then(res => {
        console.log('All backend data', res)

        console.log('Status Code:', res.status)

        setSignupSuccess(true)
        setUsername(res.data.username)

        const userID = res.data.userid
        localStorage.setItem('userID', userID)
      })
      .catch(err => console.log('Failure:', err))
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

      {signupSuccess !== false ?
        <div id='signup-success'>Signup successful! 😄</div> :
        null
      }

      {signupSuccess !== false ?
        <div id='signup-success'>Your username is: <span id='username'>{username}</span></div> :
        null
      }

      <br />
      <p>Already have an account? <a onClick={routeToLogin}>Log In!</a></p>

    </div>
  )
}



export default Signup;
