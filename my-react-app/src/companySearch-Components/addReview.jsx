import React from 'react';
import { useState } from 'react';
import img from '/src/photo/easyParcel.jpeg';
import { FaStar } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";

export function AddReview(){
    const [selectedValue, setSelectedValue] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return(
        <div className="className='addrole fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'">
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001'>
                <button className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className="flex flex-col">
                        <h1>Rate a Company</h1>
                        <p>It only takes a minute! And your anonymous review will help other 
                        job seekers.</p>
                        <div className="flex">
                            <img className='w-20 h-20' src={img} alt="Company Logo" />
                            <div className='mt-[10px]'>
                                <p>*company</p>
                                <p>Company Name</p>
                            </div>
                        </div>
                        <p>Overall Rating*</p>
                        <div className='flex gap-5'>
                            {[...Array(5)].map((star, index) =>{
                                const ratingValue = index + 1;
                                return(
                                    <label>
                                        <input 
                                            type="radio" 
                                            name='rating'
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className='hidden'
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
                            <input type="radio" name="choice" value="Current Employer" onChange={handleChange}/>Current Employer 
                            <input type="radio" name="choice" value="Former Employer"  onChange={handleChange}/>Former Employer
                        </div>
                        <label>Employment Status *</label>
                        <label>Your Job Tittle *</label>
                        <input type="text" 
                             className='border border-black p-2'
                        />
                        <label>Review Headline *</label>
                        <input type="text" 
                             className='border border-black p-2'
                        />
                        <label>Review  *</label>
                        <textarea
                            className='border border-black p-2'
                            rows={5}
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