import { useEffect, useState, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import { GiGraduateCap } from "react-icons/gi";
import { TfiAngleDown } from "react-icons/tfi";
import axios from 'axios';

const SearchBar = () =>{
  const [api, setApi] = useState([]);
  var numF = 0, numS = 0, numSt = 0, numJ = 0, numE = 0;

  useEffect(() => {
    axios.get('http://localhost:8000/api/job-categories')
      .then(response => {
        setApi(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const States = ["Kuala Lumpur", "Selangor", "Putrajaya", "Penang", "Johor", "Perlis", "Kedah", "Kelantan", "Terengganu", "Melaka",
    "Negeri Sembilan", "Pahang", "Perak", "Sabah", "Sarawak", "Singapore", "Overseas"];
  const jobTypes = ["Internship", "Part-Time", "Full-Time", "Freelance"];
  const experiences = ["Intern", "Fresh Graduate", "1 to 3 Years of Experience", "4 to 7 Years of Experience", "8 to 10 Years of Experience",
    "Over 10 Years of Experience"];

  const hideFilter = () => {
    document.querySelector('.DropdownJob').style.display = numF === 0 ? 'block' : 'none';
    numF = numF === 0 ? 1 : 0;
  }

  const hideMajor = () => {
    document.querySelector('.SpecializationList').style.display = numS === 0 ? 'block' : 'none';
    numS = numS === 0 ? 1 : 0;
  }

  const hideState = () => {
    document.querySelector('.stateList').style.display = numSt === 0 ? 'block' : 'none';
    numSt = numSt === 0 ? 1 : 0;
  }

  const hideJobType = () => {
    document.querySelector('.jobTList').style.display = numJ === 0 ? 'block' : 'none';
    numJ = numJ === 0 ? 1 : 0;
  }

  const hideExperience = () => {
    document.querySelector('.experienceList').style.display = numE === 0 ? 'block' : 'none';
    numE = numE === 0 ? 1 : 0;
  }


  return (
        <form className="searchBar">
            <div className="searchInput">
            <input type="text" placeholder="Search Jobs"/>
            <IoIosSearch className="searchIcon" />
            </div>
            <div className="filterBox" >
              <div className='flex' onClick={hideFilter}>
                <p>Filter</p>
                <GoMultiSelect className="searchIcon ml-[50px]"/>
              </div>
              <ul className='DropdownJob'>
                <li onClick={hideMajor}>Specialization <TfiAngleDown /></li>
                <div className="SpecializationList">
                <li><div className='select'></div>Select All</li>
                    {api.map((jobcategories,index) =>(
                      <div key={index}>
                          <div className='Specialization'><input type="checkbox" /><span>{jobcategories.name}</span></div>
                      </div>
                    ))}
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </div>
                <li onClick={hideState}>State / Region  <TfiAngleDown /></li>
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
                <li onClick={hideJobType}>Job type <TfiAngleDown /></li>
                <div className='jobTList'>
                  <li><div className='select'></div>Select All</li>
                  {jobTypes.map((jobType,index) =>(
                    <div key={index}>
                        <div className='jobT'><input type="checkbox" /><span>{jobType}</span></div>
                    </div>
                  ))}
                  <li className='apply'><div className='apply'> <button>Cancel</button> <button>Apply</button></div></li>
                </div>
                <li onClick={hideExperience}>Experience <TfiAngleDown /></li>
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
        </form>
  );
}

export default SearchBar;
