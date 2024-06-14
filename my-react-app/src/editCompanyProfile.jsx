import React, { useEffect, useState } from 'react';
import EmployerHeader from './employerHeader';
import EmployerFooter from './employerFooter';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdModeEdit } from "react-icons/md";
import { EditCp } from './editCp';

const EditComProfile = () => {
    const [showEcp, setShowEcp] = useState(false);
    const [company, setCompany] = useState({
        company: {
            logo: '',
            cover: '',
            name: '',
            website: '',
            location: '',
            category: '',
            companySize: '',
            benefits: '',
            description: ''
        }
    });
    useEffect(() => {
      if (showEcp) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
  }, [showEcp]);
    
    const handleShowEcp = () => {
      setShowEcp(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get('http://localhost:8000/api/ShowCompanyProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setCompany(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <EmployerHeader />
            <section className='mt-[100px] mb-[30px] mx-[120px] flex flex-col items-center bg-white pb-8'>
                <div className='companyCover relative'>
                    {company.company.cover && 
                    <img src={company.company.cover} alt='Company Cover' className='w-full h-[200px]' />
                    }
                    <div className='content'>
                        <img  src={company.company.logo || 'https://via.placeholder.com/180/E5E4E2'} alt='Company Logo' className='rounded-full h-[180px] w-[180px] border-black' />
                    </div>
                </div>
                <div className='w-[1210px] '>
                    <p onClick={handleShowEcp} className='mt-[80px] text-xl text-stone-400 font-semibold'>Edit company details</p>
                </div>
                <div className='companyContent border border-zinc-500 w-[1210px] p-8 flex flex-col gap-4'>
                    <div className='flex space-x-24'>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Name</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.name}</p>
                              <MdModeEdit onClick={handleShowEcp} size={25}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Website</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.website}</p>
                              <MdModeEdit onClick={handleShowEcp} size={25}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-x-24'>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Location</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.location}</p>
                              <MdModeEdit onClick={handleShowEcp}  size={25}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Category</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.category}</p>
                              <MdModeEdit onClick={handleShowEcp}  size={25}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-x-24'>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Size</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.companySize}</p>
                              <MdModeEdit onClick={handleShowEcp}  size={25}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-base font-semibold text-neutral-700 mb-1'>Company Benefits</p>
                            <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.benefits}</p>
                              <MdModeEdit onClick={handleShowEcp}  size={25}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-base font-semibold text-neutral-700 mb-1'>Company description</p>
                        <div className='items-center flex gap-4'>
                              <p className='border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 '>{company.company.description}</p>
                              <MdModeEdit onClick={handleShowEcp}  size={25}/>
                            </div>
                    </div>
                </div>
                {showEcp &&
                    <EditCp justClose={() => setShowEcp(false)} company={company} 
                    onClose={() => { setShowEcp(false); window.location.reload(); }}/>
                }
            </section>
            <EmployerFooter />
        </>
    );
};

export default EditComProfile;
