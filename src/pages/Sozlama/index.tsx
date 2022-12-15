import { Button, Image } from "antd";
import React from "react";

const Sozlama: React.FC = () => {
  return (
    <div className="sozlama flex">
      <div className="sozlama__withImage">
        <h1>Shaxsiy ma’lumotlar ( Taʼlim muassasasi admini)</h1>
        <div className="flex">
          <Image src="https://picsum.photos/500" />
          <div>
            <h2>Askarov Abror Akmalovich</h2>
            <ul>
              <li className="flex">
                <span>Jinsi va tug’ilgan yili:</span>
                <h4>Erkak, 23 yosh (11.06.1998) </h4>
              </li>
              <li className="flex">
                <span>Fuqaroligi:</span>
                <h4>O‘ZBEKISTON</h4>
              </li>
              <li className="flex">
                <span>Doimiy yashash manzili:</span>
                <h4>БОДОМЗОР МФЙ, БОДОМЗОР</h4>
              </li>
              <li className="flex">
                <span>Telefon raqam:</span>
                <h4>+998903722222</h4>
              </li>
              <li className="flex">
                <span>J.SH.SH.I.R:</span>
                <h4>12345678901112123</h4>
              </li>
              <li className="flex">
                <span>Pasport seriya raqami:</span>
                <h4>AA1234567</h4>
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

        <h2>Askarov Abror Akmalovich</h2>
        <ul>
          <li className="flex">
            <span>Jinsi va tug’ilgan yili:</span>
            <h4>Erkak, 23 yosh (11.06.1998) </h4>
          </li>
          <li className="flex">
            <span>Fuqaroligi:</span>
            <h4>O‘ZBEKISTON</h4>
          </li>
          <li className="flex">
            <span>Doimiy yashash manzili:</span>
            <h4>БОДОМЗОР МФЙ, БОДОМЗОР</h4>
          </li>
          <li className="flex">
            <span>Telefon raqam:</span>
            <h4>+998903722222</h4>
          </li>
          <li className="flex">
            <span>J.SH.SH.I.R:</span>
            <h4>12345678901112123</h4>
          </li>
          <li className="flex">
            <span>Pasport seriya raqami:</span>
            <h4>AA1234567</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sozlama;
