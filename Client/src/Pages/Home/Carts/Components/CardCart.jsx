import React from "react";
import formatCurrency from "../../../../Utils/FormatCurrency";

const CardCart = ({ dataCart, handleDelete }) => {
  return (
    <>
      {dataCart.map((e) => {
        return (
          <>
            <div className="w-full px-4 py-2 flex justify-between overflow-y-auto">
              <div className="w-[40%]">
                <img
                  src={e?.Product?.imageUrl}
                  className="w-24 h-24 rounded-3xl object-cover"
                />
              </div>
              <div className="w-[60%] items-center">
                <p className="text-sm text-[#595959]">{e?.Product?.name}</p>
                <p className="text-xs text-[#A6A6A6]">{e?.Product?.berat} g</p>
                <span className="flex justify-between">
                  <p className="text-sm text-[#000000]">
                    {formatCurrency(e?.Product.price)}
                  </p>
                  <p
                    className="text-sm bg-[#ffffff] border border-[#ff335f] text-[#ff335f] rounded-full py-1 px-4 cursor-pointer"
                    onClick={() => {
                      handleDelete(e?.id);
                    }}
                  >
                    Cancel
                  </p>
                </span>
              </div>
              <div className="border-b-4"></div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CardCart;
