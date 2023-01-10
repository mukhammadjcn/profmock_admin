import React from "react";
import { Link } from "react-router-dom";
import { FacebookSVG, InstagramSvg, PhoneSVG, TelegramSVG } from "../svg";

function Footer() {
  return (
    <div className="footer-user">
      <div className="container">
        <div className="footer-user__nav">
          <div className="footer-user__info">
            <Link to={"/"} className="logo">
              <img src={require("../../assets/images/logo.png")} alt="" />
              <span>prof-dist.edu.uz</span>
            </Link>
            <p className="info">
              Portalda eʼlon qilingan materiallardan nusxa koʻchirish, tarqatish
              va boshqa shakllarda foydalanish faqat tahririyat yozma roziligi
              bilan amalga oshirilishi mumkin.
            </p>
          </div>
          <div className="footer-user__socials">
            <h4>Biz ijtimoiy tarmoqlarda</h4>
            <a
              href="https://www.instagram.com/edu.uz/"
              target={"_blank"}
              className="social"
            >
              <InstagramSvg />
              <span> Instagram</span>
            </a>
            <a href="https://t.me/eduuz" target={"_blank"} className="social">
              <TelegramSVG />
              <span> Telegram</span>
            </a>
            <a
              href="https://facebook.com/eduuzrasmiy"
              target={"_blank"}
              className="social"
            >
              <FacebookSVG />
              <span> Facebook</span>
            </a>
          </div>
          <div className="footer-user__contact">
            <h4>Biz bilan aloqa</h4>
            <a href="tel:1006" style={{ color: "white" }} className="contact">
              <span>Ishonch telefoni: 1006</span>
            </a>
            <a
              href="tel:+998712306464"
              style={{ color: "white" }}
              className="contact"
            >
              <PhoneSVG />
              <span>+998712306464</span>
            </a>
            <a
              href="https://t.me/profkontrakt_edu_yordambot"
              target={"_blank"}
              style={{ color: "white" }}
              className="contact"
            >
              <TelegramSVG />
              <span>Telegram bot</span>
            </a>
          </div>
        </div>
        <p>2022 © prof-dist.edu.uz</p>
      </div>
    </div>
  );
}

export default Footer;
