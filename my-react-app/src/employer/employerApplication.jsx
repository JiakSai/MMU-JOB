import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EmployerHeader from "./employerHeader";
import EmployerFooter from "./employerFooter";
import { useNavigate } from "react-router-dom";
import ViewApplyDetails from "./viewApplyDetails";
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function EmployerApplication() {
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
                const response = await axios.get('http://localhost:8000/api/ShowApplications', {
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
        <>
            <EmployerHeader />
            <section className="mt-[100px] mb-[30px] mx-[120px]">
                <div className="flex flex-col space-y-2">
                    {applyList.map((apply) => (
                        <div 
                            onClick={() => setSelectApply(apply)}
                            key={apply.id} className="flex justify-between items-center border border-neutral-800 p-4 rounded">
                            <div className="flex gap-5">
                                {apply.user.profilePic ?
                                    <img src={apply.user.profilePic} alt="" />
                                    :
                                    <HiOutlineUserCircle size={52}/>
                                }
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-xl font-bold">{apply.post.jobTitle}</h2>
                                    <p>{apply.user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className=" bg-stone-300 text-white px-6 py-2 rounded-md"> {apply.status}...</span>
                                <button className="bg-customPink text-white px-6 py-2 rounded-md">View</button>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    selectApply&&
                    <ViewApplyDetails apply={selectApply} 
                    justClose={() => setSelectApply(null)} 
                    onclose={() => {setSelectApply(null), window.location.reload()}}
                    />
                }
            </section>
            <EmployerFooter />
        </>
    );
}
