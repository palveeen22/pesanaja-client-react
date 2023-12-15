import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Products from "./Home/Products";
import Cart from "../Pages/Home/Carts/Cart";
import { Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../assets/a1.json";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi waktu tunggu selama 2 detik sebelum menghilangkan Loader
    setTimeout(() => {
      setIsLoading(false);
    }, 2300);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} loop={true} />
        </div>
      ) : (
        <section className="paddingXShorter2 flex justify-between bg-[#f2f2f2] gap-4 min-h-screen">
          <Sidebar />
          <Outlet />
          {/* <Products /> */}
          <Cart />
        </section>
      )}
    </>
  );
};

export default Homepage;
