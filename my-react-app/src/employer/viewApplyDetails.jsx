import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewApplyDetails({ onclose, justClose, apply }) {
    const [roleValues, setRoleValues] = useState([]);
    const [educationValues, setEducationValues] = useState([]);
    const [resumeFileName, setResumeFileName] = useState(null);
    const token = Cookies.get('empToken');

    useEffect(() => {
        setRoleValues(apply.user.experience);
        setEducationValues(apply.user.education);
        setResumeFileName(apply.user.resume ? apply.user.resume.split('_').slice(1).join('_').split('e').slice(2).join('e') : null);
    }, [apply]);

    const updateApplicationStatus = async (status) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/UpdateApplicationStatus/${apply.id}`, { status },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            onclose();
        } catch (error) {
            console.error("There was an error updating the application status!", error);
        }
    };

    const myConstants = [
        {
            title: "Career History",
            value: "Job seeker has not added any work experience yet.",
            button: "Add role",
            userValue: roleValues,
            renderFunction: (value) => (
                <div className='border border-black px-4 py-2 w-[520px] flex justify-between rounded'>
                    <div>
                        <p className='font-semibold text-lg text-gray-900'>{value.title}</p>
                        <div className='text-sm text-gray-900 font-light'>
                            <span>{value.companyName}</span>
                            <span className='font-bold mx-[5px]'>·</span>
                            <span>{value.jobType}</span>
                        </div>
                        <div className='text-sm text-gray-500 font-light'>
                            <span>{value.startDate}</span>
                            <span className=' mx-[5px]'>-</span>
                            <span>{value.endDate}</span>
                        </div>
                        <div className='text-sm text-gray-500 font-light'>
                            <span>{value.location}</span>
                            <span className='font-bold mx-[5px]'>·</span>
                            <span>{value.locationType}</span>
                        </div>
                        <p className='text-base text-gray-900 font-light mt-[5px]'>{value.description}</p>
                    </div>
                </div>
            )
        },
        {
            title: "Education",
            value: "Job seeker has not added any education yet.",
            button: "Add education",
            userValue: educationValues,
            renderFunction: (value) => (
                <div className='border border-black px-4 py-2 w-[520px] flex justify-between rounded'>
                <div>
                    <p className='font-semibold text-lg text-gray-900'>{value.school}</p>
                    <div className='text-sm text-gray-900 font-light'>
                        <span>{value.fieldOfStudy}</span>
                        <span>{value.degree}</span>
                    </div>
                    <div className='text-sm text-gray-500 font-light'>
                        <span>{value.startDate}</span>
                        <span className=' mx-[5px]'>-</span>
                        <span>{value.endDate}</span>
                    </div>
                    <div className='text-sm text-gray-500 font-light'>
                        <span>{value.grade}</span>
                    </div>
                    <p className='text-base text-gray-900 font-light mt-[5px]'>{value.description}</p>
                </div>
            </div>
            )
        },
    ];

    return (
        <div className="addrole fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className='bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full'>
                <button onClick={justClose} className='absolute top-1 right-2 text-xl font-bold'>
                    &times;
                </button> 
                <div className="appScroll h-[500px] overflow-y-auto mr-[-16px]">
                <div>
                    <h1 className="text-xl font-semibold uppercase text-neutral-600">User Information</h1>
                    <div className="userInformation p-4 rounded-md w-[440px] my-4">
                        <div className="flex items-center gap-5">
                            {apply.user.profilePic ? (
                                <img src={apply.user.profilePic} alt="" className="rounded-full h-[100px] w-[100px] border border-neutral-700" />
                            ) : (
                                <HiOutlineUserCircle size={100} />
                            )}
                            <div>
                                <p className="uppercase font-semibold">{apply.user.name}</p>
                                <p className="text-lg">{apply.user.email}</p>
                                <p className="text-lg">{apply.user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    {myConstants.map((item, index) => (
                        <div key={index} className='mb-[20px]'>
                            <h1 className='font-bold text-xl mb-[10px] underline underline-offset-4'>{item.title}</h1>
                            {Array.isArray(item.userValue) && item.userValue.length > 0 ? 
                                item.userValue.map((value, idx) => (
                                    <div key={idx} className='mb-[10px]'>
                                        {item.renderFunction(value)}
                                    </div>
                                ))
                                :
                                <p className='text-lg'>{item.value}</p>
                            }
                        </div>
                    ))}
                </div>
                <div className='mb-[20px]'>
                            <h1 className='font-bold text-xl mb-[10px] underline underline-offset-4'>Resume</h1>
                            {apply.user.resume ?
                                <div className='border border-black px-4 py-2 w-[520px] flex justify-between rounded'>
                                    <a href={apply.user.resume} className='flex items-center gap-2'><FaFileAlt />{resumeFileName}</a>
                                </div>
                                :
                                <p className='text-lg'>Job seeker has not added resume yet.</p>
                            }
                        </div>
                        <div>
                            <h1 className='font-bold text-xl mb-[10px] underline underline-offset-4'>Skills</h1>
                            {apply.user.skills ?
                                <div className='border border-black px-4 py-2 w-[520px] flex justify-between rounded'>
                                    <p className='font-normal text-sm text-gray-900'>{apply.user.skills}</p>
                                </div>
                                :
                                <p className='text-lg'>Job seeker has not added any skills yet.</p>
                            }
                        </div>      
                    
                </div> 
                <form className="flex justify-center mb-[-16px] mx-[-16px] bg-stone-200 rounded p-2 space-x-4">
                    <button type="button" onClick={() => updateApplicationStatus('Rejected')} className="border border-neutral-700 px-4 py-2 bg-red-500 text-white">Reject</button>
                    <button type="button" onClick={() => updateApplicationStatus('Accepted')} className="border border-neutral-700 px-4 py-2 bg-green-500 text-white">Accept</button>
                </form>
            </div>
        </div>
    );
}
