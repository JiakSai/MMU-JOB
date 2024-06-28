import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { AddRole } from "./user-popUp-Components/addRole.jsx";
import { AddEducation } from "./user-popUp-Components/addEducation.jsx";
import { AddResume } from "./user-popUp-Components/addResume.jsx";
import { AddSkill } from "./user-popUp-Components/addSkill.jsx";
import { EditProfile } from "./user-popUp-Components/editProfile.jsx";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { ViewJobDetails } from "./user-popUp-Components/viewJobDetails.jsx";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuFileCheck } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

function Application() {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [roleValues, setRoleValues] = useState([]);
  const [educationValues, setEducationValues] = useState([]);
  const [resumeValues, setResumeValues] = useState(null);
  const [showAddResume, setShowAddResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState(null);
  const [skillsValues, setSkillsValues] = useState(null);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileValues, setProfileValues] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showSuccessApply, setShowSuccessApply] = useState(false);
  const [showProfileMessage, setShowProfileMessage] = useState(false);
  const [showRoleMessage, setShowRoleMessage] = useState(false);
  const [showEducationMessage, setShowEducationMessage] = useState(false);
  const [showResumeMessage, setShowResumeMessage] = useState(false);
  const [showSkillsMessage, setShowSkillsMessage] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("page-enter");
    return () => {
      document.body.classList.remove("page-enter");
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (showProfileMessage || showRoleMessage || showEducationMessage || showResumeMessage || showSkillsMessage) {
      timer = setTimeout(() => {
        setShowProfileMessage(false);
        setShowRoleMessage(false);
        setShowEducationMessage(false);
        setShowResumeMessage(false);
        setShowSkillsMessage(false);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [showProfileMessage, showRoleMessage, showEducationMessage, showResumeMessage, showSkillsMessage]);

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setShowAddRole(true);
  };

  const handleAddRoleClick = () => {
    setSelectedRole(null);
    setShowAddRole(true);
  };

  const handleClose = () => {
    setShowAddRole(false);
    setSelectedRole(null);
    setShowRoleMessage(true);
  };

  const handleJustClose = () => {
    setShowAddRole(false);
    setSelectedRole(null);
  };

  const handleAddEducationClick = () => {
    setSelectedEducation(null);
    setShowAddEducation(true);
  };

  const handleEditEducationClick = (education) => {
    setSelectedEducation(education);
    setShowAddEducation(true);
  };

  const handleCloseEducation = () => {
    setShowAddEducation(false);
    setSelectedEducation(null);
    setShowEducationMessage(true);
  };

  const handleJustCloseEducation = () => {
    setShowAddEducation(false);
    setSelectedEducation(null);
  };

  const handleOnclick = (job) => {
    setShowJobDetail(true);
    setSelectedValue(job);
    console.log(job);
  };

  const handleEditProfile = () => {
    setSelectedProfile(profileValues);
    setShowEditProfile(true);
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber && phoneNumber.length > 2) {
      return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
    }
    return phoneNumber;
  };

  useEffect(() => {
    if (
      showAddRole ||
      showAddEducation ||
      showAddResume ||
      showAddSkills ||
      showJobDetail
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [
    showAddRole,
    showAddEducation,
    showAddResume,
    showAddSkills,
    showJobDetail,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/userLogin");
        console.error("No token found");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8000/api/ShowUserProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
  
        const data = await response.json();
        console.log(data);
  
        if (data && Array.isArray(data.experience)) {
          setRoleValues(data.experience);
        } else {
          setRoleValues([]);
        }
  
        if (data && Array.isArray(data.education)) {
          setEducationValues(data.education);
        } else {
          setEducationValues([]);
        }
  
        setProfileValues(data);
        setResumeValues(data.resume);
        setResumeFileName(
          data.resume
            ? data.resume
                .split("_")
                .slice(1)
                .join("_")
                .split("e")
                .slice(2)
                .join("e")
            : null
        );
        setSkillsValues(data.skills);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    // Fetch data when component mounts
    fetchData();
  
    // Fetch again when any of the message flags are true
    if (showProfileMessage || showRoleMessage || showEducationMessage || showResumeMessage || showSkillsMessage) {
      fetchData();
    }
  }, [navigate, showProfileMessage, showRoleMessage, showEducationMessage, showResumeMessage, showSkillsMessage]);
  

  const handleRoleDeleteClick = async (experienceId) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/api/DeleteExperience/${experienceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(experienceId);
      console.error("Error deleting experience:", error);
    }
  };
  const handleEduDeleteClick = async (educationId) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/api/DeleteEducation/${educationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(experienceId);
      console.error("Error deleting experience:", error);
    }
  };

  const myConstants = [
    {
      title: "Career History",
      value:
        "Add a personal summary to your profile as a way to introduce who you are",
      button: "Add role",
      userValue: roleValues,
      action: handleAddRoleClick,
      renderFunction: (value) => (
        <div className="border border-black px-4 py-2 w-[520px] flex justify-between rounded">
          <div>
            <p className="font-semibold text-lg text-gray-900">{value.title}</p>
            <div className="text-sm text-gray-900 font-light">
              <span>{value.companyName}</span>
              <span className="font-bold mx-[5px]">·</span>
              <span>{value.jobType}</span>
            </div>
            <div className="text-sm text-gray-500 font-light">
              <span>{value.startDate}</span>
              <span className=" mx-[5px]">-</span>
              <span>{value.endDate}</span>
            </div>
            <div className="text-sm text-gray-500 font-light">
              <span>{value.location}</span>
              <span className="font-bold mx-[5px]">·</span>
              <span>{value.locationType}</span>
            </div>
            <p className="text-base text-gray-900 font-light mt-[5px]">
              {value.description}
            </p>
          </div>
          <div className="flex item-center gap-1">
            <MdOutlineEdit onClick={() => handleEditClick(value)} />
            <MdDeleteOutline onClick={() => handleRoleDeleteClick(value.id)} />
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      value:
        "Include your most recent educational achievements and qualifications",
      button: "Add education",
      userValue: educationValues,
      action: handleAddEducationClick,
      renderFunction: (value) => (
        <div className="border border-black px-4 py-2 w-[520px] flex justify-between rounded">
          <div>
            <p className="font-semibold text-lg text-gray-900">
              {value.school}
            </p>
            <div className="text-sm text-gray-900 font-light">
              <span>{value.degree}</span>
            </div>
            <div className="text-sm text-gray-500 font-light">
              <span>{value.startDate}</span>
              <span className=" mx-[5px]">-</span>
              <span>{value.endDate}</span>
            </div>
            <div className="text-sm text-gray-500 font-light">
              <span>{value.grade}</span>
            </div>
            <p className="text-base text-gray-900 font-light mt-[5px]">
              {value.description}
            </p>
          </div>
          <div className="flex item-center gap-1">
            <MdOutlineEdit onClick={() => handleEditEducationClick(value)} />
            <MdDeleteOutline onClick={() => handleEduDeleteClick(value.id)} />
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <>
        <div className="loader"></div>
        <div className="flex justify-center mt-[630px]">
          {" "}
          <p className="text-3xl font-bold text-customBlue">" MMUJOB "</p>
        </div>
      </>
    );
  }

  const handleSubmit = async () => {
    const jobId = job.id;
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/ApplyJob/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
      setShowSuccessApply(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 401) {
        setApplied(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Header />
      {showSuccessApply ? (
        <section className="mx-[120px] mt-[100px] mb-[30px] justify-center flex flex-col items-center h-[600px]">
          <LuFileCheck size={150} color="#2471A3" />
          <p className="mt-8 text-2xl font-semibold">
            Nice work {profileValues.name}
          </p>
          <p className="text-xl">
            Your application has been sent to {job.company.name}
          </p>
        </section>
      ) : (
        <section className="mx-[120px] mt-[100px] mb-[30px]">
          {applied && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-6 flex items-center">
              <IoClose size={24} />
              <p className="text-sm ml-2">
                You have already applied for this job
              </p>
            </div>
          )}
          <div className="flex gap-8 items-center">
            <div className="w-[146px] h-[146px] px-2 py-2 bg-white border-[3px] border-gray-300 rounded-2xl">
              <img
                src={job.company.logo}
                alt="company logo"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-stone-700">Applying for</p>
              <p className="text-2xl font-bold">{job.jobTitle}</p>
              <p className="text-xl font-semibold">{job.company.name}</p>
              <p
                className="text-sm font-semibold underline underline-offset-4 text-stone-700"
                onClick={() => handleOnclick(job)}
              >
                view job description
              </p>
            </div>
          </div>
          <div className="profile flex drop-shadow-x my-10">
            <div>
              <p className="font-bold text-2xl">{profileValues.name}</p>
              <p className="text-base flex items-center gap-3">
                <IoLocationOutline />
                {profileValues.city}&nbsp;{profileValues.state}
              </p>
              <p className="text-base flex items-center gap-3">
                <FiPhone />
                {formatPhoneNumber(profileValues.phoneNumber)}
              </p>
              <p className="text-base flex items-center gap-3">
                <MdOutlineMail />
                {profileValues.email}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button
                className="border border-black px-4 py-1 text-xl"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mb-[40px] flex">
            <div>
              {myConstants.map((item, index) => (
                <div key={index} className="mb-[40px]">
                  <h1 className="font-bold text-[26px] mb-[30px] underline underline-offset-8">
                    {item.title}
                  </h1>
                  {Array.isArray(item.userValue) &&
                  item.userValue.length > 0 ? (
                    item.userValue.map((value, idx) => (
                      <div key={idx} className="mb-[10px]">
                        {item.renderFunction(value)}
                      </div>
                    ))
                  ) : (
                    <p className="text-lg ">{item.value}</p>
                  )}
                  <button
                    onClick={item.action}
                    className="text-lg border border-black px-4 py-1 mt-[10px] rounded"
                  >
                    {item.button}
                  </button>
                </div>
              ))}
              <div className="mb-[40px]">
                <h1 className="font-bold text-[26px] mb-[30px] underline underline-offset-8">
                  Resume
                </h1>
                {resumeValues ? (
                  <div className="border border-black px-4 py-2 w-[520px] flex justify-between rounded">
                    <a href={resumeValues} className="flex items-center gap-2">
                      <FaFileAlt />
                      {resumeFileName}
                    </a>
                  </div>
                ) : (
                  <p className="text-lg">
                    Upload a resumé for easy applying and access no matter where
                    you are.
                  </p>
                )}
                {resumeValues ? (
                  <button
                    onClick={() => setShowAddResume(true)}
                    className="text-lg border border-black px-4 py-1 mt-[10px] rounded"
                  >
                    Edit resume
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddResume(true)}
                    className="text-lg border border-black px-4 py-1 mt-[10px] rounded"
                  >
                    Add resume
                  </button>
                )}
              </div>
              <div>
                <h1 className="font-bold text-[26px] mb-[30px] underline underline-offset-8">
                  Skills
                </h1>
                {skillsValues ? (
                  <div className="border border-black px-4 py-2 w-[520px] flex justify-between rounded">
                    <p className="font-normal text-sm text-gray-900">
                      {skillsValues}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg">
                    Add your skills to show employers what you're good at
                  </p>
                )}
                {skillsValues ? (
                  <button
                    onClick={() => setShowAddSkills(true)}
                    className="text-lg border border-black px-4 py-1 mt-[10px] rounded"
                  >
                    Edit skills
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddSkills(true)}
                    className="text-lg border border-black px-4 py-1 mt-[10px] rounded"
                  >
                    Add skills
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            className="text-lg border-2 border-customBlue text-customBlue px-4 py-1 rounded"
            onClick={handleSubmit}
          >
            Submit application
          </button>
          {showJobDetail && (
            <ViewJobDetails
              job={selectedValue}
              onClose={() => setShowJobDetail(false)}
            />
          )}
          {showEditProfile && (
            <EditProfile
              justClose={() => {
                setShowEditProfile(false);
              }}
              onClose={() => {
                setShowEditProfile(false);
                window.location.reload();
              }}
              profile={selectedProfile}
            />
          )}
          {showAddRole && (
              <AddRole
                justClose={handleJustClose}
                onClose={handleClose}
                role={selectedRole}
              />
            )}
            {showAddEducation && (
              <AddEducation
                justClose={handleJustCloseEducation}
                onClose={handleCloseEducation}
                education={selectedEducation}
              />
            )}
            {showAddResume && (
              <AddResume
                justClose={() => {
                  setShowAddResume(false);
                }}
                onClose={() => {
                  setShowAddResume(false);
                  setShowResumeMessage(true);
                }}
              />
            )}
            {showAddSkills && (
              <AddSkill
                justClose={() => {
                  setShowAddSkills(false);
                }}
                onClose={() => {
                  setShowAddSkills(false);
                  setShowSkillsMessage(true)
                }}
                skills={skillsValues}
              />
            )}
            {showEditProfile && (
              <EditProfile
                justClose={() => {
                  setShowEditProfile(false);
                }}
                onClose={() => {
                  setShowEditProfile(false);
                  setShowProfileMessage(true)
                }}
                profile={selectedProfile}
              />
            )}
            {showProfileMessage && (
                <div className="addrole fixed inset-0 flex items-end justify-center mb-5">
                    <div className="p-4 rounded-2xl bg-customBlue text-white flex justify-between items-center">
                    <p>Profile updated successfully!</p>
                    <button
                        className="text-white ml-1"
                        onClick={() => setShowProfileMessage(false)}
                    >
                       <IoClose size={25}/>
                    </button>
                    </div>
                </div>
            )}
            {
                showRoleMessage && (
                    <div className="addrole fixed inset-0 flex items-end justify-center mb-5">
                        <div className="p-4 rounded-2xl bg-customBlue text-white flex justify-between items-center">
                            <p>Role updated successfully!</p>
                            <button
                                className="text-white ml-1"
                                onClick={() => setShowRoleMessage(false)}
                            >
                                <IoClose size={25}/>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                showEducationMessage && (
                    <div className="addrole fixed inset-0 flex items-end justify-center mb-5">
                        <div className="p-4 rounded-2xl bg-customBlue text-white flex justify-between items-center">
                            <p>Education updated successfully!</p>
                            <button
                                className="text-white ml-1"
                                onClick={() => setShowEducationMessage(false)}
                            >
                                <IoClose size={25}/>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                showResumeMessage && (
                    <div className="addrole fixed inset-0 flex items-end justify-center mb-5">
                        <div className="p-4 rounded-2xl bg-customBlue text-white flex justify-between items-center">
                            <p>Resume updated successfully!</p>
                            <button
                                className="text-white ml-1"
                                onClick={() => setShowResumeMessage(false)}
                            >
                                <IoClose size={25}/>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                showSkillsMessage && (
                    <div className="addrole fixed inset-0 flex items-end justify-center mb-5">
                        <div className="p-4 rounded-2xl bg-customBlue text-white flex justify-between items-center">
                            <p>Skills updated successfully!</p>
                            <button
                                className="text-white ml-1"
                                onClick={() => setShowSkillsMessage(false)}
                            >
                                <IoClose size={25}/>
                            </button>
                        </div>
                    </div>
                )
            }
        </section>
      )}

      <Footer />
    </>
  );
}

export default Application;
