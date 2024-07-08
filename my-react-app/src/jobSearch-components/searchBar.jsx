import { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import { GiGraduateCap } from "react-icons/gi";
import { TfiAngleDown } from "react-icons/tfi";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [api, setApi] = useState([]);
  const [value, setValue] = useState([0, 0]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectAllJobTypes, setSelectAllJobTypes] = useState(false);
  const [selectAllSpecializations, setSelectAllSpecializations] = useState(false);
  const [selectAllStates, setSelectAllStates] = useState(false);
  const [selectAllExperiences, setSelectAllExperiences] = useState(false);
  const [query, setQuery] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  var numF = 0, numS = 0, numSt = 0, numJ = 0, numE = 0, numSly = 0;

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

  const hideSalary = () => {
    document.querySelector('.salary').style.display = numSly === 0 ? 'block' : 'none';
    numSly = numSly === 0 ? 1 : 0;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMinChange = (event) => {
    const newMin = parseInt(event.target.value, 10);
    if (!isNaN(newMin) && newMin <= value[1]) {
      setValue([newMin, value[1]]);
    } else if (!isNaN(newMin) && newMin > value[1]) {
      setValue([value[1], value[1]]);
    }
  };

  const handleMaxChange = (event) => {
    const newMax = parseInt(event.target.value, 10);
    if (!isNaN(newMax) && newMax >= value[0]) {
      setValue([value[0], newMax]);
    } else if (!isNaN(newMax) && newMax < value[0]) {
      setValue([value[0], value[0]]);
    }
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(newParams).toString();
    setSearchParams(params);
    console.log('Search params:', params);
  };

  const handleApplyFilter = () => {
    let searchData = {};

    if (value[0] !== 0 || value[1] !== 0) {
      searchData.minSalary = value[0];
      searchData.maxSalary = value[1];
    }
    if (query.length > 0) {
      searchData.search = query;
    }
    if (selectedJobTypes.length > 0) {
      searchData.jobType = selectedJobTypes;
    }
    if (selectedSpecializations.length > 0) {
      searchData.jobCategory = selectedSpecializations;
    }
    if (selectedStates.length > 0) {
      searchData.jobLocation = selectedStates;
    }
    if (selectedExperiences.length > 0) {
      searchData.experience = selectedExperiences;
    }

    updateSearchParams(searchData);
  };

  const handleJobTypeSelection = (jobType) => {
    if (selectedJobTypes.includes(jobType)) {
      setSelectedJobTypes(selectedJobTypes.filter(j => j !== jobType));
    } else {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    }
  };

  const handleSpecializationSelection = (specialization) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== specialization));
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
    }
  };

  const handleStateSelection = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter(s => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };

  const handleExperienceSelection = (experience) => {
    if (selectedExperiences.includes(experience)) {
      setSelectedExperiences(selectedExperiences.filter(e => e !== experience));
    } else {
      setSelectedExperiences([...selectedExperiences, experience]);
    }
  };

  const handleSelectAllJobTypes = () => {
    if (!selectAllJobTypes) {
      setSelectedJobTypes(jobTypes);
      setSelectAllJobTypes(true);
    } else {
      setSelectedJobTypes([]);
      setSelectAllJobTypes(false);
    }
  };

  const handleSelectAllSpecializations = () => {
    if (!selectAllSpecializations) {
      setSelectedSpecializations(api.map(jobcategory => jobcategory.name));
      setSelectAllSpecializations(true);
    } else {
      setSelectedSpecializations([]);
      setSelectAllSpecializations(false);
    }
  };

  const handleSelectAllStates = () => {
    if (!selectAllStates) {
      setSelectedStates(States);
      setSelectAllStates(true);
    } else {
      setSelectedStates([]);
      setSelectAllStates(false);
    }
  };

  const handleSelectAllExperiences = () => {
    if (!selectAllExperiences) {
      setSelectedExperiences(experiences);
      setSelectAllExperiences(true);
    } else {
      setSelectedExperiences([]);
      setSelectAllExperiences(false);
    }
  };

  const handleCancelJobTypes = () => {
    setSelectedJobTypes([]);
    setSelectAllJobTypes(false);
    handleApplyFilter();
  };

  const handleCancelSpecializations = () => {
    setSelectedSpecializations([]);
    setSelectAllSpecializations(false);
    handleApplyFilter();
  };

  const handleCancelStates = () => {
    setSelectedStates([]);
    setSelectAllStates(false);
    handleApplyFilter();
  };

  const handleCancelExperiences = () => {
    setSelectedExperiences([]);
    setSelectAllExperiences(false);
    handleApplyFilter();
  };

  const handleSelectAllJobTypesClick = () => {
    handleSelectAllJobTypes();
    handleApplyFilter();
  };

  const handleSelectAllSpecializationsClick = () => {
    handleSelectAllSpecializations();
    handleApplyFilter();
  };

  const handleSelectAllStatesClick = () => {
    handleSelectAllStates();
    handleApplyFilter();
  };

  const handleSelectAllExperiencesClick = () => {
    handleSelectAllExperiences();
    handleApplyFilter();
  };

  const handleApplySalary = () => {
    handleApplyFilter();
  };

  const handleCancelSalary = () => {
    setValue([0, 0]);
    handleApplyFilter();
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleApplyFilter();
  };

  const handleInternshipClick = () => {
    setSelectedJobTypes(['Internship']);
    handleApplyFilter();
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar">
      <div className="searchInput">
        <input type="text" 
          value={query}
          onChange={handleQueryChange}
          placeholder="Search Jobs" />
        <IoIosSearch className="searchIcon" />
      </div>
      <div className="filterBox">
        <div className='flex' onClick={hideFilter}>
          <p>Filter</p>
          <GoMultiSelect className="searchIcon ml-[50px]" />
        </div>
        <ul className='DropdownJob'>
          <li onClick={hideMajor}>Specialization {selectedSpecializations.length > 0 && `(${selectedSpecializations.length})`}  <TfiAngleDown /></li>
          <div className="SpecializationList">
            <li onClick={handleSelectAllSpecializationsClick}><div className='select'></div>Select All</li>
            <div className='stateContent'>
              {api.map((jobcategory, index) => (
                <div key={index}>
                  <div className='Specialization'>
                    <input 
                      type="checkbox" 
                      onChange={() => handleSpecializationSelection(jobcategory.name)} 
                      checked={selectedSpecializations.includes(jobcategory.name)} 
                    />
                    <span>{jobcategory.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <li className='apply'>
              <div className='apply'> 
                <p className="searchBarCancelButton" onClick={handleCancelSpecializations}>Cancel</p> 
                <p className="searchBarButton" onClick={handleApplyFilter}>Apply</p>
              </div>
            </li>
          </div>
          <li onClick={hideState}>State / Region {selectedStates.length > 0 && `(${selectedStates.length})`}  <TfiAngleDown /></li>
          <div className='stateList'>
            <li onClick={handleSelectAllStatesClick}><div className='select'></div>Select All</li>
            <div className='stateContent'>
              {States.map((state, index) => (
                <div key={index}>
                  <div className='State'>
                    <input 
                      type="checkbox" 
                      onChange={() => handleStateSelection(state)} 
                      checked={selectedStates.includes(state)} 
                    />
                    <span>{state}</span>
                  </div>
                </div>
              ))}
            </div>
            <li className='apply'>
              <div className='apply'> 
                <p className="searchBarCancelButton" onClick={handleCancelStates}>Cancel</p> 
                <p className="searchBarButton" onClick={handleApplyFilter}>Apply</p>
              </div>
            </li>
          </div>
          <li onClick={hideJobType}>Job type {selectedJobTypes.length > 0 && `(${selectedJobTypes.length})`} <TfiAngleDown /></li>
          <div className='jobTList'>
            <li onClick={handleSelectAllJobTypesClick}><div className='select'></div >Select All</li>
            {jobTypes.map((jobType, index) => (
              <div key={index}>
                <div className='jobT'>
                  <input 
                    type="checkbox" 
                    onChange={() => handleJobTypeSelection(jobType)} 
                    checked={selectedJobTypes.includes(jobType)} 
                  />
                  <span>{jobType}</span>
                </div>
              </div>
            ))}
            <li className='apply'>
              <div className='apply'> 
                <p className="searchBarCancelButton" onClick={handleCancelJobTypes}>Cancel</p> 
                <p className="searchBarButton" onClick={handleApplyFilter}>Apply</p>
              </div>
            </li>
          </div>
          <li onClick={hideExperience}>Experience {selectedExperiences.length > 0 && `(${selectedExperiences.length})`} <TfiAngleDown /></li>
          <div className='experienceList'>
            <li onClick={handleSelectAllExperiencesClick}><div className='select'></div>Select All</li>
            {experiences.map((experience, index) => (
              <div key={index}>
                <div className='experience'>
                  <input 
                    type="checkbox" 
                    onChange={() => handleExperienceSelection(experience)} 
                    checked={selectedExperiences.includes(experience)} 
                  />
                  <span>{experience}</span>
                </div>
              </div>
            ))}
            <li className='apply'>
              <div className='apply'> 
                <p className="searchBarCancelButton" onClick={handleCancelExperiences}>Cancel</p> 
                <p className="searchBarButton" onClick={handleApplyFilter}>Apply</p>
              </div>
            </li>
          </div>
          <li onClick={hideSalary}> Salary <TfiAngleDown /></li>
          <div className='salary'>
            <Box mx="auto" my={4}>
              <Typography id="range-slider" gutterBottom>
                Price Range
              </Typography>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={50}
                aria-labelledby="range-slider"
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <div>
                  <Typography>Min: </Typography>
                  <input 
                    style={{ width: '120px', border: 'solid 1px #9b9b9b' }} 
                    type="number" 
                    value={value[0]} 
                    onChange={handleMinChange} 
                    step={10}
                  />
                </div>
                <div>
                  <Typography>Max: </Typography>
                  <input 
                    style={{ width: '120px', border: 'solid 1px #9b9b9b' }} 
                    type="number" 
                    value={value[1]} 
                    onChange={handleMaxChange} 
                    step={10}
                  />
                </div>
              </Box>
              <div className='apply mt-6'>
                <button className="searchBarCancelButton" onClick={handleCancelSalary}>Cancel</button>
                <button className="searchBarButton" onClick={handleApplySalary}>Apply</button>
              </div>
            </Box>
          </div>
        </ul>
      </div>
      <div className="internBox" onClick={handleInternshipClick}>
        <p>Internship</p>
        <GiGraduateCap className="searchIcon" />
      </div>
      <button type='submit' className="seekBtn">SEEK</button>
    </form>
  );
}

export default SearchBar;
