import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import Login from './components/Login'
import CreatePotluck from './components/CreatePotluck'
import PrivateRoute from './components/PrivateRoute'
import { Switch, Route } from 'react-router-dom'
import Invite from './components/Invite'

import PotluckCard from './components/PotluckCard'

function App() {
  return (
    <>
      <Navbar />

      <Switch>

        <Route component={PotluckCard} path='/potluck' />
        <PrivateRoute component={Dashboard} path='/dash' />
        <Route component={Invite} path='/invite/:potluckid'/>
        <Route component={Signup} path='/signup' />
        <Route component={Login} path='/login' />
        <Route component={CreatePotluck} path='/create' />
        <Route component={Home} path='/' />
      </Switch>
    </>
  );
}

export default App;
