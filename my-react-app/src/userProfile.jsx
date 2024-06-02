import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import profilePic from './photo/profilePic1.svg';
import addInfo from './photo/addInfo.svg';
import Cookies from 'js-cookie';
import { AddRole } from './popUp-Components/addRole.jsx';
const UserProfile = () => {
    const [showAddRole, setShowAddRole] = useState(false);
    const [showAddEducation, setShowAddEducation] = useState(false);
    const [roleValues, setRoleValues] = useState([]);

    useEffect(() => {
        if (showAddRole || showAddEducation) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showAddRole, showAddEducation]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
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
            console.log('Data:', data);
            if (data && Array.isArray(data.experience)) {
                setRoleValues(data.experience);
            } else {
                console.error('Experience data is not an array:', data.experience);
                setRoleValues([]);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);
    
    
    
    const myConstants = [
        {
            title: "Career History",
            value: "Add a personal summary to your profile as a way to introduce who you are",
            button: "Add role",
            userValue: roleValues,
            action: () => setShowAddRole(true),
            renderFunction: (value) => (
                <div className='border border-black px-4 py-1 '>
                    <p>{value.title}</p>
                    <div className='flex '>
                        <span>{value.companyName}</span>
                        <span className='font-bold mx-[5px]'>·</span>
                        <span>{value.jobType}</span>
                    </div>
                    <div>
                        <span>{value.startDate}</span>
                        <span className=' mx-[5px]'>-</span>
                        <span>{value.endDate}</span>
                    </div>
                    <div>
                        <span>{value.location}</span>
                        <span className='font-bold mx-[5px]'>·</span>
                        <span>{value.locationType}</span>
                    </div>
                    <p>{value.description}</p>
                </div>
            )
        },
        {
            title: "Education",
            value: "Tell employers about your education.",
            button: "Add education",
            userValue: [],
            action: () => setShowAddEducation(true),
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

    const handleAddRoleClose = () => {
        setShowAddRole(false);
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
                            <div key={index} className='mb-[40px]'>
                                <h1 className='font-bold text-[26px] mb-[30px]'>{item.title}</h1>
                                {Array.isArray(item.userValue) && item.userValue.length > 0 ? 
                                    item.userValue.map((value, idx) => (
                                        <div key={idx} className='mb-[10px]'>
                                            {item.renderFunction(value)}
                                        </div>
                                    ))
                                    :
                                    <p className='text-lg'>{item.value}</p> 
                                }
                                <button onClick={item.action} className='text-lg border border-black px-4 py-1 mt-[10px]'>{item.button}</button>
                            </div>
                        ))}
                        {showAddRole && (
                            <AddRole
                                onClose={handleAddRoleClose} 
                            />
                        )}
                        <div>
                            <h2>User Profile</h2>
                            {roleValues.map((role, index) => (
                                <div key={index}>
                                    {/* <p>Role: {role.experience.jobTitle}</p> */}
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
