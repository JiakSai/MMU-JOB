import React, { useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { Job } from './companySearch-Components/job';
import { About } from './companySearch-Components/about';
import { useLocation } from 'react-router-dom';
import { AddReview } from './companySearch-Components/addReview';
import { Review } from './companySearch-Components/review';

const CompanyProfile = () => {
    const location = useLocation();
    const company = location.state?.company;
    const type = location.state?.type;
    const [showCompany, setShowCompany] = useState([]); 
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'About' || type);
    const [showReview, setShowReview] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showReview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showReview]);

    useEffect(() => {
        if (company?.company?.id) {
            axios.get(`http://localhost:8000/api/ShowCompanyDetails/${company.company.id}`)
                .then(response => {
                    setShowCompany(response.data);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setLoading(false); 
        }
    }, [company?.company?.id]);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
        window.scrollTo({ top: 300, behavior: "smooth" });
    }, [activeTab]);

    if (!company) {
        return (
            <>
                <Header />
                <div className='flex justify-center items-center h-screen'>
                    <p className='text-3xl font-bold text-customBlue'>
                        "No Company Data Available"
                    </p>
                </div>
                <Footer />
            </>
        );
    }0
    

    if (loading) { 
        return ( 
            <> 
                <div className="loader"></div> 
                <div className='flex justify-center mt-[630px]'> 
                    <p className='text-3xl font-bold text-customBlue'>" MMUJOB "</p> 
                </div> 
            </> 
        ); 
    }

    const { cover, logo, name, rating, totalRatings } = showCompany;
    
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('');
    };

    return (
        <>
            <Header />
            <section className='mt-[100px] mb-[30px] mx-[250px]'>
                {cover ? (
                    <div className='py-10 bg-neutral-300 rounded-t-3xl shadow-lg shadow-neutral-400'>
                        <img className='w-full h-[190px] object-cover rounded-t-3xl' src={cover} alt="Company Cover" />
                    </div>
                ) : (
                    <div className='py-10 h-[190px] bg-neutral-300 rounded-t-3xl shadow-lg shadow-neutral-400 flex items-center justify-center'>
                        <p className='text-xl text-gray-500'>No cover image available</p>
                    </div>
                )}
                <div className='mx-5'>
                    <div className='mt-4 flex justify-between items-center'>
                        <div className='flex flex-col space-y-1'>
                            {logo ? (
                                <img className='h-20 max-w-44 rounded-lg' src={logo} alt="Company Logo"/>
                            ) : (
                                <div className='h-20 w-20 rounded-lg bg-sky-100 flex items-center justify-center text-xl font-bold text-customBlue'>
                                    {getInitials(name)}
                                </div>
                            )}
                            {name && <p className='text-3xl font-bold mt-1'>{name}</p>}
                            <div className='flex'>
                                {[...Array(5)].map((star, index) => (
                                    <FaStar key={index} color={index < rating ? 'yellow' : 'gray'} size={24} />
                                ))}
                                <div className='flex gap-1 ml-[10px] text-gray-800 text-lg'>
                                    <span>{rating || "N/A"}</span>
                                    <span>total rate from </span>
                                    <span>{totalRatings || 0}</span>
                                    <span>reviews</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => { setShowReview(true) }} className='px-4 py-2 rounded-md border-2 font-semibold border-customBlue h-full text-customBlue text-lg'>
                            Write Reviews
                        </button>
                    </div>
                    <div className='flex gap-3 border-b border-neutral-600 pb-2 mt-8 mb-10'>
                        <p
                            className={`cursor-pointer ${activeTab === 'About' ? 'text-xl border-b-2 border-customBlue text-customBlue mb-[-8px] font-semibold' : 'text-xl text-gray-700'}`}
                            onClick={() => setActiveTab('About')}
                        >
                            About
                        </p>
                        <p
                            className={`cursor-pointer ${activeTab === 'Job' ? 'text-xl border-b-2 border-customBlue text-customBlue mb-[-8px] font-semibold' : 'text-xl text-gray-700'}`}
                            onClick={() => setActiveTab('Job')}
                        >
                            Job
                        </p>
                        <p
                            className={`cursor-pointer ${activeTab === 'Reviews' ? 'text-xl border-b-2 border-customBlue text-customBlue mb-[-8px] font-semibold' : 'text-xl text-gray-700'}`}
                            onClick={() => setActiveTab('Reviews')}
                        >
                            Reviews
                        </p>
                    </div>
                    {activeTab === 'About' && <About company={showCompany} />}
                    {activeTab === 'Job' && <Job company={showCompany} />}
                    {activeTab === 'Reviews' && <Review company={showCompany} />}
                    {showReview &&
                        <AddReview
                            company={showCompany}
                            justClose={() => { setShowReview(false); }}
                            onClose={() => { setShowReview(false); window.location.reload(); }}
                        />
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}

export default CompanyProfile;
