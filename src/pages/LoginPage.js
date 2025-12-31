import React from "react";
import Template from "../component/core/HomePage/Auth/Template";
import logo from "../assets/Logo/graphic2.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (user) {
    navigate("/");
    return null;
  }
  return (
    <div className="max-h-[cal(100vh-3.5rem)]">
      <Template
        img1={logo}
        heading={"Welcome Back"}
        subheading1={"Build skills for today, tomorrow, and beyond."}
        subheading2={"Education to future-proof your career."}
        formType={"login"}
      ></Template>
    </div>
  );
}

export default LoginPage;
