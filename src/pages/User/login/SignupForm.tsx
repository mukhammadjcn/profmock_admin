import React, { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import { CatchError, PrettyPhone } from "src/utils/index";
import { Link } from "react-router-dom";
import { RegisterCheckConfig, RegisterConfig } from "src/server/config/Urls";
import { ACCESS } from "src/server/Host";

interface IRegisterUser {
  pinfl: string;
  givenDate: string;
  phoneNumber: string;
}

function SignupForm() {
  const [form] = Form.useForm();
  const [accept, setAccept] = useState(false);
  const [smsSend, setSmsSend] = useState(false);
  const [userData, setUserData] = useState<IRegisterUser>();
  const [userExist, setUserExist] = useState<null | boolean>(null);

  const validateUser = async ({ pinfl, givenDate, phoneNumber }: any) => {
    // API request
    try {
      const data = {
        pinfl,
        phoneNumber: PrettyPhone(phoneNumber),
        givenDate: givenDate?.format("YYYY-MM-DD"),
      };

      // Set data
      setUserData(data);

      // send api request
      await RegisterCheckConfig(data);

      setSmsSend(true);
      setUserExist(false);
    } catch (error) {
      setUserExist(true);
      CatchError(error);
    }
  };
  const submitCode = async ({ code }: any) => {
    try {
      const { data } = await RegisterConfig({
        code,
        ...userData,
      });
      message.success(data?.message);
      localStorage.setItem(ACCESS, data?.object?.jwtToken);
      window.location.href = "/profile";
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <>
      {smsSend ? (
        <Form form={form} layout="vertical" onFinish={submitCode}>
          {userExist == false && (
            <Alert
              message={`Sizning +${userData?.phoneNumber} raqamingizga sms kod yuborildi, ushbu koddan parol sifatida foydalaning !`}
              type="success"
              style={{ marginBottom: 16 }}
            />
          )}

          <div>
            <Form.Item label="Kodni kiriting" name="code">
              <Input size="large" />
            </Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Ro'yhatdan o'tish
            </Button>
          </div>
        </Form>
      ) : (
        <Form form={form} layout="vertical" onFinish={validateUser}>
          {userExist === true && (
            <Alert
              type="error"
              style={{ marginBottom: 16 }}
              message="Bu foydalanuvchi avval ro'yhatdan o'tgan"
            />
          )}
          <div>
            <Form.Item
              name="phoneNumber"
              label="Telefon raqamingiz"
              rules={[
                {
                  required: true,
                  message: "Telefon raqamni kiriting",
                },
                {
                  pattern: /^\(\d{2}\) \d{3} \d{2} \d{2}$/,
                  message: "Iltimos telefon raqamni to'liq kiriting",
                },
              ]}
            >
              <MaskedInput prefix="+998" mask={"(00) 000 00 00"} size="large" />
            </Form.Item>

            <Form.Item
              label="JSHSHR ni kiriting"
              name="pinfl"
              rules={[
                {
                  required: true,
                  message: "JSHSHR ni kiriting",
                },
                {
                  pattern: /^\d{14}$/,
                  message: "Iltimos JSHSHR ni to'liq kiriting",
                },
              ]}
            >
              <MaskedInput mask={"00000000000000"} size="large" />
            </Form.Item>

            <Form.Item
              label="Passport berilgan sana"
              name="givenDate"
              rules={[
                {
                  required: true,
                  message: "Passport berilgan sana ni kiriting",
                },
              ]}
            >
              <DatePicker
                size="large"
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                placeholder="Sanani belgilang !"
              />
            </Form.Item>

            <Checkbox
              className="accept-shartlar"
              onChange={(val) => setAccept(val.target.checked)}
            >
              <Link to={""}>Foydalanish shartlari</Link> qabul qilaman
            </Checkbox>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={!accept}
            >
              Ro'yhatdan o'tish
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}

export default SignupForm;
