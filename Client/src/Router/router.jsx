import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Products from "../Pages/Home/Products";
import Login from "../Components/Login";
import CardDetails from "../Pages/Home/Components/CardDetails";
import Register from "../Components/Register";
import Swal from "sweetalert2";
import Maps from "../Components/Maps";
import Lottie from "lottie-react";
import Cart from "../Pages/Home/Carts/Cart";
import loading from "../assets/loading.json";

import ProfileForm from "../Components/ProfileForm";
import HistoryTransaction from "../Components/HistoryTransaction";

const url = "http://localhost:3000";

export const Loader = () => {
  <Lottie animationData={loading} loop={true} />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
  },
  {
    path: "/create-profile",
    element: <ProfileForm url={url} />,
  },
  {
    path: "/history",
    element: <HistoryTransaction url={url} />,
  },

  {
    path: "/map",
    element: <Maps url={url} />,
  },

  {
    element: <Homepage />,
    // loader: () => {
    //   if (!localStorage.access_token) {
    //     // Swal.fire({
    //     //   title: "login cuk!!",
    //     //   icon: "warning",
    //     // });
    //     return redirect("/login");
    //   }

    //   return null;
    // },
    children: [
      {
        path: "/",
        element: <Products url={url} />,
        children: [
          {
            path: "/product/:productId",
            element: <CardDetails url={url} />,
          },
          {
            path: "/my-clubs",
            element: <Cart url={url} />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register url={url} />,
    // loader: () => {
    //   if (localStorage.access_token) {
    //     Swal.fire({
    //       title: "Ngapain cuk?????",
    //       icon: "question",
    //     });
    //     return redirect("/");
    //   }

    //   return null;
    // },
  },
]);
export default router;
