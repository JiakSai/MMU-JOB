import React, { useState, useEffect, useMemo } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from './adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSortAlt2 } from "react-icons/bi";

const AdminTable = () => {
    const [postedJob, setPostedJob] = useState([]);
    const [selectPostedJob, setSelectPostedJob] = useState([]);
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
            setPostedJob(postedJob.filter(job => job.id !== id));
            setSelectPostedJob(selectPostedJob.filter(selectedId => selectedId !== id));
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
                selectPostedJob.map(id =>
                    axios.delete(`http://localhost:8000/api/Admin/DeletePost/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                )
            );
            setPostedJob(postedJob.filter(job => !selectPostedJob.includes(job.id)));
            setSelectPostedJob([]);
        } catch (error) {
            console.error('Error deleting selected job seekers:', error);
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const ids = displayedpostedJob.map(job => job.id);
            setSelectPostedJob(ids);
        } else {
            setSelectPostedJob([]);
        }
    };

    const handleSelectOne = (id, isChecked) => {
        if (isChecked) {
            setSelectPostedJob([...selectPostedJob, id]);
        } else {
            setSelectPostedJob(selectPostedJob.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        const getpostedJob = async () => {
            try {
                console.log('Token:', token); 
                const response = await axios.get('http://localhost:8000/api/Admin/ShowPosts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setPostedJob(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error Response:', error.response);  
                setError(error.response.data.message || 'An error occurred');
                console.error('There was an error!', error.message);
            }
        };

        if (token) {
            getpostedJob();
        } else {
            console.error('No token found, user might not be authenticated');
            setError('User not authenticated');
        }
    }, [token]);

    const filteredpostedJob = useMemo(() => {
        let filteredData = postedJob;

        // Filter
        if (filterValue) {
            filteredData = filteredData.filter(job => {
                let value;
                if (filterType === 'employer.id') {
                    value = job.employer.id.toString().toLowerCase();
                } else {
                    value = job[filterType]?.toString().toLowerCase();
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

        return filteredData;
    }, [filterType, filterValue, sortCriteria, postedJob]);

    const handleSort = (key) => {
        setSortCriteria(prevSortCriteria => ({
            key,
            order: prevSortCriteria.key === key && prevSortCriteria.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredpostedJob.length / itemsPerPage);
    const displayedpostedJob = filteredpostedJob.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <h1 className="text-2xl text-gray-900 font-semibold uppercase">Manage Posted job</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center mt-4 mb-2 justify-between ">
                    <div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="mr-2 p-2 border border-gray-400 rounded"
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
                        className="p-2 border border-gray-400 rounded"
                    />
                    </div>
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectPostedJob.length === 0}
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
                                    checked={displayedpostedJob.length > 0 && displayedpostedJob.every(job => selectPostedJob.includes(job.id))}
                                />
                            </th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}><p className='flex items-center gap-1'>Job ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('created_at_formatted')}><p className='flex items-center gap-1'>Date <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('jobTitle')}><p className='flex items-center gap-1'>Title <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('jobCategory')}><p className='flex items-center gap-1'>Category <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('employer.id')}><p className='flex items-center gap-1'>Employer ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedpostedJob.map((job, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => handleSelectOne(job.id, e.target.checked)}
                                        checked={selectPostedJob.includes(job.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{job.id}</td>
                                <td className="border border-gray-300 p-2">{job.created_at_formatted}</td>
                                <td className="border border-gray-300 p-2">{job.jobTitle}</td>
                                <td className="border border-gray-300 p-2">{job.jobCategory}</td>
                                <td className="border border-gray-300 p-2">{job.employer.id}</td>
                                <td className="border border-gray-300 p-2">
                                    <button 
                                        onClick={() => handleDelete(job.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <RiDeleteBin6Line size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handleChangePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handleChangePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminTable;
