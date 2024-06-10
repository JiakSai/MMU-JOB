import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Cookies from 'js-cookie';
import Footer from "./Footer.jsx";
import uploadCloud from './photo/uploadCloud.png';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import registerPhoto from './photo/Messy.svg';
import { useNavigate } from "react-router-dom";

function FinishSign() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("No selected file");
  const [showFileInput, setShowFileInput] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [post, setPost] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    nationality: '',
    major: '',
    resume: null, 
    state: '',
    city: '',
    _method: 'PATCH'
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
    if (!showFileInput) {
      setPost({ ...post, resume: null });
      setFileName("No selected file");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const containerStyle = () => {
    return showFileInput ? 'h-[1000px] mt-[50px]' : 'h-[600px] mt-[50px]';
  };

  const genders = ["Male", "Female", "Other"];

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (valid) {
        const token = Cookies.get('token');
        console.log(token);
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/UserFinishSignup', post, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            if (response.status === 200) {
                navigate('/SearchJob');
            }
        } 
        catch (error) {
            console.error('AxiosError', error);
            if (error.response && error.response.data) {
                console.log('Validation Errors:', error.response.data);
            }
        }
    } else {
        console.log("Invalid phone number");
    }
};

  const [api, setApi] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/JobCategories')
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
            <h1 className="text-[28px] font-bold text-customBlue">Almost done</h1>
            <p>Fill in this form to complete your account.</p>
            <form className="finishSignForm space-y-4 flex flex-col mt-[60px]" encType="multipart/form-data" onSubmit={handleSubmit}>
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
              <div className="relative">
                <select
                  name="gender"
                  value={post.gender}
                  onChange={handleInput}
                  className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                  required>
                  <option value="" disabled className="hidden"></option>
                  {genders.filter(exp => exp).map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                <label
                  className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.gender ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                  gender
                </label>
              </div>
              {["nationality", "state", "city"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    type="text"
                    name={field}
                    value={post[field] || ''}
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
                  name="major"
                  value={post.major}
                  onChange={handleInput}
                  className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                  required>
                  <option value="" disabled className="hidden"></option>
                  <option value="kicap" >Kicap</option>
                  {api.map((major, index) => (
                    <option key={index} value={major.name}>
                      {major.name}
                    </option>
                  ))}
                </select>
                <label
                  className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.major ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                  Major
                </label>
              </div>
              <div className="flex">
                <input type="checkbox" onChange={handleCheckboxChange} />
                <label htmlFor="hideFileInput">I don't have a resume</label>
              </div>
              {showFileInput && (
                <>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-black h-[300px] w-full cursor-pointer mt-[5px]" 
                    onClick={() => document.querySelector(".input-field").click()}>
                    <input type="file"className="input-field hidden"
                      onChange={handleFileChange} 
                    />
                    <img src={uploadCloud} alt="Upload Icon" className="w-28 h-28" />
                    <p className="font-bold">Upload Your Resume</p>
                    <p>Support file type: .pdf</p> 
                  </div>
                  <div className="flex items-center ">
                    <FaFileAlt />
                    <span className="flex items-center justify-between w-full"> 
                      {fileName}
                      <RiDeleteBin6Line onClick={() => { setFileName("No selected file"); setPost({ ...post, resume: null }); }} />
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
            className={` w-[730px] ml-[40px] ${containerStyle()}`}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FinishSign;
