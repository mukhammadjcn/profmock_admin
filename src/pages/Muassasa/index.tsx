import React from "react";
import Header from "src/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import "src/styles/college.scss";

const Muassasa: React.FC = () => {
  const { pathname } = useLocation();

  const GiveTitle = () => {
    let keyword = pathname.split("/college/")[1];

    return keyword?.includes("statistcs")
      ? "Statistika"
      : keyword?.includes("sozlama")
      ? "Sozlamalar"
      : "O‘zbekiston davlat jahon tillari universiteti";
  };

  return (
    <div className="college">
      <Header />

      <h1>{GiveTitle()}</h1>

      {/* Routes gores here */}
      <div className="college__routes">
        <Outlet />
      </div>
    </div>
  );
};

export default Muassasa;
