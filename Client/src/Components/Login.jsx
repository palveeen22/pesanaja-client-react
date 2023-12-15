import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "antd/es/typography/Link";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ url }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const input = { email, password };
      const { data } = await axios.post(`${url}/login`, input);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Login sucesfull",
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  };

  const googleLogin = async (codeResponse) => {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  function passwordOnChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div
      className="flex justify-center  items-center min-h-screen bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://808.media/wp-content/uploads/2021/10/samocat.jpg)",
      }}
    >
      <div className="absolute bg-gradient-to-b bg-[#ff335f] opacity-75 inset-0 z-0"></div>
      <form
        className="flex justify-center self-center z-10"
        onSubmit={handleLogin}
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
                Don't have an account yet?
              </p>
              <a
                rel="noopener noreferrer"
                href="/register"
                className="hover:underline text-[#ff335f] text-sm"
              >
                Create an Account
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-[#ff335f] hover:bg-[#89CFF0] text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="pt-5 text-center text-gray-400 text-xs">
            <p className="text-sm">Войти с помощью</p>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
            {/* <div className="flex justify-center gap-4">
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
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
