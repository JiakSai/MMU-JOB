import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function Testing(){
    const [roleValues, setRoleValues] = useState([]);

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
            setRoleValues(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        console.log('RoleValues:', roleValues); // Log roleValues to see its contents
    }, [roleValues]); // Add roleValues as a dependency to the useEffect hook

    return(
        <div>
            {/* Check if roleValues is an array before mapping over it */}
            {Array.isArray(roleValues.experience) && roleValues.experience.length > 0 ? (
                roleValues.experience.map((experience, index) => (
                    <div key={index}>
                        <p>Job Title: {experience.title}</p>
                        <p>Job Type: {experience.jobType}</p>
                        <p>Company: {experience.companyName}</p>
                        {/* Add other properties as needed */}
                    </div>
                ))
            ) : (
                <p>No experience data available</p>
            )}
        </div>
    );
}
