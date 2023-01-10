import React from "react";
import { Button, Form, Input, message } from "antd";
import { MaskedInput } from "antd-mask-input";
import { LoginConfig } from "src/server/config/Urls";
import { CatchError, PrettyPhone } from "src/utils/index";
import { ACCESS, ROLE, setLocal } from "src/server/Host";

function SigninForm({ setTab, setSection }: any) {
  const [form] = Form.useForm();

  const handleSubmit = async ({ password, phoneNumber }: any) => {
    try {
      const { data } = await LoginConfig({
        password,
        phoneNumber: PrettyPhone(phoneNumber),
      });
      message.success(data?.message);
      setLocal(ACCESS, data?.object?.jwtToken);
      setLocal(ROLE, "ROLE_USER");
      window.location.href = "/profile";
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Telefon raqamingiz"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Telefon raqamingizni kiriting",
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
        label="Parol"
        name="password"
        rules={[
          {
            required: true,
            message: "Foydalanuvchu parolini kiriting",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      {/* <span
        className="password-reset"
        onClick={() => {
          setTab("reset");
          setSection("resetPassword");
        }}
      >
        Parolni unitdingizmi ?
      </span> */}

      <Button htmlType="submit" type="primary" size="large">
        Kirish
      </Button>
    </Form>
  );
}

export default SigninForm;
