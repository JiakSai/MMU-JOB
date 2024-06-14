import axios from 'axios';
import React, { useState } from 'react';
import registerPhoto from './photo/Dancing.svg';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import EmployerFooter from './employerFooter';
import Cookies from 'js-cookie';

function EmployerRegister() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [comPasswordVisible, setComPasswordVisible] = useState(false);
    const [formError, setFormError] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [post, setPost] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const navigate = useNavigate();

    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    
    const toggleComPasswordVisibility = () => {
        setComPasswordVisible(!comPasswordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let inputError = {
            email: '',
            password: '',
            password_confirmation: ''
        };

        // Form validation
        if (!post.email) {
            inputError.email = '* Email is required';
        }

        if (!post.password) {
            inputError.password = '* Password is required';
        } else if (post.password.length < 6) {
            inputError.password = '* Password must be at least 6 characters';
        }

        if (!post.password_confirmation) {
            inputError.password_confirmation = '* Confirm Password is required';
        } else if (post.password !== post.password_confirmation) {
            inputError.password_confirmation = '* Password does not match';
        }

        if (inputError.email || inputError.password || inputError.password_confirmation) {
            setFormError(inputError);
            return;
        }

        // Reset errors
        setFormError(inputError);

        // Submit registration data
        axios.post('http://localhost:8000/api/EmployerRegister', post)
            .then(response => {
                if (response.status === 200) {
                    const token = response.data.token; 
                    Cookies.set('token', token); 
                    navigate('/employerFinishSign');
                    console.log(token);
                }
                console.log(response);
            })
            .catch(error => {
                console.error('Registration error:', error);
                if (error.response && error.response.data) {
                    const backendErrors = error.response.data.errors || {};
                    setFormError({
                        email: backendErrors.email || '',
                        password: backendErrors.password || '',
                        password_confirmation: backendErrors.password_confirmation || '',
                    });
                } else {
                    console.log('Error: Unable to register user');
                }
            });
            
    };

    return (
        <>
        <section>
            <div className='LoginRegisterTop'>
                <h1 className='logoEmp'>" MMUJOB "</h1> 
            </div>
            <div className="registerContainer">
                <div>
                    <p className='rchangeSite'>Are you a job seeker?</p>
                    <div className="userRegisterFormContainer">
                        <h1 className='text-[28px] font-bold text-customPink'>Register as employer</h1>
                        <p>Fill in this form to create an account.</p>
                        <form className="registerForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={post.email} 
                                onChange={handleInput} 
                                style={{ border: formError.email ? '1px solid red' : '' }}
                            />
                            <p className="error-message">{formError.email}</p>
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input 
                                    type={passwordVisible ? "text" : "password"} 
                                    name="password" 
                                    value={post.password} 
                                    onChange={handleInput} 
                                    style={{ border: formError.password? '1px solid red' : '' }} 
                                />
                                <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password}</p>
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <div className="password-container">
                                <input 
                                    type={comPasswordVisible ? "text" : "password"} 
                                    name="password_confirmation" 
                                    value={post.password_confirmation} 
                                    onChange={handleInput}
                                    style={{ border: formError.password_confirmation ? '1px solid red' : '' }} 
                                />
                                <span onClick={toggleComPasswordVisibility} className="password-toggle-icon">
                                    {comPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password_confirmation}</p>
                            <div className="rememberForgot">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit">Register</button>
                            <p>Already have an account? <Link to="/employerLogin">Login</Link></p>
                        </form>
                    </div>
                </div>
                <img src={registerPhoto} alt="Register" className='w-[840px] h-[520px] mt-[45px]'/>
            </div>
        </section>
        <EmployerFooter />
        </>
    );
}

export default EmployerRegister;
