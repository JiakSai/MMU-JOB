import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';

export function AddReview({ onClose, company, justClose, review }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const [post, setPost] = useState({
        rating: '',
        employeeType: '',
        jobTitle: '',
        headline: '',
        review: '',
    });

    useEffect(() => {
        console.log(review);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        try {
            let response;
            if(review){
                response = await axios.patch(`http://localhost:8000/api/UpdateRating/${review.id}`, post, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            }
            else{
                response = await axios.post(`http://localhost:8000/api/AddRating/${company.id}`, post, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            onClose();
            console.log(response.data);
        } catch (error) {
            console.error('AxiosError', error);
        }
    };

    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>&times;</button>
                <div className="py-4 px-6 bg-white">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h1>Rate a Company</h1>
                        <p>It only takes a minute! And your anonymous review will help other job seekers.</p>
                        <div className="flex items-center">
                            <img className='w-20 h-20 mr-3' src={company.logo} alt="Company Logo" />
                            <div>
                                <p className="text-sm text-gray-600">Company</p>
                                <p className="font-semibold">{company.name}</p>
                            </div>
                        </div>
                        <p className="mt-4">Overall Rating*</p>
                        <div className='flex gap-5'>
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
                        <div className='flex items-center mt-4 gap-6 pl-[18px]'>
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                            <label className="text-sm text-gray-600">I agree to the MMUJOB Terms of Use and that this review is an honest and accurate account of my experience at my current or former employer.</label>
                        </div>
                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
