import React, { useEffect, useState } from "react";
import { GetProfileDetails, ProfileUpdate } from "../Api/api";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  // for error messages
  // const [firstNameError, setFirstNameError] = useState("");
  // const [lastNameError, setLastNameError] = useState("");

  // api call start
  useEffect(() => {
    GetProfileDetails().then(() => {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPhoto(profile.photo);
    });
  }, [profile.firstName, profile.lastName, profile.email, profile.photo]);

  // base 64 image converter
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    // const base64 = await convertToBase64(file);
    // setPhoto(base64);
    convertToBase64(file)
      .then((res) => {
        setPhoto(res);
      })
      .catch((err) => console.log(err));
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && photo) {
      ProfileUpdate(firstName, lastName, email, photo).then((result) => {
        if (result) {
          navigate("/");
        }
      });
    } else {
      toast.error("Profile Update Failed");
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="max-w-[700px] mx-auto bg-white p-6">
        <div className="mb-3">
          <div className="image mb-3">
            <img
              className="w-[150px] h-[150px] bg-green-500 rounded-full object-cover object-center"
              src={photo ? photo : profile?.photo}
              alt="Photo"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-base font-normal mb-2"
              htmlFor="username"
            >
              Profile Image
            </label>
            <input
              onChange={handleImage}
              className={
                "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
              }
              type="file"
              placeholder="First Name"
            />
            {/* <small className="text-red-600 font-semibold"></small> */}
          </div>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-base font-normal mb-2"
            htmlFor="username"
          >
            First Name
          </label>
          <input
            defaultValue={profile.firstName}
            onChange={handleFirstName}
            className={
              "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
            }
            type="text"
            placeholder="First Name"
          />
          {/* <small className="text-red-600 font-semibold">{firstNameError}</small> */}
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-base font-normal mb-2"
            htmlFor="username"
          >
            Last Name
          </label>
          <input
            defaultValue={profile.lastName}
            onChange={handleLastName}
            className={
              "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
            }
            type="text"
            placeholder="First Name"
          />
          {/* <small className="text-red-600 font-semibold">{lastNameError}</small> */}
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-base font-normal mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            readOnly
            defaultValue={profile.email}
            onChange={handleEmail}
            className={
              "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none bg-gray-100"
            }
            type="text"
            placeholder="nahidraj.web@gmail.com"
          />
          {/* <small className="text-red-600 font-semibold"></small> */}
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
              Update
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;
