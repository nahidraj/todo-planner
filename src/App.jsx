import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewTodoPage from "./pages/NewTodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import ProgressTodoPage from "./pages/ProgressTodoPage";
import CompletedTodoPage from "./pages/CompletedTodoPage";
import CanceledTodoPage from "./pages/CanceledTodoPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import ForgetPassword from "./components/ForgetPassword";
import Otp from "./components/Otp";
import NewPassword from "./components/NewPassword";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import OtpPage from "./pages/OtpPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import { GetAuthToken } from "./helper/SessionHealper";
import PageNotFound from "./components/PageNotFound";

function App() {
  if (GetAuthToken()) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create-plan" element={<CreateTodoPage />}></Route>
          <Route path="/new-plan" element={<NewTodoPage />}></Route>
          <Route path="/completed-plan" element={<CompletedTodoPage />}></Route>
          <Route path="/progress-plan" element={<ProgressTodoPage />}></Route>
          <Route path="/canceled-todo" element={<CanceledTodoPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/login" element={<Navigate to="/" replace />}></Route>
          <Route path="/registration" element={<Navigate to="/" replace />}></Route>
          <Route path="/forgot-password" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/forgot-password"
            element={<ForgetPasswordPage />}
          ></Route>
          <Route path="/otp-verification" element={<OtpPage />}></Route>
          <Route path="/new-password" element={<NewPasswordPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/" element={<Navigate to="/login" replace />}></Route>

        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

// api link:
// https://todo-planner-mern-app.onrender.com/
