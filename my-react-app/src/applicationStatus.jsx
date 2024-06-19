import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ApplicationStatus() {
    const [applicationStatus, setApplicationStatus] = useState([]);

    useEffect(() => {
        const getApplicationStatus = async () => {
            const token = Cookies.get('token');
            if (!token) {
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
    }, []);

    return (
        <>
        <Header/>
        <div className='mt-[100px] mb-[30px] mx-[120px]'>
            <h1 className='text-xl font-semibold'>Application Status</h1>
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
                            <td>{application.post.jobTitle}</td>
                            <td>{application.post.company_id}</td> {/* Adjust this if there's a specific field for company name */}
                            <td>{application.id}</td>
                            <td>{application.status}</td>
                            <td>{new Date(application.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    );
}
