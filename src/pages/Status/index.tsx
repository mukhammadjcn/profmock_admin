import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { role, token } from "src/server/Host";
import "src/styles/status.scss";

const Status: React.FC = () => {
  const navigate = useNavigate();

  const NavigateHome = async () => {
    await new Promise((res) => setTimeout(res, 2000));

    if (token && role == "admin") {
      navigate("/home/created");
    } else if (token && role == "ministry") {
      navigate("/ministry");
    } else {
      message.info("Sizda kirish uchun ruhsat yo'q");
      setTimeout(() => navigate("/"), 3000);
    }
  };

  useEffect(() => {
    NavigateHome();
  }, []);

  return (
    <div className="ring">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Status;
