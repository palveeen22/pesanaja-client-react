import React, { useState } from "react";
import formatCurrency from "../../../Utils/FormatCurrency";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import CardDetails from "./CardDetails";

const CardProduct = ({ data, handleAddToCart }) => {
  const [open, setOpen] = useState(false);
  const token = localStorage.access_token;
  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      {data?.map((e) => {
        return (
          <section key={e?.id} className="w-full">
            <div className="flex flex-col justify-center gap-2">
              <Link to={`/product/${e?.id}`}>
                <div>
                  <img
                    src={e?.imageUrl}
                    className="rounded-3xl w-full h-auto"
                    alt={e?.name}
                    onClick={showDrawer}
                  />
                </div>
              </Link>
              <p className="text-base text-[#595959] h-12">{e?.name}</p>
              <div className="flex gap-2">
                <p className="text-[#A6A6A6] text-sm">{e?.berat} g • </p>
                <p className="text-[#00B749] text-sm">untung</p>
              </div>
              {token ? (
                <button
                  className="flex justify-center gap-2 w-[70%] bg-[#f8f7f5] rounded-full hover:bg-[#f2f2f2] py-2"
                  onClick={() => {
                    handleAddToCart(e?.id);
                  }}
                >
                  <p className="text-sm text-[#ff335f]">
                    {formatCurrency(e?.price)}
                  </p>
                  <Icon icon="basil:plus-solid" color="#ff335f" width={20} />
                </button>
              ) : (
                <Link to="/login">
                  <button className="flex justify-center gap-2 w-[70%] bg-[#f8f7f5] rounded-full hover:bg-[#f2f2f2] py-2">
                    <p className="text-sm text-[#ff335f]">
                      {formatCurrency(e?.price)}
                    </p>
                    <Icon icon="basil:plus-solid" color="#ff335f" width={20} />
                  </button>
                </Link>
              )}
            </div>
          </section>
        );
      })}
      {open && (
        <CardDetails url="http://localhost:3000" onClose={onCloseDrawer} />
      )}
    </>
  );
};

export default CardProduct;
