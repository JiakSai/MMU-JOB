import axios from 'axios';
import React, { useState } from 'react';
import registerPhoto from './photo/MoshingDoodle (1).png';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from './Footer.jsx';

function UserRegister() {
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

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value});
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
        }
        else if (post.password.length < 6) {
            inputError.password_confirmation = '* Password must be at least 6 characters';
        }
        else if (post.password !== post.password_confirmation) {
            inputError.password_confirmation = '* Password does not match';
        }

        if (inputError.email || inputError.password || inputError.password_confirmation) {
            setFormError(inputError);
            return;
        }

        // Reset errors
        setFormError(inputError);

        // Submit registration data
        axios.post('http://localhost:8000/api/UserRegister', post)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
        <section>
            <div className='LoginRegisterTop'>
                <h1 className='logo'>" MMUJOB "</h1> 
            </div>
            <div className="registerContainer">
                <div>
                    <p className='rchangeSite'>Are you an employer?</p>
                    <div className="userRegisterFormContainer">
                        <h1 className='text-[25px] font-bold text-gray-900'>Register as New User</h1>
                        <p>Fill in this form to create an account.</p>
                        <form className="registerForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={post.email} 
                                onChange={handleInput} 
                                id={formError.email ? 'inputError' : ''}
                            />
                            <p className="error-message">{formError.email}</p>
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input 
                                    type={passwordVisible ? "text" : "password"} 
                                    name="password" 
                                    value={post.password} 
                                    onChange={handleInput} 
                                    id={formError.password ? 'inputError' : ''}
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
                                    id={formError.password_confirmation ? 'inputError' : ''}
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
                            <p>Already have an account? <Link to="/userLogin">Login</Link></p>
                        </form>
                    </div>
                </div>
                <img src={registerPhoto} alt="Login" className='registerIllustration'/>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default UserRegister;
