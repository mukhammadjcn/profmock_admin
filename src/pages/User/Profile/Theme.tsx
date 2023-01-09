import {
  GetUserThemesConfig,
  GetUserResourcesConfig,
} from "src/server/config/Urls";
import { role } from "src/server/Host";
import { CatchError } from "src/utils/index";
import React, { useEffect, useState } from "react";
import NoData from "src/components/animation/NoData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin, Badge, Collapse, Pagination, Alert, Button } from "antd";

const Theme: React.FC = () => {
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [loadingIn, setLoadingIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // For pagination
  const [total, setTotal] = useState(0);
  const currentPage = searchParams.get("page");
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const setPage = (val: any) => {
    setCurrent(val.current);
    handleMakeParams("page", val);
    GetMyThemes();
    window.scrollTo(0, 0);
  };
  const urlMaker = () => {
    let url = "&";
    for (let key of searchParams.keys()) {
      let value = searchParams.get(key);
      url = url + `${url.length < 2 ? "" : "&"}${key}=${value}`;
    }
    return url.length > 2 ? url : "";
  };
  const giveFileType = (name: string) => {
    const reversedName = name.split(".").reverse();
    if (reversedName[0] == "ppt" || reversedName[0] == "pptx") {
      return "ppt";
    } else if (reversedName[0] == "doc" || reversedName[0] == "docx") {
      return "doc";
    } else if (reversedName[0] == "pdf") {
      return "pdf";
    } else if (
      reversedName[0] == "mp4" ||
      reversedName[0] == "mov" ||
      reversedName[0] == "avi" ||
      reversedName[0] == "webm" ||
      reversedName[0] == "mkv"
    ) {
      return "mp4";
    } else {
      return "link";
    }
  };
  const giveImage = (i: any) => {
    return giveFileType(i) == "doc" ? (
      <img src={require(`src/assets/images/doc.png`)} alt="power point logo" />
    ) : giveFileType(i) == "mp4" ? (
      <img src={require(`src/assets/images/mp4.png`)} alt="power point logo" />
    ) : giveFileType(i) == "pdf" ? (
      <img src={require(`src/assets/images/pdf.png`)} alt="power point logo" />
    ) : giveFileType(i) == "ppt" ? (
      <img src={require(`src/assets/images/ppt.png`)} alt="power point logo" />
    ) : (
      <img src={require(`src/assets/images/link.png`)} alt="power point logo" />
    );
  };
  const prettyName = (name: string) => {
    let result = decodeURI(
      name
        .replace("http://", "")
        .replace("https://", "")
        .replace("prof-dist.edu.uz/api/user/download/", "")
        .replace("prof-dist.edu.uz/api/user/videoStream/", "")
    ).slice(6);

    let reversed = result.split(".");
    reversed.pop();

    let fileName = reversed.join(".");

    if (fileName.length <= 16) return fileName;
    else return fileName.slice(0, 16) + `...`;
  };
  const giveColor = (name: string) => {
    return name == "Fan (amaliyot) haqida"
      ? "#1890FF"
      : name == "Videodarslar"
      ? "#14C130"
      : name == "Taqdimot (prezentatsiya) materiallari"
      ? "#FA541C"
      : name == "Nazariy (maʼruza) qismi uchun matnlar"
      ? "#C80A0A"
      : name == "Maʼruzalar boʻyicha test savollari"
      ? "#FADB14"
      : name == "Oraliq baholash uchun test savollari"
      ? "#A0D911"
      : name == "Amaliy mashgʻulotlar uchun qoʻllanmalar"
      ? "#13C2C2"
      : name == "Amaliy mashgʻulotlar uchun nazorat topshiriqlari"
      ? "#EB2F96"
      : "#474FBA";
  };
  const goLast = () => {
    const last = localStorage.getItem("lastpage");
    const current = window.location.pathname + window.location.search;

    if (last == current) {
      navigate("/profile/resources?semesterId=1");
    } else {
      navigate(`${last}`);
    }
  };

  const GetMyThemes = async () => {
    setLoading(true);
    try {
      const { data } = await GetUserThemesConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

      // Set Data
      setThemes(data?.content);
    } catch (error) {
      CatchError(error);
    }
    setLoading(false);
  };
  const GetResources = async (id: string | string[]) => {
    if (id) {
      setLoadingIn(true);
      try {
        const { data } = await GetUserResourcesConfig(id);
        setResources(data);
      } catch (error) {
        CatchError(error);
      }
      setLoadingIn(false);
    }
  };

  useEffect(() => {
    GetMyThemes();
  }, []);

  return (
    <div className="theme">
      <div
        className="flex"
        style={{ justifyContent: "flex-start", gap: 16, marginBottom: 24 }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={goLast}>
          Fanlarga qaytish
        </Button>

        <h1 className="profile__theme--title">Mavzular</h1>
      </div>

      {themes.length == 0 ? (
        <NoData title="Mavzu mavjud emas" />
      ) : (
        <>
          <div className="theme__body">
            <Spin spinning={loading}>
              <Collapse accordion onChange={(id) => GetResources(id)}>
                {themes.map((theme: any) => (
                  <Collapse.Panel
                    key={theme.themeId}
                    header={theme.themeName}
                    showArrow={false}
                  >
                    <Spin spinning={loadingIn}>
                      <div className="theme__items">
                        {resources.map((i: any) => (
                          <div
                            className={`single flex ${giveFileType(i?.url)}`}
                            key={i?.id}
                          >
                            {/* Display image by file type */}

                            <div
                              style={{
                                gap: 16,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {giveImage(i?.url)}

                              <div>
                                <h3>{prettyName(i?.url)}</h3>
                                <Badge
                                  count={`${i?.type}`}
                                  style={{ marginTop: 4 }}
                                  color={giveColor(i?.type)}
                                />
                              </div>
                            </div>
                            {i?.type == "Elektron manbalarga havolalar" ? (
                              <a href={i?.url} target="_blank">
                                <Button type="primary">Havolaga o'tish</Button>
                              </a>
                            ) : i?.type == "Videodarslar" ? (
                              <div className="flex">
                                <a
                                  href={i?.url.replace(
                                    "videoStream",
                                    "download"
                                  )}
                                >
                                  <Button type="primary">Yuklash</Button>
                                </a>
                                <a href={i?.url} target="_blank">
                                  <Button type="primary">Ko'rish</Button>
                                </a>
                              </div>
                            ) : (
                              <a href={i?.url} download target="_blank">
                                <Button type="primary">Yuklash</Button>
                              </a>
                            )}
                          </div>
                        ))}

                        {resources.length == 0 && role !== "ROLE_EDUADMIN" && (
                          <Alert message="Resurs mavjud emas !" type="error" />
                        )}
                      </div>
                    </Spin>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Spin>
          </div>

          <Pagination
            total={total}
            pageSize={10}
            onChange={setPage}
            showSizeChanger={false}
            defaultCurrent={+current}
            style={{ marginTop: 16, textAlign: "end" }}
          />
        </>
      )}
    </div>
  );
};

export default Theme;
