import React, { useEffect, useState } from "react";
import EmployerHeader from "./employerHeader";
import EmployerFooter from "./employerFooter";
import axios from "axios";
import Cookies from "js-cookie";
import { MdModeEdit } from "react-icons/md";
import { EditCp } from "./editCp";
import { useNavigate } from "react-router-dom";
import EmpResetPassword from "./employerResetPass";

const EditComProfile = () => {
  const navigate = useNavigate();
  const [showEcp, setShowEcp] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);
  const [company, setCompany] = useState({
    company: {
      logo: "",
      cover: "",
      name: "",
      website: "",
      location: "",
      category: "",
      companySize: "",
      benefits: "",
      description: "",
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showSuccessMessage || showEditMessage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setShowSuccessMessage(false), 6000);
        setTimeout(() => setShowEditMessage(false), 6000);
    }
 }, [showSuccessMessage, showEditMessage]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  const token = Cookies.get("empToken");

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate("/employerLogin");
    }
  }, []);

  useEffect(() => {
    if (showEcp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showEcp]);

  const handleShowEcp = () => {
    setShowEcp(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("empToken");
      try {
        const response = await axios.get(
          "http://localhost:8000/api/ShowCompanyProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setCompany(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
    if (showEditMessage) {
      fetchData();
    }
  }, [showEditMessage]);

  if (isLoading) {
    return (
      <>
        <div className="Emploader"></div>
        <div className="flex justify-center mt-[630px]">
          {" "}
          <p className="text-3xl font-bold text-customPink">" MMUJOB "</p>
        </div>
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <section className="mt-[100px] mb-[30px] mx-[120px] flex flex-col items-center bg-white pb-8 rounded">
        {
            showSuccessMessage && (
                <div className="success-message w-full">
                    Reset password successful!
                </div>
            )
        }
        {
            showEditMessage && (
                <div className="success-message w-full">
                    Edit company profile successful!
                </div>
            )
        }
        <div className="companyCover relative">
          {company.company.cover && (
            <img
              src={company.company.cover}
              alt="Company Cover"
              className="w-full h-[200px] rounded-t cursor-pointer"
              onClick={handleShowEcp}
            />
          )}
          <div className="content cursor-pointer" onClick={handleShowEcp}>
            <img
              src={
                company.company.logo || "https://via.placeholder.com/180/E5E4E2"
              }
              alt="Company Logo"
              className="rounded-full h-[180px] w-[180px] border-black"
            />
          </div>
        </div>
        <div className="w-[1210px] flex justify-between">
          <p
            onClick={handleShowEcp}
            className="mt-[80px] text-2xl text-stone-400 font-semibold"
          >
            Edit company details
          </p>
          <p
            onClick={() => setShowResetPass(true)}
            className="mt-[85px] text-base font-semibold text-neutral-700 mr-1"
          >
            Reset Password
          </p>
        </div>
        <div className="companyContent border border-zinc-500 w-[1210px] p-8 flex flex-col gap-4 rounded">
          <div className="flex space-x-24">
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Name
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.name}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Website
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.website}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-24">
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Location
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.location}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Category
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.category}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-24">
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Size
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.companySize}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-700 mb-1">
                Company Benefits
              </p>
              <div className="items-center flex gap-4">
                <p className="border p-2 w-96 border-neutral-400 rounded shadow-md text-neutral-600 ">
                  {company.company.benefits}
                </p>
                <MdModeEdit
                  className="cursor-pointer"
                  onClick={handleShowEcp}
                  size={25}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-base font-semibold text-neutral-700 mb-1">
              Company description
            </p>
            <div className="items-center flex gap-4">
              <p className="border p-2 w-[905px] border-neutral-400 rounded shadow-md text-neutral-600 ">
                {company.company.description}
              </p>
              <MdModeEdit
                className="cursor-pointer"
                onClick={handleShowEcp}
                size={25}
              />
            </div>
          </div>
        </div>
        {showEcp && (
          <EditCp
            justClose={() => setShowEcp(false)}
            company={company}
            onClose={() => {
              setShowEcp(false);
              setShowEditMessage(true)
            }}
          />
        )}
        {showResetPass && (
          <EmpResetPassword 
          justClose={() => {
            setShowResetPass(false);
          }}
          profile={company}
          onClose={() => {
            setShowResetPass(false);
            setShowSuccessMessage(true);
          }}
          />
        )}
      </section>
      <EmployerFooter />
    </>
  );
};

export default EditComProfile;
