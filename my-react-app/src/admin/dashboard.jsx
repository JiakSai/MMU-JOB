import React, { useState, useEffect } from 'react';
import Home from './adminSidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TbReportAnalytics } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [jobSeekers, setJobSeekers] = useState([]);
    const [employers, setEmployers] = useState({ employer: [] });
    const token = Cookies.get('adminToken');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/403');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobResponse, employerResponse, jobSeekerResponse, reviewResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/Admin/ShowPosts', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/api/Admin/ShowEmployerAndCompany', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/api/Admin/ShowUsers', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/api/Admin/ShowRating', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                setJobs(Array.isArray(jobResponse.data) ? jobResponse.data : []);
                setEmployers(employerResponse.data);
                setJobSeekers(Array.isArray(jobSeekerResponse.data) ? jobSeekerResponse.data : []);
                setReviews(Array.isArray(reviewResponse.data) ? reviewResponse.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [token]);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"Ogos","September","October","November","December"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Posted Jobs',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    if (isLoading) {
        return (
            <>
                <div className="Adminloader"></div>
                <div className='flex justify-center mt-[630px]'>
                    <p className='text-3xl font-bold text-customGrey'>" MMUJOB "</p>
                </div>
            </>
        );
    }

    return (
        <div className='flex'>
            <Home />
            <div className="py-3 px-6 w-full">
                <div className='grid grid-cols-4 gap-6'>
                    <div className='bg-customGrey text-white h-40 rounded-lg p-4 flex flex-col justify-center items-center gap-3'>
                        <AiOutlineUser size={38} />
                        <span className='text-2xl font-semibold'>{jobSeekers.length}</span>
                        <span>Total Job Seekers</span>
                    </div>
                    <div className='bg-customGrey text-white h-40 rounded-lg p-4 flex flex-col justify-center items-center gap-3'>
                        <BsBuildings size={38} />
                        <span className='text-2xl font-semibold'>{employers.employer?.length || 0}</span>
                        <span>Total Employers</span>
                    </div>
                    <div className='bg-customGrey text-white h-40 rounded-lg p-4 flex flex-col justify-center items-center gap-3'>
                        <TbReportAnalytics size={38} />
                        <span className='text-2xl font-semibold'>{jobs.length}</span>
                        <span>Total Jobs</span>
                    </div>
                    <div className='bg-customGrey text-white h-40 rounded-lg p-4 flex flex-col justify-center items-center gap-3'>
                        <MdOutlineMessage size={38} />
                        <span className='text-2xl font-semibold'>{reviews.length}</span>
                        <span>Total Reviews</span>
                    </div>
                </div>
                <div className='flex mt-8 justify-between'>
                    <div className='w-[950px]'>
                        <Line data={data} />
                    </div>
                    <div>
                        <p className='mb-2 font-bold text-lg'>Recent Job Seeker</p>
                        <div className='scroll h-[443px] overflow-y-auto'>
                            {jobSeekers.map((jobSeeker, index) => (
                                <div key={index} className='border-l border-b border-black p-2 flex mt-1'>
                                    <p>{jobSeeker.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
