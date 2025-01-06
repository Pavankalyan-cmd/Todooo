import TodoIndex from "../Landingpage/todoIndex.jsx";
import { Route, Routes } from "react-router-dom";
import TodoSignup from "../Signup/todoSignup";
import { ToastContainer } from "react-toastify";

import TodoDashboard from "../../components/SIidebar/todoSidebar";
import TodoLogin from "../Loginpage/todoLogin";

export default function TodoMain() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<TodoIndex />} />
        <Route path="/signup" element={<TodoSignup />} />
        <Route path="/login" element={<TodoLogin />} />
        <Route path="/home" element={<TodoDashboard />} />
      </Routes>
    </div>
  );
}
