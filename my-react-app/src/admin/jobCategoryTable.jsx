import React, { useState, useEffect, useMemo } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from './adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSortAlt2 } from "react-icons/bi";
import AddJobCatorgories from './addJobCatogories';
import { useNavigate } from 'react-router-dom';

const CatergoryTable = () => {
    const [catergory, setCatergory] = useState([]);
    const [selectCatergory, setSelectCatergory] = useState([]);
    const [showAddJob, setShowAddJob] = useState(false);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('id');
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
            await axios.delete(`http://localhost:8000/api/Admin/DeleteJobCategory/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCatergory(catergory.filter(jobSeeker => jobSeeker.id !== id));
            setSelectCatergory(selectCatergory.filter(selectedId => selectedId !== id));
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
                selectCatergory.map(id =>
                    axios.delete(`http://localhost:8000/api/Admin/DeleteJobCategory/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                )
            );
            setCatergory(catergory.filter(jobSeeker => !selectCatergory.includes(jobSeeker.id)));
            setSelectCatergory([]);
        } catch (error) {
            console.error('Error deleting selected job seekers:', error);
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const ids = displayedcatergory.map(jobSeeker => jobSeeker.id);
            setSelectCatergory(ids);
        } else {
            setSelectCatergory([]);
        }
    };

    const handleSelectOne = (id, isChecked) => {
        if (isChecked) {
            setSelectCatergory([...selectCatergory, id]);
        } else {
            setSelectCatergory(selectCatergory.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        const getcatergory = async () => {
            try {
                console.log('Token:', token); 
                const response = await axios.get('http://localhost:8000/api/Admin/ShowJobCategory', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setCatergory(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error Response:', error.response);  
                setError(error.response.data.message || 'An error occurred');
                console.error('There was an error!', error.message);
            }
        };

        if (token) {
            getcatergory();
        } else {
            console.error('No token found, user might not be authenticated');
            setError('User not authenticated');
        }
    }, [token]);

    const filteredcatergory = useMemo(() => {
        let filteredData = catergory;
    
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
    
                // Convert to number if sorting by id
                if (sortCriteria.key === 'id') {
                    aValue = Number(aValue);
                    bValue = Number(bValue);
                }
    
                if (aValue < bValue) return sortCriteria.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortCriteria.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
    
        return filteredData;
    }, [filterType, filterValue, sortCriteria, catergory]);

    const handleSort = (key) => {
        setSortCriteria(prevSortCriteria => ({
            key,
            order: prevSortCriteria.key === key && prevSortCriteria.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredcatergory.length / itemsPerPage);
    const displayedcatergory = filteredcatergory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                <h1 className="text-2xl text-gray-900 font-semibold uppercase">Manage Job seeker</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center mt-4 mb-2 justify-between ">
                    <div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="mr-2 p-2 border border-gray-400 rounded"
                    >
                        <option value="id">Job Catergories ID</option>
                        <option value="name">Job Catergories</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Filter by ${filterType}`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="p-2 border border-gray-400 rounded"
                    />
                    </div>
                    <div>
                    <button
                        onClick={() => setShowAddJob(true)}
                        className="ml-2 py-2 px-4 bg-gray-300 text-gray-700 rounded"
                    >
                        Add
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectCatergory.length === 0}
                        className="ml-2 p-2 bg-red-500 text-white rounded"
                    >
                        Delete Selected
                    </button>
                    </div>
                </div>
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                <input 
                                    type="checkbox"
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    checked={displayedcatergory.length > 0 && displayedcatergory.every(jobSeeker => selectCatergory.includes(jobSeeker.id))}
                                />
                            </th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}><p className='flex items-center gap-1'>Job Catergories ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('name')}><p className='flex items-center gap-1'>Job Catergories <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedcatergory.map((jobSeeker, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => handleSelectOne(jobSeeker.id, e.target.checked)}
                                        checked={selectCatergory.includes(jobSeeker.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{jobSeeker.id}</td>
                                <td className="border border-gray-300 p-2">{jobSeeker.name}</td>
                                <td className="border border-gray-300 p-2">
                                    <button 
                                        onClick={() => handleDelete(jobSeeker.id)}
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
            {showAddJob && <AddJobCatorgories 
            onClose={() =>{() => setShowAddJob(false); window.location.reload();}} 
            justClose={() => setShowAddJob(false)}
            />}
        </div>
    );
}

export default CatergoryTable;
