import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../public/images/login-bg.jpg";
import { sendEmailVerificationRequest } from "../Api/api";
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  // for error messages
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  // form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("Please enter your email");
    } else {
      setEmailError("");
    }
    if (email !== "") {
      setLoading(true);
      sendEmailVerificationRequest(email)
        .then((res) => {
          if (res === true) {
            setLoading(false);
            setTimeout(() => {
              navigate("/otp-verification")
            }, 400);
          }
          else {
            setLoading(false);
            setEmailError("User not found");
          }
        })
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
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-base font-normal mb-2"
              htmlFor="username"
            >
              Forgot your password?
            </label>
            <input
              onChange={handleEmail}
              className={
                emailError
                  ? "border border-red-500 border-opacity-100 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
                  : "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
              }
              type="text"
              placeholder="Email Address"
            />
            <small className="text-red-600 font-semibold">{emailError}</small>
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
                Sent
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
