import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function ApplicationStatus() {
    const navigate = useNavigate();
    const [applicationStatus, setApplicationStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const getApplicationStatus = async () => {
            const token = Cookies.get('token');
            if (!token) {
                navigate('/userLogin');
                console.error('No token found, user might not be authenticated');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/api/ShowUserApplications', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log('Response:', response);
                if (Array.isArray(response.data.data)) {
                    setApplicationStatus(response.data.data);
                } else {
                    console.error('Expected an array from API response, got:', response.data);
                }
            } catch (error) {
                console.error('Error Response:', error.response);
            }
        };

        getApplicationStatus();
    }, [navigate]);

    if (loading) {
        return (
            <>
                <div className="loader"></div>
                <div className='flex justify-center mt-[630px]'>
                    <p className='text-3xl font-bold text-customBlue'>" MMUJOB "</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className='mt-[100px] mb-[30px] mx-[120px]'>
                <h1 className='text-xl font-semibold'>Application Status</h1>
                {applicationStatus.length > 0 ? (
                    <table className='application'>
                        <thead>
                            <tr>
                                <th className='bg-customBlue text-left'>Job Title</th>
                                <th className='bg-customBlue text-left'>Company Name</th>
                                <th className='bg-customBlue text-left'>Job Req</th>
                                <th className='bg-customBlue text-left'>My Application Status</th>
                                <th className='bg-customBlue text-left'>Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationStatus.map((application, index) => (
                                <tr key={index}>
                                    <td>{application.post_title}</td>
                                    <td>{application.company_name}</td> {/* Adjust this if there's a specific field for company name */}
                                    <td>{application.id}</td>
                                    <td>{application.status}</td>
                                    <td>{application.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='flex flex-col items-center justify-center mt-16 text-gray-500'>
                        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-xl font-semibold">No Applications Found</p>
                        <p className="text-md text-gray-600">You have not applied to any jobs yet.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
