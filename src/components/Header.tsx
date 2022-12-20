import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ClusterOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Header: React.FC = () => {
  return (
    <div className="p8-32 header">
      <Link to={"/college/statistcs"} className="logo">
        <img src={require("src/assets/images/logo.png")} alt="" />
        <span>Profmoc.edu.uz</span>
      </Link>

      <ul className="flex">
        <NavLink
          to={"/college/statistcs"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <DashboardOutlined />
          Statistika
        </NavLink>
        <NavLink
          to={"/college/direction"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <ClusterOutlined /> Ta’lim muasassasi
        </NavLink>
        <NavLink
          to={"/college/sozlama"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SettingOutlined />
          Sozlamalar
        </NavLink>
      </ul>

      <h3>Askarov Abror</h3>
    </div>
  );
};

export default Header;
