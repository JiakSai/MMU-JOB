import { useEffect, useState } from 'react';
import { IoBookmarkOutline } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import JobDetails from "../jobDetails.jsx";
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
               <img src={`http://localhost:8000/images/company/${job.company.logo}`} alt="company logo" className="jobLogo" />
              <div>
                <h4>{job.job_title}</h4>
                <p>{job.company.name}</p>
              </div>
              <IoBookmarkOutline className="icon" />
            </div>
            <div>
              <p>{job.job_type} | on-site | {job.job_location}</p>
              <div className="jobListBottom">
                <p>{job.created_at}</p>
                <p>RM{job.salary}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
      {selectedJob && <JobDetails job={selectedJob} />}
    </div>
    
  );
}
