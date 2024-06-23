import React, { useEffect, useState } from "react";
import EmployerHeader from "./employerHeader";
import EmployerFooter from "./employerFooter";
import axios from "axios";
import Cookies from "js-cookie";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import AddEditPost from "./Add&EditPost";
import { FaFileSignature } from "react-icons/fa";

export default function ListenJob() {
    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    const [showEditPost, setShowEditPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('empToken');
            try {
                const [jobResponse, companyResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/ShowPostsEmployer', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/api/ShowCompanyProfile', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                console.log(jobResponse.data);
                console.log(companyResponse.data);
                setJobs(jobResponse.data);
                setCompany(companyResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = async (jobID) => {
        const token = Cookies.get('empToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/DeletePost/${jobID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobs(jobs.filter(job => job.id !== jobID)); // Update the state to remove the deleted job
        } catch (error) {
            console.log(jobID)
            console.error('Error deleting experience:', error);
        }
    };

    const handleJobClick = (job) => {
        setShowEditPost(job);
    };

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

    return (
        <>
            <EmployerHeader />
            <main className="mt-[100px] mb-[30px] mx-[120px] flex space-x-10 ">
                <div className="scroll h-[739.2px] flex flex-col space-y-2 overflow-y-auto overflow-x-hidden">
                    {jobs.length > 0 ? (
                        jobs.map(job => (
                            <div className="w-[275px] border border-zinc-700 p-4 rounded-sm shadow-md" key={job.id} onClick={() => handleJobClick(job)}>
                                <div className='flex w-full justify-between'>
                                    <img src={company.company?.logo || 'https://via.placeholder.com/180/E5E4E2'} alt='Company Logo' className='rounded h-[50px] max-w-[90px] border-black' />
                                    <MdDeleteOutline size={23} onClick={() => handleDeleteClick(job.id)}/>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold mt-2">{job.jobTitle}</p>
                                    <p>{job.jobType} | {job.locationType} | {job.jobLocation}</p>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-sm">{job.time_ago}</p>
                                        <p className="text-sm">RM{job.minSalary} - RM{job.maxSalary}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-[280px] border border-zinc-700 p-4 rounded-sm shadow-md text-center">
                            <p className="text-xl font-semibold mt-2">No Jobs Available</p>
                            <p>Please add new jobs to see them listed here.</p>
                        </div>
                    )}
                </div>
                <div className="w-[956px] h-[739.2px]">
                    {showEditPost ? 
                        <AddEditPost 
                            job={showEditPost}
                            onClose={() => {window.location.reload(); }}
                        />
                        :
                        <div className="bg-white p-8 h-full">
                            <h1 className='flex items-center gap-4 text-2xl font-semibold'><FaArrowLeftLong className='text-2xl'/>Select a job</h1>
                            <p className='ml-[45px] mt-[2px]'>Display job details here and edit!!</p>
                            <div className='grid place-content-center w-full mt-[160px]'>
                                <FaFileSignature size={200}/>
                            </div>
                        </div>
                    }
                </div>
            </main>
            <EmployerFooter />
        </>
    );
}
