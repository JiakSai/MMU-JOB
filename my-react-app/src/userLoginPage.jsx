import React, { useState } from 'react';
import { Link } from "react-router-dom";
import loginphoto from './photo/ZombieingDoodle.png';
import axios from 'axios';

export default function UserLogin() {
    const [loginPost, setLoginPost] = useState({
        email: '',
        password: ''
    });

    const handleInput = (event) => {
      setLoginPost({...loginPost, [event.target.name]: event.target.value});
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/Userlogin', loginPost)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <section>
            <div className='LoginRegisterTop'>
                <h1 className='logo'>MMUJOB</h1>
            </div>
            <div className="userLoginContainer">
                <img src={loginphoto} alt="Login" className='loginIllustration' />
                <div>
                    <p className='changeSite'>Are you an employer?</p>
                    <div className='userLoginFormContainer'>
                        <h1>Welcome Back!</h1>
                        <p>Please login to your account</p>
                        <form className="userLoginForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleInput}
                                value={loginPost.email}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleInput}
                                value={loginPost.password}
                                required
                            />
                            <div className="rememberForgot">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit">Login</button>
                            <p className='toRegister'>Do you have an account? <Link to="/userRegister">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className='LoginRegisterBottom'>
                <p>Copyright © 2024, MMUJOB LLC. "MMUJOB" and logo are registered trademarks of MMUJOB LLC.</p>
                <p><a href="#">Terms of Use</a> | <a href="#">Privacy & Ad Choices</a></p>
            </div>
        </section>
    );
}
