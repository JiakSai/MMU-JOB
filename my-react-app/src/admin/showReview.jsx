import React from 'react';
import { FaStar } from "react-icons/fa";

export default function ShowReviewss({justClose, review}){
    return(
        <div className='addrole fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white shadow-lg relative max-w-2xl max-h-full z-2001 w-[500px]">
                <div className="bg-customGrey w-full p-4 text-white">
                    <p>Add Job Catogories</p>
                    <button onClick={justClose} className='absolute top-1 right-2 text-xl font-bold'>
                        &times;
                    </button>
                </div>
                <div className='p-4'>
                    <div className='flex justify-between'>
                        <p>Review ID* : {review.id}</p>
                        <div className='flex gap-2'>
                            <p>Rating* : {review.rating}</p>
                            <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                key={index}
                                color={index < review.rating ? "#FFEA00" : "gray"}
                                size={20}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                    <p>Job Seeker ID* : {review.user_id}</p>
                    <p className='mt-3'>Reviews Detais*</p>
                    <p className='border border-zinc-800 p-1 rounded'>
                        {review.review}
                    </p>
                </div>
            </div>
        </div>
    );
}