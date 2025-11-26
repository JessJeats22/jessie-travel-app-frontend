import './SignUp.css'
import { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' />
                </div>


                <div className="form-control">
                    <label hidden htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder='Username' />
                </div>

                <div className="form-control">
                    <label hidden htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Username' />
                </div>


                <div className="form-control">
                    <label hidden htmlFor="confirmPassword">Re-type your password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Username' />
                </div>

                <button type="submit">Create account</button>

            </form>

        </>
    )
}



export default SignUp