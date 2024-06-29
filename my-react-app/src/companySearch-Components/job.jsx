import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewJobAndApply from './viewJobAndApply';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Job({ company }) {
  const [showCompany, setShowCompany] = useState([]);
  const [showJob, setShowJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/ShowCompanyPosts/${company.id}`)
      .then(response => {
        console.log(response.data.posts);
        setShowCompany(Array.isArray(response.data.posts) ? response.data.posts : []);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [company.id]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleJobClick = (job) => {
    setShowJob(job);
  };

  return (
    <>
      <div className='flex items-center gap-1'>
        <p>{showCompany.length}</p><p> jobs</p><p> in </p><p>{company.name}</p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-auto-fit md:grid-rows-2 gap-6 mt-4'>
        {showCompany.length > 0 ? (
          showCompany.map((company, index) => (
            <div key={index} onClick={() => handleJobClick(company)} className='ml-4 w-[440px] px-8 py-4 border-b border-r border-black rounded shadow-xl flex flex-col justify-between cursor-pointer'>
              <div>
                <p className='text-xl font-semibold'>{company.jobTitle}</p>
                <p className='my-1'>{company.jobLocation} - {company.jobCategory}</p>
                <span className='text-sm text-neutral-700'>Job Description </span>
                <span className='text-sm text-neutral-700'>
                  {truncateText(company.description, 20)}
                </span>
              </div>
              <div className='flex justify-between mt-2'>
                <p className='text-sm text-neutral-500'>{company.time_ago} </p>
                <p className='text-sm text-neutral-500'>RM{company.minSalary} - RM{company.maxSalary}</p>
              </div>
            </div>
          ))
        ) : (
          Array.from({ length: 4 }, (_, index) => (
            <div key={index} className='ml-4 w-[440px] px-8 py-4 border-b border-r border-black rounded shadow-xl flex flex-col justify-between'>
              <Skeleton height={40} />
              <Skeleton height={20} width='80%' className='my-1' />
              <Skeleton height={20} width='90%' />
              <Skeleton height={20} width='70%' />
              <Skeleton height={20} width='60%' />
            </div>
          ))
        )}
      </div>
      {
        showJob && (
          <ViewJobAndApply
            job={showJob}
            justClose={() => setShowJob(null)}
            company={company}
          />
        )
      }
    </>
  );
}
