import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "antd/es/typography/Link";

const Register = ({ url }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const input = { email, password, userName };
      await axios.post(`${url}/register`, input);
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Register success, please Login",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.data.error,
        icon: "error",
      });
    }
  };

  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  function userNameOnChange(e) {
    setUserName(e.target.value);
  }

  return (
    <div
      className="flex justify-center  items-center min-h-screen bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1682146662576-900a71864a11?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="absolute bg-gradient-to-b bg-[#ff335f] opacity-75 inset-0 z-0"></div>

      <form
        className="flex justify-center self-center z-10"
        onSubmit={handleRegister}
      >
        <div className="p-12 bg-white mx-auto rounded-2xl w-100">
          <div className="mb-4">
            {/* <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3> */}
            <a href="/">
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                {/* <Icon icon="ic:outline-arrow-back" /> */}
                <Icon
                  icon="simple-icons:producthunt"
                  width={40}
                  color="#ff335f"
                />
                <h3 className="text-[#ff335f] text-xl">Pesenaja</h3>
              </div>
            </a>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Username
              </label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                type="text"
                placeholder="jhondoe22"
                onChange={userNameOnChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                type="text"
                placeholder="mail@gmail.com"
                onChange={emailOnChange}
              />
            </div>
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                type="password"
                placeholder="Enter your password"
                onChange={passwordOnChange}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-center text-[#000000]">
                I already have an account
              </p>
              <a
                rel="noopener noreferrer"
                href="/login"
                className="hover:underline text-[#ff335f] text-sm"
              >
                Login
              </a>
            </div>
            <div>
              <Link to={`/login`}>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-[#ff335f] hover:bg-[#89CFF0] text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </Link>
            </div>
          </div>
          <div className="pt-5 text-center text-gray-400 text-xs">
            <p className="text-sm">Войти с помощью</p>
            <div className="flex justify-center gap-4">
              <Icon
                icon="flat-color-icons:google"
                width={40}
                className="cursor-pointer"
              />
              <Icon
                icon="mdi:github"
                width={40}
                color="#000000"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
