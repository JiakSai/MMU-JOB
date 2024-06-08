import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserRegister from "./userRegisterPage.jsx";
import UserLogin from "./userLoginPage.jsx";
import FinishSign from './finishSign.jsx';
import JobDetails from "./jobSearch-components/jobDetails.jsx";
import JobList from "./jobSearch-components/jobList.jsx";
import SearchBar from "./jobSearch-components/searchBar.jsx";
import{ AddRole}  from './popUp-Components/addRole.jsx';
import SearchJob from "./searchJob.jsx";
import UserProfile from "./userProfile.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddResume } from "./popUp-Components/addResume.jsx";
import { AddEducation } from "./popUp-Components/addEducation.jsx";
import { AddSkill } from "./popUp-Components/addSkill.jsx";
import { EditProfile } from "./popUp-Components/editProfile.jsx";
import Application from "./applicationPage.jsx";
import { ViewJobDetails } from "./popUp-Components/viewJobDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "userRegister",
    element: <UserRegister />,
  },
  {
    path: "userLogin",
    element: <UserLogin />,
  },
  {
    path: "userFinishSign",
    element: <FinishSign />,
  },
  {
    path: "JobDetails",
    element: <JobDetails />,
  },
  {
    path: "JobList",
    element: <JobList />,
  },
  {
    path: "SearchBar",
    element: <SearchBar />,
  },
  {
    path: "AddRole",
    element: <AddRole />,
  },
  {
    path: "SearchJob",
    element: <SearchJob />,
  },
  {
    path: "UserProfile",
    element: <UserProfile/>
  },
  {
    path: "AddResume",
    element: <AddResume />,
  },
  {
    path: "AddEducation",
    element: <AddEducation />,
  },
  {
    path: "AddSkill",
    element: <AddSkill />,
  },
  {
    path: "EditProfile",
    element: <EditProfile />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
  {
    path: "application",
    element: <Application />,
  },
  {
    path: "viewJobDetails",
    element: <ViewJobDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
