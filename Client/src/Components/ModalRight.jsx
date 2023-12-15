import { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";

const ModalRight = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}></Radio.Group>
        {/* <Button onClick={showDrawer} value="right">
      <p>x</p>
    </Button> */}
        <button className="bg-red-500" onClick={showDrawer}>
          x
        </button>
      </Space>
      <Drawer
        // title="Basic Drawer"
        placement="right" // Set the placement prop to "right"
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default ModalRight;
