import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginphoto from './photo/Zombieing.svg';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import Footer from './Footer.jsx';
import Cookies from 'js-cookie';

export default function UserLogin() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [resetPassVisible, setResetPassVisible] = useState(false);
    const [resetPassConfirmVisible, setResetPassConfirmVisible] = useState(false);
    const [loginPost, setLoginPost] = useState({ email: '', password: '' });
    const [resetPost, setResetPost] = useState({ email: '', token: '', password: '', password_confirmation: '' });
    const [formError, setFormError] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [currentForm, setCurrentForm] = useState('login'); // 'login', 'resetRequest', 'resetPassword'

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleResetPassVisibility = () => {
        setResetPassVisible(!resetPassVisible);
    };

    const toggleResetPassConfirmVisibility = () => {
        setResetPassConfirmVisible(!resetPassConfirmVisible);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (currentForm === 'login') {
            setLoginPost({ ...loginPost, [name]: value });
        } else {
            setResetPost({ ...resetPost, [name]: value });
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        let inputError = { email: '', password: '' };

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
        axios.post('http://localhost:8000/api/UserLogin', loginPost)
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

    const handleResetRequestSubmit = (event) => {
        event.preventDefault();

        if (!resetPost.email) {
            setMessage('* Email is required');
            return;
        }

        axios.post('http://localhost:8000/api/User/SendOTPEmail', {email:resetPost.email})
        .then(response => {
            console.log('Response:', response.data);
            setMessage('OTP sent to your email.');
            setCurrentForm('resetPassword');
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            setMessage('Error sending OTP.');
        });

    };

    const handleResetPasswordSubmit = (event) => {
        event.preventDefault();
    
        const { token, password, password_confirmation } = resetPost;  
    
        if (!token || !password || !password_confirmation) {  
            setMessage('* All fields are required');
            return;
        }
    
        if (password !== password_confirmation) {  
            setMessage('* New password and confirm password must match');
            return;
        }
    
        axios.post('http://localhost:8000/api/User/ResetPassword', {
            token,
            password,
            password_confirmation  
        })
            .then(response => {
                console.log('Password reset successful:', response.data);
                setMessage('Password reset successful.');
                setCurrentForm('login');
            })
            .catch(error => {
                console.error('Error resetting password:', error);
                setMessage('Invalid OTP or error resetting password.');
            });
    };

    return (
        <>
        <section>
            <div className='LoginRegisterTop'><a href='/SearchJob' className='logoUser'>" MMUJOB "</a></div>
            <div className="userLoginContainer">
                <img src={loginphoto} alt="Login" className='w-[720px] h-[480px] ml-[-25px] mt-[-8px]'/>
                <div>
                    <p className='changeSite'><Link to="/employerLogin">Are you an employer?</Link></p>
                    <div className='userLoginFormContainer'>
                        <h1 className='text-[28px] font-bold text-customBlue'>
                            {currentForm === 'login' ? 'Welcome Back!' : currentForm === 'resetRequest' ? 'Reset Password' : 'Enter OTP and New Password'}
                        </h1>
                        {currentForm === 'login' && (
                            <p>Please login to your account</p>
                        )}
                        {currentForm === 'resetRequest' && (
                            <p>Please enter your email to receive an OTP</p>
                        )}
                        {currentForm === 'resetPassword' && (
                            <p>Please enter the OTP sent to your email and your new password</p>
                        )}
                        
                        {currentForm === 'login' && (
                            <form className="userLoginForm" onSubmit={handleLoginSubmit}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                    value={loginPost.email}
                                    style={{ border: formError.email ? '1px solid red' : '' }}
                                />
                                <p className="error-message">{formError.email}</p>
                                <label htmlFor="password">Password</label>
                                <div className="password-container">
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        name="password" 
                                        value={loginPost.password} 
                                        onChange={handleInput} 
                                        style={{ border: formError.password ? '1px solid red' : '' }}
                                    />
                                    <span onClick={togglePasswordVisibility} className="userpassword-toggle-icon">
                                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                <p className="error-message">{formError.password}</p>
                                <div className="rememberForgot">
                                    <a href="#" onClick={() => setCurrentForm('resetRequest')}>Forgot password?</a>
                                </div>
                                <button type="submit">Login</button>
                                <p className='toRegister'>Do you have an account? <Link to="/userRegister">Register</Link></p>
                            </form>
                        )}
                        
                        {currentForm === 'resetRequest' && (
                            <form className="userLoginForm" onSubmit={handleResetRequestSubmit}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                    value={resetPost.email}
                                />
                                <button type="submit">Send OTP</button>
                                <p className="error-message">{message}</p>
                                <div className="rememberForgot">
                                    <a href="#" onClick={() => setCurrentForm('login')}>Back to Login</a>
                                </div>
                            </form>
                        )}
                        
                        {currentForm === 'resetPassword' && (
                            <form className="userLoginForm" onSubmit={handleResetPasswordSubmit}>
                                <label htmlFor="otp">OTP</label>
                                <input
                                    type="text"
                                    name="token"
                                    onChange={handleInput}
                                    value={resetPost.token}
                                />
                                <label htmlFor="newPassword">New Password</label>
                                <div className="password-container">
                                    <input
                                        type={resetPassVisible ? "text" : "password"} 
                                        name="password"
                                        onChange={handleInput}
                                        value={resetPost.password}
                                    />
                                    <span onClick={toggleResetPassVisibility} className="userpassword-toggle-icon">
                                            {resetPassVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                <div className="password-container">
                                    <input
                                        type={resetPassConfirmVisible ? "text" : "password"} 
                                        name="password_confirmation"
                                        onChange={handleInput}
                                        value={resetPost.password_confirmation}
                                    />
                                    <span onClick={toggleResetPassConfirmVisibility} className="userpassword-toggle-icon">
                                            {resetPassConfirmVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                <button type="submit">Reset Password</button>
                                <p className="error-message">{message}</p>
                                <div className="rememberForgot">
                                    <a href="#" onClick={() => setCurrentForm('login')}>Back to Login</a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
}
