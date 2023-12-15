import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Link from "antd/es/typography/Link";
import Swal from "sweetalert2";

const ProfileForm = ({ url }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  // const inputOnChangeHandler = (e) => {
  //   const input = e.target.files[0];
  //   setImageUrl(input);
  // };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", imageUrl);
    // formData.append("firstname", firstname);
    // formData.append("lastname", lastname);
    // formData.append("address", address);
    const body = {
      firstname,
      lastname,
      address,
    };
    try {
      await axios.post(`${url}/customer/profile`, body, config);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success upload profile",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="bg-[#ff335f] flex justify-center  items-center min-h-screen bg-no-repeat bg-cover bg-center relative">
      <form
        className="flex justify-center self-center z-10"
        onSubmit={handleCreateProfile}
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
            <div className="flex justify-between gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  First Name
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                  type="text"
                  placeholder="jhon"
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Last Name
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                  type="text"
                  placeholder="smith"
                  onChange={handleLastNameChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Address
                </label>
                <textarea
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                  type="text"
                  placeholder="Adelya Kutuya 2"
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            {/* <div>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Attach Document
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-30 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500">
                        <span className="text-sm flex gap-2">
                          Drag and drop
                        </span>
                        files here <br /> or
                        <a className="text-blue-600 hover:underline">
                          select a file
                        </a>
                        from your computer
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="file"
                      id="file-upload"
                      name="file-upload"
                      onChange={inputOnChangeHandler}
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: doc,pdf,types of images</span>
              </p>
            </div> */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-[#ff335f] hover:bg-[#89CFF0] text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
