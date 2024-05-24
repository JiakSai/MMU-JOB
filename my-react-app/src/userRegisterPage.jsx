import axios from 'axios';
import React, { useState } from 'react';
import registerPhoto from './photo/MoshingDoodle (1).png';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


function UserRegister(){
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

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8000/api/UserRegister', post)
            .then(response => {
                console.log(response);
        
            })
            .catch(error => {
                console.log(error);
            });
        let inputError = {
            email: '',
            password: '',
            password_confirmation: ''
        };
        if(!post.email && !post.password && !post.password_confirmation){
            setFormError({
                ...inputError,
                email: '* Email is required',
                password: '* Password is required',
                password_confirmation: '* Confirm Password is required'
            });
            
            return;
        }
        if(!post.password && !post.password_confirmation){
            setFormError({
                ...inputError,
                password: '* Password is required',
                password_confirmation: '* Confirm Password is required'
            });
            return;
        }
        if(!post.email && !post.password_confirmation){
            setFormError({
                ...inputError,
                email: '* Email is required',
                password_confirmation: '* Confirm Password is required'
            });
            return;
        }
        if(!post.email){
            setFormError({
                ...inputError,
                email: '* Email is required'
            });
            return;
        }
        if(!post.password){
            setFormError({
                ...inputError,
                password: '* Password is required'
            });
            return;
        }
        if(!post.password_confirmation){
            setFormError({
                ...inputError,
                password_confirmation: '* Confirm Password is required'
            });
            return;
        }
        if(post.password !== post.password_confirmation){
            setFormError({
                ...inputError,
                password_confirmation: '* Password does not match'
            });
            return;
        }
        setFormError(inputError);

    }


    return (
        <section>
            <div className='LoginRegisterTop'><h1 className='logo'>" MMUJOB "</h1> </div>
            <div className="registerContainer">
                <div>
                    <p className='rchangeSite'>Are you an employer?</p>
                    <div className="userRegisterFormContainer">
                        <h1>Register as New User</h1>
                        <p>Fill in this form to create an account.</p>
                        <form className="registerForm" onSubmit={handleSubmit} >
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" value={post.email} onChange={handleInput} id={formError.email ? 'inputError' : ''}/>
                            <p className="error-message">{formError.email}</p>
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input type={passwordVisible ? "text" : "password"} name="password" value={post.password} onChange={handleInput} id={formError.password ? 'inputError' : ''}/>
                                <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password}</p>
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <div className="password-container">
                                <input type={comPasswordVisible ? "text" : "password"} name="password_confirmation" value={post.password_confirmation} onChange={handleInput} id={formError.password_confirmation ? 'inputError' : ''}/>
                                <span onClick={toggleComPasswordVisibility} className="password-toggle-icon">
                                    {comPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <p className="error-message">{formError.password_confirmation}</p>
                            <div className="rememberForgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit">Register</button>
                            <p>Already have an account? <Link to="/userLogin">Login</Link></p>
                        </form>
                    </div>
                </div>
                <img src={registerPhoto} alt="Login" className='registerIllustration'/>
            </div>
            <div className='LoginRegisterBottom'>
              <p>Copyright © 2024, MMUJOB LLC. "MMUJOB" and logo are registered trademarks of MMUJOB LLC.</p>
              <p><a href="#">Terms of Use</a> | <a href="#">Privacy & Ad Choices</a></p>
            </div>
        </section>
    );
}

export default UserRegister;