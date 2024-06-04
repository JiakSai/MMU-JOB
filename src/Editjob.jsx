import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Editjob() {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [jobPosition, setJobPosition] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Part-time');
  const [description, setDescription] = useState('');

  const handleDivClick = (index) => {
    setSelectedDiv(index);
  };

  const deleteDiv = (del) => {
    const div = del.target.closest('.testbox');
    if (div) {
      div.remove();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const jobData = {
      jobPosition,
      location,
      jobType,
      description
    };

    axios.post('http://localhost:3000/api/Editjob', jobData)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='editjobdiv'>
      <div className='sidelist'>
        {['*Job Name* 1', '*Job Name* 2', '*Job Name* 3', '*Job Name* 4'].map((job, index) => (
          <div
            key={index}
            className={`testbox ${selectedDiv === index ? 'selected' : ''}`}
            onClick={() => handleDivClick(index)}
          >
            <button className='delbutt' onClick={(e) => { e.stopPropagation(); deleteDiv(e); }}>Delete Job</button><br></br>
            <h2>{job}</h2>
            <p>*Location here*</p>
            <p>*Job type*</p>
            <p>*Job department*</p>
          </div>
        ))}
      </div>

      <div className='editbox'>
        <h1>Edit Job Details</h1><br></br>
        <form onSubmit={handleSubmit}>
          <input
            className='jobposition'
            type="text"
            placeholder='New job position'
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
          />
          <input
            className='location'
            type="text"
            placeholder='New Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /><br />

          <select
            className='jobtypes'
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option>Part-time</option>
            <option>Full-Time</option>
            <option>Internship</option>
          </select><br></br>

          <textarea
            className='desc'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>

          <button className='savebutton'>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Editjob;
