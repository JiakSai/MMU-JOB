import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { Job } from './companySearch-Components/job';
import { About } from './companySearch-Components/about';

const CompanyProfile = () => {
    const [showCompany, setShowCompany] = useState([]);
    const [activeTab, setActiveTab] = useState('About');

    useEffect(() => {
        axios.get('http://localhost:8000/api/ShowPost')
            .then(response => {
                setShowCompany(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    // Conditional rendering for cover image and company details
    const coverImage = showCompany.length > 0 ? showCompany[0].company.cover : '';
    const companyLogo = showCompany.length > 0 ? showCompany[0].company.logo : '';
    const companyName = showCompany.length > 0 ? showCompany[0].company.name : '';
    
    return (
        <>
            <Header />
            <section className='mt-[100px] mb-[30px] mx-[250px]'>
                <div className='py-10 bg-gray-400 rounded-xl'>
                    {coverImage && <img className='w-full h-[190px]' src={coverImage} alt="Company Cover" />}
                </div>
                <div className='mt-4 flex justify-between items-center'>
                    <div>
                        {companyLogo && <img className='w-20 h-20 rounded-lg' src={companyLogo} alt="Company Logo" />}
                        {companyName && <p className='text-xl mt-2'>{companyName}</p>}
                        <div className='flex'>
                            <FaStar color='yellow' size={20} />
                            <FaStar color='yellow' size={20} />
                            <FaStar color='yellow' size={20} />
                            <FaStar color='yellow' size={20} />
                            <FaStar color='yellow' size={20} />
                            <div className='flex gap-1 ml-[10px]'>
                                <span>4.5 </span>
                                <span>total rate from </span>
                                <span>300 </span>
                                <span>reviews</span>
                            </div>
                        </div>
                    </div>
                    <button className='px-4 py-2 rounded-md border-2 font-semibold border-customBlue h-full text-customBlue text-lg'>
                        Write Reviews
                    </button>
                </div>
                <div className='flex gap-3 border-b border-black pb-2'>
                    <p
                        className={`cursor-pointer ${activeTab === 'About' ? 'border-b-2 border-blue-500 text-blue-500 mb-[-8px]' : ''}`}
                        onClick={() => setActiveTab('About')}
                    >
                        About
                    </p>
                    <p
                        className={`cursor-pointer ${activeTab === 'Job' ? 'border-b-2 border-blue-500 text-blue-500 mb-[-8px]' : ''}`}
                        onClick={() => setActiveTab('Job')}
                    >
                        Job
                    </p>
                    <p
                        className={`cursor-pointer ${activeTab === 'Reviews' ? 'border-b-2 border-blue-500 text-blue-500 mb-[-8px]' : ''}`}
                        onClick={() => setActiveTab('Reviews')}
                    >
                        Reviews
                    </p>
                </div>
                {activeTab === 'About' && <About />}
                {activeTab === 'Job' && <Job />}
                
                
            </section>
            <Footer />
        </>
    );
}

export default CompanyProfile;
