import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ClusterOutlined,
  SettingOutlined,
  DashboardOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { role } from "src/server/Host";
import { Modal } from "antd";

const Header: React.FC = () => {
  const logout = () => {
    Modal.confirm({
      title: "Haqiqatdan ham tizimdan chiqmoqchimisiz ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        localStorage.clear();
        window.location.href = "/login";
      },
      okText: "Chiqish",
      cancelText: "Bekor qilish",
    });
  };

  if (role == "ROLE_MANAGEMENTADMIN") {
    return (
      <div className="p8-32 header">
        <Link to={"/administration/statistcs"} className="logo">
          <img src={require("src/assets/images/logo.png")} alt="" />
          <span>prof-dist.edu.uz</span>
        </Link>

        <ul className="flex">
          <NavLink
            to={"/administration/statistcs"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <DashboardOutlined />
            Statistika
          </NavLink>
          <NavLink
            to={"/administration/universities"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ClusterOutlined /> Ta’lim muasassalari ro'yhati
          </NavLink>
          <NavLink
            to={"/administration/sozlama"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SettingOutlined />
            Sozlamalar
          </NavLink>
        </ul>

        <h3 onClick={logout}>Tizimdan chiqish</h3>
      </div>
    );
  }
  return (
    <div className="p8-32 header">
      <Link to={"/college/statistcs"} className="logo">
        <img src={require("src/assets/images/logo.png")} alt="" />
        <span>prof-dist.edu.uz</span>
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

      <h3 onClick={logout}>Tizimdan chiqish</h3>
    </div>
  );
};

export default Header;
