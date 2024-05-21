import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/test');
                console.log('Response data:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };
  
        fetchData();
    }, []);

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {data && (
                <ul>
                    <li>{data.message}</li>
                    <li>{data['another message']}</li>
                </ul>
            )}
        </div>
    );
}
