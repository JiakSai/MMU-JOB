import React from 'react';
import ReviewBar from './reviewBar';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { AddReview } from './addReview';

export function Review({ company }) {
    const ratings = Array.isArray(company.ratings) ? company.ratings : [];
    const [selectReview, setselectReview] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const handleEditClick = (review) => {
        setselectReview(review);
        setShowReview(true);
       
    };
    const handleAddReviewClick = () => {
        setselectReview(null);
        setShowReview(true);
    };
    const handleClose = () => {
        setShowReview(false);
        setselectReview(null);
        window.location.reload();
    };
    const handleJustClose = () => {
        setShowReview(false);
        setSelectedRole(null);
    };

    useEffect(() => {
        if (showReview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showReview]);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Review</h1>
            <ReviewBar company={company} />
            <hr className='mt-10 border border-zinc-300'/>
            <div className='w-[600px] mt-14'>
                <div className='grid gap-3'>
                    {ratings.map((review, index) => {
                        const isLast = index === ratings.length - 1;
                        return (
                            <div
                                key={index}
                                className={`py-3 px-6 border-r-2 border-zinc-400 w-full ${isLast ? 'rounded-t-3xl' : 'border-b-2 rounded-3xl'} `}
                            >
                                <div className='flex justify-between'>
                                <div className='flex gap-3'>
                                    <p className='text-2xl font-semibold'>{review.rating}.0</p>
                                    <div className="flex gap-2">
                                        {[...Array(5)].map((star, index) => (
                                            <FaStar key={index} color={index < review.rating ? '#FFEA00' : 'gray'} size={25} />
                                        ))}
                                    </div>
                                </div>
                                    <MdOutlineEdit size={20} onClick={() => handleEditClick(review)}/>
                                </div>
                                <p className='text-xl font-semibold'>{review.headline}</p>
                                <div className='flex items-center gap-3 mt-1'>
                                    <HiOutlineUserCircle size={34} />
                                    <div>
                                        <p className='leading-tight text-zinc-800'>{review.jobTitle}</p>
                                        <p className='leading-tight text-zinc-800'>{review.employeeType}</p>
                                    </div>
                                </div>
                                <p className='mt-3 text-zinc-600'>{review.review}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='mt-2 px-6 gap-3 flex py-2 border-2 border-zinc-400 w-full rounded-b-2xl'>
                    <HiOutlineUserCircle size={36} />
                    <button onClick={handleAddReviewClick} className='mt-[3px] flex bg-neutral-400 rounded-2xl items-center w-full px-6 h-8'>Leave a comment....</button>
                </div>
            </div>
            {showReview && (
                <AddReview
                    company={company}
                    justClose={handleJustClose}
                    onClose={handleClose} 
                    review={selectReview}
                />
            )}
        </div>
    );
}
