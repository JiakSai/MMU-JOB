import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uploadCloud from '/src/photo/uploadCloud.png';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from 'js-cookie';

export function EditCp({ justClose, company, onClose }) {
    const [api, setApi] = useState([]);
    const [logoFileName, setLogoFileName] = useState("No selected file");
    const [coverFileName, setCoverFileName] = useState("No selected file");
    const [logoPic, setLogoPic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [post, setPost] = useState({
        name: '',
        website: '',
        category: '',
        companySize: '',
        benefits: '',
        cover: null,
        logo: null,
        location: '',
        description: '',
        _method: 'PATCH'
    });

    useEffect(() => {
        console.log(company);
        if (company) {
            setPost({
                name: company.company.name,
                website: company.company.website,
                category: company.company.category,
                companySize: company.company.companySize,
                benefits: company.company.benefits,
                location: company.company.location,
                description: company.company.description,
                _method: 'PATCH'
            });
            if (company.company.logo) {
                setLogoFileName(company.company.logo);
                setLogoPic(company.company.logo);
            }

            if (company.company.cover) {
                setCoverFileName(company.company.cover);
                setCoverPic(company.company.cover);
            }
        }
    }, [company]);

    const handleLogoFileChange = (event) => {
        const file = event.target.files[0];
        setPost({ ...post, logo: file });
        setLogoFileName(file.name);
        setLogoPic(URL.createObjectURL(file));
    };

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        setPost({ ...post, cover: file });
        setCoverFileName(file.name);
        setCoverPic(URL.createObjectURL(file));
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/JobCategories')
            .then(response => {
                setApi(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const States = ["Kuala Lumpur", "Selangor", "Putrajaya", "Penang", "Johor", "Perlis", "Kedah", "Kelantan", "Terengganu", "Melaka",
        "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Overseas"];
    
        const handleSubmit = async (event) =>{
            event.preventDefault();
            const token = Cookies.get('empToken');
            try{
                let response;
                response = await axios.post('http://localhost:8000/api/UpdateCompany', post, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response:', response.data);
                onClose();
            }
            catch(error){
                if (error.response) {
                    console.log('Error response:', error.response);
                } else {
                    console.error('Error adding/updating experience:', error);
                }
            }
        }
    
    return (
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001">
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <h1>Edit Company Profile</h1>
                        <label>Company name</label>
                        <input
                            type="text"
                            name="name"
                            value={post.name}
                            onChange={handleInput}
                            className='border border-black p-2'
                        />
                        <label>Company website</label>
                        <input
                            type="text"
                            name="website"
                            value={post.website}
                            onChange={handleInput}
                            className='border border-black p-2'
                        />
                        <label>Company category</label>
                        <select
                            name="category"
                            value={post.category}
                            onChange={handleInput}
                            className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                        >
                            <option value="" disabled>select category</option>
                            {api.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label>Company size</label>
                        <input
                            type="text"
                            name="companySize"
                            value={post.companySize}
                            onChange={handleInput}
                            className='border border-black p-2'
                        />
                        <label>Company location</label>
                        <select
                            name="location"
                            value={post.location}
                            onChange={handleInput}
                            className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                        >
                            <option value="" disabled>select location</option>
                            {States.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <label>Company benefits</label>
                        <textarea
                            name='benefits'
                            className='border border-black p-2'
                            value={post.benefits}
                            onChange={handleInput}
                            rows={4}
                        />
                        <label>Company description</label>
                        <textarea
                            name='description'
                            className='border border-black p-2'
                            value={post.description}
                            onChange={handleInput}
                            rows={4}
                        />
                        <label>Company logo</label>
                        <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]"
                            onClick={() => document.querySelector(".input-field").click()}>
                            <input type="file" className="input-field hidden"
                                onChange={handleLogoFileChange}
                            />
                            {company.company.logo ?
                                <img src={logoPic} alt="logoPic" className="scale-100" />
                                :
                                <div className='flex flex-col items-center'>
                                    <img src={uploadCloud} alt="Upload Icon" className="w-20 h-20" />
                                    <p className="font-bold">Upload Your Profile logoPic</p>
                                    <p>Support file type: .png, svg, jpeg</p>
                                </div>
                            }
                        </div>
                        <div className="flex items-center mt-3">
                            <FaFileAlt />
                            <span className="flex items-center justify-between w-full">
                                {logoFileName}
                                <RiDeleteBin6Line onClick={() => { setLogoFileName("No selected file"); setPost({ ...post, logo: null }) }} />
                            </span>
                        </div>
                        <label>Company cover</label>
                        <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]"
                            onClick={() => document.querySelector(".coverInput-field").click()}>
                            <input type="file" className="coverInput-field hidden"
                                onChange={handleCoverFileChange}
                            />
                            {company.company.cover ?
                                <img src={coverPic} alt="coverPic" className="scale-100" />
                                :
                                <div className='flex flex-col items-center'>
                                    <img src={uploadCloud} alt="Upload Icon" className="w-20 h-20" />
                                    <p className="font-bold">Upload Your Profile coverPic</p>
                                    <p>Support file type: .png, svg, jpeg</p>
                                </div>
                            }
                        </div>
                        <div className="flex items-center">
                            <FaFileAlt />
                            <span className="flex items-center justify-between w-full">
                                {coverFileName}
                                <RiDeleteBin6Line onClick={() => { setCoverFileName("No selected file"); setPost({ ...post, cover: null }) }} />
                            </span>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded w-full">
                            Save And Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
