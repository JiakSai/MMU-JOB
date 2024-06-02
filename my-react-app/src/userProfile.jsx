import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import profilePic from './photo/profilePic1.svg';
import addInfo from './photo/addInfo.svg';
import Cookies from 'js-cookie';
import { AddRole } from './popUp-Components/addRole.jsx';
import { MdOutlineEdit } from "react-icons/md";

const UserProfile = () => {
    const [showAddRole, setShowAddRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null); // New state for selected role
    const [roleValues, setRoleValues] = useState([]);

    const handleEditClick = (role) => {
        setSelectedRole(role); // Set the role to be edited
        setShowAddRole(true);
    };

    const handleAddRoleClick = () => {
        setSelectedRole(null); // Reset selected role when adding a new one
        setShowAddRole(true);
    };

    const handleClose = () => {
        setShowAddRole(false);
        setSelectedRole(null); // Clear selected role on close
    };

    useEffect(() => {
        if (showAddRole) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showAddRole]);

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
            if (data && Array.isArray(data.experience)) {
                setRoleValues(data.experience);
            } else {
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
            action: handleAddRoleClick,
            renderFunction: (value) => (
                <div className='border border-black px-4 py-2 w-[460px] flex justify-between'>
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
                    <div>
                        <MdOutlineEdit onClick={() => handleEditClick(value)} />
                    </div>
                </div>
            )
        },
        // Other sections...
    ];

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
                                onClose={handleClose} 
                                role={selectedRole}
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
