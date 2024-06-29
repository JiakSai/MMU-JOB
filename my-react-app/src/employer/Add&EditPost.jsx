import React, { useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function AddEditPost({ job, onClose }) {
    const navigate = useNavigate();
    const [api, setApi] = useState([]);
    const [initialPost, setInitialPost] = useState({
        jobTitle: '',
        jobType: '',
        jobCategory: '',
        jobLocation: '',
        locationType: '',
        minSalary: '',
        maxSalary: '',
        description: '',
        requirement: '',
        educationLevel: '',
        experience: ''
    });
    const [post, setPost] = useState(initialPost);
    const token = Cookies.get('empToken');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/employerLogin');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (job) {
            const jobData = {
                jobTitle: job.jobTitle,
                jobType: job.jobType,
                jobLocation: job.jobLocation,
                locationType: job.locationType,
                minSalary: job.minSalary,
                maxSalary: job.maxSalary,
                description: job.description,
                requirement: job.requirement,
                educationLevel: job.educationLevel,
                experience: job.experience,
            };
            setPost(jobData);
            setInitialPost(jobData);
        }
    }, [job]);

    const [errors, setErrors] = useState({
        minSalary: '',
        maxSalary: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validation logic
        if (name === 'minSalary' || name === 'maxSalary') {
            let newErrors = { ...errors };

            if (value < 0) {
                newErrors[name] = 'Salary cannot be negative';
            } else if (name === 'minSalary' && post.maxSalary && parseFloat(value) > parseFloat(post.maxSalary)) {
                newErrors[name] = 'Min Salary cannot be greater than Max Salary';
            } else if (name === 'maxSalary' && post.minSalary && parseFloat(value) < parseFloat(post.minSalary)) {
                newErrors[name] = 'Max Salary cannot be less than Min Salary';
            } else {
                newErrors[name] = '';
            }
            setErrors(newErrors);
        }

        setPost({
            ...post,
            [name]: value
        });
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('empToken');
        try {
            let response;
            if (job) {
                response = await axios.patch(`http://localhost:8000/api/UpdatePost/${job.id}`, post, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            } else {
                response = await axios.post('http://localhost:8000/api/AddPost', post, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
            console.log('Response:', response.data);
            onClose(); // Call the onClose function to show the success message
        } catch (error) {
            if (error.response) {
                console.log('Error response:', error.response);
            } else {
                console.error('Error adding/updating experience:', error);
            }
        }
    };

    const handleCancel = () => {
        setPost(initialPost);
    };

    const States = ["Kuala Lumpur", "Selangor", "Putrajaya", "Penang", "Johor", "Perlis", "Kedah", "Kelantan", "Terengganu", "Melaka",
        "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Overseas"];
    const jobTypes = ["Internship", "Part-Time", "Full-Time", "Freelance"];
    const experiences = ["Intern", "Fresh Graduate", "1 to 3 Years of Experience", "4 to 7 Years of Experience", "8 to 10 Years of Experience",
        "Over 10 Years of Experience"];
    const locationTypes = ["On-site", "Remote", "Hybrid"];
    const educationLevel = ["High school", "Diploma", "Bachelor's degree", "Master's degree", "Doctorate degree", "Professional qualification"];
    
    if(!job){
        if (isLoading) {
            return ( 
                <> 
                    <div className="Emploader"></div> 
                    <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customPink'>
                        " MMUJOB "</p> 
                    </div> 
                </> 
            );
        }
    }

    return (
        <div className='w-full bg-[#FDFEFE] p-8 rounded'>
            <p className='text-2xl text-stone-400 font-semibold'>
                {job ?
                    'Edit Job'
                    :
                    'Add Job'
                }
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex space-x-14 mb-6'>
                    <div className='relative w-80'>
                        <input
                            type="text"
                            name='jobTitle'
                            value={post.jobTitle}
                            onChange={handleInputChange}
                            placeholder='Enter Job title'
                            className='border-b p-2 w-full border-neutral-400 text-neutral-600'
                        />
                    </div>
                    <div className='relative w-80'>
                        <select
                            name="jobType"
                            value={post.jobType}
                            onChange={handleInputChange}
                            className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                            <option value="" disabled>Select job type</option>
                            {jobTypes.map((jobType, index) => (
                                <option key={index} value={jobType}>
                                    {jobType}
                                </option>
                            ))}
                        </select>
                        <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                    </div>
                    <div className='relative w-80'>
                        <select
                            name="jobCategory"
                            value={post.jobCategory}
                            onChange={handleInputChange}
                            className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                            <option value="" disabled>Select job category</option>
                            {api.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                    </div>
                </div>
                <div className='flex space-x-14 mb-4'>
                    <div className='relative w-80'>
                        <select
                            name="jobLocation"
                            value={post.jobLocation}
                            onChange={handleInputChange}
                            className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                            <option value="" disabled>Select location</option>
                            {States.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                    </div>
                    <div className='relative w-80'>
                        <select
                            name="locationType"
                            value={post.locationType}
                            onChange={handleInputChange}
                            className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                            <option value="" disabled>Select location type</option>
                            {locationTypes.map((locationType, index) => (
                                <option key={index} value={locationType}>
                                    {locationType}
                                </option>
                            ))}
                        </select>
                        <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                    </div>
                    <div className='flex space-x-4 w-80'>
                        <div>
                            <input
                                name='minSalary'
                                type="number"
                                value={post.minSalary}
                                onChange={handleInputChange}
                                placeholder='Min Salary'
                                className='border-b p-2 w-full border-neutral-400 text-neutral-600'
                            />
                            <p className='text-red-500 text-sm'>{errors.minSalary}</p>
                        </div>
                        <div>
                            <input
                                name='maxSalary'
                                type="number"
                                value={post.maxSalary}
                                onChange={handleInputChange}
                                placeholder='Max Salary'
                                className='border-b p-2 w-full border-neutral-400 text-neutral-600'
                            />
                            <p className='text-red-500 text-sm'>{errors.maxSalary}</p>
                        </div>
                    </div>
                </div>
                <p className='px-2 text-neutral-400'>Job description</p>
                <div className='border border-zinc-500 flex flex-col space-y-4 rounded p-3'>
                    <p className='text-neutral-600 underline underline-offset-4'>Responsibilities</p>
                    <textarea
                        name='description'
                        value={post.description}
                        onChange={handleInputChange}
                        className='border border-black p-2 w-[693px] rounded'
                        rows={4}
                    />
                    <p className='text-neutral-600 underline underline-offset-4'>Qualifications</p>
                    <div className='flex space-x-14'>
                        <div className='relative w-80'>
                            <select
                                name="educationLevel"
                                value={post.educationLevel}
                                onChange={handleInputChange}
                                className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                                <option value="" disabled>Select education level</option>
                                {educationLevel.map((education, index) => (
                                    <option key={index} value={education}>
                                        {education}
                                    </option>
                                ))}
                            </select>
                            <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                        </div>
                        <div className='relative w-80'>
                            <select
                                name="experience"
                                value={post.experience}
                                onChange={handleInputChange}
                                className="border-b p-2 w-full border-neutral-400 text-neutral-600 appearance-none">
                                <option value="" disabled>Select work experience</option>
                                {experiences.map((experience, index) => (
                                    <option key={index} value={experience}>
                                        {experience}
                                    </option>
                                ))}
                            </select>
                            <FaAngleDown className='absolute right-2 top-3 pointer-events-none' />
                        </div>
                    </div>
                    <textarea
                        name='requirement'
                        value={post.requirement}
                        onChange={handleInputChange}
                        className='border border-black p-2 w-[693px] rounded'
                        rows={4}
                    />
                </div>
                <div className='flex justify-end space-x-3'>
                    <button type="button" onClick={handleCancel} className='bg-neutral-300 text-white px-4 py-2 mt-4 rounded-md'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-customPink text-white px-4 py-2 mt-4 rounded-md'>
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    )
}
