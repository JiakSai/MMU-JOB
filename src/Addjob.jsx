import React, { useState, useTransition } from 'react';
import axios from 'axios';
import './addjob.css';

function Addjob() {
  const [jobposition, setJobPosition] = useState('');
  const [joblocation, setJobLocation] = useState('');
  const [companyname, setCompany] = useState('');
  const [jobtype, setJobType] = useState('Part-Time');
  const [jobdesc, setJobdesc] = useState('') //make another const for jobdesc

  // Setting the empty values to user's chosen values
  const handleJobPositionChange = (event) => {
    setJobPosition(event.target.value);
  };

  const handleJobLocationChange = (event) => {
    setJobLocation(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  // Submission handler
  const handleSubmit = (event) => { //also add alert popup that job has been posted
    event.preventDefault();
    
    // Clear form after finish editing job info
    setJobPosition('');
    setJobLocation('');
    setCompany('');
    setJobType('Part-Time');

    const jobData = {
      jobposition,
      joblocation,
      companyname,
      jobtype
    };

    axios.post('http://localhost:3000/api/Addjob', jobData) //send to api
      .then(response => {
        console.log('Job successfully Posted:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='addjobdiv'>

      <div className='createjobdiv'>
        <h1 style={{ fontFamily: "Arial", marginLeft: "15px" }}>Create Job</h1>

        <div className='addpic'>
          {/* Upload image div here */}
          <div className='image'>
            <p>
              Drop your file logo here<br />
              or<br />
              Browse from computer
            </p>
          </div>
          
          <div className='text'>
          <h2 style={{ fontFamily: "Arial", marginBottom:"0px"}}>Upload Logo</h2>
          <p style={{marginTop:"0px"}}>Insert your company logo to be seen by the jobseeker</p>
          </div>

        </div><br />

        <form onSubmit={handleSubmit}>
          <input
            className='inputs'
            placeholder='Enter Job Position'
            value={jobposition}
            onChange={handleJobPositionChange}
          />

          <input
            className='inputs'
            placeholder='Enter Location'
            value={joblocation}
            onChange={handleJobLocationChange}
          />

          <input
            className='inputs'
            placeholder='Enter Company'
            value={companyname}
            onChange={handleCompanyChange}
          />

          <select className='inputs' value={jobtype} onChange={handleJobTypeChange}>
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
          </select><br></br>

          <textarea className='descbox'></textarea><br></br>

          <button className='buttons' type='submit'>Post Job</button>
          <button className='buttons' type='button'>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Addjob;
