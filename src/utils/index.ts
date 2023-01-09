import { message } from "antd";
import { ACCESS, REFRESH, role, ROLE } from "../server/Host";

export const CatchError = async (error: any) => {
  if (error.response) {
    let obj = error.response.data;
    if (error.response.status === 401) {
      localStorage.removeItem(ACCESS);
      localStorage.removeItem(REFRESH);
      localStorage.removeItem(ROLE);
      window.location.href = "/";
      // Displaying error messages
      for (let key in obj) {
        if (key !== "status") {
          if (obj[key] === "Not found.") {
            message.warning(
              `Sizning raqamingiz bazada yo'q. Iltimos ro'yhatdan o'ting !`
            );
          } else {
            if (key === "error") {
              message.error(obj.error.detail);
            }
            if (obj[key].length > 0 && typeof obj[key] === "string") {
              message.error(obj[key]);
            }
            if (Array.isArray(obj[key])) {
              obj[key]?.forEach((item: any) => {
                item.length > 0 && message.error(item);
              });
            }
          }
        }
      }
    } else {
      if (obj?.code == "token_not_valid") {
        localStorage.removeItem(ROLE);
        localStorage.removeItem(ACCESS);
        localStorage.removeItem(REFRESH);
        message.info("Kirish vaqti tugadi, qaytadan kiring !");
        await new Promise((r: any) => setTimeout(r, 2000));
        window.location.href = "/";
      } else {
        if (role !== "ministry") {
          for (let key in obj) {
            if (key !== "status") {
              if (obj[key] === "Not found.") {
                message.warning(
                  `Sizning raqamingiz bazada yo'q. Iltimos ro'yhatdan o'ting !`
                );
              } else {
                if (key === "error") {
                  message.error(obj.error.detail);
                }
                if (obj[key].length > 0 && typeof obj[key] === "string") {
                  if (obj[key] === "Siz universitet admini emassiz") {
                    message.info('"Siz universitet admini emassiz"');
                    await new Promise((r) => setTimeout(r, 3000));
                    localStorage.removeItem(ACCESS);
                    localStorage.removeItem(REFRESH);
                    localStorage.removeItem(ROLE);
                    window.location.href = "/";
                  } else {
                    message.error(obj[key]);
                  }
                }
                if (Array.isArray(obj[key])) {
                  obj[key]?.forEach((item: any) => {
                    item.length > 0 && message.error(item);
                  });
                }
              }
            }
          }
        }
      }
    }
  }
};

// Give edu lang
export const GiveLang = (key: number) => {
  return key == 1 ? `O'zbekcha` : key == 2 ? `Ruscha` : "Qoraqalpoqcha";
};

// Give edu type
export const GiveType = (key: number) => {
  return key == 1
    ? `Kunduzgi`
    : key == 2
    ? `Dual texnikum`
    : key == 3
    ? `Sirtqi`
    : "Kechki";
};

export const LastPage = () => {
  localStorage.setItem(
    "lastpage",
    window.location.pathname + window.location.search
  );
};

// Pretty phone
export const PrettyPhone = (phone: string) => {
  return `998${phone.replace("(", "").replace(")", "").replaceAll(" ", "")}`;
};

// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   fileList: fileList,
//   beforeUpload() {
//     return false;
//   },
//   async onChange(val) {
//     console.log(val);
//     setFileList([...val?.fileList]);

//     await new Promise(() => {
//       setTimeout(() => {
//         setFileList([]);
//         message.success("Muvofaqqiyatli yuborildi !");
//       }, 5000);
//     });
//   },
// };

// <Upload.Dragger {...props} style={{ marginTop: 24 }}>
//                   <p className="ant-upload-drag-icon">
//                     <DownloadOutlined />
//                   </p>
//                   <p className="ant-upload-text">
//                     Bu yerni bosing yoki kerakli fayllarni shu yerga tashlang :)
//                   </p>
//                 </Upload.Dragger>
