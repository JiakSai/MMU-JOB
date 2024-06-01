import JobList from './jobList.jsx';
import SearchBar from './searchBar.jsx';

const SearchJob = () =>{
  

  return (
    <section className="jobContainer">
       <SearchBar/>
       <JobList/>
    </section>
  );
}

export default SearchJob;
