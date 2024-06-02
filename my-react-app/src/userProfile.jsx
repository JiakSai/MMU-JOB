import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import profilePic from './photo/profilePic1.svg';
import addInfo from './photo/addInfo.svg';
import { AddRole } from './popUp-Components/addRole.jsx';
// import { AddEducation } from './popUp-Components/addEducation.jsx';

const UserProfile = () => {
    const [showAddRole, setShowAddRole] = useState(false);
    const [showAddEducation, setShowAddEducation] = useState(false);
    const [roleValues, setRoleValues] = useState([]);
    const [educationValues, setEducationValues] = useState([]);

    useEffect(() => {
        if (showAddRole || showAddEducation) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showAddRole, showAddEducation]);

    const myConstants = [
        {
            title: "Career History",
            value: "Add a personal summary to your profile as a way to introduce who you are",
            button: "Add role",
            userValue: roleValues,
            action: () => setShowAddRole(true),
            renderFunction: (value) => (
                <div>
                    <p>{value.jobTitle}</p>
                    <p>{value.companyName}</p>
                    <p>{value.location}</p>
                    <p>{value.locationType}</p>
                    <div className='flex gap-2'>
                        <p>{value.startDateMonth}</p>
                        <p>/{value.startDateYear}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>{value.endDateMonth}</p>
                        <p>{value.endDateYear}</p>
                    </div>
                </div>
            )
        },
        {
            title: "Education",
            value: "Tell employers about your education.",
            button: "Add education",
            userValue: educationValues,
            action: () => setShowAddEducation(true),
            renderFunction: (value) => (
                <div>
                    <p>{value.degree}</p>
                    <p>{value.institution}</p>
                    <p>{value.location}</p>
                    <p>{value.startDate}</p>
                    <p>{value.endDate}</p>
                </div>
            )
        },
        {
            title: "Resume",
            value: "Upload a resumé for easy applying and access no matter where you are.",
            button: "Add resume",
            userValue: [],
            action: () => {},
            renderFunction: () => null 
        },
        {
            title: "Skills",
            value: "Add your skills to show employers what you're good at",
            button: "Add Skills",
            userValue: [],
            action: () => {},
            renderFunction: () => null
        },
    ];

    const handleAddRoleClose = (newRoleValue) => {
        setShowAddRole(false);
        if (newRoleValue) {
            setRoleValues([...roleValues, newRoleValue]);
            console.log(newRoleValue);
        }
    };

    const handleAddEducationClose = (newEducationValue) => {
        setShowAddEducation(false);
        if (newEducationValue) {
            setEducationValues([...educationValues, newEducationValue]);
            console.log(newEducationValue);
        }
    };

    return (
        <>
            <Header />
            <section>
                <div className="userProfileTop relative">
                    <div className='mx-[120px]'>
                        <div className='profileInfo flex items-center justify-between w-[1279.2px] absolute top-[85px]'>
                            <div className='flex border border-black rounded-full w-[180px] h-[180px] items-center justify-center'>
                                <img src={profilePic} alt="profilePic" className='w-[160px] h-[160px]' />
                            </div>
                            <div className='flex gap-10'>
                                <div>
                                    <p className='font-bold text-3xl'>User Name</p>
                                    <p className='text-2xl'>Location</p>
                                    <p className='text-2xl'>Gmail</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <button className='border border-black px-4 py-1 text-2xl'>Edit Profile</button>
                                    <button className='border border-black px-4 py-1 text-2xl'>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-[120px] mt-[120px] mb-[40px] flex'>
                    <div>
                        {myConstants.map((item, index) => (
                            <div key={index} className='mb-[25px]'>
                                <h1 className='font-bold text-[26px]'>{item.title}</h1>
                                {item.userValue && item.userValue.length > 0 ? 
                                    item.userValue.map((value, idx) => (
                                        <div key={idx}>
                                            {item.renderFunction(value)}
                                        </div>
                                    ))
                                    :
                                    <p className='text-lg'>{item.value}</p> 
                                }
                                <button onClick={item.action} className='text-lg border border-black px-4 py-1 mt-[12.5px]'>{item.button}</button>
                            </div>
                        ))}
                        {showAddRole && (
                            <AddRole 
                                roleValue={{}} 
                                onClose={handleAddRoleClose} 
                            />
                        )}
                        {showAddEducation && (
                            <AddEducation 
                                educationValue={{}} 
                                onClose={handleAddEducationClose} 
                            />
                        )}
                        <div>
                            <h2>User Profile</h2>
                            {roleValues.map((role, index) => (
                                <div key={index}>
                                    <p>Role: {role.jobTitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img src={addInfo} alt="addInfo" className='w-[656px] h-[480px] ml-[260px] mt-[50px]' />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default UserProfile;
