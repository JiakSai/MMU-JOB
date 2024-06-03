import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SearchJob from './searchJob.jsx';
import UserLogin from './userLoginPage.jsx';
import UserRegister from './userRegisterPage.jsx';
import FinishSign from './finishSign.jsx';
import UserProfile from './userProfile.jsx';
import { AddRole } from './popUp-Components/addRole.jsx';

function App() {
    return (
        <>
            {/* <UserLogin/> */}
            {/* <FinishSign/> */}
            {/* <UserRegister/> */}
            <UserProfile/>
            {/* <AddRole /> */}
            {/* <SearchJob />  */}
        </>
    );
}

export default App;
