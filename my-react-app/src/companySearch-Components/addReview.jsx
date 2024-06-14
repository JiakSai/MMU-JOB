import React from 'react';
import { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';

export function AddReview({onClose, company, justClose}){
    const [selectedValue, setSelectedValue] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const [post, setPost] = useState({
        rating: '',
        employeeType: '',
        jobTitle: '',
        headline: '',
        review: '',
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`http://localhost:8000/api/AddRating/${company.id}`, post, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose();
            console.log(response.data);
        } catch (error) {
            console.error('AxiosError', error);
        }
    };

    return(
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h1>Rate a Company</h1>
                        <p>It only takes a minute! And your anonymous review will help other job seekers.</p>
                        <div className="flex">
                            <img className='w-20 h-30' src={company.logo} alt="Company Logo" />
                            <div className='mt-[10px]'>
                                <p>*company</p>
                                <p>{company.name}</p>
                            </div>
                        </div>
                        <p>Overall Rating*</p>
                        <div className='flex gap-5'>
                            {[...Array(5)].map((star, index) =>{
                                const ratingValue = index + 1;
                                return(
                                    <label key={index}>
                                        <input 
                                            type="radio" 
                                            name='rating'
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className='hidden'
                                            onChange={handleInput}
                                        />
                                        <FaStar 
                                            size={30}
                                            color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
                                            onMouseEnter={()=> setHover(ratingValue)}
                                            onMouseLeave={()=> setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <p>Are you a current or former employee?</p>
                        <div>
                            <label>
                                <input type="radio" name="employeeType" value="Current Employee" onChange={handleInput}/> Current Employee 
                            </label>
                            <label>
                                <input type="radio" name="employeeType" value="Former Employee" onChange={handleInput}/> Former Employee
                            </label>
                        </div>
                        <label>Employment Status *</label>
                        <label>Your Job Title *</label>
                        <input type="text"
                            name='jobTitle'  
                            className='border border-black p-2'
                            onChange={handleInput}
                        />
                        <label>Review Headline *</label>
                        <input type="text" 
                            name='headline'
                             className='border border-black p-2'
                             onChange={handleInput}
                        />
                        <label>Review  *</label>
                        <textarea
                            name='review'
                            className='border border-black p-2'
                            rows={5}
                            onChange={handleInput}
                        />
                        <div className='border border-black p-2 flex gap-5 items-center'>
                        <IoEarth size={30}/>
                        <p>All information contributed above will be visible to people who visit MMUJOB.</p>
                        </div>
                        <div className='flex items-center gap-6 pl-[18px]'>
                            <input type="checkbox" />
                            <label>I agree to the MMUJOB Terms of Use and that 
                                this review is an honest and accurate account of my 
                                experience at my current or former employer.
                            </label>
                        </div>
                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
