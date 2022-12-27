import React, { useEffect, useState } from "react";
import {
  Spin,
  Form,
  Badge,
  Input,
  Modal,
  Select,
  Button,
  Upload,
  message,
  Collapse,
  Pagination,
} from "antd";
import {
  PostFileConfig,
  PostThemeConfig,
  GetMyThemesConfig,
  PostResourceConfig,
  GetAllResourceConfig,
  DelSubjectConfig,
  DelResourceConfig,
  DelThemeConfig,
} from "src/server/config/Urls";
import { ITheme } from "types/index";
import { RcFile } from "antd/es/upload";
import { CatchError } from "src/utils/index";
import { useSearchParams } from "react-router-dom";
import NoData from "src/components/animation/NoData";
import {
  PlusOutlined,
  InboxOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const Theme: React.FC = () => {
  const [form] = Form.useForm();
  const [formFile] = Form.useForm();
  const [themes, setThemes] = useState([]);
  const [themeId, setThemeId] = useState(0);
  const [resources, setResources] = useState([]);
  const [resourceType, setResourceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingIn, setLoadingIn] = useState(false);
  const [isModalFile, setIsModalFile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const reversedName = name.split(".").reverse().join(".");
    if (
      reversedName.split(".")[0] == "ppt" ||
      reversedName.split(".")[0] == "pptx"
    ) {
      return "ppt";
    } else if (
      reversedName.split(".")[0] == "doc" ||
      reversedName.split(".")[0] == "docx"
    ) {
      return "doc";
    } else if (reversedName.split(".")[0] == "pdf") {
      return "pdf";
    } else if (reversedName.split(".")[0] == "mp4") {
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0];
    }
    return e?.fileList[0];
  };
  const delTheme = (id: number) => (
    <DeleteOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();

        DeleteTheme(id);
      }}
    />
  );

  const CreateTheme = async ({ name }: { name: string }) => {
    try {
      await PostThemeConfig({
        name,
        directionSubjectEduId: searchParams.get("directionSubjectEduId"),
      });
      await GetMyThemes();
      message.success("Muvofaqqiyatli yuborildi !");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      CatchError(error);
    }
  };
  const GetMyThemes = async () => {
    setLoading(true);
    try {
      const { data } = await GetMyThemesConfig(urlMaker());

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
      setThemeId(+id);
      setLoadingIn(true);
      try {
        const { data } = await GetAllResourceConfig(id);
        setResources(data);
      } catch (error) {
        CatchError(error);
      }
      setLoadingIn(false);
    }
  };
  const CreateResource = async (val: any) => {
    const { type, url, file } = val;

    if (type && url) {
      try {
        await PostResourceConfig({
          url,
          type,
          themeId,
        });

        message.success("Muvofaqqiyatli qo'shildi");
        setIsModalFile(false);
        GetResources(themeId.toString());
        formFile.resetFields();
      } catch (error) {
        CatchError(error);
      }
    } else {
      try {
        let formData = new FormData();
        formData.append("file", file?.originFileObj);

        const { data } = await PostFileConfig(formData);
        await PostResourceConfig({
          url: data?.object,
          type,
          themeId,
        });

        message.success("Muvofaqqiyatli qo'shildi");
        setIsModalFile(false);
        GetResources(themeId.toString());
        formFile.resetFields();
      } catch (error) {
        CatchError(error);
      }
    }
  };
  const DeleteResource = async (id: number) => {
    Modal.confirm({
      title: "Haqiqatdan ham bu resursni o'chirasizmi ?",
      icon: <ExclamationCircleFilled />,
      content: "Keyinchalik bu yo'nalishni qayta qo'shib olishingiz mumkin ",
      async onOk() {
        try {
          await DelResourceConfig(id);
          message.success("Muvofaqqiyatli o'chirildi )");
          GetResources(themeId.toString());
        } catch (error) {
          CatchError(error);
        }
      },
    });
  };
  const DeleteTheme = async (id: number) => {
    Modal.confirm({
      title: "Haqiqatdan ham bu mavzuni o'chirasizmi ?",
      icon: <ExclamationCircleFilled />,
      content: "Keyinchalik bu yo'mavzuni qayta qo'shib olishingiz mumkin ",
      async onOk() {
        try {
          await DelThemeConfig(id);
          message.success("Muvofaqqiyatli o'chirildi )");
          GetMyThemes();
        } catch (error) {
          CatchError(error);
        }
      },
    });
  };

  useEffect(() => {
    GetMyThemes();
  }, []);

  return (
    <div className="theme">
      <div className="theme__header">
        <h1>Mavzular</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Fan qo'shish
        </Button>
      </div>

      {themes.length == 0 ? (
        <NoData />
      ) : (
        <>
          <div className="theme__body">
            <Spin spinning={loading}>
              <Collapse accordion onChange={(id) => GetResources(id)}>
                {themes.map((theme: ITheme) => (
                  <Collapse.Panel
                    key={theme.themeId}
                    header={theme.themeName}
                    extra={delTheme(theme.themeId)}
                  >
                    <Spin spinning={loadingIn}>
                      <div className="theme__items">
                        {resources.map((i: any) => (
                          <div
                            className={`single flex ${giveFileType(i?.url)}`}
                            key={i?.id}
                          >
                            {/* Display image by file type */}
                            {giveImage(i?.url)}

                            <div
                              style={{
                                gap: 16,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <h3>
                                {decodeURI(
                                  i?.url?.replace(
                                    "http://prof-dist.edu.uz/api/user/download/",
                                    ""
                                  )
                                )}
                              </h3>

                              {i?.type == "Elektron manbalarga havolalar" ? (
                                <a href={i?.url} target="_blank">
                                  Havolaga o'tish
                                </a>
                              ) : (
                                <a href={i?.url} download target="_blank">
                                  Yuklab olish
                                </a>
                              )}
                            </div>
                            <div className="flex">
                              <Badge
                                count={`Resurs turi: ${i?.type}`}
                                color="#1890FF"
                              />
                              <Badge
                                count={"File hajmi: 10 mb"}
                                color="#722ED1"
                              />
                              <Badge
                                count={`Yuklab olishlar soni: ${i?.countDownload}`}
                                color="#003A8C"
                              />
                              <Button
                                danger
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => DeleteResource(i?.id)}
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="dashed"
                          onClick={() => {
                            setThemeId(theme.themeId);
                            setIsModalFile(true);
                          }}
                          icon={<PlusOutlined />}
                          style={{ marginTop: 16, width: "100%", height: 56 }}
                        >
                          Resurs qo‘shish
                        </Button>
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

      <Modal
        title="Mavzu qo'shish"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
      >
        <Form onFinish={CreateTheme} layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Mavzu nomi"
            rules={[
              {
                required: true,
                message: "Mavzu nomini kiriting !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="flex" style={{ justifyContent: "flex-end" }}>
            <Button htmlType="submit">Orqaga</Button>
            <Button htmlType="submit" type="primary">
              Yuborish
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Fayl yuklash"
        open={isModalFile}
        footer={null}
        onCancel={() => {
          setIsModalFile(false);
          formFile.resetFields();
        }}
      >
        <Form form={formFile} layout="vertical" onFinish={CreateResource}>
          <Form.Item
            name="type"
            label="Resurs turini tanlang"
            rules={[
              {
                required: true,
                message: "Resurs turini tanlang !",
              },
            ]}
          >
            <Select
              placeholder="Tanlang "
              onChange={(type: string) => setResourceType(type)}
              options={[
                {
                  value: "Fan (amaliyot) haqida",
                  label: "Fan (amaliyot) haqida",
                },
                {
                  value: "Videodarslar",
                  label: "Videodarslar",
                },
                {
                  value: "Taqdimot (prezentatsiya) materiallari",
                  label: "Taqdimot (prezentatsiya) materiallari",
                },
                {
                  value: "Nazariy (maʼruza) qismi uchun matnlar",
                  label: "Nazariy (maʼruza) qismi uchun matnlar",
                },
                {
                  value: "Maʼruzalar boʻyicha test savollari",
                  label: "Maʼruzalar boʻyicha test savollari",
                },
                {
                  value: "Oraliq baholash uchun test savollari",
                  label: "Oraliq baholash uchun test savollari",
                },
                {
                  value: "Amaliy mashgʻulotlar uchun qoʻllanmalar",
                  label: "Amaliy mashgʻulotlar uchun qoʻllanmalar",
                },
                {
                  value: "Amaliy mashgʻulotlar uchun nazorat topshiriqlari",
                  label: "Amaliy mashgʻulotlar uchun nazorat topshiriqlari",
                },
                {
                  value: "Elektron manbalarga havolalar",
                  label: "Elektron manbalarga havolalar",
                },
              ]}
            />
          </Form.Item>

          {resourceType == "Elektron manbalarga havolalar" ? (
            <Form.Item
              name="url"
              label="Havola linki"
              rules={[
                {
                  required: true,
                  message: "Havola linkini kiriting !",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <Form.Item
                noStyle
                name="file"
                valuePropName="file"
                rules={[
                  {
                    required: true,
                    message: "Faylni yuklang !",
                  },
                ]}
                getValueFromEvent={normFile}
              >
                <Upload.Dragger
                  maxCount={1}
                  multiple={false}
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Faylni bu yerga tashlang yoki shu yerga bosing )
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </div>
          )}

          <div className="flex" style={{ justifyContent: "flex-end" }}>
            <Button htmlType="submit">Orqaga</Button>
            <Button htmlType="submit" type="primary">
              Yuborish
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Theme;
