import React from "react";
import { useAppSelector } from "src/hooks";
import { Image, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "src/styles/user/Profile.scss";

const MyApplication: React.FC = () => {
  const userInfo = useAppSelector((state) => state.Application.user);

  if (!userInfo.fullName) {
    return (
      <div className="my-application">
        <div className="my-application__body">
          <div className="my-application__main">
            {/* Malumot */}
            <div className="malumot">
              <div className="info">
                <Skeleton.Node active>
                  <UserOutlined style={{ fontSize: 56, color: "#bfbfbf" }} />
                </Skeleton.Node>
                <div className="info__section">
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
              </div>
            </div>

            {/* ARIZA */}
            <section className="ariza">
              <Skeleton active paragraph={{ rows: 6 }} />
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-application">
      <div className="my-application__body">
        <div className="my-application__main">
          {/* Malumot */}
          <div className="malumot">
            <div className="info">
              <Image
                width={180}
                src={`data:image/jpeg;base64,${userInfo.photo}`}
              />
              <div className="info__section">
                <h2 className="title">{userInfo.fullName}</h2>
                <div>
                  <div className="flex">
                    <h4>Jinsi va tug’ilgan yili:</h4>
                    <h5>{userInfo.gender == "1" ? "(Erkak) " : "(Ayol) "}</h5>
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
              <div className="flex">
                <h4>Guruh nomi:</h4>
                <span>{userInfo.academicGroupName}</span>
              </div>
              <div className="flex">
                <h4>O'qishga qabul qilingan yili</h4>
                <span>{userInfo.enrollment}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyApplication;
