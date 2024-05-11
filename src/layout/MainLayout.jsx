import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoCheckmarkDoneCircleOutline,
  IoClose,
  IoCreateSharp,
  IoNewspaperOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdOutlineCancel } from "react-icons/md";
import { MdOutlineDonutSmall } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { GetUserDetails, logOut } from "../helper/SessionHealper";

const MainLayout = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className=" min-h-screen">
      {/* menu start */}
      <div className="flex justify-between py-4 px-4 items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-black font-roboto capitalize font-bold text-2xl"
          >
            Todo Planner
          </Link>
        </div>
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-black cursor-pointer border-2 border-[#D2D5D9] overflow-hidden"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={GetUserDetails().photo}
              alt=""
            />
          </div>

          {showProfile && (
            <div className="absolute top-14 right-0 bg-[#E9EEF6] shadow w-[340px] rounded-2xl px-4 py-8">
              <IoClose
                onClick={() => setShowProfile(false)}
                className="cursor-pointer text-2xl absolute top-4 right-4"
              />
              <div className="flex gap-5 items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white cursor-pointer overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={GetUserDetails().photo}
                    alt="Profile"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-roboto font-medium text-black">
                    {GetUserDetails().firstName} {GetUserDetails().lastName}
                  </h1>
                  <p className="text-sm font-roboto font-normal text-black">
                    {GetUserDetails().email}
                  </p>
                </div>
              </div>
              <ul className="mt-6 border border-t-black border-opacity-15">
                <Link
                  to="/profile"
                  className="text-base font-roboto font-normal text-black flex items-center mt-4"
                >
                  <CgProfile className="mr-3" /> Your Profile
                </Link>
                <div
                  onClick={() => logOut()}
                  className="cursor-pointer text-base font-roboto font-normal text-black flex items-center mt-4"
                >
                  <MdLogout className="mr-3" /> Log Out
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* sidebar and main content start */}
      <div className="flex justify-between">
        <div className="w-[270px] bg-[#111C43] p-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
            to="/"
          >
            <MdOutlineDonutSmall className="mr-4" /> All
          </NavLink>
          <NavLink
            to="/create-plan"
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
          >
            <IoCreateSharp className="mr-4" /> Create
          </NavLink>
          <NavLink
            to="/new-plan"
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
          >
            <IoNewspaperOutline className="mr-4" /> New
          </NavLink>
          <NavLink
            to="/progress-plan"
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
          >
            <GiProgression className="mr-4" /> Progress
          </NavLink>
          <NavLink
            to="/completed-plan"
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
          >
            <IoCheckmarkDoneCircleOutline className="mr-4" /> Completed
          </NavLink>
          <NavLink
            to="/canceled-todo"
            className={({ isActive }) =>
              isActive
                ? "bg-[#283664] text-base font-roboto font-medium text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
                : "text-base font-roboto font-normal text-white flex items-center py-2 px-6 rounded-md cursor-pointer"
            }
          >
            {" "}
            <MdOutlineCancel className="mr-4" />
            Canceled
          </NavLink>
        </div>
        <div className="main_content_body bg-[#F0F1F7] flex-grow p-6">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
