import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

export function AddSkill({onClose, justClose}) {
    const [skillValue, setSkillValue] = useState({
         skills: "",
    });


const handleInputChange = (event) => {
    setSkillValue({
        ...skillValue,
        [event.target.name]: event.target.value
    });
};

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        try {
            const response = await axios.patch('http://localhost:8000/api/UserUpdate', skillValue, {
                headers: {
                    'Authorization': `Bearer ${token}` ,
                }
            });
            onClose();
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    return (
        <div className='addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-[695.2px]'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold mb-4">Add Skills</h1>
                        <label>Add your skills here!!!</label>
                        <textarea
                            name='skills'
                            className='border border-black p-2'
                            rows={5}
                            value={skillValue.skills}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}