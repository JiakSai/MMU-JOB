import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoClose } from "react-icons/io5";

export function AddReview({ onClose, company, justClose, review }) {
    const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
    const [hover, setHover] = useState(null);
    const [error, setError] = useState('');

    const [post, setPost] = useState({
        rating: '',
        employeeType: '',
        jobTitle: '',
        headline: '',
        review: '',
    });

    useEffect(() => {
        if (review) {
            setPost({
                rating: review.rating,
                employeeType: review.employeeType,
                jobTitle: review.jobTitle,
                headline: review.headline,
                review: review.review,
            });
        }
    }, [review]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        setPrivacyPolicyChecked(event.target.checked);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');

        if (!privacyPolicyChecked) {
            setError('* You must agree to the Privacy Policy');
            return;
        }

        try {
            const url = review
                ? `http://localhost:8000/api/UpdateRating/${review.id}`
                : `http://localhost:8000/api/AddRating/${company.id}`;
            const method = review ? 'patch' : 'post';
            await axios({
                method: method,
                url: url,
                data: post,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            onClose();
        } catch (error) {
            console.error('AxiosError', error);
        }
    };

    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'><IoClose size={25}/></button>
                <div className="py-4 px-6 bg-white">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h1 className='text-3xl font-bold mb-4'>Rate a Company</h1>
                        <p>It only takes a minute! And your anonymous review will help other job seekers.</p>
                        <div className="flex items-center mt-4">
                            <img className='w-20 h-20 mr-3' src={company.logo} alt="Company Logo" />
                            <div className='ml-2'>
                                <p className="text-sm text-gray-600">Company*</p>
                                <p className="text-xl font-semibold ml-1">{company.name}</p>
                            </div>
                        </div>
                        <p className="mt-4">Overall Rating*</p>
                        <div className='flex gap-1'>
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index} className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name='rating'
                                            value={ratingValue}
                                            className='hidden'
                                            onChange={handleInput}
                                            checked={parseInt(post.rating) === ratingValue}
                                        />
                                        <FaStar
                                            size={30}
                                            color={ratingValue <= (hover || parseInt(post.rating)) ? "yellow" : "gray"}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <p className="mt-4">Are you a current or former employee?</p>
                        <div className="flex gap-3">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="employeeType"
                                    value="Current Employee"
                                    onChange={handleInput}
                                    checked={post.employeeType === "Current Employee"}
                                />
                                <span className="ml-2">Current Employee</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="employeeType"
                                    value="Former Employee"
                                    onChange={handleInput}
                                    checked={post.employeeType === "Former Employee"}
                                />
                                <span className="ml-2">Former Employee</span>
                            </label>
                        </div>
                        <label className="mt-4">Your Job Title *</label>
                        <input
                            type="text"
                            name='jobTitle'
                            className='border border-gray-300 p-2'
                            onChange={handleInput}
                            value={post.jobTitle}
                        />
                        <label className="mt-4">Review Headline *</label>
                        <input
                            type="text"
                            name='headline'
                            className='border border-gray-300 p-2'
                            onChange={handleInput}
                            value={post.headline}
                        />
                        <label className="mt-4">Review *</label>
                        <textarea
                            name='review'
                            className='border border-gray-300 p-2'
                            rows={5}
                            onChange={handleInput}
                            value={post.review}
                        />
                        <div className='border border-gray-300 p-2 mt-4 flex items-center gap-3'>
                            <IoEarth size={30} />
                            <p>All information contributed above will be visible to people who visit MMUJOB.</p>
                        </div>
                        <div className='flex items-center mt-4 gap-6'>
                            <input 
                                type="checkbox" 
                                className="form-checkbox h-10 w-10 text-blue-500" 
                                checked={privacyPolicyChecked}
                            />
                            <label className="text-sm text-gray-600">I agree to the MMUJOB Terms of Use and that this review is an honest and accurate account of my experience at my current or former employer.</label>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
