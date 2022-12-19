import React, { useState } from "react";
import {
  Badge,
  Button,
  Collapse,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";

const Theme: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const giveFileType = (name: string) => {
    if (name.split(".")[1] == "ppt") {
      return "ppt";
    } else if (name.split(".")[1] == "doc") {
      return "doc";
    } else if (name.split(".")[1] == "pdf") {
      return "pdf";
    } else if (name.split(".")[1] == "mp4") {
      return "mp4";
    } else {
      return "link";
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    fileList: fileList,
    beforeUpload() {
      return false;
    },
    async onChange(val) {
      console.log(val);
      setFileList([...val?.fileList]);

      await new Promise(() => {
        setTimeout(() => {
          setFileList([]);
          message.success("Muvofaqqiyatli yuborildi !");
        }, 5000);
      });
    },
  };

  return (
    <div className="theme">
      <h1>Mavzular</h1>

      <div className="theme__body">
        {[1, 2].map((theme: number) => (
          <Collapse collapsible="header" defaultActiveKey={["1"]} key={theme}>
            <Collapse.Panel
              key={theme}
              header={`${theme}. Bir maxrajli kasrlarni qo’shishni mustahkamlash`}
            >
              <div className="theme__items">
                {[
                  "Fizika.ppt",
                  "Fizika.doc",
                  "Fizika.pdf",
                  "Fizika.mp4",
                  "Fizika linki",
                  "Fizika.test",
                ].map((i: string) => (
                  <div className={`single flex ${giveFileType(i)}`} key={i}>
                    {/* Display image by file type */}
                    {giveFileType(i) == "doc" ? (
                      <img
                        src={require(`src/assets/images/doc.png`)}
                        alt="power point logo"
                      />
                    ) : giveFileType(i) == "mp4" ? (
                      <img
                        src={require(`src/assets/images/mp4.png`)}
                        alt="power point logo"
                      />
                    ) : giveFileType(i) == "pdf" ? (
                      <img
                        src={require(`src/assets/images/pdf.png`)}
                        alt="power point logo"
                      />
                    ) : giveFileType(i) == "ppt" ? (
                      <img
                        src={require(`src/assets/images/ppt.png`)}
                        alt="power point logo"
                      />
                    ) : (
                      <img
                        src={require(`src/assets/images/link.png`)}
                        alt="power point logo"
                      />
                    )}

                    <div>
                      <h3>{i}</h3>
                    </div>
                    <div className="flex">
                      <Badge
                        count={"Resurs turi: Fan (amaliyot) haqida"}
                        color="#1890FF"
                      />
                      <Badge count={"File hajmi: 10 mb"} color="#722ED1" />
                      <Badge
                        count={"Yuklab olishlar soni: 56"}
                        color="#003A8C"
                      />
                      <Button
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => alert(i)}
                      />
                    </div>
                  </div>
                ))}

                <Upload.Dragger {...props} style={{ marginTop: 24 }}>
                  <p className="ant-upload-drag-icon">
                    <DownloadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Bu yerni bosing yoki kerakli fayllarni shu yerga tashlang :)
                  </p>
                </Upload.Dragger>
              </div>
            </Collapse.Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default Theme;
