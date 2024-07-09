import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

export function AddRole({ onClose, role, justClose }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [roleValue, setRoleValue] = useState({
        title: "",
        companyName: "",
        location: "",
        locationType: "",
        jobType: "",
        startDate: "",
        startDateMonth: "",
        startDateYear: "",
        endDateMonth: "",
        endDateYear: "",
        description: "",
    });

    useEffect(() => {
        if (role) {
            const [startMonth, startYear] = role.startDate.split(" ");
            const [endMonth, endYear] = role.endDate.split(" ");
            setRoleValue({
                title: role.title,
                companyName: role.companyName,
                location: role.location,
                locationType: role.locationType,
                jobType: role.jobType,
                startDate: role.startDate,
                startDateMonth: startMonth,
                startDateYear: startYear,
                endDate: role.endDate,
                endDateMonth: endMonth,
                endDateYear: endYear,
                description: role.description,
            });
        }
    }, [role]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            let response;
            if (role) {
                response = await axios.patch(`http://localhost:8000/api/UpdateExperience/${role.id}`, roleValue, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post('http://localhost:8000/api/AddExperience', roleValue, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
            onClose();
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response) {
                console.log('Error response:', error.response);
            } else {
                console.error('Error adding/updating experience:', error);
            }
        }
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        let updatedRoleValue = { ...roleValue, [name]: value };

        if (name === 'startDateMonth' || name === 'startDateYear') {
            if (updatedRoleValue.startDateMonth && updatedRoleValue.startDateYear) {
                updatedRoleValue.startDate = `${updatedRoleValue.startDateMonth} ${updatedRoleValue.startDateYear}`;
            }
        }

        if (name === 'endDateMonth' || name === 'endDateYear') {
            if (updatedRoleValue.endDateMonth && updatedRoleValue.endDateYear) {
                updatedRoleValue.endDate = `${updatedRoleValue.endDateMonth} ${updatedRoleValue.endDateYear}`;
            }
        }

        if (updatedRoleValue.startDate && updatedRoleValue.endDate) {
            const startDate = new Date(`${updatedRoleValue.startDateMonth} 1, ${updatedRoleValue.startDateYear}`);
            const endDate = new Date(`${updatedRoleValue.endDateMonth} 1, ${updatedRoleValue.endDateYear}`);
            
            if (endDate < startDate) {
                setErrorMessage('End date cannot be earlier than start date.');
            } else if (startDate.getTime() === endDate.getTime()) {
                setErrorMessage('End date and start date cannot be the same.');
            } else {
                setErrorMessage('');
            }
        }

        setRoleValue(updatedRoleValue);
    };

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const States = ["Kuala Lumpur", "Selangor", "Putrajaya", "Penang", "Johor", "Perlis", "Kedah", "Kelantan", "Terengganu", "Melaka",
        "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Overseas"];
    const jobTypes = ["Internship", "Part-Time", "Full-Time", "Freelance"];
    const locationTypes = ["On-site", "Remote", "Hybrid"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001">
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                <IoClose size={25}/>
                </button>
                <div className="py-4 px-6 bg-white">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <h1 className="text-3xl font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h1>
                        <div className='flex flex-col gap-2'>
                            <label >Job title</label>
                            <input
                                type="text"
                                name='title'
                                className='border border-black p-2'
                                value={roleValue.title}
                                onChange={handleInput}
                            />
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label >Company name</label>
                            <input
                                type="text"
                                name='companyName'
                                className='border border-black p-2'
                                value={roleValue.companyName}
                                onChange={handleInput}
                            />
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label >Company location</label>
                            <select
                                    name="location"
                                    value={roleValue.location}
                                    onChange={handleInput}
                                    className="border border-black p-2">
                                    <option value="" disabled>Select company location</option>
                                    {States.map((State, index) => (
                                        <option key={index} value={State}>
                                            {State}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label >Location type</label>
                                <select
                                    name="locationType"
                                    value={roleValue.locationType}
                                    onChange={handleInput}
                                    className="border border-black p-2">
                                    <option value="" disabled>Select location type</option>
                                    {locationTypes.map((locationType, index) => (
                                        <option key={index} value={locationType}>
                                            {locationType}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label >Job type</label>
                            <select
                                    name="jobType"
                                    value={roleValue.jobType}
                                    onChange={handleInput}
                                    className="border border-black p-2">
                                    <option value="" disabled>Select job type</option>
                                    {jobTypes.map((jobType, index) => (
                                        <option key={index} value={jobType}>
                                            {jobType}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label >Started date</label>
                            <div className='flex gap-2 relative z-10'>
                                <select
                                    name="startDateMonth"
                                    value={roleValue.startDateMonth}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled>Select Month</option>
                                    {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                                </select>
                                <select
                                    name="startDateYear"
                                    value={roleValue.startDateYear}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled>Select Year</option>
                                    {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label >Ended date</label>
                            <div className='flex gap-2 relative z-10'>
                                <select
                                    name="endDateMonth"
                                    value={roleValue.endDateMonth}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled>Select Month</option>
                                    {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                                </select>
                                <select
                                    name="endDateYear"
                                    value={roleValue.endDateYear}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled>Select Year</option>
                                    {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                                </select>
                            </div>
                            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col'>
                                <label >Description</label>
                                <p className='text-sm text-gray-600'>*Summarize your responsibilities, skills, and achievements.</p>
                            </div>
                            <textarea
                                name='description'
                                className='border border-black p-2'
                                value={roleValue.description}
                                onChange={handleInput}
                                rows={5}
                            />
                        </div>

                        <button type="submit" className=' bg-customBlue font-bold text-white p-2 rounded mt-auto'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
