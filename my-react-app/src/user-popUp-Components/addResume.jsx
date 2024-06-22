import React, { useState, useEffect } from 'react';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import uploadCloud from '/src/photo/uploadCloud.png';
import axios from 'axios';
import Cookies from "js-cookie";

export function AddResume ({onClose, justClose}){
    const [fileName, setFileName] = useState("No selected file");
    const [resumeFile, setResumeFile] = useState({
        resume: null,
        _method: 'PATCH'
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setResumeFile({...resumeFile, resume: file});
        setFileName(file.name); 
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/UserUpdate', resumeFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            onClose();
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    return(
        <div className='addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-[695.2px]'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold mb-4">Add Resume</h1>
                        <label>Drop your resume here!!!</label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-black h-[300px] w-full cursor-pointer mt-[5px]" 
                            onClick={() => document.querySelector(".input-field").click()}>
                            <input type="file"className="input-field hidden" 
                                onChange={handleFileChange} 
                            />
                            <img src={uploadCloud} alt="Upload Icon" className="w-28 h-28" />
                            <p className="font-bold">Upload Your Resume</p>
                            <p>Support file type: .pdf</p> 
                        </div>
                        <div className="flex items-center ">
                            <FaFileAlt />
                            <span className="flex items-center justify-between w-full"> 
                            {fileName}
                            <RiDeleteBin6Line onClick={() => { setFileName("No selected file");}} />
                            </span>
                        </div>
                        <button className='bg-blue-500 text-white py-2 px-4 rounded'>Add Resume</button>
                    </form>
                </div>
            </div>
        </div>
    );
}