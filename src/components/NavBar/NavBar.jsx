import './Navbar.css'
// Import the useContext hook
import { useContext } from 'react';
import { Link } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {

    const { user, signOut } = useContext(UserContext)

    return (
  <header>
    <div id="brand-logo">
      <Link to="/">🌎</Link>
    </div>

    <nav>
      {user ? (
        <>
          <Link to="/sign-out" onClick={signOut}>Sign out</Link>
        </>
      ) : (
        <>
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Create an account</Link>
        </>
      )}
    </nav>
  </header>
);
};

export default NavBar;

