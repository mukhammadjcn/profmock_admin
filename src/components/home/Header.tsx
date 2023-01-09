import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { token } from "src/server/Host";

const Header: React.FC = () => {
  return (
    // Header-user section
    <div className="header-user ">
      <div className="container flex">
        {/* Logo side */}
        <Link to={"/"} className="logo-user">
          <img src={require("src/assets/images/logo.png")} alt="Company logo" />
          <span>Profmooc.edu.uz</span>
        </Link>

        {/* Navbar */}
        <nav className="header-user__nav">
          <Link to={"#item"}>Asosiy</Link>
          <Link to={"#item"}>Afzalliklar</Link>
          <Link to={"#item"}>Yo‘riqnoma</Link>
          <Link to={"#item"}>Talablar</Link>
        </nav>

        {/* One if button */}
        {token ? (
          <Button type="primary" size="large">
            <Link to={"/profile"} style={{ color: "white" }}>
              Kabinetga kirish
            </Link>
          </Button>
        ) : (
          <Button type="primary" size="large">
            <Link to={"/kirish"} style={{ color: "white" }}>
              Kirish
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
