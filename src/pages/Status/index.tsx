import { message } from "antd";
import React, { useEffect } from "react";
import { CatchError } from "src/utils/index";
import { setUser } from "src/store/slices/user";
import { useAppDispatch } from "src/hooks/index";
import { ACCESS, ROLE, setLocal } from "src/server/Host";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SignInOneIDAdminConfig } from "src/server/config/Urls";
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
        const { data } = await SignInOneIDAdminConfig(code);

        dispatch(setUser(data));

        // SET ROLE
        setLocal(ROLE, data?.object?.roles[0]);

        // SET TOKEN
        setLocal(ACCESS, data?.object?.jwtToken);

        if (data?.object?.roles[0] == "ROLE_EDUADMIN") {
          window.location.href = "/college/statistcs";
        } else if (data?.object?.roles[0] == "ROLE_USER") {
          window.location.href = "/profile";
        } else {
          window.location.href = "/administration/statistcs";
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
