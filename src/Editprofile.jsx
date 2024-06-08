import React, { useState } from 'react';
import axios from 'axios';
import './Editinfo.css';

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyContact, setCompanyContact] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleCompanyAddressChange = (event) => {
        setCompanyAddress(event.target.value);
    };

    const handleCompanyContactChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value)) {
            setCompanyContact(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUserData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            companyName,
            companyAddress,
            companyContact
        };

        axios.post('http://localhost:3000/api/Editprofile', updatedUserData)
            .then(response => {
                console.log('Profile updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Profile update error:', error);
            });
    };

    return (
        <div className='profilediv'> 
            <div className='mainbox'>
                <div className='color'></div>
                <p style={{marginLeft:"20px", marginBottom:"0px", marginTop:"5%", fontSize:"19px", color:"grey"}}>Edit Profile</p>

                <div className='bio'>
                    <form onSubmit={handleSubmit}>
                        <h2 style={{marginBottom:"0px"}}>Personal Details</h2>
                        <div className='names'>
                            <h3>First Name</h3>
                            <h3 style={{ marginLeft: "52%"}}>Last Name</h3>
                        </div>
                        <div className='namebox'>
                            <input
                                type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                required
                            />
                            <input style={{ marginLeft: "20%"}}
                                type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
                                required
                            />
                        </div>
                        <div className='names'>
                            <h3>Email</h3>
                            <h3 style={{ marginLeft: "57.3%"}}>Contact Number</h3>
                        </div>
                        <div className='namebox'>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <input style={{ marginLeft: "20%"}}
                                type="text"
                                id="phone-number"
                                name="phone-number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                maxLength={10}
                                required
                            />
                        </div>
                        <br></br>
                        <h2 style={{marginBottom:"0px"}}>Company Details</h2>
                        <div className='names'>
                            <h3>Company Name</h3>
                            <h3 style={{ marginLeft: "47%"}}>Company Address</h3>
                        </div>
                        <div className='namebox'>
                            <input
                                type="text"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                                required
                            />
                            <input style={{ marginLeft: "20%"}}
                                type="text"
                                value={companyAddress}
                                onChange={handleCompanyAddressChange}
                                required
                            />
                        </div>

                        <div className='names'>
                            <h3>Company Contact</h3>
                        </div>

                        <input
                            type="text"
                            id="company-contact"
                            name="company-contact"
                            maxLength={10}
                            value={companyContact}
                            onChange={handleCompanyContactChange}
                            required
                            />

                            <button style={{ marginLeft: "16%", marginRight: "10px"}} type="button">Cancel</button>
                            <button type="submit">Update Profile</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

