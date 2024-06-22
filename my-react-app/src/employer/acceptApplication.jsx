import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ViewApplyDetails from "./viewApplyDetails";
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function AcceptApplication() {
    const [selectApply, setSelectApply] = useState(null);
    const [applyList, setApplyList] = useState([]);
    const navigate = useNavigate();
    const token = Cookies.get('empToken');
    
    useEffect(() => {
        if (!token) {
            navigate('/employerLogin');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ShowAcceptedApplications', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setApplyList(response.data.data); 
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <section>
            <div className="flex flex-col space-y-2">
                {applyList.length > 0 ? (
                    applyList.map((apply) => (
                        <div 
                            onClick={() => setSelectApply(apply)}
                            key={apply.id} 
                            className="flex justify-between items-center border border-neutral-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                {apply.user.profilePic ? (
                                    <img 
                                        src={apply.user.profilePic} 
                                        alt="Profile" 
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <HiOutlineUserCircle size={48} className="text-gray-500"/>
                                )}
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-xl font-semibold">{apply.post.jobTitle}</h2>
                                    <p className="text-md text-gray-600 uppercase">{apply.user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <p className="text-lg text-gray-500">{new Date(apply.created_at).toLocaleDateString()}</p>
                                <span className="bg-green-500 text-white px-4 py-2 rounded-md"> {apply.status}</span>
                                <button className="bg-customPink text-white px-4 py-2 rounded-md">View</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
                        <HiOutlineUserCircle size={72} className="mb-4"/>
                        <p className="text-lg font-semibold">No Rejected Applications</p>
                        <p className="text-md">There are no applications that have been rejected yet.</p>
                    </div>
                )}
            </div>
            {selectApply && (
                <ViewApplyDetails 
                    apply={selectApply} 
                    justClose={() => setSelectApply(null)} 
                    onclose={() => { setSelectApply(null); window.location.reload(); }} 
                />
            )}
        </section>
    );
}
