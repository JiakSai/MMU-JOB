import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserRegister from "./userRegisterPage.jsx";
import UserLogin from "./userLoginPage.jsx";
import FinishSign from './finishSign.jsx';
import JobDetails from "./jobSearch-components/jobDetails.jsx";
import JobList from "./jobSearch-components/jobList.jsx";
import SearchBar from "./jobSearch-components/searchBar.jsx";
import SearchJob from "./searchJob.jsx";
import UserProfile from "./userProfile.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Application from "./applicationPage.jsx";
import { ViewJobDetails } from "./popUp-Components/viewJobDetails.jsx";
import EmployerRegister from "./employerRegister.jsx";
import EmployerLogin from "./employerLogin.jsx";
import SearchCompany from "./searchCompany.jsx";
import CompanyProfile from "./companyProfile.jsx";
import EmployerFinishSign from "./employerFinishSign.jsx";
import EditComProfile from "./editCompanyProfile.jsx";
import AdminTable from "./admin/postedJobTable.jsx";
import ApplicationStatus from "./applicationStatus.jsx";
import AddPost from "./addPost.jsx";
import ListenJob from "./listenJob.jsx";
import { AdminLogin } from "./admin/adminLogin.jsx";
import EmployerTable from "./admin/employerTable.jsx";
import JobSeekerTable from "./admin/jobSeekerTable.jsx";
import CatergoryTable from "./admin/jobCategoryTable.jsx";
import ReviewTable from "./admin/reviewTable.jsx";
import Dashboard from "./admin/dashboard.jsx";
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
    path: "SearchJob",
    element: <SearchJob />,
  },
  {
    path: "UserProfile",
    element: <UserProfile/>
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
  {
    path: "employerRegister",
    element: <EmployerRegister />,
  },
  {
    path: "employerLogin",
    element: <EmployerLogin />,
  },
  {
    path: "searchCompany",
    element: <SearchCompany />,
  },
  {
    path: "companyProfile",
    element: <CompanyProfile />,
  },
  {
    path: "employerFinishSign",
    element: <EmployerFinishSign />,
  },
  {
    path: "editComProfile",
    element: <EditComProfile />,
  },
  {
    path: "addPost",
    element: <AddPost />,
  },
  {
    path: "adminTable",
    element: <AdminTable />,
  },
  {
    path: "userApplicationStatus",
    element: <ApplicationStatus />,
  },
  {
    path: "listenJob",
    element: <ListenJob />,
  },{
    path: "adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "employerTable",
    element: <EmployerTable />,
  },{
    path: "jobSeekerTable",
    element: <JobSeekerTable />,
  },
  {
    path: "categoryTable",
    element: <CatergoryTable />,
  },
  {
    path: "reviewTable",
    element: <ReviewTable />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
