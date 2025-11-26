import './SignUp.css'
// Import the useContext hook
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

// import { signUp } from '../../services/authService';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

const SignUp = () => {

    const navigate = useNavigate();
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we're not using here).
  // - The setUser function to update the user state (which we are using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  // formData destructuring and handleChange function.

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      // Call the setUser function to update the user state, just like normal.
      setUser(newUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };


return (
    <h1>
        Sign Up
    </h1>
)
}



export default SignUp