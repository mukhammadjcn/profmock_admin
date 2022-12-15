import React from "react";
import "src/styles/login.scss";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="login_section">
      <div className="login_left">
        <div className="login_left_wrap">
          <Link to={"/"} className="logo">
            <img src={require("src/assets/images/logo.png")} alt="logo" />
            <span>Profmooc.edu.uz</span>
          </Link>

          <div className="login_left_content">
            <p>
              Kollejlar va texnikumlarda <span>masofadan</span> turib oʻqitish
            </p>
            <span>
              Kollejlar va texnikumlarda masofadan turib oʻqitish sirtqi va
              kechki taʼlim shakllarida oʻquv jarayonini masofadan turib
              oʻqitish tizimi.
            </span>
          </div>
        </div>
        <video
          src={require("src/assets/images/video.mp4")}
          autoPlay
          loop
          playsInline
          muted
        ></video>
      </div>
      <div className="login">
        <div className="login__form">
          <h2>Tizimga kirish</h2>
          <div className="login__oneID">
            <a href="https://backoffice.Profmooc.edu.uz/api/auth/one-id/">
              <div className="login__title">ONE ID orqali kirish</div>
            </a>
            <div className="pulse-css">
              <div className="first-circle"></div>
              <div className="second-circle"></div>
              <div className="third-circle"></div>
            </div>
          </div>
          <p>
            O‘zbekiston Respublikasi qonunchiligi asosida, shaxsingiz
            to‘g’risidagi ma’lumotlarni id.egov.uz tizimidan olinganini ma’lum
            qilamiz
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
