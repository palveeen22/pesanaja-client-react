import { useEffect, useState } from "react";
import axios from "axios";
import { Drawer, Radio, Space } from "antd";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import formatCurrency from "../../../Utils/FormatCurrency";

const CardDetails = ({ onClose, url }) => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState("right");
  const { productId } = useParams();

  // console.log({ url });
  const getById = async () => {
    try {
      // url = undefined
      // http://localhost:5173/product/undefined/products-public/${productId}
      const { data } = await axios.get(`${url}/products-public/${productId}`);
      setProduct(data.data);
      // console.log(data, "test <<<<<<");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
    onClose(); // Menutup drawer dan memanggil onClose dari komponen induk
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}></Radio.Group>
      </Space>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onCloseDrawer}
        visible={open}
        key={placement}
        width={900}
        className="rounded-xl p-2"
      >
        <section className="w-full flex justify-center gap-8">
          <div className="w-[50%]">
            <img
              src={product?.imageUrl}
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
          <div className="flex flex-col w-[50%] gap-6">
            <h3 className="text-[#595959]">{product?.name}</h3>
            <h3 className="text-[#A6A6A6]">{product?.berat} g</h3>
            <div class="border-b"></div>
            <p className="text-sm text-[#595959]">{product?.description}</p>
            <div class="border-b"></div>

            <span>
              <p className="text-[#A6A6A6]">Tanggal Kadualrsa</p>
              <p className="text-[#595959]">{product?.kadaluarsa}</p>
            </span>
            <span>
              <p className="text-[#A6A6A6]">Cara Simpan</p>
              <p className="text-[#595959]">{product?.caraSimpan}</p>
            </span>
            <button className="bg-[#ff335f] flex justify-center rounded-full p-3">
              <p className="text-sm text-[#ffffff]">
                {formatCurrency(product?.price)}
              </p>
              <Icon icon="basil:plus-solid" color="#ffffff" width={20} />
            </button>
          </div>
        </section>
      </Drawer>
    </>
  );
};

export default CardDetails;
