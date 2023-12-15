import React, { useEffect, useState } from "react";
import CardProduct from "./Components/CardProduct";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from "../../Store/Slice";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { category, discount } from "../../Constans/Constans";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";

const Products = ({ url }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `${url}/my-cart/${productId}`,
        { productId: productId },
        config
      );
      dispatch(
        APIrequest({
          method: "GET",
          apiEndpoint: `${url}/my-cart`,
          options: {
            headers: config.headers,
          },
          callbackArray: [handleApiRequestComplete],
        })
      );
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setData(data.data);
      // console.log(data.data, "xixix");
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  useEffect(() => {
    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `${url}/my-cart`,
        options: {
          headers: config.headers,
        },
        callbackArray: [handleApiRequestComplete],
      })
    );
  }, [dispatch]);

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://7hhf7ptr-3000.asse.devtunnels.ms/products-public`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col w-[63%] gap-6">
      <div className="h-24 bg-white rounded-b-xl paddingTopShorter2 paddingXShorter3">
        {/* {isWorking ? (
          <div className="flex justify-center gap-2 items-center">
            <Icon icon="ri:moon-fill" width={40} color="#595959" />
            <h3 className="text-[#595959] text-lg">
              Работаем с 07:00 до 00:00
            </h3>
          </div>
        ) : ( */}
        <div className="flex justify-center gap-2 items-center">
          <Icon icon="humbleicons:sun" width={40} color="#FFCC33" />
          <h3 className="text-[#595959] text-lg">
            Hello! We are ready for you..
          </h3>
        </div>
        {/* )} */}
      </div>
      <div className="bg-white min-h-screen rounded-xl paddingXShorter3">
        <div className="relative w-full paddingYShorter2">
          <input
            type="text"
            className="w-full bg-[#f2f2f2] rounded-full px-2 h-14 text-[#000000] hover:bg-[#f8f7f5]"
            placeholder="Find what you looking for.."
            style={{ paddingLeft: "2rem" }}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 bg-[#ff335f] text-[#ffffff] text-sm rounded-full">
            Найти
          </button>
        </div>

        {/* header */}
        <section className="py-4 overflow-y-auto" style={{ height: "91vh" }}>
          {/* <section className="py-4"> */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {category?.map((e) => {
              return (
                <card className="relative flex flex-col justify-center overflow-hidden rounded-3xl ">
                  <div className="h-70 rounded-xl w-70 relative">
                    <img
                      src={e?.image}
                      className="h-full w-full object-cover overflow-hidden"
                      alt="Villa"
                    />
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-25 rounded-xl"></div>
                    <p className="absolute top-5 left-2 text-base text-white rounded-full px-2 py-1 ">
                      {e?.text}
                    </p>
                  </div>
                </card>
              );
            })}
          </div>
          {/* </section> */}

          {/* discount product */}
          <section className="flex flex-col">
            <h3 className="text-[#595959] text-3xl my-6">
              Discount, from Pesenaja
            </h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
              {discount?.map((e) => {
                return (
                  <card className="relative flex flex-col justify-center overflow-hidden rounded-3xl ">
                    <div className="h-70 rounded-xl w-70 relative">
                      <img
                        src={e?.image}
                        className="h-full w-full object-cover overflow-hidden"
                        alt="Villa"
                      />
                      <p className="absolute top-4 left-3 text-base text-[#000000] rounded-full px-2 py-1 ">
                        {e?.text}
                      </p>
                    </div>
                  </card>
                );
              })}
            </div>
          </section>

          {/* konten product */}
          <section className="flex flex-col">
            <h3 className="text-[#595959] text-3xl my-6">Today, for you</h3>
            <div className="grid grid-cols-4 gap-4">
              <CardProduct data={data} handleAddToCart={handleAddToCart} />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Products;
