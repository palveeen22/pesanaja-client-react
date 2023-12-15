import { useState, useEffect } from "react";
import ModalLogin from "../../../Components/ModalLogin";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import CardCart from "./Components/CardCart";
import animation from "../../../assets/animation1.json";
import ProfileCard from "../Components/ProfileCard";
import img from "../../../assets/empty.png";
import formatCurrency from "../../../Utils/FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from "../../../Store/Slice";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [dataCart, setDataCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoices, setInvoices] = useState({});
  const dispatch = useDispatch();

  const url = "http://localhost:3000";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const showProfile = () => {
    setOpenProfile(true);
  };

  const closeProfile = () => {
    setOpenProfile(false);
  };

  const handleMapOpen = () => {
    setOpenMap(true);
  };

  const handleMapClose = () => {
    setOpenMap(false);
  };

  const getMe = async () => {
    try {
      const { data } = await axios.get(`${url}/customer/getMe`, config);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success logout",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login");
  };

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`${url}/my-cart/${cartId}`, config);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setDataCart(data.data);
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

  // const handleApiRequestComplete = (data, error) => {
  //   if (data) {
  //     // Handle success
  //     setDataCart(data.data);
  //   } else {
  //     // Handle error
  //     // (nothing specific to do in this case)
  //   }
  // };

  // useEffect(() => {
  //   dispatch(
  //     APIrequest({
  //       method: "GET",
  //       apiEndpoint: `${url}/my-cart`,
  //       options: {
  //         headers: config.headers, // Pass headers directly in options
  //       },
  //       callbackArray: [handleApiRequestComplete],
  //     })
  //   );
  // }, [dispatch]);

  // const handleDelete = async (cartId) => {
  //   try {
  //     await axios.delete(`${url}/my-cart/${cartId}`, config);
  //     // getCart(); // Fetch cart data again after deleting
  //     handleApiRequestComplete();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const calculateTotalPrice = (cart) => {
    let total = 0;
    if (cart && cart.length > 0) {
      cart.forEach((e) => {
        const { Product } = e;
        // console.log(Product, "xoxox");
        const itemTotalPrice = Product.price;
        // console.log(itemTotalPrice, "xixix");
        total += itemTotalPrice;
        setTotalPrice(total);
      });
    }
  };

  const fecthInvoices = async () => {
    try {
      const { data } = await axios.post(
        `https://7hhf7ptr-3000.asse.devtunnels.ms/transaction/invoiceXendit`,
        null,
        config
      );
      setInvoices(data);
      // finishCart(); // Membersihkan cart setelah pembayaran selesai
      // navigate("/history"); // Mengarahkan pengguna ke halaman /history
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    // getCart(); // Commented out as it's not defined in the code you provided
    setToken(localStorage.access_token);
  }, []);

  useEffect(() => {
    calculateTotalPrice(dataCart);
  }, [dataCart]);

  useEffect(() => {
    fecthInvoices(dataCart);
  }, [dataCart]);
  // console.log(user, "<=======");

  return (
    <>
      {open && <ModalLogin onClose={onCloseDrawer} />}
      {openProfile && (
        <ProfileCard
          onClose={closeProfile}
          user={user}
          handleLogout={handleLogout}
        />
      )}
      <div className="w-[22%] bg-[#f2f2f2] flex flex-col gap-4 py-4">
        {token && dataCart ? (
          <div className="bg-[#ff335f] rounded-full">
            <div
              className="flex justify-center items-center gap-2 p-2 cursor-pointer"
              onClick={showProfile}
            >
              <Icon icon="fluent:person-32-filled" width={25} color="#ffffff" />
              <p className="text-[#ffffff]">
                Hello, {user?.firstName ?? "Pesanajaners"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-full">
            <div
              className="flex justify-center items-center gap-2 p-2 cursor-pointer"
              onClick={showDrawer}
            >
              <Icon icon="fluent:person-32-filled" width={25} color="#595959" />
              <p className="text-[#595959]">Masuk</p>
            </div>
          </div>
        )}
        <div className="bg-white h-full rounded-xl">
          <div className="px-4 py-3">
            <Link to={`/map`}>
              <h3 className="text-[#595959] text-3xl hover:underline cursor-pointer">
                {user?.adress}
              </h3>
            </Link>
            <p className="text-[#A6A6A6] text-xl font-semibold">
              15 Menit Pengiriman
            </p>
          </div>
          {dataCart.length > 0 ? (
            <section className="flex flex-col justify-between">
              <CardCart
                dataCart={dataCart}
                handleDelete={handleDelete}
                token={token}
              />
              <div className="flex flex-col justify-between gap-2 text-center px-4">
                <p className="text-[#A6A6A6] text-sm"> Total Price</p>
                <p className="text-[#595959] text-2xl">
                  {formatCurrency(totalPrice)}
                </p>
                {totalPrice <= 50000 ? (
                  <div className="py-2 rounded-full bg-[#b62f4c] text-[#ffffff] cursor-not-allowed">
                    <p>Minimal Pembayaran Rp 50.000</p>
                  </div>
                ) : (
                  <>
                    {user ? (
                      <Link to={invoices.invoiceUrl}>
                        <div className="py-2 rounded-full bg-[#ff335f] text-[#ffffff]">
                          <p>Bayar</p>
                        </div>
                      </Link>
                    ) : (
                      <Link to="/create-profile">
                        <div className="py-2 rounded-full bg-[#ff335f] text-[#ffffff]">
                          <p>Lengkapi Profile mu!</p>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </section>
          ) : (
            <div className="flex flex-col p-4 items-center min-h-screen justify-center gap-4">
              <img src="https://yastatic.net/s3/lavka-web/public/assets/images/emptyCart@2x.png" />
              <p className="text-[#A6A6A6] text-xl font-semibold text-center">
                Your cart is still empty
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
