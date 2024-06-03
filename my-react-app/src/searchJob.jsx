import JobList from "./jobSearch-components/jobList.jsx";
import SearchBar from './jobSearch-components/searchBar.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
const SearchJob = () =>{
  

  return (
    <>
    <Header/>
    <section className="jobContainer">
       <SearchBar/>
       <JobList/>
    </section>
    <Footer/>
    </>
    
  );
}

export default SearchJob;
