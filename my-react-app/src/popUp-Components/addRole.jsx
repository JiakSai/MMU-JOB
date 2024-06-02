import React, { useState } from 'react';

export function AddRole({ roleValue, onClose }) {
    const [newRole, setNewRole] = useState(roleValue);

    const handleSubmit = (event) => {
        event.preventDefault();
        onClose(newRole);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setNewRole({ ...newRole, [name]: value });
    };

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001">
                <button
                    className='absolute top-2 right-2 text-xl font-bold'
                    onClick={() => onClose(null)}
                >
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <h1 className="text-2xl font-bold mb-4">Add Role</h1>
                        <label>Job title</label>
                        <input
                            type="text"
                            name='jobTitle'
                            className='border border-black p-2'
                            value={newRole.jobTitle}
                            onChange={handleInput}
                        />
                        <label>Company name</label>
                        <input
                            type="text"
                            name='companyName'
                            className='border border-black p-2'
                            value={newRole.companyName}
                            onChange={handleInput}
                        />
                        <label>Company Location</label>
                        <input
                            type="text"
                            name='location'
                            className='border border-black p-2'
                            value={newRole.location}
                            onChange={handleInput}
                        />
                        <label>Company type</label>
                        <input
                            type="text"
                            name='locationType'
                            className='border border-black p-2'
                            value={newRole.locationType}
                            onChange={handleInput}
                        />
                        <label>Started date</label>
                        <div className='flex gap-2 relative z-10'>
                            <select
                                name="startDateMonth"
                                value={newRole.startDateMonth}
                                onChange={handleInput}
                                className='border border-black p-2'
                            >
                                <option value="" disabled selected>Select Month</option>
                                {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                            </select>
                            <select
                                name="startDateYear"
                                value={newRole.startDateYear}
                                onChange={handleInput}
                                className='border border-black p-2'
                            >
                                <option value="" disabled selected>Select Year</option>
                                {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <label>Ended date</label>
                        <div className='flex gap-2 relative z-10'>
                            <select
                                name="endDateMonth"
                                value={newRole.endDateMonth}
                                onChange={handleInput}
                                className='border border-black p-2'
                            >
                                <option value="" disabled selected>Select Month</option>
                                {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                            </select>
                            <select
                                name="endDateYear"
                                value={newRole.endDateYear}
                                onChange={handleInput}
                                className='border border-black p-2'
                            >
                                <option value="" disabled selected>Select Year</option>
                                {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <label>Description</label>
                        <p>Summarize your responsibilities, skills, and achievements.</p>
                        <textarea
                            name='description'
                            className='border border-black p-2'
                            value={newRole.description}
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
