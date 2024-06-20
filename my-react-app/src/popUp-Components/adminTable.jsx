import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from '../adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminTable = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
    const [selectedJobSeekers, setSelectedJobSeekers] = useState([]);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('jobTitle');
    const [filterValue, setFilterValue] = useState('');
    const [sortCriteria, setSortCriteria] = useState({ key: '', order: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const token = Cookies.get('token');

    const itemsPerPage = 11;

    const handleDelete = async (id) => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/Admin/DeletePost/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobSeekers(jobSeekers.filter(jobSeeker => jobSeeker.id !== id));
            setSelectedJobSeekers(selectedJobSeekers.filter(selectedId => selectedId !== id));
        } catch (error) {
            console.error('Error deleting job seeker:', error);
        }
    };

    const handleDeleteSelected = async () => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await Promise.all(
                selectedJobSeekers.map(id =>
                    axios.delete(`http://localhost:8000/api/Admin/DeletePost/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                )
            );
            setJobSeekers(jobSeekers.filter(jobSeeker => !selectedJobSeekers.includes(jobSeeker.id)));
            setSelectedJobSeekers([]);
        } catch (error) {
            console.error('Error deleting selected job seekers:', error);
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const ids = displayedJobSeekers.map(jobSeeker => jobSeeker.id);
            setSelectedJobSeekers(ids);
        } else {
            setSelectedJobSeekers([]);
        }
    };

    const handleSelectOne = (id, isChecked) => {
        if (isChecked) {
            setSelectedJobSeekers([...selectedJobSeekers, id]);
        } else {
            setSelectedJobSeekers(selectedJobSeekers.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        const getJobSeekers = async () => {
            try {
                console.log('Token:', token); 
                const response = await axios.get('http://localhost:8000/api/Admin/ShowPosts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setJobSeekers(response.data);
                setFilteredJobSeekers(response.data);
            } catch (error) {
                console.error('Error Response:', error.response);  
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

    useEffect(() => {
        let filteredData = jobSeekers;

        // Filter
        if (filterValue) {
            filteredData = filteredData.filter(jobSeeker => {
                let value;
                if (filterType === 'employer.id') {
                    value = jobSeeker.employer.id.toString().toLowerCase();
                } else {
                    value = jobSeeker[filterType]?.toString().toLowerCase();
                }
                return value && value.includes(filterValue.toLowerCase());
            });
        }

        // Sort
        if (sortCriteria.key) {
            filteredData.sort((a, b) => {
                let aValue = a[sortCriteria.key];
                let bValue = b[sortCriteria.key];

                if (sortCriteria.key === 'employer.id') {
                    aValue = a.employer.id;
                    bValue = b.employer.id;
                }

                if (aValue < bValue) return sortCriteria.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortCriteria.order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredJobSeekers(filteredData);
    }, [filterType, filterValue, sortCriteria, jobSeekers]);

    const handleSort = (key) => {
        setSortCriteria(prevSortCriteria => ({
            key,
            order: prevSortCriteria.key === key && prevSortCriteria.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredJobSeekers.length / itemsPerPage);
    const displayedJobSeekers = filteredJobSeekers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <h1 className="text-2xl text-gray-900 font-semibold">Manage Job Seeker</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center mb-4">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="mr-2 p-2 border border-gray-400"
                    >
                        <option value="id">Job ID</option>
                        <option value="jobTitle">Title</option>
                        <option value="jobCategory">Category</option>
                        <option value="created_at_formatted">Date</option>
                        <option value="employer.id">Employer ID</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Filter by ${filterType}`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="p-2 border border-gray-400"
                    />
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectedJobSeekers.length === 0}
                        className="ml-2 p-2 bg-red-500 text-white rounded"
                    >
                        Delete Selected
                    </button>
                </div>
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                <input 
                                    type="checkbox"
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    checked={displayedJobSeekers.length > 0 && displayedJobSeekers.every(jobSeeker => selectedJobSeekers.includes(jobSeeker.id))}
                                />
                            </th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}>Job ID</th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('created_at_formatted')}>Date</th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('jobTitle')}>Title</th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('jobCategory')}>Category</th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('employer.id')}>Employer ID</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedJobSeekers.map((jobSeeker, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => handleSelectOne(jobSeeker.id, e.target.checked)}
                                        checked={selectedJobSeekers.includes(jobSeeker.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{jobSeeker.id}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.created_at_formatted}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.jobTitle}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.jobCategory}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.employer.id}</td>
                                <td className="border border-gray-300 p-2">
                                    <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(jobSeeker.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5 flex justify-between items-center">
                    <button
                        onClick={() => handleChangePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-200 text-gray-700 rounded"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handleChangePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-200 text-gray-700 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminTable;
