import { useEffect, useState, useRef } from 'react';
import { IoBookmarkOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImPointRight } from "react-icons/im";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";
import easyParcel from './photo/easyParcel.jpeg';
import axios from 'axios';

export default function JobDetails(props){
    const job = props.job;
    const [showJobDetailBottom, setShowJobDetailBottom] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const paragraphStyles = {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        display: '-webkit-box',
  };
  const toggleJobDetails = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      const jobScroll = document.querySelector('.jobScroll');
      const scrollTop = jobScroll.scrollTop;
      const scrollHeight = jobScroll.scrollHeight;
      const clientHeight = jobScroll.clientHeight;

      setShowJobDetailBottom(scrollTop + clientHeight >= scrollHeight);
    };

    const jobScroll = document.querySelector('.jobScroll');
    jobScroll.addEventListener('scroll', handleScroll);

    return () => {
      jobScroll.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <>
        <div className="jobDetails">
            <div className='jobScroll'>
                <div className='jobDetailsTop'>
                <div className="jobDetailsBox">
            <img src={easyParcel} alt="bytes" className="jobLogo"/>
            <p>{job.company.name}</p>
            <p className="viewJob">View all jobs</p>
            </div>
            <div className="jobDetailTittle">
            <h1>{job.job_title}</h1>
            <div className="jobDetailsBox">
                <button className="btn1"><IoIosMore /></button>
                <button className="btn2"><IoBookmarkOutline/></button>
                <button className="btn3">Quick apply</button>
            </div>
            </div>
            <div className="minimalistInformation">
                <div className="jobDetailsBox">
                <IoLocationOutline /> Bayan Lepas, Penang
                </div>
                <div className="jobDetailsBox">
                <FaRegBuilding /> Developers/Programmers (Information & Communication Technology)
                </div>
                <div className="jobDetailsBox">
                <GoClock /> On-site | Internship
                </div>
                <div className="jobDetailsBox">
                <GiPayMoney /> RM 750 - RM 800 per month
                </div>
            </div>
            <h3>Responsibilities</h3>
            <ul >
                <li>Setting up and installing new hardware and software systems.</li>
                <li>Diagnosing and troubleshooting computer issues.</li>
                <li>Maintaining hardware and software by conducting regular maintenance and updates.</li>
                <li>Upgrading firmware, software, and outdated hardware systems.</li>
                <li>Monitoring and maintaining security systems and installing updates.</li>
                <li>Packing computers for sale.</li>
                <li>Assist walk-in customers.</li>
            </ul>
            <h3>Qualifications</h3>
            <ul>
                <li>Associate degree in Technology-related field preferred</li>
                <li>Minimum of 2 years of work experience is preferred</li>
            </ul>
            <h3>Company profile</h3>
            <div className="companyInfoBox">
                <img src={easyParcel} alt="easyParcel" />
                <h4>Easyparcel Sdn. Bhd.</h4>
                <div className="jobDetailsBox">
                <FaStar /> 4.4 · 27 reviews
                </div>
                <div className="jobDetailsBox">
                <HiOutlineBuildingOffice /> Computer Software & Networking
                </div>
                <div className="jobDetailsBox">
                <GoPeople /> 51-100 employees
                </div>
                <span style={isOpen ? null: paragraphStyles}>
                    EasyParcel as a whole is a web-based parcel consolidator and E-commerce shipping solutions provider, 
                    or to put it into simple words, we provide easy-access solution for delivery service bookings.
                    <br />
                    EasyParcel Sdn Bhd established in June 2014, this company was formed with a mission in mind;
                    that is to provide a simplified shipping platform where businesses could book any manner of 
                    consignment for delivery at prices they couldn't achieve themselves, backed up with the knowledge 
                    and expertise of an industry veteran (the Managing Director).
                    <br />
                    Even though we have now developed an efficient and user-friendly online booking system, 
                    our ethos is to keep the small business mentality and treat each customer with the time and care they deserve.
                    <br />
                    More than 50,000 people and businesses in Malaysia are using EasyParcel. Our platform allows you to book for 
                    delivery from multiple established courier companies in Malaysia and of course, at an affordable rate.
                </span>
                <p className="show" onClick={toggleJobDetails}>
                    {isOpen ? 'Show less' : 'Show more'}
                    &nbsp;&nbsp;
                    {isOpen ? <TfiAngleUp /> : <TfiAngleDown />}
                </p>
                <h4>Perks and benefits</h4>
                <div className="jobDetailsBox">
                <p><ImPointRight />&nbsp;&nbsp;Medical</p> <p><ImPointRight />&nbsp;&nbsp;Miscellaneous </p> <p><ImPointRight />&nbsp;&nbsp;allowance Sports (e.g. Gym)</p>
                </div>
                <button className="btn4">More about this company&nbsp;&nbsp;&nbsp; <FaArrowRightLong /></button>
                </div>
                </div>
            </div>
            <div className='jobDetailBottom'style={{ display: showJobDetailBottom ? 'flex' : 'none' }} >
                <button className="btn2"><IoBookmarkOutline/></button>
                <button className="btn3">Quick apply</button>
            </div>
            </div>
    </>
  )
}