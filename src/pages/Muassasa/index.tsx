import React, { useEffect } from "react";
import "src/styles/college.scss";
import Button from "antd/es/button";
import Header from "src/components/Header";
import { CatchError } from "src/utils/index";
import { setUser } from "src/store/slices/user";
import { useAppDispatch, useAppSelector } from "src/hooks/index";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { GetUserInfoConfig } from "src/server/config/Urls";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Muassasa: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const userInfo = useAppSelector((state) => state.User.user);

  const GiveTitle = () => {
    let keyword = pathname.split("/college/")[1];

    return keyword?.includes("statistcs")
      ? "Statistika"
      : keyword?.includes("sozlama")
      ? "Sozlamalar"
      : keyword?.includes("directions/subject/theme")
      ? "Mavzular"
      : keyword?.includes("directions/subject")
      ? "Fanlar"
      : userInfo?.eduName;
  };

  const goLast = () => {
    const last = localStorage.getItem("lastpage");
    const current = window.location.pathname + window.location.search;

    if (last == current) {
      navigate("/college/directions");
    } else {
      navigate(`${last}`);
    }
  };

  const GetInfo = async () => {
    if (Object.keys(userInfo).length < 1) {
      try {
        const { data } = await GetUserInfoConfig();
        dispatch(setUser(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  useEffect(() => {
    GetInfo();
  }, []);

  return (
    <div className="college">
      <Header />

      <h1>
        {(GiveTitle() == "Fanlar" || GiveTitle() == "Mavzular") && (
          <Button
            onClick={goLast}
            style={{ marginRight: 16 }}
            icon={<ArrowLeftOutlined />}
          >
            Orqaga qaytish
          </Button>
        )}
        {GiveTitle()}
      </h1>

      {/* Routes gores here */}
      <div className="college__routes">
        <Outlet />
      </div>
    </div>
  );
};

export default Muassasa;
