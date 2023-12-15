import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Lottie from "lottie-react";
import gif from "../assets/animation1.json";
import { Link, useNavigate } from "react-router-dom";

const HistoryTransaction = ({ url }) => {
  const [dataCart, setDataCart] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${url}/my-cart`, config);
      setDataCart(data.data);
      // console.log(data.data, "<====");
    } catch (error) {
      console.log(error);
    }
  };

  const finishCart = async () => {
    try {
      await axios.delete(`${url}/my-cart/clear`, config);
      // console.log("Cart cleared successfully");
      getCart();
      setDataCart({});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
    finishCart();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="flex flex-col justify-center items-center h-screen">
        <h3 className="text-[#595959] px-4">
          Terima kasih Pesanajaners, Pembelian kamu diterima, <br /> Kurir kamu
          akan menuju lokasimu dalam 15 menit..
        </h3>
        <Lottie animationData={gif} loop={true} />
        <Link to={`/`}>
          <button
            className="bg-[#ff335f] flex justify-center rounded-full hover:rounded-xl hover:gap-4 p-3"
            onClick={finishCart}
          >
            <p className="text-sm text-[#ffffff]">Kembali Ke Halaman Utama</p>
            <Icon icon="ph:arrow-right-light" color="#ffffff" width={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HistoryTransaction;
