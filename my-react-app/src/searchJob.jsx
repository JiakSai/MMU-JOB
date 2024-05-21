import { useEffect, useState, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import { GiGraduateCap } from "react-icons/gi";
import { IoBookmarkOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import { IoIosMore } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImPointRight } from "react-icons/im";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";
import { FaAngleRight } from "react-icons/fa6";
import bytes from './photo/bytes.png';
import easyParcel from './photo/easyParcel.jpeg';
import axios from 'axios';

const SearchJob = () =>{

  const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/test');
                console.log('Response data:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };
  
        fetchData();
    }, []);
  

  const Specializations = ["Accounting / Finance", "Engineering", "Information Technology", "Law", "Others"];
  const States = ["Kuala Lumpur", "Selagor", "Putrajaya","Penang", "Johor", "Perlis", "Keadh", "Kelanta", "Terengganu", "Melacca",
                 "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Oversea"];
  const jobTypes = ["InternShip", "Part-Time", "Full-Time", "Freelance"];
  const experiences = ["Intern", "Fresh Graduate", "1 to 3 Years of Experiance", "4 to 7 Years of Experiance", "8 to 10 Years of Experiance",
                       "Over 10 Years of Experiance"];
                       
  const [showJobDetailBottom, setShowJobDetailBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleJobDetails = () => {
    setIsOpen(!isOpen);
  };
  const paragraphStyles = {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    display: '-webkit-box',
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const jobScroll = document.querySelector('.jobScroll');
      const scrollTop = jobScroll.scrollTop;
      const scrollHeight = jobScroll.scrollHeight;
      const clientHeight = jobScroll.clientHeight;
  
      if (scrollTop + clientHeight >= scrollHeight) {
        setShowJobDetailBottom(true);
      } else {
        setShowJobDetailBottom(false);
      }
      
    };
  
    const jobScroll = document.querySelector('.jobScroll');
    jobScroll.addEventListener('scroll', handleScroll);
  
    return () => {
      jobScroll.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="jobContainer">
    
        <div className="searchBar">
            <div className="searchInput">
            <input type="text" placeholder="Search Jobs"/>
            <IoIosSearch className="searchIcon" />
            </div>
            <div className="filterBox">
              <p>Filter</p>
              <GoMultiSelect className="searchIcon"/>
              <ul className='DropdownJob'>
                <li>Specialization <TfiAngleDown /></li>
                <ul className="filterList">
                {error && <div>Error: {error}</div>}
                  {data && (
                      <ul>
                          <li>{data.message}</li>
                          <li>{data['another message']}</li>
                      </ul>
                  )}
                  {Specializations.map((specialization, index) => (
                    <li key={index}>{specialization}<FaAngleRight /></li>
                  ))}
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </ul>
                <li>State / Region  <TfiAngleDown /></li>
                <div className='stateList'>
                  <li><div className='select'></div>Select All</li>
                  <div className='stateContent'>
                    {States.map((State,index) =>(
                      <div key={index}>
                          <div className='State'><input type="checkbox" /><span>{State}</span></div>
                      </div>
                    ))}
                  </div>
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </div>
                <li>Job type <TfiAngleDown /></li>
                <div className='jobList'>
                  <li><div className='select'></div>Select All</li>
                  {jobTypes.map((jobType,index) =>(
                    <div key={index}>
                        <div className='jobT'><input type="checkbox" /><span>{jobType}</span></div>
                    </div>
                  ))}
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </div>
                <li>Experience <TfiAngleDown /></li>
                <div className='experienceList'>
                  <li><div className='select'></div>Select All</li>
                  {experiences.map((experience,index) =>(
                    <div key={index}>
                        <div className='experience'><input type="checkbox" /><span>{experience}</span></div>
                    </div>
                  ))}
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </div>
                <li>Salary <TfiAngleDown /></li>
              </ul>
            </div>
            <div className="internBox">
            <p>Internship</p>
            <GiGraduateCap className="searchIcon"/>
            </div>
            <button className="seekBtn">SEEK</button>
        </div>
        
        <div className="showJob">
          <div className="allJob">
              <div className="jobQty">
                <p>500 jobs</p>
                <p>Sorted by relevance <LiaAngleDownSolid /></p>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={easyParcel} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Internship in Web Designing (WordPress)</h4>
                      <p>EasyParcel Sdn. Bhd.</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Bayan Lepas, Penang</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
              <div className="jobList">
                  <div className="jobListTop">
                    <img src={bytes} alt="bytes" className="jobLogo"/>
                    <div>
                      <h4>Computer Technician Intern </h4>
                      <p>BYTESONIX TECHNOLOGY SDN. BHD</p>
                    </div>
                    <IoBookmarkOutline className="icon"/>
                  </div>
                <div>
                    <p>Full Time | On-site | Kuala Lumpur</p>
                    <div className="jobListBottom">
                      <p>1 hour ago</p>
                      <p>RM600-800</p>
                    </div>
                </div>
              </div>
          </div>
          <div className="jobDetails">
              <div className='jobScroll'>
                 <div className='jobDetailsTop'>
                 <div className="jobDetailsBox">
              <img src={easyParcel} alt="bytes" className="jobLogo"/>
              <p>EasyParcel Sdn. Bhd.</p>
              <p className="viewJob">View all jobs</p>
            </div>
            <div className="jobDetailTittle">
              <h1>Internship in Web Designing (WordPress)</h1>
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
        </div>
    </section>
  );
}

export default SearchJob;
