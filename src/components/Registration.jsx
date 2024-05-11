import { useState } from "react";
import backgroundImage from "../../public/images/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { RegistrationRequest } from "../Api/api";

const Registration = () => {
  // select all fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // for error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // field validation
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  // form submission
  const handleRegistration = (e) => {
    e.preventDefault();
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "") {
      setFirstNameError("Please enter your first name");
    }
    if (lastName === "") {
      setLastNameError("Please enter your last name");
    }
    if (email === "") {
      setEmailError("Please enter your email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Please enter your password");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setLoading(true);
      let profilePicture = 'https://i.ibb.co/tbY7HND/depositphotos-133351928-stock-illustration-default-placeholder-man-and-woman.webp';

      RegistrationRequest(firstName, lastName, email, password, profilePicture)
        .then((result) => {
          if (result === true) {
            setLoading(false);
            navigate('/login');
          }
          else {
            setEmailError("Email already in use")
            setLoading(false);
          }
        })
    }
  };

  return (
    <>
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
          <h2 className="text-3xl font-roboto font-semibold text-black tracking-wider mb-8">
            Sign Up
          </h2>
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-base font-normal mb-2"
                htmlFor="username"
              >
                First Name
              </label>
              <input
                onChange={handleFirstName}
                className={firstNameError ? 'border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100' : 'border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100'}
                type="text"
                placeholder="First Name"
              />
              <small className="text-red-600 font-semibold">
                {firstNameError}
              </small>
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-base font-normal mb-2"
                htmlFor="username"
              >
                Last Name
              </label>
              <input
                onChange={handleLastName}
                className={lastNameError ? 'border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100' : 'border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100'}
                type="text"
                placeholder="Last Name"
              />
              <small className="text-red-600 font-semibold">
                {lastNameError}
              </small>
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-base font-normal mb-2"
                htmlFor="username"
              >
                Email Address
              </label>
              <input
                onChange={handleEmail}
                className={emailError ? 'border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100' : 'border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100'}
                type="email"
                placeholder="Email Address"
              />
              <small className="text-red-600 font-semibold">{emailError}</small>
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-base font-normal mb-2"
                htmlFor="username"
              >
                Password
              </label>
              <input
                onChange={handlePassword}
                className={passwordError ? 'border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100' : 'border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100'}
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
                Confirm Password
              </label>
              <input
                onChange={handleConfirmPassword}
                className={confirmPasswordError ? 'border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100' : 'border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100'}
                type="password"
                placeholder="Confirm Password"
              />
              <small className="text-red-600 font-semibold">
                {confirmPasswordError}
              </small>
            </div>

            <div className="mt-5">
              {
                loading ?
                  <button disabled={true} className="rounded mb-5 w-full bg-gray-300 text-lg text-white font-roboto font-semibold h-[65px] px-5 flex justify-center items-center">
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
                  :
                  <button className="rounded mb-5 w-full bg-primary text-lg text-white font-roboto font-semibold h-[65px] px-5 hover:bg-black transition-all duration-300">
                    Sign Up
                  </button>
              }
            </div>
          </form>
          <p className="font-roboto text-base text-black text-center font-normal">
            Allready have an account?{" "}
            <Link to="/login" className="text-primary underline font-medium" href="#">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
