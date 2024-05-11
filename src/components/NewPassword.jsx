import React, { useState } from "react";
import backgroundImage from "../../public/images/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { resetPasswordRequest } from "../Api/api";
import { getEmail, getOtp } from "../helper/SessionHealper";
import { toast } from "react-toastify";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password === "") {
      setPasswordError("Please enter your password");
    }
    if (newpassword === "") {
      setNewPasswordError("Please enter your Confirm password");
    }
    if (password !== newpassword) {
      setNewPasswordError("Passwords do not match");
    } else {
      resetPasswordRequest(getEmail(), getOtp(), password).then((res) => {
        if (res === true) {
          toast.success("Password changed successfully")
          navigate("/login");
          localStorage.clear();
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:block w-[50%] h-screen bg-no-repeat bg-center bg-cover fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-primary bg-opacity-80 w-full h-full flex flex-col justify-center p-6 xl:p-10 2xl:p-24">
          <h1 className="text-4xl md:text-2xl lg:text-3xl 2xl:text-5xl font-roboto font-semibold text-white tracking-wider">
            Welcome to Todo Planner!
          </h1>
          <p className="font-roboto text-base text-white font-normal leading-[26px] xl:leading-[28px] mt-8">
            Thank you for choosing Todo Planner! Our platform is designed to
            help you organize your tasks and manage your time effectively.
            Whether you're a student, professional, or anyone in need of task
            management, Todo Planner has got you covered.
          </p>
        </div>
      </div>
      <div className="w-full py-10 px-3 md:w-[50%] flex flex-col justify-center md:p-8 2xl:py-10 2xl:px-40 ms-auto">
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-base font-normal mb-2"
              htmlFor="username"
            >
              New Password
            </label>
            <input
              onChange={handlePassword}
              className={
                passwordError
                  ? "border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
                  : "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
              }
              type="password"
              placeholder="Password"
            />
            <small className="text-red-600 font-semibold">
              {passwordError}
            </small>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-base font-normal mb-2"
              htmlFor="username"
            >
              Confirm New Password
            </label>
            <input
              onChange={handleNewPassword}
              className={
                passwordError
                  ? "border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
                  : "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
              }
              type="password"
              placeholder="Password"
            />
            <small className="text-red-600 font-semibold">
              {newPasswordError}
            </small>
          </div>
          <div className="mt-5">
            {loading ? (
              <button
                disabled={true}
                className="rounded mb-5 w-full bg-gray-300 text-lg text-white font-roboto font-semibold h-[65px] px-5 flex justify-center items-center"
              >
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            ) : (
              <button className="rounded mb-5 w-full bg-primary text-lg text-white font-roboto font-semibold h-[65px] px-5 hover:bg-black transition-all duration-300">
                Change Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
