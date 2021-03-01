import { useHistory } from 'react-router-dom'
import hero from '../assets/potluck1.jpg'

const Home = () => {
  const history = useHistory()

  const routeToSignup = () => {
    history.push('/signup')
  }

  return (
    <div className='home'>
      <h1>Potluck Planner</h1>

      <img src={hero} alt='dinner table with food' />

      <h2>No account? Signup now!</h2>

      <button onClick={routeToSignup}>Get Started</button>
    </div>
  )
}

export default Home
