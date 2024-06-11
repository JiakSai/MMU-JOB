import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SearchJob from './searchJob.jsx';
import UserLogin from './userLoginPage.jsx';
import UserRegister from './userRegisterPage.jsx';
import FinishSign from './finishSign.jsx';
import UserProfile from './userProfile.jsx';
import { AddRole } from './popUp-Components/addRole.jsx';
import { AddResume } from './popUp-Components/addResume.jsx';
import { AddSkill } from './popUp-Components/addSkill.jsx';
import { AddProfileImage } from './popUp-Components/addProfileImage.jsx';
import SearchCompany from './searchCompany.jsx';
import CompanyProfile from './companyProfile.jsx';
import { AddReview } from './companySearch-Components/addReview.jsx';

function App() {
    return (
        <>
            {/* <UserLogin/> */}
            {/* <FinishSign/> */}
            {/* <UserRegister/> */}
            {/* <UserProfile/> */}
            {/* <AddRole /> */}
            {/* <SearchJob />  */}
            {/* <AddResume /> */}
            {/* <AddSkill /> */}
            {/* <AddProfileImage /> */}
            {/* <SearchCompany /> */}
            {/* <CompanyProfile /> */}
            <AddReview />
        </>
    );
}

export default App;
