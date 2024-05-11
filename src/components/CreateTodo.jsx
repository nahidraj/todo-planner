import React, { useState } from "react";
import { toast } from "react-toastify";
import { TodoCreate } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // error validation
  const [titleError, setTitleError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrorMsg("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required");
    }
    if (description === "") {
      setErrorMsg("Description is required");
    } else {
      setLoading(true);
      TodoCreate(title, description).then((result) => {
        if (result) {
          navigate("/new-plan");
        }
      });
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div className="max-w-[700px] mx-auto bg-white p-6">
        <div className="mb-3">
          <h3 className="font-roboto font-bold text-2xl mb-6">Create ToDo</h3>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-base font-normal mb-2"
            htmlFor="username"
          >
            Title
          </label>
          <input
            onChange={handleTitle}
            className={
              "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
            }
            type="text"
            placeholder="First Name"
          />
          <small className="text-red-600 font-semibold">{titleError}</small>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-base font-normal mb-2"
            htmlFor="username"
          >
            Description
          </label>
          <textarea
            onChange={handleDescription}
            rows="4"
            className={
              "border border-black border-opacity-15 rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:border-opacity-100"
            }
          ></textarea>
          <small className="text-red-600 font-semibold">{errorMsg}</small>
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
              Create Todo
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateTodo;
