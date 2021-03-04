import { Link, useHistory } from 'react-router-dom'


const Navbar = () => {

  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    history.push('/login');
  };

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/dash'>Dashboard</Link>
        {localStorage.getItem('token')
          ? <Link onClick={logout}>Logout</Link>
          : <Link to='/login'>Login</Link>
        }

      </nav>
    </>
  )
}

export default Navbar
