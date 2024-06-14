import { useEffect, useState } from 'react';
import { IoBookmarkOutline } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import JobDetails from "./jobDetails.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import jobsearch from '/src/photo/jobSearch.png';
import axios from 'axios';

export default function JobList() {
  const [showJob, setShowJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/ShowPost')
      .then(response => {
        setShowJob(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="showJob">
      <div className="allJob">
      <div className="jobQty">
        <p>500 jobs</p>
        <p className="flex items-center">Sorted by relevance <LiaAngleDownSolid /></p>
      </div>
      {showJob.length > 0 ? (
        showJob.map((job, index) => (
          <div key={index} className="jobList" onClick={() => handleJobClick(job)}>
            <div className="jobListTop">
               <img src={job.company.logo} alt="company logo" className="jobLogo" />
              <div>
                <h4>{job.jobTitle}</h4>
                <p>{job.company.name}</p>
              </div>
              <IoBookmarkOutline className="icon" />
            </div>
            <div>
              <p>{job.jobType} | {job.locationType} | {job.jobLocation}</p>
              <div className="jobListBottom">
                <p>{job.time_ago}</p>
                <p>RM{job.salary}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
      {selectedJob ?
        <JobDetails job={selectedJob}/>
        :
        <div className='jobDetails'>
          <div className='py-8 px-8'>
              <h1 className='flex items-center gap-4 text-2xl font-semibold'><FaArrowLeftLong className='text-3xl'/>Select a job</h1>
              <p className='ml-[45px] mt-[8px]'>Display job details here!!</p>
              <div className='grid place-content-center w-full mt-[120px]'>
                <img src={jobsearch} alt="job search" className="w-[200px] h-[220px]" />
              </div>
          </div>
          
        </div>
      }
    </div>
    
  );
}
