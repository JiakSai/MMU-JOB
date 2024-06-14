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
  const [api, setApi] = useState([]);
  const [showLogoFileInput, setShowLogoFileInput] = useState(true);
  const [showCoverFileInput, setShowCoverFileInput] = useState(true);
  const [logoFileName, setlogoFileName] = useState("No selected file");
  const [coverFileName, setcoverFileName] = useState("No selected file");
  const [logoPic, setLogologoPic] = useState(null);
  const [coverPic, setcoverPic] = useState(null);
  const [post, setPost] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    nationality: '',
    major: '',
    cover: null, 
    logo: null,
    location: '',
    _method: 'PATCH'
  });
  const handleCheckboxChange = () => {
    setShowLogoFileInput(!showLogoFileInput);
    if (!showLogoFileInput) {
      setPost({ ...post, logo: null });
      setlogoFileName("No selected file");
    }
  };
  const handleCoverCheckboxChange = () => {
    setShowCoverFileInput(!showCoverFileInput);
    if (!showCoverFileInput) {
      setPost({ ...post, cover: null });
      setcoverFileName("No selected file");
    }
  }
  const handleInput = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };
  const handleLogoFileChange = (event) => {
    const file = event.target.files[0]; 
    setPost({...post, logo: file});
    setlogoFileName(file.name); 
    setLogologoPic(URL.createObjectURL(file));
};
  const handleCoverFileChange = (event) => {
    const file = event.target.files[0]; 
    setPost({...post, cover: file});
    setcoverFileName(file.name); 
    setcoverPic(URL.createObjectURL(file));
  }
  useEffect(() => {
    axios.get('http://localhost:8000/api/JobCategories')
      .then(response => {
        setApi(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  const States = ["Kuala Lumpur", "Selangor", "Putrajaya", "Penang", "Johor", "Perlis", "Kedah", "Kelantan", "Terengganu", "Melaka",
    "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Overseas"];
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
                <label>Company category</label>
                <select className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded">
                    <option value=""  disabled selected>select category</option>
                    {api.map((category, index) => (
                        <option key={index} className="flex items-center gap-2">
                            <label>{category}</label>
                        </option>
                    ))}
                </select>
                <label>Company size</label>
                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company loaction</label>
                <select className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded">
                    <option value=""  disabled selected>select location</option>
                    {States.map((state, index) => (
                        <option key={index} className="flex items-center gap-2">
                            <label>{state}</label>
                        </option>
                    ))}
                </select>
                <label>Company benefits</label>
                <textarea
                            name='description'
                            className='border border-black p-2'
                            value={post.description}
                            onChange={handleInput}
                            rows={4}
                />
                <label>Company description</label>
                <textarea
                            name='description'
                            className='border border-black p-2'
                            value={post.description}
                            onChange={handleInput}
                            rows={4}
                />
                <label>Company logo</label>
                <div className="flex">
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  <label htmlFor="hideFileInput">I don't have a resume</label>
                </div>
                <div>
                  {showLogoFileInput && (
                    <>
                      <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]" 
                    onClick={() => document.querySelector(".input-field").click()}>
                    <input type="file"className="input-field hidden" 
                        onChange={handleLogoFileChange}
                    />
                    {post.logo ? 
                        <img src={logoPic} alt="logoPic" className="scall-100" />
                        :
                        <div className='flex flex-col items-center'>
                            <img src={uploadCloud} alt="Upload Icon" className="w-20 h-20" />
                            <p className="font-bold">Upload Your Profile logoPic</p>
                            <p>Support file type: .png, svg, jpeg</p> 
                        </div>
                    }
                </div>
                <div className="flex items-center mt-3">
                    <FaFileAlt />
                    <span className="flex items-center justify-between w-full"> 
                    {logoFileName}
                    <RiDeleteBin6Line onClick={() => { setlogoFileName("No selected file") ; setPost({...post,logo:null}) }} />
                    </span>
                </div>
                    </>
                  )}
                </div>
                <label>Company cover</label>
                <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]" 
                            onClick={() => document.querySelector(".coverInput-field").click()}>
                            <input type="file"className="coverInput-field hidden" 
                                onChange={handleCoverFileChange}
                            />
                            {post.cover ? 
                                <img src={coverPic} alt="logoPic" className="scale-100" />
                                :
                                <div className='flex flex-col items-center'>
                                    <img src={uploadCloud} alt="Upload Icon" className="w-20 h-20" />
                                    <p className="font-bold">Upload Your Profile logoPic</p>
                                    <p>Support file type: .png, svg, jpeg</p> 
                                </div>
                            }
                        </div>
                        <div className="flex items-center mt-3">
                            <FaFileAlt />
                            <span className="flex items-center justify-between w-full"> 
                            {coverFileName}
                            <RiDeleteBin6Line onClick={() => { setcoverFileName("No selected file") ; setPost({...post,cover:null}) }} />
                            </span>
                        </div>
                
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
