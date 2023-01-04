import React from "react";
import { Button, Image } from "antd";
import { useAppSelector } from "src/hooks/index";

const Sozlama: React.FC = () => {
  const userInfo = useAppSelector((state) => state.User.user);

  return (
    <div className="sozlama flex">
      <div className="sozlama__withImage">
        <h1>Shaxsiy ma’lumotlar ( Taʼlim muassasasi admini)</h1>
        <div className="flex">
          <Image src={`	data:image/jpg;base64, ${userInfo?.photo}`} />
          <div>
            <h2>{userInfo?.fullName}</h2>
            <ul>
              <li className="flex">
                <span>Jinsi</span>
                <h4>{userInfo?.gender == 1 ? "Erkak" : "Ayol"}</h4>
              </li>
              {/* <li className="flex">
                <span>Fuqaroligi:</span>
                <h4>O‘ZBEKISTON</h4>
              </li> */}
              <li className="flex">
                <span>Doimiy yashash manzili:</span>
                <h4>{userInfo?.permanentAddress}</h4>
              </li>
              <li className="flex">
                <span>Telefon raqam:</span>
                <h4>+998{userInfo?.phoneNumber}</h4>
              </li>
              <li className="flex">
                <span>J.SH.SH.I.R:</span>
                <h4>{userInfo?.pinfl}</h4>
              </li>
              <li className="flex">
                <span>Pasport seriya raqami:</span>
                <h4>{userInfo?.serialNumber}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sozlama__noImage">
        <div className="flex">
          <h1>Taʼlim muassasasi pasporti</h1>
          <Button type="primary">Tahrirlash</Button>
        </div>

        <h2>{userInfo?.fullName}</h2>
        <ul>
          <li className="flex">
            <span>TM id:</span>
            <h4>{userInfo?.id}</h4>
          </li>
          <li className="flex">
            <span>Nomi:</span>
            <h4>{userInfo?.eduName}</h4>
          </li>
          <li className="flex">
            <span>Manzil:</span>
            <h4>{userInfo?.eduAddress}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sozlama;
