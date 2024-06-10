import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Cookies from 'js-cookie';
import EmployerFooter from "./employerFooter";
import uploadCloud from './photo/uploadCloud.png';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import registerPhoto from './photo/Dancing.svg';
import { FiUser } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

function EmployerFinishSign() {
  const [fileName, setFileName] = useState("No selected file");
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

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };


  return (
    <>
      <section>
        <div className="LoginRegisterTop">
          <h1 className="logoEmp">" MMUJOB "</h1>
        </div>
        <div className="finishSignContainer">
          <div className="bg-white w-[560px] py-[30px] px-[30px] h-fit">
            <h1 className="text-[28px] font-bold text-customPink">Almost done</h1>
            <p>Fill in this form to complete your account.</p>
            <form className="finishSignForm space-y-4 flex flex-col mt-[60px]">
              <p className="flex items-center"> <FiUser />Your details</p>
              <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <div className="relative">
                            <PhoneInput
                            country={'my'}
                            onChange={handleChange}
                            inputClass="custom-phone-input"
                            inputProps={{
                                required: true,
                            }}
                            />
                </div>
                {!valid && (
                  <p>Please enter a valid phone number.</p>
                )}
              <p className="flex items-center"><HiOutlineBuildingOffice2 />Company details</p>
              <label>Company name</label>
                <input
                    type="text"
                    name="Company name"
                    value={post.name}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company website</label>
                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company logo</label>
                <label>Company cover</label>
                
              <button type="submit" className="px-4 py-2 bg-black text-white rounded w-full">
                Save And Continue
              </button>
            </form>
          </div>
          <img
            src={registerPhoto}
            alt="Login"
            className={` w-[730px] ml-[40px] `}
          />
        </div>
      </section>
      <EmployerFooter />
    </>
  );
}

export default EmployerFinishSign;
