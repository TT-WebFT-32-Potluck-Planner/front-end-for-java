import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  // state
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [disabled, setDisabled] = useState(true);


  //onChange

  const change = (evt) => {
    const { value, name } = evt.target;
    const valueToUse = value;
    setErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  //submit

  const submit = (evt) => {
    evt.preventDefault()
  }

  //JSX
  return (
    <div>
      <nav>
        <div className="links">
          <Link to="/" className="link">
            Home
            </Link>
          <Link to="../Signup" className="link">
            Signup
            </Link>
        </div>
      </nav>
      <section className="center">
        <img src={Image} className="loginImg" alt="food"></img>
      </section>
      <section className="loginForm">
        <h2 className="loginFormHeader">Login</h2>
        <form className="loginFormInput" onSubmit={submit}>
          <input
            onChange={change}
            value={form.username}
            name="username"
            placeholder="Enter your username"
            type="text"
          ></input>

          <div> {errors.username} </div>
          <input
            onChange={change}
            value={form.password}
            name="password"
            placeholder="Enter your Password"
            type="text"
          ></input>
          <div> {errors.password} </div>
          <button disabled={disabled} > Login </button>
        </form>
      </section>
    </div>
  )
};
export default Login;