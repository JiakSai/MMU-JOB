import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PhoneInput from "react-phone-input-2";

export function EditProfile({onClose, justClose, profile}){
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(true);
    const [profileValue, setProfileValue] = useState({
        name: "",
        email: "",
        city: "",
        state: "",
        phoneNumber: "",
    });
    const handleInput = (event) => {
        const {name, value} = event.target;
        setProfileValue({
            ...profileValue,
            [name]: value
        });
    };
    const handleChange = (value) => {
        setPhoneNumber(value);
        setProfileValue({ ...profileValue, phoneNumber: value });
        setValid(validatePhoneNumber(value));
      };
    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberPattern.test(phoneNumber);
    };
    useEffect(() =>{
        if(profile){
            setProfileValue({
                name: profile.name,
                email: profile.email,
                city: profile.city,
                state: profile.state,
            });
        }
    },[profile]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        try {
            const response = await axios.patch('http://localhost:8000/api/UserUpdate', profileValue, {
                headers: {
                    'Authorization': `Bearer ${token}` ,
                }
            });
            onClose();
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };
    return(
        <div className='addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'>
            <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl max-h-full overflow-y-auto z-2001 h-[695.2px]">
                <button onClick={justClose} className='absolute top-2 right-2 text-xl font-bold'>
                    &times;
                </button>
                <div className="py-4 px-6 bg-white">
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-4">Edit User Profile</h1>
                        <label>Name</label>
                        <input 
                                type="text"
                                name='name'
                                className='border border-black p-2'
                                value={profileValue.name}
                                onChange={handleInput}
                        />
                        {!valid && (
                            <p>Please enter a valid phone number.</p>
                        )}
                        <label>Email</label>
                        <input 
                                type="text"
                                name='email'
                                className='border border-black p-2'
                                value={profileValue.email}
                                onChange={handleInput}
                        />
                        <label>Phone number</label>
                        <PhoneInput
                        country={'my'}
                        value={phoneNumber}
                        onChange={handleChange}
                        inputClass="custom-phone-input"
                        inputProps={{
                            required: true,
                        }}
                        />
                        <div className='flex gap-5'>
                            <div className='flex flex-col'>
                                <label>City</label>
                                <input 
                                    type="text"
                                    name='city'
                                    className='border border-black p-2 w-[286px]'
                                    value={profileValue.city}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label>State</label>
                                <input 
                                    type="text"
                                    name='state'
                                    className='border border-black p-2 w-[286px]'
                                    value={profileValue.state}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}