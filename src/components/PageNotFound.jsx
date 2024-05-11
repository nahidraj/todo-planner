import React from "react";
import image from "../../public/images/not-found.gif";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="image py-10">
      <div className="img flex justify-center text-center">
        <div>
          <h2 className="font-roboto text-9xl font-bold relative z-10 -bottom-24">404</h2>
          <img src={image} className="h-[600px] object-cover"/>
        </div>
      </div>
      <div className="text-center relative z-10 -top-28">
        <h1 className="font-roboto text-3xl font-bold mb-2">Oops! Page not found.</h1>
        <h3 className="font-roboto text-sm font-normal"> We can't find the page you're looking for.</h3>
        <Link to="/login" className="bg-primary rounded py-4 px-9 inline-block mt-4 font-roboto text-base font-normal text-white uppercase">Back to Login</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
