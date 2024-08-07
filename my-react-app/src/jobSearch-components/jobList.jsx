import React, { useEffect, useState } from 'react';
import { IoBookmarkOutline, IoSearchSharp } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import JobDetails from "./jobDetails.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import jobsearch from '/src/photo/jobSearch.png';

const JobList = () => {
  const [showJob, setShowJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Date'); // Default sort by date

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    setLoading(true);
    const params = serializeFormQuery(searchParams);
    console.log('params:', params);

    axios.get(`http://localhost:8000/api/SearchAndFilter${params ? `?${params}` : ''}`)
      .then(response => {
        if (response.data.length === 0) {
          setErrorMessage('No jobs found for the given location.');
          setShowJob([]);
        } else {
          let sortedJobs = [...response.data];

          if (sortBy === 'Salary') {
            sortedJobs.sort((a, b) => b.maxSalary - a.maxSalary); // Sort by maxSalary descending
          } else if (sortBy === 'Date') {
            sortedJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date descending
          }

          setShowJob(sortedJobs);
          setErrorMessage('');
          console.log('Job data fetched successfully:', sortedJobs);
        }
      })
      .catch(error => {
        setErrorMessage('No jobs match your search..');
        showJob.length = 0;
        console.error('Error fetching job data:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [searchParams, sortBy]);

  const toggleSort = () => {
    const newSortBy = sortBy === 'Date' ? 'Salary' : 'Date';
    setSortBy(newSortBy);
  };

  const serializeFormQuery = (formData) => {
    // Filter out empty parameters
    const filteredParams = {};
    for (const [key, value] of formData.entries()) {
      if (value !== "" && value !== "undefined" && value !== "null") {
        filteredParams[key] = value;
      }
    }
    return new URLSearchParams(filteredParams).toString();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
};

  return (
    <div className="showJob">
      <div className="allJob">
        <div className="jobQty">
          <p>{showJob.length} jobs</p>
          <p className="flex items-center cursor-pointer" onClick={toggleSort}>
            Sorted by {sortBy === 'Date' ? 'Date' : 'Salary'} <LiaAngleDownSolid />
          </p>
        </div>
        {loading ? (
          <div className="loadingContainer flex flex-col mt-[200px] items-center">
            <Oval height={40} width={50} color="#2471A3" secondaryColor="#FFFFFF" visible={true} />
          </div>
        ) : errorMessage ? (
          <div className="jobList flex flex-col justify-center items-center">
            <IoSearchSharp size={50}/>
            <p className='text-lg font-semibold'>{errorMessage}</p>
            <p className='mt-2 text-sm'> We couldn't find anything that matched your search.
              Try adjusting the filters or check for spelling errors.</p>
          </div>
        ) : showJob.length > 0 ? (
          showJob.map((job, index) => (
            <div key={index} className="jobList cursor-pointer" onClick={() => handleJobClick(job)}>
              <div className="jobListTop">
                {
                  job.company.logo ? (
                    <img src={job.company.logo} alt="company logo" className="jobLogo" />
                  )
                  :
                  <div className='h-[50px] w-[50px] rounded-lg bg-sky-100 flex items-center justify-center text-xl font-bold text-customBlue'>
                      {getInitials(job.company.name)}
                  </div>
                }
                <div>
                  <h4>{job.jobTitle}</h4>
                  <p>{job.company.name} - {job.jobCategory}</p>
                </div>
              </div>
              <div>
                <p>{job.jobType} | {job.locationType} | {job.jobLocation}</p>
                <div className="jobListBottom">
                  <p>{job.time_ago}</p>
                  <p>RM{job.minSalary}-RM{job.maxSalary}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="jobList flex flex-col justify-center items-center">
            <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className='text-2xl font-bold mt-1'>No jobs available</p>
          </div>
        )}
      </div>
      {selectedJob ? (
        <JobDetails job={selectedJob}/>
      ) : (
        <div className='jobDetails'>
        <div className='py-8 px-8'>
            <h1 className='flex items-center gap-4 text-2xl font-semibold'><FaArrowLeftLong className='text-3xl'/>Select a job</h1>
            <p className='ml-[47px] mt-[8px]'>Display job details here!!</p>
            <div className='grid place-content-center w-full mt-[120px]'>
              <img src={jobsearch} alt="job search" className="w-[200px] h-[220px]" />
            </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default JobList;
