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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [post, setPost] = useState({
    name: '',
    phoneNumber: '',
    Address: '',
    Nationality: "",
    jobCategory: '',
  });

  const handleChange = (value) => {
    setPhoneNumber(value);
    setPost({ ...post, phoneNumber: value });
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

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
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Invalid phone number");
    }
  };

  const [api,setApi] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/job-categories').then(data => data.json()).then(val => setApi(val));
    console.log(api);
  }, []);

  return (
    <>
      <section>
      <div className='LoginRegisterTop'><h1 className='logo'>" MMUJOB "</h1> </div>
        <div className="finishSignContainer">
          <div className="bg-white w-[560px] py-[30px] px-[30px]">
            <h1 className="text-[25px] font-bold text-gray-900">Almost done</h1>
            <p>Fill in this form to complete your account.</p>
            <form className="finishSignForm  flex flex-col mt-[60px]" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-2 rounded mb-[10px]"
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
                <label className={`input-text absolute left-20 top-2  transition-all duration-200 transform origin-0 ${post.phoneNumber ? 'top-[-11px] left-[8px] text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    Phone Number
                </label>
                {!valid && (
                    <p>Please enter a valid phone number.</p>
                )}
            </div>
              {["Nationality","Address"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    type="text"
                    name={field}
                    value={post[field]}
                    required
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-2 rounded mt-[10px]"
                    onChange={handleInput}
                  />
                  <label
                    htmlFor={field}
                    className={`input-text absolute left-2 top-2  transition-all duration-200 transform origin-0 ${post[field] ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}
              <div className="relative">
                <select
                    name="jobCategory"
                    value={post.jobCategory}
                    onChange={handleInput}
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded mt-[10px] mb-[5px]" required>
                    <option value="" disabled className="hidden"></option>
                    {api.map((jobCategory, index) => (
                    <option key={index} value={jobCategory.name}>
                        {jobCategory.name}
                    </option>
                    ))}
                </select>
                <label
                    className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.jobCategory ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    Select Job Category
                </label>
              </div>
              <div className="flex"><input type="checkbox"/>I'm a fresh graduate/ student</div>
              <div className="relative">
                <select
                    name="jobCategory"
                    value={post.jobCategory}
                    onChange={handleInput}
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded mt-[5px] mb-[5px]" required>
                    <option value="" disabled className="hidden"></option>
                    {api.map((jobCategory, index) => (
                    <option key={index} value={jobCategory.name}>
                        {jobCategory.name}
                    </option>
                    ))}
                </select>
                <label
                    className={`input-text absolute left-2 top-2 transition-all duration-200 transform origin-0 ${post.jobCategory ? 'top-[-12px] left-2 text-customBlue font-semibold' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-customBlue'}`}>
                    Select Job Category
                </label>
              </div>
              <div className="flex"><input type="checkbox"/>I'm not have a resume</div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-black h-[300px] w-full cursor-pointer mt-[5px]" 
                onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept="image/*,application/pdf" className="input-field hidden"
                  onChange={({ target: { files } }) => {
                    files[0] && setFileName(files[0].name);
                  }} 
                />
                <img src={uploadCloud} alt="Upload Icon" className="w-28 h-28" />
                <p className="font-bold">Upload Your Resume</p>
                <p>Support file type: .pdf, .doc, .docx</p>
              </div>
            <div className="flex items-center ">
                <FaFileAlt />
                <span className="flex items-center justify-between w-full"> 
                    {fileName}
                    <RiDeleteBin6Line onClick={()=> {setFileName("No selected File"); setImages(null)}}/>
                </span>
            </div>
            <div className="w-full mt-[30px]">
            <button type="submit" className="px-4 py-2 bg-black text-white rounded w-full">
                Save And Continue
            </button>
            </div>
            </form>
          </div>
          <img src={registerPhoto} alt="Login" className='mt-[100px] h-[800px] w-[800px]' />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FinishSign;
