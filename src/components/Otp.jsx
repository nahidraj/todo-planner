import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import { otpVerificationRequest } from "../Api/api";
import { getEmail } from "../helper/SessionHealper";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(0);
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    setOtp(e);
    setOtpError("");
  }
  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      otpVerificationRequest(getEmail(), otp)
      .then((res) => {
        if (res === true) {
          navigate("/new-password");
        } else {
          setOtpError("Invalid OTP");
        }
      });
    } else {
      setOtpError("Invalid OTP");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full py-10 px-3 md:w-[45%] mx-auto flex flex-col justify-center md:p-8 2xl:py-10 2xl:px-40 ms-auto">
        <div className="mb-3 text-center">
          <label className="text-center block text-gray-700 text-2xl font-bold mb-8">
            Write you OTP
          </label>
          <div className="flex justify-center">
            <VerificationInput validChars="0-9" onChange={handlechange} />
          </div>
          {
            otpError &&
            <small className="text-red-500 block">{otpError}</small>
          }
          <button
            onClick={handleVerifyOtp}
            className="rounded mt-5 mb-5 bg-primary text-base text-white font-roboto font-semibold h-[42px] px-5 hover:bg-black transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
