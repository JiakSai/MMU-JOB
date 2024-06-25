import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

export function AddEducation({ onClose, education, justClose }) {
    const [educationValue, setEducationValue] = useState({
        school: "",
        degree: "",
        startDate: "",
        startDateMonth: "",
        startDateYear: "",
        endDate: "",
        grade: "",
    });
    
    useEffect(() =>{
        if(education){
            const [startMonth, startYear] = education.startDate.split(" ");
            const [endMonth, endYear] = education.endDate.split(" ");
            setEducationValue({
                school: education.school,
                degree: education.degree,
                startDate: education.startDate,
                startDateMonth: startMonth,
                startDateYear: startYear,
                endDate: education.endDate,
                endDateMonth: endMonth,
                endDateYear: endYear,
                grade: education.grade,
            });
        }
    },[education]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        let updatedEduValue = { ...educationValue, [name]: value };

        if (name === 'startDateMonth' || name === 'startDateYear') {
            if (updatedEduValue.startDateMonth && updatedEduValue.startDateYear) {
                updatedEduValue.startDate = `${updatedEduValue.startDateMonth} ${updatedEduValue.startDateYear}`;
            }
        }

        if (name === 'endDateMonth' || name === 'endDateYear') {
            if (updatedEduValue.endDateMonth && updatedEduValue.endDateYear) {
                updatedEduValue.endDate = `${updatedEduValue.endDateMonth} ${updatedEduValue.endDateYear}`;
            }
        }
        setEducationValue(updatedEduValue);
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try
        {
            let response;
            if (education) {
                response = await axios.patch(`http://localhost:8000/api/UpdateEducation/${education.id}`, educationValue, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post('http://localhost:8000/api/AddEducation', educationValue, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
            console.log(response);
            onClose();
        } catch (error) {
            if (error.response) {
                console.log('Error response:', error.response);
            } else {
                console.error('Error adding/updating education:', error);
            }
        }
    }
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const educationLevel = ["High school", "Diploma", "Bachelor's degree", "Master's degree", "Doctorate degree", "Professional qualification"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return(
        <div className='addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-full'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    <IoClose size={25}/>
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold mb-4">{education ? "Edit Education" : "Add Education"}</h1>
                        <div className='flex flex-col gap-2'>
                            <label>School name</label>
                            <input 
                                type="text"
                                name='school'
                                className='border border-black p-2'
                                value={educationValue.school}
                                onChange={handleInput}
                            />
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label>Education level</label>
                            <select
                                    name="degree"
                                    value={educationValue.degree}
                                    onChange={handleInput}
                                    className="border border-black p-2">
                                    <option value="" disabled>Select education level</option>
                                    {educationLevel.map((education, index) => (
                                        <option key={index} value={education}>
                                            {education}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label>Started date</label>
                            <div className='flex gap-2 relative z-10'>
                                <select
                                    name="startDateMonth"
                                    value={educationValue.startDateMonth}
                                    className='border border-black p-2'
                                    onChange={handleInput}
                                >
                                    <option value="" disabled>Select Month</option>
                                    {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                                </select>
                                <select
                                    name="startDateYear"
                                    value={educationValue.startDateYear}
                                    className='border border-black p-2'
                                    onChange={handleInput}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label>Ended date</label>
                            <div className='flex gap-2 relative z-10'>
                                <select
                                    name="endDateMonth"
                                    value={educationValue.endDateMonth}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled selected>Select Month</option>
                                    {monthNames.map((month, index) => <option key={index} value={month}>{month}</option>)}
                                </select>
                                <select
                                    name="endDateYear"
                                    value={educationValue.endDateYear}
                                    onChange={handleInput}
                                    className='border border-black p-2'
                                >
                                    <option value="" disabled selected>Select Year</option>
                                    {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                        <label>Grade/CGPA</label>
                        <input 
                            type='text'
                            name='grade'
                            className='border border-black p-2 '
                            value={educationValue.grade}
                            onChange={handleInput}
                        />
                        </div>
                        <button type="submit" className=' bg-customBlue font-bold text-white p-2 rounded mt-auto'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}