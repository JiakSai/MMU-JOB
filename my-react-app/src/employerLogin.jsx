import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginphoto from './photo/Strolling.svg';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import EmployerFooter from './employerFooter';
import Cookies from 'js-cookie';

export default function EmployerLogin() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginPost, setLoginPost] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({
        email: '',
        password: ''
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInput = (event) => {
        setLoginPost({ ...loginPost, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let inputError = {
            email: '',
            password: ''
        };

        // Form validation
        if (!loginPost.email) {
            inputError.email = '* Email is required';
        }
        
        if (!loginPost.password) {
            inputError.password = '* Password is required';
        } else if (loginPost.password.length < 6) {
            inputError.password = '* Password must be at least 6 characters';
        }

        if (inputError.email || inputError.password) {
            setFormError(inputError);
            return;
        }

        // Reset errors
        setFormError(inputError);

        // Submit login data
        axios.post('http://localhost:8000/api/EmployerLogin', loginPost)
            .then(response => {
                console.log(response);
                const token = response.data.token; 
                    Cookies.set('token', token); 
                    console.log(token);
                    navigate('/SearchJob');
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    setFormError({ email: 'Invalid email or password', password: 'Invalid email or password' });
                }
            });
    };

    return (
        <>
        <section>
            <div className='LoginRegisterTop'><h1 className='logoEmp'>" MMUJOB "</h1> </div>
            <div className="userLoginContainer">
                <img src={loginphoto} alt="Login" className='w-[720px] h-[480px] ml-[-25px] mt-[-8px]'/>
                <div>
                    <p className='changeSite'>Are you a job seeker?</p>
                    <div className='userLoginFormContainer'>
                        <h1 className='text-[28px] font-bold text-customPink'>Employer Sign In</h1>
                        <p>Please login to your account</p>
                        <form className="userLoginForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleInput}
                                value={loginPost.email}
                                style={{ border: formError.password ? '1px solid red' : '' }}
                            />
                            <p className="error-message">{formError.email}</p>
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input 
                                    type={passwordVisible ? "text" : "password"} 
                                    name="password" 
                                    value={loginPost.password} 
                                    onChange={handleInput} 
                                    style={{ border: formError.password? '1px solid red' : '' }}
                                />
                                <span onClick={togglePasswordVisibility} className="userpassword-toggle-icon">
                                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password}</p>
                            <div className="rememberForgot">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit">Login</button>
                            <p className='toRegister'>Do you have an account? <Link to="/employerRegister">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <EmployerFooter />
        </>
    );
}