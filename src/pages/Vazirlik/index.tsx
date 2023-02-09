import React, { useEffect } from "react";
import "src/styles/college.scss";
import Button from "antd/es/button";
import Header from "src/components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CatchError } from "src/utils/index";
import { useAppDispatch, useAppSelector } from "src/hooks/index";
import { GetBoshqarmaInfoConfig } from "src/server/config/Urls";
import { setUser } from "src/store/slices/user";

const Vazirlik: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const userInfo = useAppSelector((state) => state.User.user);

  const GiveTitle = () => {
    let keyword = pathname.split("/ministry/")[1];

    return keyword?.includes("statistcs")
      ? "Statistika - Vazirlik"
      : keyword?.includes("sozlama")
      ? "Sozlamalar"
      : keyword?.includes("regions/universities/directions/subject/theme")
      ? "Mavzular"
      : keyword?.includes("regions/universities/directions/subject")
      ? "Fanlar"
      : keyword?.includes("regions/universities/directions")
      ? "Ta'lim muassasaning mutaxasisliklari ro'yhati"
      : keyword?.includes("regions/universities")
      ? "Ta'lim muassasalari ro'yhati"
      : "Boshqarmalar ro'yhati";
  };

  const goLast = () => {
    const last = localStorage.getItem("lastpage");
    const current = window.location.pathname + window.location.search;

    if (last == current) {
      navigate("/ministry/statistcs");
    } else {
      navigate(`${last}`);
    }
  };

  // const GetInfo = async () => {
  //   if (Object.keys(userInfo).length < 1) {
  //     try {
  //       const { data } = await GetBoshqarmaInfoConfig();
  //       dispatch(setUser(data));
  //     } catch (error) {
  //       CatchError(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   GetInfo();
  // }, []);

  return (
    <div className="college">
      <Header />

      <h1>
        {GiveTitle() !== "Boshqarmalar ro'yhati" &&
          GiveTitle() !== "Statistika - Vazirlik" &&
          GiveTitle() !== "Sozlamalar" && (
            <Button
              style={{ marginRight: 16 }}
              onClick={goLast}
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

export default Vazirlik;
