import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SearchJob from './searchJob.jsx';
import UserLogin from './userLoginPage.jsx';
import UserRegister from './userRegisterPage.jsx';
import FinishSign from './finishSign.jsx';
import UserProfile from './userProfile.jsx';
import { AddRole } from './user-popUp-Components/addRole.jsx';
import { AddResume } from './user-popUp-Components/addResume.jsx';
import { AddSkill } from './user-popUp-Components/addSkill.jsx';
import { AddProfileImage } from './user-popUp-Components/addProfileImage.jsx';
import SearchCompany from './searchCompany.jsx';
import CompanyProfile from './companyProfile.jsx';
import { AddReview } from './companySearch-Components/addReview.jsx';
import EmployerFooter from './employer/employerFooter.jsx';
import EmployerHeader from './employer/employerHeader.jsx';
import EmployerLogin from './employer/employerLogin.jsx';
import EmployerFinishSign from './employer/employerFinishSign.jsx';
import ReviewBar from './companySearch-Components/reviewBar.jsx';
import EditProfile from './employer/editCompanyProfile.jsx';
import ApplicationStatus from './applicationStatus.jsx';
import AddPost from './addPost.jsx';
import acceptApplication from './employer/acceptApplication.jsx';

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
            {/* <AddReview /> */}
            {/* <EmployerFooter/>
            <EmployerHeader/> */}
            <EmployerLogin/>
            {/* <EmployerFinishSign/> */}
            {/* <ReviewBar/> */}
            {/* <EditProfile/> */}
            {/* <AdminLogin/> */}
            {/* <ApplicationStatus/> */}
            {/* <AdminTable/> */}
            {/* <AddPost/> */}
            {/* {

                <acceptApplication/>
            } */}
        </>
    );
}

export default App;
