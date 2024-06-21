import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function AddJobCatorgories({onClose, justClose}){
    const token = Cookies.get('adminToken');
    const navigate = useNavigate();
    useEffect(() => {
        console.log(token);
        if (!token) {
            navigate('/403');
        }
    }, []);
    const [jobCategories, setJobCategories] = useState({
        name: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('adminToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        try{
            const response = await axios.post('http://localhost:8000/api/Admin/AddJobCategory', jobCategories, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            onClose();
        }catch (error){
            console.error(error);
        }
    }
    return(
        <div className='addrole fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white shadow-lg relative max-w-2xl max-h-full z-2001 w-[450px]">
                <div className="bg-customGrey w-full p-2 text-white">
                    <p>Add Job Catogories</p>
                    <button onClick={justClose} className='absolute top-1 right-2 text-xl font-bold'>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-2 flex flex-col mt-0">
                    <div className="flex items-center space-x-3">
                        <label>Job categories name*</label>
                        <input type="text" 
                            name='name'
                            value={jobCategories.name}
                            className='border border-black p-2 rounded-md h-8 w-[266px]'
                            onChange={(e) => setJobCategories({...jobCategories, name: e.target.value})}
                        />
                    </div>
                    <button className="w-[80px] p-1 bg-customGrey text-white h-8 mt-4 ml-auto">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}