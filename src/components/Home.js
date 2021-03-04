import { useHistory } from 'react-router-dom'
import hero from '../assets/potluck1.jpg'

const Home = () => {
  const history = useHistory()

  const routeToSignup = () => {
    history.push('/signup')
  }

  const routeToDashboard = () => {
    history.push('/dash')
  }

  return (
    <div className='home'>
      <h1>Potluck Planner</h1>

      <img src={hero} alt='dinner table with food' />
      
      {/* 
      If user is logged in, link them to their dashboard.
      If user is not logged in, link them to register. */}

      {localStorage.getItem('token')
        ? <h2>View your potlucks!</h2>
        : <h2>No account? Signup now!</h2>
      }

      {localStorage.getItem('token')
        ? <button onClick={routeToDashboard}>Dashboard</button>
        : <button onClick={routeToSignup}>Get Started</button>
      }
      
    </div>
  )
}

export default Home
