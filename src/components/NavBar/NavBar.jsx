import './Navbar.css'
import { useContext } from 'react';
import { Link } from 'react-router';

// Context
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
    const { user, signOut } = useContext(UserContext);

    return (
        <header className="navbar">
            <div className="navbar__brand">
                <Link to="/">🌎 Worldly</Link>
            </div>

            <nav className="navbar__links">
                <Link to="/countries">All Countries</Link>
                {user ? (
                    <>
                        <Link to="/travelpost/new">Create Travel Post</Link>
                        <Link to="/sign-in" onClick={signOut}>Sign out {user && `(${user.username})`}</Link>
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
