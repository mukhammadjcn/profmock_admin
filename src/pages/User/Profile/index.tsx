import React, { useEffect, useState } from "react";
import Footer from "src/components/home/Footer";
import Header from "src/components/home/Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserSVG,
  HomeSVG,
  RightSVG,
  ResurceSVG,
  BackSVG,
} from "src/components/svg";
import { setUser } from "src/store/slices/application";
import { useAppDispatch, useAppSelector } from "src/hooks/index";
import { CatchError } from "src/utils/index";
import { GetUserConfig } from "src/server/config/Urls";
import { IUser } from "src/types";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "src/styles/user/Profile.scss";

const Profile: React.FC = () => {
  const param = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUser>();
  const user = useAppSelector((state) => state.Application.user);

  const checkPath = (key: string) => {
    if (param.pathname.split("/profile/")[1] === undefined) {
      return undefined;
    }
    return param.pathname.split("/profile/")[1] === key ? true : false;
  };

  const getUser = async () => {
    try {
      if (user.id !== 0) {
        setUserData(user);
      } else {
        const { data } = await GetUserConfig();
        dispatch(setUser(data));
        setUserData(data);
      }
    } catch (error) {
      CatchError(error);
    }
  };

  const logout = () => {
    Modal.confirm({
      title: "Haqiqatdan ham tizimdan chiqmoqchimisiz ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        localStorage.clear();
        window.location.href = "/";
      },
      okText: "Chiqish",
      cancelText: "Bekor qilish",
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="container profile__navbar">
          <h4 className="flex" onClick={() => navigate("/")}>
            <HomeSVG />
            <span>Bosh sahifa</span>
          </h4>
          <h4>
            <RightSVG />
          </h4>
          <h4 className="flex">
            <span>shaxsiy kabinet</span>
          </h4>
        </div>
        <div className="container">
          <div className="profile__sidebar">
            <div className="profile__header flex">
              <img
                src={
                  userData?.photo
                    ? `data:image/jpeg;base64,${userData?.photo}`
                    : require("src/assets/images/user.png")
                }
                alt=""
              />
              <h4>{user.fullName.split(" ").splice(0, 2).join(" ")}</h4>
            </div>
            <div className="profile__menu">
              <h4>Mening arizalarim</h4>
              <button
                className={
                  checkPath("") === undefined
                    ? "profile__tab profile__tab-active flex"
                    : "profile__tab flex"
                }
                onClick={() => navigate("/profile")}
              >
                <UserSVG />
                <span>Shaxsiy ma'lumotlar</span>
              </button>
              <button
                className={
                  checkPath("resources") || checkPath("resources/subject")
                    ? "profile__tab profile__tab-active flex"
                    : "profile__tab flex"
                }
                onClick={() => navigate("/profile/resources?semesterId=1")}
              >
                <ResurceSVG />
                <span>Resurslar</span>
              </button>
              <button
                onClick={logout}
                className="profile__tab profile__tab-logout flex"
              >
                <BackSVG />
                <span>Tizimdan chiqish</span>
              </button>
            </div>
            <div className="profile__links">
              <h4>Foydali havolalar</h4>
              <a href="https://t.me/eduuz" target="_blank" rel="noreferrer">
                Telegram kanal (@eduuz)
              </a>
              <a
                href="https://t.me/elektron_talim_markazi"
                target="_blank"
                rel="noreferrer"
              >
                Telegram bot (@elektron_talim_markazi)
              </a>
            </div>
          </div>
          <div className="profile__body">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
