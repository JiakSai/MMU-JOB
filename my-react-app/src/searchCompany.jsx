import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { GoSearch } from "react-icons/go";
import search from './photo/searchBar.svg';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const SearchCompany = () => {
    const [showCompany, setShowCompany] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1100);
        return () => clearTimeout(timer);
    }, []);

    const handleCompanyClick = (company) => {
        const type = 'About';
        navigate('/companyProfile', {state: {company, type}});
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/ShowCompany')
          .then(response => {
            setShowCompany(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

      if (loading) { 
        return ( 
            <> 
                <div className="loader"></div> 
                <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customBlue'>
                    " MMUJOB "</p> 
                </div> 
            </> 
        ); }
    return (
        <>
            <Header />
            <section className='mt-[70px] mx-[120px] mb-[100px] min-h-[400px]'>
                <div className='companySearch mx-[-120px]'>
                    <div className='px-[120px] py-8 flex items-center'>
                        <div className='flex flex-col items-center gap-3'>
                            <div className='flex flex-col items-center'>
                                <p className='font-extrabold text-4xl text-white'>DISCOVER YOUR FUTURE</p>
                                <p className='font-extrabold text-4xl text-white'>COMPANY</p>
                            </div>
                            <p className='text-lg font-medium text-slate-500'>Everything you need to know about a company, all in one place</p>
                            <div className='relative'>
                                <input 
                                    type="text" 
                                    placeholder='Search by company name'
                                    className='h-[45px] w-[510px] rounded-md px-12'
                                />
                                <div className='absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center border rounded border-black justify-center h-[30px] w-[30px]'>
                                    <GoSearch className='h-[20px] w-[20px]' />
                                </div>
                            </div>
                        </div>
                        <img className='w-64 h-52 ml-28' src={search} alt="Search" />
                    </div>
                </div>
                {showCompany.map((company, index) => ( 
                    <div key={index} onClick={() => handleCompanyClick(company)}>
                            <div className='flex items-center py-4 border-b border-black justify-between'>
                                <div className='flex items-center'>
                                    <img src={company.company.logo} alt="company logo" className='h-[75px] w-[75px] rounded-md' />
                                    <p className='font-medium text-2xl ml-8'>{company.company.name}</p>
                                </div>
                                <div className='flex items-center mr-8'>
                                    <FaStar color='yellow' size={35}/>
                                    <div className='ml-6'>
                                        <span className='font-extralight text-2xl'>4.5</span><span className='text-2xl font-bold'>·</span><span className='font-extralight text-2xl'>300 reviews</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    );
}

export default SearchCompany;
