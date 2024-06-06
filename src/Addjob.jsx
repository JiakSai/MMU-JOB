import React, { useState } from 'react';
import axios from 'axios';
import './addjob.css';

const UploadAndDisplayImage = ({ handleImageSelection, resetImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    handleImageSelection(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    resetImage();
  };

  return (
    <div>
      {selectedImage && (
        <div className='image'>
          <img alt="not found" height={"100px"} width={"100px"} src={URL.createObjectURL(selectedImage)} />
          <br /> <br />
          <button onClick={handleRemoveImage}>Remove</button>
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={handleFileChange}
      />
    </div>
  );
};

function Addjob() {
  const [jobposition, setJobPosition] = useState('');
  const [joblocation, setJobLocation] = useState('');
  const [companyname, setCompany] = useState('');
  const [jobtype, setJobType] = useState('Part-Time');
  const [jobdesc, setJobDesc] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

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

  const handleJobDescChange = (event) => {
    setJobDesc(event.target.value);
  };

  const handleImageSelection = (image) => {
    setUploadedImage(image);
  };

  const resetImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const jobData = {
      jobposition,
      joblocation,
      companyname,
      jobtype,
      jobdesc
    };

    // Add image data if uploaded
    if (uploadedImage) {
      jobData.image = uploadedImage;
    }

    setJobPosition('');
    setJobLocation('');
    setCompany('');
    setJobType('Part-Time');
    setJobDesc('');
    setUploadedImage(null);

    axios.post('http://localhost:3000/api/Addjob', jobData)
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
          <div className='image'>
            <UploadAndDisplayImage handleImageSelection={handleImageSelection} resetImage={resetImage} />
            <p>
            Drop your logo files here<br></br>
            or<br></br>
            Browse from Computer
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
          <textarea
            className='descbox'
            placeholder='Enter Job Description'
            value={jobdesc}
            onChange={handleJobDescChange}
          ></textarea><br></br>
          <button className='buttons' type='submit'>Post Job</button>
          <button className='buttons' type='button'>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Addjob;
