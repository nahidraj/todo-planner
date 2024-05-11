import { toast } from "react-toastify";

import axios from "axios";
import {
  GetAuthToken,
  SetAuthToken,
  SetUserDetails,
  logOut,
  setEmail,
  setOtp,
} from "../helper/SessionHealper";
import { setProfile } from "../redux/slices/profileSlice";
import store from "./../redux/store/store";
import {
  setCanceled,
  setCompleted,
  setNew,
  setProgress,
} from "../redux/slices/todoSlice";
import { setTotal } from "../redux/slices/todosSummery";
const baseUrl = "https://todo-planner-mern-app.onrender.com/api/v1";

const token = { headers: { token: GetAuthToken() } };

// registration
export function RegistrationRequest(
  firstName,
  lastName,
  email,
  password,
  photo
) {
  let url = `${baseUrl}/registration`;
  let postBody = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    photo: photo,
  };

  return axios
    .post(url, postBody)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "failed") {
          if (response.data.data.keyPattern.email === 1) {
            toast.error("Email already in use");
            return false;
          } else {
            toast.error("Something went wrong");
            return false;
          }
        } else {
          toast.success("Registration successful");
          return true;
        }
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((error) => {
      toast.error("Something went wrong");
      return false;
    });
}

// login
export function LoginRequest(email, password) {
  let url = `${baseUrl}/login`;
  let postBody = {
    email: email,
    password: password,
  };
  return axios
    .post(url, postBody)

    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "failed") {
          if (response.data.data === "User not found") {
            return { message: "User not found" };
          } else if (response.data.data === "Invalid password") {
            return { message: "Invalid password" };
          } else {
            toast.error("Something went wrong");
            return false;
          }
        } else {
          SetAuthToken(response.data.token);
          SetUserDetails(response.data.data);
          toast.success("Login Successfully");
          // console.log("User details", response.data.data, "token", response.data.token);
          return true;
        }
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch(() => {
      toast.error("Something went wrong");
      return false;
    });
}

// send email verification request
export function sendEmailVerificationRequest(email) {
  const url = baseUrl + `/recover-verify-email/${email}`;
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.status === "failed") {
          toast.error("User not found");
          return false;
        } else {
          toast.success("Email sent succcessfully");
          setEmail(email);
          return true;
        }
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((error) => {
      toast.error("Something went wrong");
      return false;
    });
}

// otp verification request
export function otpVerificationRequest(email, otp) {
  let url = `${baseUrl}/otp-verify/${email}/${otp}`;
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      if (response.data.status === "failed") {
        toast.error("Invalid Otp");
        return false;
      } else {
        setOtp(otp);
        toast.success("Otp verified successfully");
        return true;
      }
    } else {
      toast.error("Something went wrong");
      return false;
    }
  });
}

// reset password
export function resetPasswordRequest(email, otp, password) {
  let url = `${baseUrl}/reset-password`;
  let postBody = {
    email: email,
    otp: otp,
    password: password,
  };
  return axios
    .post(url, postBody)
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      toast.error("Something went wrong");
      return false;
    });
}

// get profile details
export function GetProfileDetails() {
  let url = `${baseUrl}/profile-details`;
  return axios
    .get(url, token)
    .then((response) => {
      if (response.status === 200) {
        store.dispatch(setProfile(response.data.data));
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        // logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// profile update
export function ProfileUpdate(firstName, lastName, email, photo) {
  let url = `${baseUrl}/profile-update`;
  let postBdoy = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    photo: photo,
  };
  let userDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    photo: photo,
  };
  return axios
    .post(url, postBdoy, token)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        SetUserDetails(userDetails);
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// create todo
export function TodoCreate(title, description) {
  let url = `${baseUrl}/create-todo`;
  let postBdoy = {
    title: title,
    description: description,
    status: "New",
  };
  return axios
    .post(url, postBdoy, token)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Todo created successfully");
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// todo list by status
export function TodoListByStatus(status) {
  let url = `${baseUrl}/todo-list-by-status/${status}`;
  return axios
    .get(url, token)
    .then((res) => {
      if (res.status === 200) {
        if (status === "New") {
          store.dispatch(setNew(res.data.data));
        } else if (status === "Progress") {
          store.dispatch(setProgress(res.data.data));
        } else if (status === "Completed") {
          store.dispatch(setCompleted(res.data.data));
        } else if (status === "Canceled") {
          store.dispatch(setCanceled(res.data.data));
        }
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// delete todo
export function DeleteTodo(id) {
  let url = `${baseUrl}/delete-todo/${id}`;
  return axios
    .get(url, token)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Todo deleted successfully");
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// update todo
export function UpdateTodo(id, status) {
  let url = `${baseUrl}/update-todo-status/${id}/${status}`;
  return axios
    .get(url, token)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Todo updated successfully");
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}

// totalTodos summery
export function TotalTodos() {
  let url = `${baseUrl}/todo-count-by-status`;
  return axios
    .get(url, token)
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setTotal(res.data.data));
        return true;
      } else {
        toast.error("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.error("Something went wrong1");
        logOut();
      } else {
        toast.error("Something went wrong2");
        return false;
      }
    });
}
