import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import EmployerFooter from "./employerFooter";
import uploadCloud from '/src/photo/uploadCloud.png';
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import registerPhoto from '/src/photo/Dancing.svg';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function EmployerFinishSign() {
  const navigate = useNavigate();
  const [api, setApi] = useState([]);
  const [showLogoFileInput, setShowLogoFileInput] = useState(true);
  const [showCoverFileInput, setShowCoverFileInput] = useState(true);
  const [logoFileName, setLogoFileName] = useState("No selected file");
  const [coverFileName, setCoverFileName] = useState("No selected file");
  const [logoPic, setLogoPic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [post, setPost] = useState({
    name: '',
    website: '',
    category: '',
    companySize: '',
    benefits: '',
    cover: null, 
    logo: null,
    location: '',
    description: '',
  });

  const handleCheckboxChange = () => {
    setShowLogoFileInput(!showLogoFileInput);
    if (!showLogoFileInput) {
      setPost({ ...post, logo: null });
      setLogoFileName("No selected file");
    }
  };

  const handleCoverCheckboxChange = () => {
    setShowCoverFileInput(!showCoverFileInput);
    if (!showCoverFileInput) {
      setPost({ ...post, cover: null });
      setCoverFileName("No selected file");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleLogoFileChange = (event) => {
    const file = event.target.files[0]; 
    setPost({...post, logo: file});
    setLogoFileName(file.name); 
    setLogoPic(URL.createObjectURL(file));
  };

  const handleCoverFileChange = (event) => {
    const file = event.target.files[0]; 
    setPost({...post, cover: file});
    setCoverFileName(file.name); 
    setCoverPic(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/JobCategories')
      .then(response => {
        setApi(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('empToken');

    try {
      const response = await axios.post('http://localhost:8000/api/AddCompany', post, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.status === 200) {
          navigate('/listenJob');
      }
    } catch (error) {
      console.error('AxiosError', error);
    }
  };

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
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="finishSignForm space-y-4 flex flex-col mt-[60px]">
              <p className="flex items-center"><HiOutlineBuildingOffice2 />Company details</p>
              <label>Company name</label>
                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company website</label>
                <input
                    type="text"
                    name="website"
                    value={post.website}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company category</label>
                <select 
                    name="category" 
                    value={post.category}
                    onChange={handleInput}
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                >
                    <option value="" disabled>select category</option>
                    {api.map((category, index) => (
                        <option key={index} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label>Company size</label>
                <input
                    type="text"
                    name="companySize"
                    value={post.companySize}
                    onChange={handleInput}
                    className='border border-black p-2'
                />
                <label>Company location</label>
                <select 
                    name="location" 
                    value={post.location}
                    onChange={handleInput}
                    className="peer w-full h-10 border border-black outline-none transition duration-200 py-4c px-1 rounded"
                >
                    <option value="" disabled>select location</option>
                    {States.map((state, index) => (
                        <option key={index} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                <label>Company benefits</label>
                <textarea
                    name='benefits'
                    className='border border-black p-2'
                    value={post.benefits}
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
                  <label htmlFor="hideFileInput">I don't have a company logo</label>
                </div>
                <div>
                  {showLogoFileInput && (
                    <>
                      <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]" 
                      onClick={() => document.querySelector(".input-field").click()}>
                      <input type="file" className="input-field hidden" 
                          onChange={handleLogoFileChange}
                      />
                      {post.logo ? 
                          <img src={logoPic} alt="logoPic" className="scale-100" />
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
                          <RiDeleteBin6Line onClick={() => { setLogoFileName("No selected file"); setPost({...post, logo: null}) }} />
                          </span>
                      </div>
                    </>
                  )}
                </div>
                <label>Company cover</label>
                <div className="flex">
                  <input type="checkbox" onChange={handleCoverCheckboxChange} />
                  <label htmlFor="hideFileInput">I don't have a company cover</label>
                </div>
                {showCoverFileInput && (
                  <>
                  <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-black h-[230px] w-full cursor-pointer mt-[5px]" 
                            onClick={() => document.querySelector(".coverInput-field").click()}>
                            <input type="file" className="coverInput-field hidden" 
                                onChange={handleCoverFileChange}
                            />
                            {post.cover ? 
                                <img src={coverPic} alt="coverPic" className="scale-100" />
                                :
                                <div className='flex flex-col items-center'>
                                    <img src={uploadCloud} alt="Upload Icon" className="w-20 h-20" />
                                    <p className="font-bold">Upload Your Profile coverPic</p>
                                    <p>Support file type: .png, svg, jpeg</p> 
                                </div>
                            }
                        </div>
                        <div className="flex items-center">
                            <FaFileAlt />
                            <span className="flex items-center justify-between w-full"> 
                            {coverFileName}
                            <RiDeleteBin6Line onClick={() => { setCoverFileName("No selected file"); setPost({...post, cover: null}) }} />
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
            className={` w-[730px] ml-[40px] `}
          />
        </div>
      </section>
      <EmployerFooter />
    </>
  );
}

export default EmployerFinishSign;
