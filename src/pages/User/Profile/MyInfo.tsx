import React from "react";
import { useAppSelector } from "src/hooks";
import { Image, Statistic } from "antd";
import "src/styles/user/Profile.scss";

const MyApplication: React.FC = () => {
  const userInfo = useAppSelector((state) => state.Application.user);

  return (
    <div className="my-application">
      <div className="my-application__body">
        <div className="my-application__main">
          {/* Malumot */}
          <div className="malumot">
            <div className="info">
              <Image
                width={180}
                src={
                  userInfo.photo
                    ? `data:image/jpeg;base64,${userInfo.photo}`
                    : require("src/assets/images/user.png")
                }
              />
              <div className="info__section">
                <h2 className="title">{userInfo.fullName}</h2>
                <div>
                  <div className="flex">
                    <h4>Jinsi va tug’ilgan yili:</h4>
                    <h5>
                      {userInfo.gender == "1" ? "(Erkak) " : "(Ayol) "}
                      {/* {new Date(
                        userInfo.student?.birth_date
                      ).toLocaleDateString()} */}
                    </h5>
                  </div>
                  <div className="flex">
                    <h4>Pasport seriyasi va raqami</h4>
                    <h5>{userInfo.serialNumber}</h5>
                  </div>
                  <div className="flex">
                    <h4>Telefon raqam:</h4>
                    <h5>+{userInfo.phoneNumber}</h5>
                  </div>
                  <div className="flex">
                    <h4>J.SH.SH.I.R:</h4>
                    <h5>{userInfo.pinfl}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ARIZA */}
          <section className="ariza">
            <h2 className="title">Texnikum yoki kollej ma’lumotlari</h2>
            <div className="section__body">
              <div className="flex">
                <h4>Texnikum yoki kollej nomi:</h4>
                <span>{userInfo.eduName}</span>
              </div>
              <div className="flex">
                <h4>Texnikum yoki kollej manzili:</h4>
                <span>{userInfo.eduAddress}</span>
              </div>
              <div className="flex">
                <h4>Yo‘nalish nomi:</h4>
                <span>{userInfo.direction}</span>
              </div>
              {/* <div className="flex">
                <h4>Ta’lim tili:</h4>
                <span>{userInfo.eduAddress}</span>
              </div>
              <div className="flex">
                <h4>Ta'lim turi:</h4>
                <span>{userInfo.eduAddress}</span>
              </div>
              <div className="flex">
                <h4>O'qish kursi</h4>
                <span>{userInfo.eduAddress}</span>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyApplication;
