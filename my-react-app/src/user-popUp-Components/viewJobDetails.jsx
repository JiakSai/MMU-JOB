import { IoLocationOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export function ViewJobDetails({onClose, job}){
    return(
        <div className='addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-[695.2px]'>
                <button onClick={onClose} className='absolute top-2 right-2 text-xl font-bold'>
                    <IoClose size={25}/>
                </button>
                <div className="py-4 px-6 bg-white">
                <div className='jobDetailsTop'>
                        <div className="jobDetailsBox">
                            <img src={job.company.logo} alt="bytes" className="h-[50px] rounded" />
                        </div>
                        <div className="jobDetailTittle">
                            <h1 className='text-xl font-semibold'>{job.jobTitle}</h1>
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
            </div>
        </div>
    )
}