import {
  Form,
  Input,
  Modal,
  Table,
  Image,
  Button,
  message,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { IBoshqarmaList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { CatchError, LastPage, PrettyPhone } from "src/utils/index";
import {
  CheckAdminConfig,
  GetBoshqarmalarConfig,
  AddManagmentAdminConfig,
} from "src/server/config/Urls";
import { MaskedInput } from "antd-mask-input";

const VazirlikHome: React.FC = () => {
  const [form] = Form.useForm();
  const [userID, setUserID] = useState(0);
  const [user, setUser] = useState<any>({});
  const [regionID, setRegionID] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directions, setDirections] = useState<IBoshqarmaList[]>([]);

  const columns: ColumnsType<IBoshqarmaList> = [
    {
      title: "Boshqarma nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link
          to={`/ministry/regions/universities?page=1&managementId=${item.regionId}`}
          onClick={() => LastPage()}
        >
          {item.address}
        </Link>
      ),
    },
    {
      title: "Ma'sul shaxs",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Yuklangan resurslar",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 160,
    },
    {
      title: "Telefon raqam",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: 160,
    },
    {
      title: "PINFL",
      dataIndex: "pinfl",
      key: "pinfl",
      align: "center",
      width: 160,
    },
    {
      width: 100,
      key: "actions",
      align: "center",
      title: "Tahrirlash",
      render: (_, item) => (
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={() => {
            setUserID(item.id);
            setIsModalOpen(true);
            setRegionID(item.regionId);
          }}
        />
      ),
    },
  ];

  const CheckAdmin = async ({ pinfl, given_date }: any) => {
    try {
      const { data } = await CheckAdminConfig({
        pinfl,
        given_date: given_date?.format("YYYY-MM-DD"),
      });

      if (data?.data !== null) {
        setUser(data?.data);
        message.success("Muvofaqqiyatli topildi !");
      } else {
        message.error("Bu shaxs ma'lumotlari topilmadi !");
      }
    } catch (error) {
      CatchError(error);
    }
  };
  const AddAdmin = async ({ pinfl, given_date, phoneNumber }: any) => {
    try {
      const { data } = await AddManagmentAdminConfig({
        pinfl,
        id: userID,
        regionId: regionID,
        phoneNumber: PrettyPhone(phoneNumber),
        givenDate: given_date?.format("YYYY-MM-DD"),
      });

      message.success(data?.message);
      setIsModalOpen(false);
      form.resetFields();
      setRegionID(0);
      setUserID(0);
      setUser({});
      GetMyBoshqarma();
    } catch (error) {
      CatchError(error);
    }
  };
  const GetMyBoshqarma = async () => {
    setLoading(true);
    try {
      const { data } = await GetBoshqarmalarConfig();

      // Set Data
      setDirections(
        data?.content.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              key: next.id,
              ...next,
            },
          ],
          []
        )
      );
    } catch (error) {
      CatchError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    GetMyBoshqarma();
  }, []);

  return (
    <div className="flex">
      <div className="college__directions">
        <Table
          columns={columns}
          loading={loading}
          pagination={false}
          dataSource={directions}
        />
      </div>

      <Modal
        width={600}
        title="Mavzu qo'shish"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setRegionID(0);
          setUserID(0);
          setUser({});
        }}
      >
        <Form
          onFinish={user?.pinfl ? AddAdmin : CheckAdmin}
          layout="vertical"
          form={form}
        >
          <div className="flex">
            <Form.Item
              style={{ flexGrow: 1 }}
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
              <MaskedInput
                mask={"00000000000000"}
                disabled={user?.pinfl}
                placeholder="PINFL"
              />
            </Form.Item>
            <Form.Item
              style={{ flexGrow: 1 }}
              name="given_date"
              label="Passport berilgan sana"
              rules={[
                {
                  required: true,
                  message: "PINFLni kiriting !",
                },
              ]}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                disabled={user?.pinfl}
                style={{ width: "100%" }}
                placeholder="Passport berilgan sana"
              />
            </Form.Item>
          </div>

          {user?.pinfl && (
            <div style={{ display: "flex", gap: 16 }}>
              <Image
                width={180}
                src={`data:image/jpeg;base64,${user?.photo ?? ""}`}
              />
              <div style={{ flexGrow: 1 }}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Familya, ismi, sharifi"
                >
                  <Input
                    disabled
                    value={`${user?.first_name} ${user?.last_name} ${user?.middle_name}`}
                  />
                </Form.Item>
                <Form.Item style={{ width: "100%" }} label="Manzil">
                  <Input disabled value={user?.permanent_address} />
                </Form.Item>
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
                  <MaskedInput prefix="+998" mask={"(00) 000 00 00"} />
                </Form.Item>
              </div>
            </div>
          )}

          <div className="flex" style={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
                setRegionID(0);
                setUserID(0);
                setUser({});
              }}
            >
              Orqaga
            </Button>

            <Button htmlType="submit" type="primary">
              {user?.pinfl ? "Tasdiqlash" : "Yuborish"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default VazirlikHome;
