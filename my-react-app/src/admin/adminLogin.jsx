import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';

export function AdminLogin(){
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
        axios.post('http://localhost:8000/api/AdminLogin', loginPost)
            .then(response => {
                console.log(response);
                const token = response.data.token; 
                    Cookies.set('adminToken', token); 
                    console.log(token);
                    navigate('/dashboard');
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    setFormError({ email: 'Invalid email or password', password: 'Invalid email or password' });
                }
            });
    };
    return(
        <section>
            <div className='AdminRegisterTop shadow-2xl'><h1 className='logoUser'>" MMU</h1><h1 className='logoEmp ml-[-9px]'>JOB "</h1> </div>
            <div className="flex justify-center adminContainer">
                <div className="border border-black p-8 my-[139.2px] rounded-lg userLoginFormContainer">
                    <h1 className='text-3xl font-semibold'>Admin Login</h1>
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
                                <span onClick={togglePasswordVisibility} className="adminpassword-toggle-icon">
                                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password}</p>
                            <button className='mt-4 bg-zinc-900 text-neutral-50' type="submit">Login</button>
                        </form>
                </div>
            </div>
        </section>
    );
}