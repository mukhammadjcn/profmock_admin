import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Header from "src/components/home/Header";
import Footer from "src/components/home/Footer";
import { Advice1, Advice2, Advice3, Advice4 } from "src/components/svg";
import { token } from "src/server/Host";
import { Link } from "react-router-dom";
import "src/styles/user/main.scss";
import "src/styles/user/home.scss";
import CountUp from "react-countup";
import { GetUserStatConfig } from "src/server/config/Urls";

const Home: React.FC = () => {
  const [play, setPlay] = useState(false);
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    (async () => {
      const { data } = await GetUserStatConfig();
      setStats(data);
    })();
  }, []);

  return (
    <>
      <div className="home-user">
        <div className="home-user__intro">
          <Header />
          <div className="container">
            <h1 className="home-user__title">
              Kollejlar va texnikumlarda masofadan turib oʻqitish
            </h1>
            <p className="home-user__info">
              Kollejlar va texnikumlarda masofadan turib oʻqitish sirtqi va
              kechki taʼlim shakllarida oʻquv jarayonini masofadan turib
              oʻqitish tizimi.
            </p>
            <div className="home-user__login">
              {token ? (
                <Button type="primary" size="large">
                  <Link to={"/profile"} style={{ color: "white" }}>
                    Kabinetga kirish
                  </Link>
                </Button>
              ) : (
                <Button type="primary" size="large">
                  <a
                    href="https://prof-dist.edu.uz/api/auth/oneId"
                    style={{ color: "white" }}
                  >
                    ONE ID orqali kirish
                  </a>
                </Button>
              )}
            </div>

            <img
              src={require("src/assets/images/main.png")}
              alt="Main bg image"
            />
          </div>
        </div>

        <div className="container">
          {/* Home-user advices */}
          <section className="home-user__advices">
            <h4 className="label">PROFMOOC.UZ AFZALLIKLARI</h4>
            <h2 className="title">Tizmning afzalliklari va qulayliklari</h2>
            <div className="row flex">
              <div className="col">
                <Advice1 />
                <h3>Axborot-resurslari komponenti</h3>
                <p>
                  Oʻquv qoʻllanma (darslik)lar, oʻqitish materiallari
                  toʻplamlari, videodarslar, prezentatsiya maʼlumotlari va
                  boshqa resurslardan foydalanishni taʼminlaydi.
                </p>
              </div>
              <div className="col">
                <Advice2 />
                <h3>Axborot-resurslari komponenti</h3>
                <p>
                  Oʻquv qoʻllanma (darslik)lar, oʻqitish materiallari
                  toʻplamlari, videodarslar, prezentatsiya maʼlumotlari va
                  boshqa resurslardan foydalanishni taʼminlaydi.
                </p>
              </div>
              <div className="col">
                <Advice3 />
                <h3>Axborot-resurslari komponenti</h3>
                <p>
                  Oʻquv qoʻllanma (darslik)lar, oʻqitish materiallari
                  toʻplamlari, videodarslar, prezentatsiya maʼlumotlari va
                  boshqa resurslardan foydalanishni taʼminlaydi.
                </p>
              </div>
              <div className="col">
                <Advice4 />
                <h3>Axborot-resurslari komponenti</h3>
                <p>
                  Oʻquv qoʻllanma (darslik)lar, oʻqitish materiallari
                  toʻplamlari, videodarslar, prezentatsiya maʼlumotlari va
                  boshqa resurslardan foydalanishni taʼminlaydi.
                </p>
              </div>
            </div>
          </section>

          {/* Home-user video */}
          <section className="home-user__video flex">
            <div className="home-user__video-left">
              <h4 className="label">YO’RIQNOMA</h4>
              <h2 className="title">
                Tizimdan foydalanish haqida video yo‘riqnoma
              </h2>
              <p className="info">
                Onlayn ta’limda siz dam olish kunlarida, ishdan qaytganingizda
                hatto yarim kechada o’qishingiz mumkin.
              </p>
              {token ? (
                <Button type="primary" size="large">
                  <Link to={"/profile"} style={{ color: "white" }}>
                    Kabinetga kirish
                  </Link>
                </Button>
              ) : (
                <Button type="primary" size="large">
                  <a
                    href="https://prof-dist.edu.uz/api/auth/oneId"
                    style={{ color: "white" }}
                  >
                    ONE ID orqali kirish
                  </a>
                </Button>
              )}
            </div>
            <div className="home-user__video-right">
              {play ? (
                <iframe
                  width="520"
                  height="300"
                  src="https://www.youtube.com/embed/FNzerLdN--o?controls=0&autoplay=1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <a
                  className="video__frame"
                  href="https://www.instagram.com/tv/Cj2ibM-tD_t/?utm_source=ig_web_copy_link"
                  target="_blank"
                >
                  <img src={require("src/assets/images/video.png")} alt="" />
                  <div className="play">
                    <svg
                      onClick={() => setPlay(true)}
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="80" height="80" rx="40" fill="#444BD3" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.1019 36.5523C52.7312 38.0989 52.7312 41.9011 50.1019 43.4477L35.3614 52.1186C32.6949 53.6872 29.3333 51.7646 29.3333 48.6709L29.3333 31.3291C29.3333 28.2354 32.6949 26.3128 35.3614 27.8814L50.1019 36.5523Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>
              )}
            </div>
          </section>

          {/* Home-user useful links */}
          <section className="home-user__links">
            <h2 className="title">Foydali havolalar</h2>
            <div className="row flex">
              <div className="col flex">
                <img src={require("src/assets/images/logo.png")} alt="" />
                <h3>
                  O‘zbekiston Respublikasi Oliy va o‘rta maxsus ta'lim vazirligi
                </h3>
              </div>
              <div className="col flex">
                <img src={require("src/assets/images/akt.png")} alt="" />
                <h3>
                  Axborot texnologiyalari va kommunikatsiyalarini rivojlantirish
                  vazirligi
                </h3>
              </div>
              <div className="col flex">
                <img src={require("src/assets/images/csc.png")} alt="" />
                <h3>“Kiberxavfsizlik markazi” davlat unitar korxonasi.</h3>
              </div>
            </div>
          </section>

          {/* Home-user talablar */}
          <section className="home-user__requests">
            <h2 className="title">Foydali havolalar</h2>
            <p>Talablar ro‘yxati</p>
            <div className="row flex">
              <div className="col">
                <h4>Hududlar komponenti</h4>
                <p>
                  Hududlarni reestrini yuritish, ularga taʼlim muassasalari va
                  foydalanuvchilarni bogʻlashda xizmat qiladi;
                </p>
              </div>
              <div className="col">
                <h4>Axborot-resurslari komponenti</h4>
                <p>
                  Oʻquv qoʻllanma (darslik)lar, oʻqitish materiallari
                  toʻplamlari, videodarslar, prezentatsiya maʼlumotlari va
                  boshqa resurslardan foydalanishni taʼminlaydi;
                </p>
              </div>
              <div className="col">
                <h4>Mavzularni boshqarish komponenti</h4>
                <p>
                  Mavzularni shakllantiradi va har bir fan (amaliyot) uchun
                  individual resurslarni shakllantiradi va yangilab boradi;
                </p>
              </div>
              <div className="col">
                <h4>Taʼlim muassasalarini hisobga olish komponenti</h4>
                <p>
                  Taʼlim muassasalarini yagona reestrini yuritishga imkon berib,
                  taʼlim muassasalari ularning kasb va mutaxassisliklariga oid
                  maʼlumotlarni kiritish va saqlashni taʼminlaydi;
                </p>
              </div>
              <div className="col">
                <h4>Statistika komponenti</h4>
                <p>
                  Fan (amaliyot)larning oʻquv kontenti bilan toʻldirilganligi
                  haqidagi maʼlumotlardan iborat axborot olish imkoniyatini
                  beradi, hududlar, taʼlim muassasalari kesimida hisobotlarni va
                  boshqa turdagi statistik hisobotlarni shakllantiradi;
                </p>
              </div>
              <div className="col">
                <h4>Boʻlinmalar komponenti</h4>
                <p>
                  Foydalanuvchilarga hududlar, taʼlim muassasalari, kasb
                  (mutaxassislik)lar, fanlar va boshqa boʻlinmalarni iyerarxik
                  boʻlib qulay koʻrsatish uchun xizmat qiladi;
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Statistcs */}
        <section className="home-user__stat-container">
          <div className="container">
            <h2>
              Profmooc tizimi 700 ga yaqin kollejlar va texnikumlarda ishlaydi{" "}
            </h2>
            <div className="home-user__stat">
              <div>
                <h2>
                  <CountUp
                    end={stats?.countUser || 0}
                    duration={1}
                    separator=" "
                  />{" "}
                </h2>
                <p>Foydalanuvchilar soni</p>
              </div>
              <div>
                <h2>
                  <CountUp
                    end={stats?.countResource || 0}
                    duration={1}
                    separator=" "
                  />{" "}
                </h2>
                <p>Resurslar soni</p>
              </div>
              <div>
                <h2>24/7</h2>
                <p>Yordam </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
