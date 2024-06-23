import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegBell } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Job Seekers", link: "/jobSeekerTable", icon: AiOutlineUser },
    { name: "Employer", link: "/employerTable", icon: BsBuildings },
    { name: "Posted Job", link: "/adminTable", icon: TbReportAnalytics, margin: true },
    { name: "Job Categories", link: "/categoryTable", icon: MdStorage },
    { name: "Review", link: "/reviewTable", icon: MdOutlineMessage },
    { name: "User Subscribe", link: "/userSubscribeTable", icon: FaRegBell}
  ];

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogout = () => {
    const token = Cookies.get('adminToken');
    setLoading(true);

    axios.get('http://localhost:8000/api/AdminLogout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data);
        Cookies.remove('adminToken');
        sessionStorage.setItem('logoutInitiated', 'true');
        setLoading(false);
        navigate('/adminLogin'); // Navigate after logout
    })
    .catch(error => {
        console.error('There was an error!', error);
        setLoading(false);
    });
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#212F3C] min-h-screen flex flex-col justify-between ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div>
          <div className="py-3 flex justify-between">
            {open && (
              <div className="text-2xl text-gray-100 font-semibold ml-1">
                "MMUJOB"
              </div>
            )}
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Link
            onClick={handleLogout}
            to="/adminLogin"
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div><FiLogOut size={20} /></div>
            <h2
              style={{
                transitionDelay: `800ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Log Out
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              Log Out
            </h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
