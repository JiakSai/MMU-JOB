import JobList from "./jobSearch-components/jobList.jsx";
import SearchBar from './jobSearch-components/searchBar.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useEffect,useState } from "react";

const SearchJob = () =>{
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1100);
        return () => clearTimeout(timer);
    }, []);
  if (loading) { 
    return ( 
        <> 
            <div className="loader"></div> 
            <div className='flex justify-center mt-[630px]'> <p className='text-3xl font-bold text-customBlue'>
                " MMUJOB "</p> 
            </div> 
        </> 
    ); }
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
