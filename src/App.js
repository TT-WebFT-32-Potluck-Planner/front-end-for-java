import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import Login from './components/Login'
import { Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/dash'>
        <Dashboard />
      </Route>

      <Route exact path='/signup'>
        <Signup />
      </Route>

      <Route exact path='/login'>
        <Login />
      </Route>
    </>
  );
}

export default App;
