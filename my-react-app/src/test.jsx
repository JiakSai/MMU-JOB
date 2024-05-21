import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListUser() {
    const [api, setApi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/job-categories')
            .then(response => {
                console.log('API Response:', response.data); // Log the API response
                setApi(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!api || api.length === 0) {
        return <div>No job categories found.</div>;
    }

    return (
       <div style={{ color: 'black' }}>
        {api.map((jobCategory, index) => (
            <div key={index} style={{ padding: '10px', border: '1px solid black' }}>
                <div className='jobT'>
                    <input type="checkbox" />
                    <span>{jobCategory.name || 'No Name Provided'}</span>
                </div>
            </div>
        ))}
       </div>
    );
}
