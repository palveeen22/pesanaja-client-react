import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const ProfileCard = ({ onClose, user, handleLogout }) => {
  const [placement, setPlacement] = useState("left");

  const onCloseDrawer = () => {
    onClose();
  };

  return (
    <>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onCloseDrawer}
        visible={true} // Menggunakan properti visible langsung
        key={placement}
        // height={300}
        width={500}
        className="rounded-b-3xl p-2"
      >
        <div className="relative w-full">
          <div className="absolute top-2 right-2">
            <Icon
              icon="icon-park-twotone:close-one"
              width={35}
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center h-full gap-6">
          <Link to={`/login`}>
            <div className="py-3 w-96 text-center rounded-full bg-[#ff335f] text-[#ffffff] cursor-pointer">
              <p>Login</p>
            </div>
          </Link>
          <Link to={`/login`}>
            <div className="py-3 w-96 text-center border border-[#ff335f] rounded-full bg-[#ffffff] text-[#ff335f] cursor-pointer">
              <p>Daftar</p>
            </div>
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileCard;
