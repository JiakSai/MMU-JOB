import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function Register(){
    const [post, setPost] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleInput =(event) =>{
        setPost({...post,[event.target.name]: event.target.value});
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8000/api/register',{post})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    return(
        <section>
            <nav><h1 className='logo'>" MMUJOB "</h1> </nav>
            <div className="registerContainer">
                <div>
                    <p className='changeSite'>Are you an employer?</p>
                    <div className="userLoginFormContainer">
                        <h1>Register as New User</h1>
                        <p>Fill in this form to create an account.</p>
                        <form className="registerForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" onChange={handleInput} required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required onChange={handleInput} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInput} required />
                            <div className="rememberForgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit">Register</button>
                            <p>Already have an account? <a href="#">Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className='userLoginBottom'>
              <p>Copyright © 2024, MMUJOB LLC. "MMUJOB" and logo are registered trademarks of MMUJOB LLC.</p>
              <p><a href="#">Terms of Use</a> | <a href="#">Privacy & Ad Choices</a></p>
            </div>
        </section>
    )
}
export default Register;