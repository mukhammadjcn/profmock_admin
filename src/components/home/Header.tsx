import React from "react";
import { Button, Dropdown } from "antd";
import { token } from "src/server/Host";
import { BottomArrowSVG } from "src/components/svg";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Profile menu
  const menu = (
    <div className="kirgan__menu">
      <button
        className="profile__tab flex"
        onClick={() => navigate("/profile/resources?semesterId=1")}
      >
        <span>Resurslar</span>
      </button>
      <button
        className="profile__tab flex"
        onClick={() => navigate("/profile")}
      >
        <span>Shaxsiy ma'lumotlar</span>
      </button>
      <button className="logout" onClick={logout}>
        Chiqish
      </button>
    </div>
  );

  return (
    // Header-user section
    <div className="header-user">
      <div className="container flex">
        {/* Logo side */}
        <Link to={"/"} className="logo-user">
          <img src={require("src/assets/images/logo.png")} alt="Company logo" />
          <span>prof-dist.edu.uz</span>
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
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div className="kirgan">
              <div className="kirgan__img">AA</div>
              <span>Mening profilim</span>
              <BottomArrowSVG />
            </div>
          </Dropdown>
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
