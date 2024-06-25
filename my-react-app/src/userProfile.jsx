import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import profilePic from './photo/profilePic1.svg';
import addInfo from './photo/addInfo.svg';
import Cookies from 'js-cookie';
import { AddRole } from './user-popUp-Components/addRole.jsx';
import { AddEducation } from './user-popUp-Components/addEducation.jsx';
import { AddResume } from './user-popUp-Components/addResume.jsx';
import { AddSkill } from './user-popUp-Components/addSkill.jsx';
import { EditProfile } from './user-popUp-Components/editProfile.jsx';
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { AddProfileImage } from './user-popUp-Components/addProfileImage.jsx';
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const navigate = useNavigate();
    const [showAddRole, setShowAddRole] = useState(false);
    const [showAddEducation, setShowAddEducation] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [roleValues, setRoleValues] = useState([]);
    const [educationValues, setEducationValues] = useState([]);
    const [resumeValues, setResumeValues] = useState(null);
    const [showAddResume, setShowAddResume] = useState(false);
    const [resumeFileName, setResumeFileName] = useState(null);
    const [skillsValues, setSkillsValues] = useState(null);
    const [showAddSkills, setShowAddSkills] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [profileValues, setProfileValues] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddProfileImage, setShowAddProfileImage] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1100);
        return () => clearTimeout(timer);
    }, []);

    const handleEditClick = (role) => {
        setSelectedRole(role);
        setShowAddRole(true);
       
    };
    const handleAddRoleClick = () => {
        setSelectedRole(null);
        setShowAddRole(true);
    };
    const handleClose = () => {
        setShowAddRole(false);
        setSelectedRole(null);
        window.location.reload();
    };
    const handleJustClose = () => {
        setShowAddRole(false);
        setSelectedRole(null);
    };
    const handleAddEducationClick = () => {
        setSelectedEducation(null);
        setShowAddEducation(true);
    };
    const handleEditEducationClick = (education) => {
        setSelectedEducation(education);
        setShowAddEducation(true);
    };
    const handleCloseEducation = () => {
        setShowAddEducation(false);
        setSelectedEducation(null);
        window.location.reload();
    };
    const handleJustCloseEducation = () => {
        setShowAddEducation(false);
        setSelectedEducation(null);
    };
    const handleEditProfile = () => {
        setSelectedProfile(profileValues);
        setShowEditProfile(true);
    };

    useEffect(() => {
        if (showAddRole || showAddEducation || showAddResume || showAddSkills || showEditProfile || showAddProfileImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showAddRole, showAddEducation, showAddResume, showAddSkills, showEditProfile, showAddProfileImage]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/userLogin');
            console.error('No token found');
            return;
        }
        fetch('http://localhost:8000/api/ShowUserProfile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data && Array.isArray(data.experience)) {
                setRoleValues(data.experience);
            } else {
                setRoleValues([]);
            }
            if (data && Array.isArray(data.education)) {
                setEducationValues(data.education);
            } else {
                setEducationValues([]);
            }
            setProfileValues(data);
            setResumeValues(data.resume);
            setResumeFileName(data.resume ? data.resume.split('_').slice(1).join('_').split('e').slice(2).join('e') : null);
            setUserProfilePic(data.profilePic);
            setSkillsValues(data.skills);
        })
        .catch(error => console.error('Error:', error));
    }, [navigate]);

    const handleRoleDeleteClick = async (experienceId) => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/DeleteExperience/${experienceId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(experienceId)
            console.error('Error deleting experience:', error);
        }
    };
    const handleEduDeleteClick = async (educationId) => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/DeleteEducation/${educationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(experienceId)
            console.error('Error deleting experience:', error);
        }
    };

    const myConstants = [
        {
            title: "Career History",
            value: "Add a personal summary to your profile as a way to introduce who you are",
            button: "Add role",
            userValue: roleValues,
            action: handleAddRoleClick,
            renderFunction: (value) => (
                <div className='border border-black px-4 py-2 w-[460px] flex justify-between rounded'>
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
                    <div className='flex item-center gap-1'>
                        <MdOutlineEdit onClick={() => handleEditClick(value)} />
                        <MdDeleteOutline onClick={() => handleRoleDeleteClick(value.id)} />
                    </div>
                </div>
            )
        },
        {
            title: "Education",
            value: "Tell employers about your education.",
            button: "Add education",
            userValue: educationValues,
            action: handleAddEducationClick,
            renderFunction: (value) => (
                <div className='border border-black px-4 py-2 w-[460px] flex justify-between rounded'>
                    <div>
                    <p className='font-semibold text-lg text-gray-900'>{value.school}</p>
                    <div className='text-sm text-gray-900 font-light'>
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
                    <div className='flex item-center gap-1'>
                        <MdOutlineEdit onClick={() => handleEditEducationClick(value)} />
                        <MdDeleteOutline onClick={() => handleEduDeleteClick(value.id)} />
                    </div>
                </div>
            )
        },
    ];
    
    if (loading) { 
        return ( 
            <> 
                <div className="loader"></div> 
                <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customBlue'>
                    " MMUJOB "</p> 
                </div> 
            </> 
        ); }

    return (
        <>
            <Header />
            <section>
                <div className="userProfileTop relative">
                    <div className='mx-[120px]'>
                        <div className='profileInfo flex items-center justify-between w-[1279.2px] absolute top-[85px]'>
                            <div onClick= {()=> setShowAddProfileImage(true)}>
                                {userProfilePic ? 
                                        <img src={userProfilePic} alt="profilePic" className='w-[180px] h-[180px] border-2 border-black rounded-full scale-100' /> 
                                        : 
                                        <img src={profilePic} alt="profilePic" className='w-[180px] h-[180px] border-2 border-black rounded-full scale-100' />
                                }
                            </div>
                            <div className='flex gap-10'>
                                <div>
                                    <p className='font-bold text-3xl'>{profileValues.name}</p>
                                    <p className='text-2xl flex items-center gap-3'><IoLocationOutline />{profileValues.city}&nbsp;{profileValues.state}</p>
                                    <p className='text-2xl flex items-center gap-3'><MdOutlineMail />{profileValues.email}</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <button className='border border-black px-4 py-1 text-2xl' onClick={handleEditProfile} >Edit Profile</button>
                                    <button className='border border-black px-4 py-1 text-2xl'>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-[120px] mt-[120px] mb-[40px] flex'>
                    <div>
                        {myConstants.map((item, index) => (
                            <div key={index} className='mb-[40px]'>
                                <h1 className='font-bold text-[26px] mb-[30px]'>{item.title}</h1>
                                {Array.isArray(item.userValue)&& item.userValue.length > 0  ? 
                                    item.userValue.map((value, idx) => (
                                        <div key={idx} className='mb-[10px]'>
                                            {item.renderFunction(value)}
                                        </div>
                                    ))
                                    :
                                    <p className='text-lg'>{item.value}</p> 
                                }
                                <button onClick={item.action} className='text-lg border border-black px-4 py-1 mt-[10px] rounded'>{item.button}</button>
                            </div>
                        ))}
                        <div className='mb-[40px]'>
                            <h1 className='font-bold text-[26px] mb-[30px]'>Resume</h1>
                            {resumeValues ?
                                <div className='border border-black px-4 py-2 w-[460px] flex justify-between rounded'>
                                        <a href={resumeValues} className='flex items-center gap-2'><FaFileAlt />{resumeFileName}</a>
                                </div>
                                :
                                <p className='text-lg'>Upload a resumé for easy applying and access no matter where you are.</p>
                            }
                            {resumeValues ?
                                <button onClick={()=> setShowAddResume(true)} className='text-lg border border-black px-4 py-1 mt-[10px] rounded'>Edit resume</button>
                                :
                                <button onClick={()=> setShowAddResume(true)} className='text-lg border border-black px-4 py-1 mt-[10px] rounded'>Add resume</button>
                            }
                        </div>
                        <div className='mb-[40px]'>
                            <h1 className='font-bold text-[26px] mb-[30px]'>Skills</h1>
                            {skillsValues ?
                                <div className='border border-black px-4 py-2 w-[460px] flex justify-between rounded'>
                                        <p className='font-normal text-sm text-gray-900'>{skillsValues}</p>
                                </div>
                                :
                                <p className='text-lg'>Add your skills to show employers what you're good at</p>
                            }
                            {skillsValues ?
                                <button onClick={()=> setShowAddSkills(true)} className='text-lg border border-black px-4 py-1 mt-[10px] rounded'>Edit skills</button>
                                :
                                <button onClick={()=> setShowAddSkills(true)} className='text-lg border border-black px-4 py-1 mt-[10px] rounded'>Add skills</button>
                            }
                            
                        </div>
                        
                        {showAddRole && (
                            <AddRole
                                justClose={handleJustClose}
                                onClose={handleClose} 
                                role={selectedRole}
                            />
                        )}
                        {showAddEducation && (
                            <AddEducation
                                justClose={handleJustCloseEducation}
                                onClose={handleCloseEducation}
                                education={selectedEducation}
                            />
                        )}
                        {showAddResume && (
                            <AddResume
                                justClose={() => {setShowAddResume(false);}}
                                onClose={() => {setShowAddResume(false); window.location.reload();}}
                            />
                        )}
                        {showAddSkills && (
                            <AddSkill
                                justClose={() => { setShowAddSkills(false); }}
                                onClose={() => { setShowAddSkills(false); window.location.reload(); }}
                            />
                        )}
                        {showEditProfile && (
                            <EditProfile
                                justClose={() => { setShowEditProfile(false); }}
                                onClose={() => { setShowEditProfile(false); window.location.reload(); }}
                                profile={selectedProfile}
                            />
                        )}
                        {showAddProfileImage && (
                            <AddProfileImage
                                justClose={() => { setShowAddProfileImage(false); }}
                                onClose={() => { setShowAddProfileImage(false); window.location.reload(); }}
                            />
                        )}
                    </div>
                    <img src={addInfo} alt="addInfo" className='w-[656px] h-[480px] ml-[260px] mt-[50px]' />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default UserProfile;
