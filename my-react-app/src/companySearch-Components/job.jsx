import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Job(){
    const [showCompany, setShowCompany] = useState([]);
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    };
    useEffect(() => {
        axios.get('http://localhost:8000/api/ShowPost')
            .then(response => {
                setShowCompany(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <>
            <div className='flex items-center gap-1'>
                        <p>21</p><p>job</p><p>in</p><p>intel</p>
                    </div>
                <div className='grid grid-cols-2 md:grid-cols-auto-fit md:grid-rows-2 gap-4'>
                    {showCompany.map((company, index) => (
                        <div key={index} className='ml-4 w-[440px] h-[190px] px-8 py-8 border-b border-r border-black'>
                            <p>{company.job_title}</p>
                            <p>{company.job_location}</p>
                            <span>Job Description</span>
                            <span>
                                {truncateText(company.description, 20)}
                            </span>
                        </div>
                    ))}
                </div>
        </>
    );
}