const SetAuthToken = (token) => {
  localStorage.setItem("token", token);
};

const GetAuthToken = () => {
  return localStorage.getItem("token");
};

const SetUserDetails = (user) => {
  localStorage.setItem("userDetails", JSON.stringify(user));
};

const GetUserDetails = () => {
  return JSON.parse(localStorage.getItem("userDetails"));
};

const setEmail = (email) => {
  localStorage.setItem("email", email);
}

const getEmail = () => {
  return localStorage.getItem("email");
}

const setOtp = (otp) => {
  localStorage.setItem("otp", otp);
}

const getOtp = () => {
  return localStorage.getItem("otp");
}

const logOut = () => {
  localStorage.clear();
  window.location.href = "/login"
}

export {
  SetAuthToken,
  GetAuthToken,
  SetUserDetails,
  GetUserDetails,
  setEmail,
  getEmail,
  setOtp,
  getOtp,
  logOut
};