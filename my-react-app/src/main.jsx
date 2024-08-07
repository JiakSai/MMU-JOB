import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserRegister from "./userRegisterPage.jsx";
import UserLogin from "./userLoginPage.jsx";
import FinishSign from "./finishSign.jsx";
import JobDetails from "./jobSearch-components/jobDetails.jsx";
import JobList from "./jobSearch-components/jobList.jsx";
import SearchBar from "./jobSearch-components/searchBar.jsx";
import SearchJob from "./searchJob.jsx";
import UserProfile from "./userProfile.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Application from "./applicationPage.jsx";
import { ViewJobDetails } from "./user-popUp-Components/viewJobDetails.jsx";
import EmployerRegister from "./employer/employerRegister.jsx";
import EmployerLogin from "./employer/employerLogin.jsx";
import SearchCompany from "./searchCompany.jsx";
import CompanyProfile from "./companyProfile.jsx";
import EmployerFinishSign from "./employer/employerFinishSign.jsx";
import EditComProfile from "./employer/editCompanyProfile.jsx";
import EmployerApplication from "./employer/employerApplication.jsx";
import AdminTable from "./admin/postedJobTable.jsx";
import ApplicationStatus from "./applicationStatus.jsx";
import AddPost from "./employer/addPost.jsx";
import ListenJob from "./employer/listenJob.jsx";
import { AdminLogin } from "./admin/adminLogin.jsx";
import EmployerTable from "./admin/employerTable.jsx";
import JobSeekerTable from "./admin/jobSeekerTable.jsx";
import CatergoryTable from "./admin/jobCategoryTable.jsx";
import ReviewTable from "./admin/reviewTable.jsx";
import Dashboard from "./admin/dashboard.jsx";
import Policy from "./footerContent/policy.jsx";
import ContactUs from "./footerContent/contactUs.jsx";
import AboutUs from "./footerContent/aboutUs.jsx";
import CommunityGuideLine from "./footerContent/communityGuidelines.jsx";
import TermAndCondition from "./footerContent/termsAndConditions.jsx";
import EmpPolicy from "./footerContent/empPolicy.jsx";
import EmpTermAndCondition from "./footerContent/empTermsAndConditions.jsx";
import EmpContactUs from "./footerContent/empContactUs.jsx";
import EmpCommunityGuideLine from "./footerContent/empCommunityGuidelines.jsx";
import EmpAboutUs from "./footerContent/empAboutUs.jsx";

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
    element: <UserProfile />,
  },
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-2xl">404 Not Found</h1>
      </div>
    ),
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
    path: "employerApplication",
    element: <EmployerApplication />,
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
  },
  {
    path: "adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "employerTable",
    element: <EmployerTable />,
  },
  {
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
    path: "AdminDashboard",
    element: <Dashboard />,
  },
  {
    path: "403",
    element: (
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-2xl">403 Forbidden</h1>
      </div>
    ),
  },
  {
    path: "policy",
    element: <Policy />,
  },
  {
    path: "contactUs",
    element: <ContactUs />,
  },
  {
    path: "aboutUs",
    element: <AboutUs />,
  },
  {
    path: "communityGuidelines",
    element: <CommunityGuideLine />,
  },
  {
    path: "termsAndConditions",
    element: <TermAndCondition />,
  },
  {
    path: "empPolicy",
    element: <EmpPolicy />,
  },
  {
    path: "empTermsAndConditions",
    element: <EmpTermAndCondition />,
  },
  {
    path: "empContactUs",
    element: <EmpContactUs />,
  },
  {
    path: "empCommunityGuidelines",
    element: <EmpCommunityGuideLine />,
  },
  {
    path: "empAboutUs",
    element: <EmpAboutUs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
