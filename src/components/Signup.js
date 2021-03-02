import React, { useState } from 'react'

const Signup = () => {
  //STATE
  const [signUp, setSignup] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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
    
    const valueToUse = value;

    setErrors(name, valueToUse);

    setSignup({ ...signUp, [name]: valueToUse });

    if (signUp.password && signUp.confirmPassword !== ''){
      setDisabled(false)
    }
  }

  
  const submit = evt => {
    evt.preventDefault()
  }

  //JSX 
  return (
          <div className = "signup-container">
            <h1> Signup </h1>
            <form className = "loginFormInput" onSubmit = {submit}>
              <input 
                onChange = {change}
                value= {signUp.username}
                name="username"
                placeholder = "Enter your username"
                type = "text"
               ></input>
              <div> {errors.username} </div>
            
            <input 
                onChange = {change}
                value= {signUp.email}
                name="email"
                placeholder = "Enter your Email"
                type = "text"
            ></input>
            
            <div> {errors.email} </div>
                
            <input
              onChange={change}
              value={signUp.password}
              placeholder="Password"
              name="password"
              type="password"
            ></input>
            
            <div>{errors.password}</div>

            
            <input
              onChange={change}
              value={signUp.confirmPassword}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
            ></input>
            
            <div>{errors.confirmPassword}</div>
      
           <button disabled = {disabled} > Signup </button>
          </form>
      </div>
    )
  };


export default Signup;
