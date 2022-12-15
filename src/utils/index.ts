import { message } from "antd";
import { regions } from "src/config/data";
import { IRegion } from "src/types/index";
import { deleteCookie } from "../server/Cookies";
import { ACCESS, REFRESH, role, ROLE } from "../server/Host";

export const CatchError = async (error: any) => {
  if (error.response) {
    let obj = error.response.data;
    if (error.response.status === 401) {
      deleteCookie(ACCESS);
      deleteCookie(REFRESH);
      deleteCookie(ROLE);
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
        deleteCookie(ROLE);
        deleteCookie(ACCESS);
        deleteCookie(REFRESH);
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
                    deleteCookie(ACCESS);
                    deleteCookie(REFRESH);
                    deleteCookie(ROLE);
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

export const GetDistrict = (regionID: number) => {
  return regions.find((region: IRegion) => region.id == regionID)?.districts;
};
