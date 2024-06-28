import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

export default function ViewJobAndApply({job, justClose}) {
    const navigate = useNavigate();
    const token = Cookies.get('token');

    const handleJobClick = (job) => {
        if (token) {
            navigate('/application', { state: { job } });
        } else {
            navigate('/userLogin');
        }
    };

    useEffect(() => {
       console.log(job);
    }, [])

    return(
        <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className='bg-white p-8 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-full'>
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    <IoClose size={25}/>
                </button>
                <div className="flex justify-between mt-2">
                    <div className="flex items-center">
                        <img src={job.company.logo} alt="jobLogo" className="h-[40px] rounded max-w-[150px]" />
                        <p className='text-2xl mx-4 uppercase'>{job.company.name}</p>
                    </div>
                    <button className="btn3" onClick={() => handleJobClick(job)}>Quick apply</button>
                </div>
                <div className="minimalistInformation">
                            <div className="jobDetailsBox">
                                <IoLocationOutline />{job.jobLocation}
                            </div>
                            <div className="jobDetailsBox">
                                <BiCategory />{job.jobCategory}
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
                <h3 className="mt-4">Responsibilities</h3>
                          <p className='ml-[25px] leading-7 mt-1'>{job.description}</p>
                        <h3 className="mt-2">Qualifications</h3>
                          <p className='ml-[25px] leading-7 mt-1'>Education Level: {job.educationLevel}</p>
                          <p className='ml-[25px] leading-7'>Working Experience : {job.experience}</p>
                          <p className='ml-[25px] leading-7'>{job.requirement}</p>
            </div>
        </div>
    )
}