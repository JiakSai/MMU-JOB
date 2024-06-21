import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

export function AddRole({ onClose, role, justClose }) {
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

        setRoleValue(updatedRoleValue);
    };

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001">
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <h1 className="text-3xl font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h1>
                        <label>Job title</label>
                        <input
                            type="text"
                            name='title'
                            className='border border-black p-2'
                            value={roleValue.title}
                            onChange={handleInput}
                        />

                        <label>Company name</label>
                        <input
                            type="text"
                            name='companyName'
                            className='border border-black p-2'
                            value={roleValue.companyName}
                            onChange={handleInput}
                        />

                        <label>Company location</label>
                        <input
                            type="text"
                            name='location'
                            className='border border-black p-2'
                            value={roleValue.location}
                            onChange={handleInput}
                        />

                        <label>Location type</label>
                        <input
                            type="text"
                            name='locationType'
                            className='border border-black p-2'
                            value={roleValue.locationType}
                            onChange={handleInput}
                        />

                        <label>Job type</label>
                        <input
                            type="text"
                            name='jobType'
                            className='border border-black p-2'
                            value={roleValue.jobType}
                            onChange={handleInput}
                        />

                        <label>Started date</label>
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

                        <label>Ended date</label>
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

                        <label>Description</label>
                        <p>Summarize your responsibilities, skills, and achievements.</p>
                        <textarea
                            name='description'
                            className='border border-black p-2'
                            value={roleValue.description}
                            onChange={handleInput}
                            rows={5}
                        />

                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
