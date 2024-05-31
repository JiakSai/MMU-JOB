import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Footer from "./Footer.jsx";
import uploadCloud from './photo/uploadCloud.png';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import registerPhoto from './photo/MoshingDoodle (1).png';

function FinishSign() {
  const [fileName, setFileName] = useState("No selected file");
  const [showFileInput, setShowFileInput] = useState(true);
  const [showExpInput, setShowExpInput] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [post, setPost] = useState({
    name: '',
    phoneNumber: '',
    Address: '',
    Nationality: "",
    jobCategory: '',
    workExp: '',
    resume: '',
  });

  const handleChange = (value) => {
    setPhoneNumber(value);
    setPost({ ...post, phoneNumber: value });
    setValid(validatePhoneNumber(value));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setPost({ ...post, resume: file }); 
    setFileName(file.name); 
  };

  const handleCheckboxChange = () => {
    setShowFileInput(!showFileInput);
  };

  const handleExpCheckboxChange = () => {
    setShowExpInput(!showExpInput);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const containerStyle = () => {
    if (showFileInput && showExpInput) {
      return 'h-[850px] mt-[120px]';
    } else if (showFileInput) {
      return 'h-[850px] mt-[90px]';
    } else if (showExpInput) {
      return 'h-[600px] mt-[50px]';
    } else {
      return 'h-[580px] mt-[35px]';
    }
  };

  const experiences = ["Intern", "1 to 3 Years of Experience", "4 to 7 Years of Experience", "8 to 10 Years of Experience", "Over 10 Years of Experience"];

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (valid) {
      axios.post('http://localhost:8000/api/UserRegister', post)
        .then(response => {
          console.log(response);
          console.log(post);
        })
        .catch(error => {
          console.log(error);
          console.log(post);
        });
    } else {
      console.log("Invalid phone number");
    }
  };

  const [api, setApi] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/job-categories')
      .then(data => data.json())
      .then(val => setApi(val));
  }, []);

  return (
    <>
      <section>
        <div className="LoginRegisterTop">
          <h1 className="logoUser">" MMUJOB "</h1>
        </div>
        <div className="finishSignContainer">
          <div className="bg-white w-[560px] py-[30px] px-[30px] h-fit">
            <h1 className="text-[28px] font-bold text-gray-900">Almost done</h1>
            <p>Fill in this form to complete your account.</p>
            <form className="finishSignForm space-y-4 flex flex-col mt-[60px]" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-2 rounded"
                  value={post.name}
                  onChange={handleInput}
                />
                <label className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.name ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    Name
                </label>
              </div>
              <div className="relative">
                <PhoneInput
                  country={'my'}
                  value={phoneNumber}
                  onChange={handleChange}
                  inputClass="custom-phone-input"
                  inputProps={{
                    required: true,
                  }}
                />
                <label className={`input-text absolute left-20 top-2 transition-all duration-200 transform origin-0 ${post.phoneNumber ? 'top-[-11px] left-[8px] text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                  Phone Number
                </label>
                {!valid && (
                  <p>Please enter a valid phone number.</p>
                )}
              </div>
              {["Nationality", "Address", "State", "City"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    type="text"
                    name={field}
                    value={post[field]}
                    required
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-2 rounded"
                    onChange={handleInput}
                  />
                  <label
                    htmlFor={field}
                    className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post[field] ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}
              <div className="relative">
                <select
                  name="jobCategory"
                  value={post.jobCategory}
                  onChange={handleInput}
                  className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                  required>
                  <option value="" disabled className="hidden"></option>
                  {api.map((jobCategory, index) => (
                    <option key={index} value={jobCategory.name}>
                      {jobCategory.name}
                    </option>
                  ))}
                </select>
                <label
                  className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.jobCategory ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                  Major
                </label>
              </div>
              <div className="flex">
                <input type="checkbox" onChange={handleExpCheckboxChange} />
                <label htmlFor="hideExpInput">I'm a fresh graduate/ student</label>
              </div>
              {showExpInput && (
                <div className="relative">
                  <select
                    name="workExp"
                    value={post.workExp}
                    onChange={handleInput}
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                    required>
                    <option value="" disabled className="hidden"></option>
                    {experiences.filter(exp => exp).map((experience, index) => (
                      <option key={index} value={experience}>
                        {experience}
                      </option>
                    ))}
                  </select>
                  <label
                    className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.workExp ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    Work Experience
                  </label>
                </div>
              )}
              <div className="flex">
                <input type="checkbox" onChange={handleCheckboxChange} />
                <label htmlFor="hideFileInput">I don't have a resume</label>
              </div>
              {showFileInput && (
                <>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-black h-[300px] w-full cursor-pointer mt-[5px]" 
                    onClick={() => document.querySelector(".input-field").click()}>
                    <input type="file" accept="image/*,application/pdf" className="input-field hidden"
                      onChange={handleFileChange} 
                    />
                    <img src={uploadCloud} alt="Upload Icon" className="w-28 h-28" />
                    <p className="font-bold">Upload Your Resume</p>
                    <p>Support file type: .pdf, .doc, .docx</p>
                  </div>
                  <div className="flex items-center ">
                    <FaFileAlt />
                    <span className="flex items-center justify-between w-full"> 
                      {fileName}
                      <RiDeleteBin6Line onClick={() => { setFileName("No selected File"); }} />
                    </span>
                  </div>
                </>
              )}
              <button type="submit" className="px-4 py-2 bg-black text-white rounded w-full">
                Save And Continue
              </button>
            </form>
          </div>
          <img
            src={registerPhoto}
            alt="Login"
            className={` w-[850px] ml-[-20px] ${containerStyle()}`}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FinishSign;
