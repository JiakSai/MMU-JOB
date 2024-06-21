import { useEffect, useState } from 'react';
import { IoBookmarkOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { GoClock } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImPointRight } from "react-icons/im";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function JobDetails(props){
    const job = props.job;
    const [showJobDetailBottom, setShowJobDetailBottom] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const paragraphStyles = {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        display: '-webkit-box',
    };
    const token = Cookies.get('token');
    const toggleJobDetails = () => {
        setIsOpen(!isOpen);
    };
    const handleJobClick = (job) => {
        setSelectedJob(job);
        if (token) {
            navigate('/application', { state: { job } });
        } else {
            navigate('/userLogin');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const jobScroll = document.querySelector('.jobScroll');
            const scrollTop = jobScroll.scrollTop;
            const scrollHeight = jobScroll.scrollHeight;
            const clientHeight = jobScroll.clientHeight;

            setShowJobDetailBottom(scrollTop + clientHeight >= scrollHeight - 10);
        };

        const jobScroll = document.querySelector('.jobScroll');
        jobScroll.addEventListener('scroll', handleScroll);

        // Initial check to see if the component is already at the bottom
        handleScroll();

        return () => {
            jobScroll.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="jobDetails">
                <div className='jobScroll'>
                    <div className='jobDetailsTop'>
                        <div className="jobDetailsBox">
                            <img src={job.company.logo} alt="bytes" className="h-[50px] rounded" />
                            <p className='text-3xl ml-4 mr-1'>{job.company.name}</p>
                            <p className="viewJob">View all jobs</p>
                        </div>
                        <div className="jobDetailTittle">
                            <h1 className='text-xl font-semibold'>{job.jobTitle}</h1>
                            <div className="jobDetailsBox">
                                <button className="btn1"><IoIosMore /></button>
                                <button className="btn2"><IoBookmarkOutline /></button>
                                <button className="btn3" onClick={() => handleJobClick(job)}>Quick apply</button>
                            </div>
                        </div>
                        <div className="minimalistInformation">
                            <div className="jobDetailsBox">
                                <IoLocationOutline />{job.jobLocation}
                            </div>
                            <div className="jobDetailsBox">
                                <FaRegBuilding /> {job.company.companySize}
                            </div>
                            <div className="jobDetailsBox">
                                <GoClock /> On-site | {job.jobType}
                            </div>
                            <div className="jobDetailsBox">
                                <GiPayMoney /> RM{job.minSalary} - RM{job.maxSalary} per month
                            </div>
                        </div>
                        <h3>Responsibilities</h3>
                          <p className='ml-[25px] leading-7'>{job.description}</p>
                        <h3>Qualifications</h3>
                          <p className='ml-[25px] leading-7'>Education Level: {job.educationLevel}</p>
                          <p className='ml-[25px] leading-7'>Working Experience : {job.experience}</p>
                          <p className='ml-[25px] leading-7'>{job.requirement}</p>
                        <h3>Company profile</h3>
                        <div className="companyInfoBox">
                            <img src={job.company.logo} alt="easyParcel" />
                            <p className='text-2xl font-bold mt-4'>{job.company.name}</p>
                            <div className="jobDetailsBox">
                                <FaStar /> 4.4 · 27 reviews
                            </div>
                            <div className="jobDetailsBox">
                                <HiOutlineBuildingOffice /> <p>{job.company.category}</p>
                            </div>
                            <div className="jobDetailsBox">
                                <GoPeople /> <p>{job.company.companySize}</p>
                            </div>
                            <span style={isOpen ? null : paragraphStyles}>
                                <p className='leading-6'>{job.company.description}</p>
                            </span>
                            <p className="show mt-1" onClick={toggleJobDetails}>
                                {isOpen ? 'Show less' : 'Show more'}
                                &nbsp;&nbsp;
                                {isOpen ? <TfiAngleUp /> : <TfiAngleDown />}
                            </p>
                            <h4 className='font-semibold'>Perks and benefits</h4>
                            <div className="benefitsBox">
                                {job.company.benefits?.split(',').filter(Boolean).map((benefit, index) => (
                                    <p className='flex items-center gap-2' key={index}><ImPointRight />{benefit.trim()}</p>
                                ))}
                            </div>
                            <button className="btn4">More about this company&nbsp;&nbsp;&nbsp; <FaArrowRightLong /></button>
                        </div>
                    </div>
                </div>
                <div className='jobDetailBottom' style={{ display: showJobDetailBottom ? 'flex' : 'none' }}>
                    <button className="btn2"><IoBookmarkOutline /></button>
                    <button className="btn3" onClick={() => handleJobClick(job)}>Quick apply</button>
                </div>
            </div>
        </>
    );
}
