import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from '../adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminTable = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    const handleDelete = (id) => {
        setJobSeekers(jobSeekers.filter(jobSeeker => jobSeeker.id !== id));
    };

    useEffect(() => {
        const getJobSeekers = async () => {
            try {
                console.log('Token:', token);  // Log the token
                const response = await axios.get('http://localhost:8000/api/Admin/ShowUsers', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setJobSeekers(response.data);
            } catch (error) {
                console.error('Error Response:', error.response);  // Log detailed error response
                setError(error.response.data.message || 'An error occurred');
                console.error('There was an error!', error.message);
            }
        };

        if (token) {
            getJobSeekers();
        } else {
            console.error('No token found, user might not be authenticated');
            setError('User not authenticated');
        }
    }, [token]);

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <h1 className="text-2xl text-gray-900 font-semibold">Manage Job Seeker</h1>
                {error && <p className="text-red-500">{error}</p>}
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2"><input type="checkbox" /></th>
                            <th className="border border-gray-300 p-2">Job Seeker ID</th>
                            <th className="border border-gray-300 p-2">Job Seeker Name</th>
                            <th className="border border-gray-300 p-2">Job Seeker Email</th>
                            <th className="border border-gray-300 p-2">Contact</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobSeekers.map((jobSeeker, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2"><input type="checkbox" /></td>
                                <td className="border border-gray-300 p-2">{jobSeeker.id}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.name}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.email}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.contact}</td>
                                <td className="border border-gray-300 p-2">
                                    <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(jobSeeker.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTable;
