import React, { useState, useEffect, useMemo } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Home from './adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSortAlt2 } from "react-icons/bi";

const EmployerTable = () => {
    const [employer, setEmployer] = useState([]);
    const [selectEmployer, setSelectEmployer] = useState([]);
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
            await axios.delete(`http://localhost:8000/api/Admin/DeleteEmployer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEmployer(employer.filter(emp => emp.id !== id));
            setSelectEmployer(selectEmployer.filter(selectedId => selectedId !== id));
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
                selectEmployer.map(id =>
                    axios.delete(`http://localhost:8000/api/Admin/DeleteEmployer/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                )
            );
            setEmployer(employer.filter(emp => !selectEmployer.includes(emp.id)));
            setSelectEmployer([]);
        } catch (error) {
            console.error('Error deleting selected job seekers:', error);
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const ids = displayedEmployer.map(emp => emp.id);
            setSelectEmployer(ids);
        } else {
            setSelectEmployer([]);
        }
    };

    const handleSelectOne = (id, isChecked) => {
        if (isChecked) {
            setSelectEmployer([...selectEmployer, id]);
        } else {
            setSelectEmployer(selectEmployer.filter(selectedId => selectedId !== id));
        }
    };

    useEffect(() => {
        const getEmployer = async () => {
            try {
                console.log('Token:', token);
                const response = await axios.get('http://localhost:8000/api/Admin/ShowEmployerAndCompany', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setEmployer(Array.isArray(response.data.employer) ? response.data.employer : []);
            } catch (error) {
                console.error('Error Response:', error.response);
                setError(error.response.data.message || 'An error occurred');
                console.error('There was an error!', error.message);
            }
        };

        if (token) {
            getEmployer();
        } else {
            console.error('No token found, user might not be authenticated');
            setError('User not authenticated');
        }
    }, [token]);

    const filteredEmployer = useMemo(() => {
        let filteredData = Array.isArray(employer) ? employer : [];
    
        // Filter
        if (filterValue) {
            filteredData = filteredData.filter(emp => {
                let value;
                switch (filterType) {
                    case 'id':
                        value = emp.id.toString().toLowerCase();
                        break;
                    case 'email':
                        value = emp.email.toString().toLowerCase();
                        break;
                    case 'company.name':
                        value = emp.company.name.toString().toLowerCase();
                        break;
                    case 'location':
                        value = emp.company.location.toString().toLowerCase();
                        break;
                    case 'company.category':
                        value = emp.company.category.toString().toLowerCase();
                        break;
                    default:
                        break;
                }
                return value && value.includes(filterValue.toLowerCase());
            });
        }
    
        // Sort
        if (sortCriteria.key) {
            filteredData.sort((a, b) => {
                let aValue = a[sortCriteria.key];
                let bValue = b[sortCriteria.key];
    
                if (sortCriteria.key === 'id') {
                    aValue = a.id;
                    bValue = b.id;
                } else if (sortCriteria.key === 'email') {
                    aValue = a.email;
                    bValue = b.email;
                } else if (sortCriteria.key === 'company.name') {
                    aValue = a.company.name;
                    bValue = b.company.name;
                } else if (sortCriteria.key === 'location') {
                    aValue = a.company.location;
                    bValue = b.company.location;
                } else if (sortCriteria.key === 'company.category') {
                    aValue = a.company.category;
                    bValue = b.company.category;
                }
    
                if (aValue < bValue) return sortCriteria.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortCriteria.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
    
        return filteredData;
    }, [filterType, filterValue, sortCriteria, employer]);
    

    const handleSort = (key) => {
        setSortCriteria(prevSortCriteria => ({
            key,
            order: prevSortCriteria.key === key && prevSortCriteria.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredEmployer.length / itemsPerPage);
    const displayedEmployer = filteredEmployer.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <h1 className="text-2xl text-gray-900 font-semibold uppercase">Manage Employer</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center mt-4 mb-2 justify-between ">
                    <div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="mr-2 p-2 border border-gray-400 rounded"
                        >
                            <option value="id">Employer ID </option>
                            <option value="email">Employer Email</option>
                            <option value="company.name">Company Name</option>
                            <option value="location">Location</option>
                            <option value="company.category">Category</option>
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
                        disabled={selectEmployer.length === 0}
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
                                    checked={displayedEmployer.length > 0 && displayedEmployer.every(emp => selectEmployer.includes(emp.id))}
                                />
                            </th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}><p className='flex items-center gap-1'>Employer ID <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('email')}><p className='flex items-center gap-1'>Employer Email <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('company.name')}><p className='flex items-center gap-1'>Company Name <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('location')}><p className='flex items-center gap-1'>location <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('category')}><p className='flex items-center gap-1'>Category <BiSortAlt2 size={20}/></p></th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedEmployer.map((emp, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => handleSelectOne(emp.id, e.target.checked)}
                                        checked={selectEmployer.includes(emp.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{emp.company.id}</td>
                                <td className="border border-gray-300 p-2">{emp.email}</td>
                                <td className="border border-gray-300 p-2">{emp.company.name}</td>
                                <td className="border border-gray-300 p-2">{emp.company.location}</td>
                                <td className="border border-gray-300 p-2">{emp.company.category}</td>
                                <td className="border border-gray-300 p-2">
                                    <button 
                                        onClick={() => handleDelete(emp.id)}
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
}

export default EmployerTable;
