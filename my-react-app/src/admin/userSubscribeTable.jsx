import React, { useState, useEffect, useMemo } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from './adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSortAlt2 } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import ShowReviewss from './showReview';
import { useNavigate } from 'react-router-dom';

const UserSubscribeTable = () => {
    const [review, setReview] = useState([]);
    const [selectReview, setSelectReview] = useState([]);
    const [showReview, setShowReview] = useState(null);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('jobTitle');
    const [filterValue, setFilterValue] = useState('');
    const [sortCriteria, setSortCriteria] = useState({ key: '', order: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const token = Cookies.get('adminToken');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log(token);
        if (!token) {
            navigate('/403');
        }
    }, []);

    const itemsPerPage = 11;

    const handleDelete = async (id) => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/Admin/DeleteRating/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReview(review.filter(review => review.id !== id));
            setSelectReview(selectReview.filter(selectedId => selectedId !== id));
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
                selectReview.map(id =>
                    axios.delete(`http://localhost:8000/api/Admin/DeleteRating/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                )
            );
            setReview(review.filter(review => !selectReview.includes(review.id)));
            setSelectReview([]);
        } catch (error) {
            console.error('Error deleting selected job seekers:', error);
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const ids = displayedreview.map(review => review.id);
            setSelectReview(ids);
        } else {
            setSelectReview([]);
        }
    };

    const handleSelectOne = (id, isChecked) => {
        if (isChecked) {
            setSelectReview([...selectReview, id]);
        } else {
            setSelectReview(selectReview.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        const getreview = async () => {
            try {
                console.log('Token:', token); 
                const response = await axios.get('http://localhost:8000/api/Admin/ShowRating', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setReview(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error Response:', error.response);  
                setError(error.response.data.message || 'An error occurred');
                console.error('There was an error!', error.message);
            }
        };

        if (token) {
            getreview();
        } else {
            console.error('No token found, user might not be authenticated');
            setError('User not authenticated');
        }
    }, [token]);

    const filteredreview = useMemo(() => {
        let filteredData = review;

        // Filter
        if (filterValue) {
            filteredData = filteredData.filter(review => {
                let value;
                if (filterType === 'employer.id') {
                    value = review.employer.id.toString().toLowerCase();
                } else {
                    value = review[filterType]?.toString().toLowerCase();
                }
                return value && value.includes(filterValue.toLowerCase());
            });
        }

        // Sort
        if (sortCriteria.key) {
            filteredData.sort((a, b) => {
                let aValue = a[sortCriteria.key];
                let bValue = b[sortCriteria.key];

                if (aValue < bValue) return sortCriteria.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortCriteria.order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredData;
    }, [filterType, filterValue, sortCriteria, review]);

    const handleSort = (key) => {
        setSortCriteria(prevSortCriteria => ({
            key,
            order: prevSortCriteria.key === key && prevSortCriteria.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredreview.length / itemsPerPage);
    const displayedreview = filteredreview.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) {
        return ( 
            <> 
                <div className="Adminloader"></div> 
                <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customGrey'>
                    " MMUJOB "</p> 
                </div> 
            </> 
        );
    }

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <h1 className="text-2xl text-gray-900 font-semibold uppercase">Manage User Subscribe</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center mt-4 mb-2 justify-between ">
                    <div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="mr-2 p-2 border border-gray-400 rounded"
                    >
                        <option value="id">Review ID</option>
                        <option value="jobTitle">Title</option>
                        <option value="rating">Rating</option>
                        <option value="user_id">Job Seeker ID</option>
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
                        disabled={selectReview.length === 0}
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
                                    checked={displayedreview.length > 0 && displayedreview.every(review => selectReview.includes(review.id))}
                                />
                            </th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}><p className='flex items-center gap-1'>Review ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('jobTitle')}><p className='flex items-center gap-1'>Title <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('rating')}><p className='flex items-center gap-1'>Rating <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('user_id')}><p className='flex items-center gap-1'>Job Seeker ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedreview.map((review, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => handleSelectOne(review.id, e.target.checked)}
                                        checked={selectReview.includes(review.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{review.id}</td>
                                <td className="border border-gray-300 p-2">{review.jobTitle}</td>
                                <td className="border border-gray-300 p-2">{review.rating}</td>
                                <td className="border border-gray-300 p-2">{review.user_id}</td>
                                <td className="border border-gray-300 p-2 space-x-3">
                                <button
                                        onClick={() => setShowReview(review)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <CiShare1 size={20}/>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(review.id)}
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
            {showReview && <ShowReviewss 
                review={showReview}
                justClose={() => setShowReview(false)}
            />}
        </div>
    );
}

export default UserSubscribeTable;
