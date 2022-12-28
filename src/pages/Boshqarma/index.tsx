import React from "react";
import "src/styles/college.scss";
import Button from "antd/es/button";
import Header from "src/components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Muassasa: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const GiveTitle = () => {
    let keyword = pathname.split("/administration/")[1];

    return keyword?.includes("statistcs")
      ? "Statistika"
      : keyword?.includes("sozlama")
      ? "Sozlamalar"
      : keyword?.includes("direction/subject/theme")
      ? "Mavzular"
      : keyword?.includes("direction/subject")
      ? "Fanlar"
      : "Hududdagi universitetlar ro'yhati";
  };

  const goLast = () => {
    const last = localStorage.getItem("lastpage");
    const current = window.location.pathname + window.location.search;

    if (last == current) {
      navigate("/college/direction");
    } else {
      navigate(`${last}`);
    }
  };

  return (
    <div className="college">
      <Header />

      <h1>
        {(GiveTitle() !== "Hududdagi universitetlar ro'yhati" ||
          GiveTitle() !== "Statistika" ||
          GiveTitle() !== "Sozlamalar") && (
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

export default Muassasa;
