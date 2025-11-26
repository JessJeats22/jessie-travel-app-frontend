import './Navbar.css'
// Import the useContext hook
import { useContext } from 'react';
import { Link } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user } = useContext(UserContext);

    return (
        <header>
            <div id="brand-logo">
                <Link to="/">🌎</Link>
            </div>

            <nav>
                <Link to="/sign-in">Sign in</Link>
                <Link to="/sign-up">Create an account</Link>
            </nav>
        </header>
    );
};

export default NavBar;

