import { message } from "antd";
import React, { useEffect } from "react";
import { CatchError } from "src/utils/index";
import { ACCESS, ROLE } from "src/server/Host";
import { setUser } from "src/store/slices/user";
import { useAppDispatch } from "src/hooks/index";
import { SignInOneIDConfig } from "src/server/config/Urls";
import { useNavigate, useSearchParams } from "react-router-dom";
import "src/styles/status.scss";

const Status: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();

  const NavigateHome = async () => {
    await new Promise((res) => setTimeout(res, 2000));
    const code = searchParam.get("code");
    if (code) {
      try {
        const { data } = await SignInOneIDConfig(code);

        dispatch(setUser(data));

        // SET ROLE
        localStorage.setItem(ROLE, data?.object?.roles[0]);

        // SET TOKEN
        localStorage.setItem(ACCESS, data?.object?.jwtToken);

        if (data?.object?.roles[0] == "ROLE_EDUADMIN") {
          window.location.href = "/college/statistcs";
        } else {
          window.location.href = "administration/statistcs";
        }
      } catch (error) {
        navigate("/");
        CatchError(error);
      }
    } else {
      navigate("/");
      message.error("Sizning ma'lumotlaringiz bazadan topilmadi !");
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
