import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Table,
  Image,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { IUniverList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { CatchError, LastPage, PrettyPhone } from "src/utils/index";
import { Link, useSearchParams } from "react-router-dom";
import {
  GetMyCollegesConfig,
  GetManagmentStatConfig,
  GetUniversitiesConfig,
  CheckAdminConfig,
  AddTMAdminConfig,
} from "src/server/config/Urls";
import { resourceType } from "src/assets/data";
import { isManagment } from "src/server/Host";
import { SettingOutlined } from "@ant-design/icons";
import { MaskedInput } from "antd-mask-input";

const BoshqarmaUniversities: React.FC = () => {
  const [stats, setStats] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [directions, setDirections] = useState<IUniverList[]>([]);

  // For pagination
  const [total, setTotal] = useState(0);
  const currentPage = searchParams.get("page");
  const currentSearch = searchParams.get("search");
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);
  const [search, setSearh] = useState(currentSearch ? currentSearch : "");

  // For change admin
  const [form] = Form.useForm();
  const [userID, setUserID] = useState(0);
  const [eduID, setEduID] = useState(0);
  const [user, setUser] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<IUniverList> = [
    {
      title: "Taʼlim muassasasi nomi",
      dataIndex: "eduName",
      key: "eduName",
      render: (_, item) => (
        <Link
          to={`/administration/universities/directions?page=1&eduId=${item.eduId}`}
          onClick={() => LastPage()}
        >
          {item.eduName}
        </Link>
      ),
    },
    {
      title: "Ma'sul shaxs",
      dataIndex: "fullName",
      key: "fullName",
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
      title: "Resurslar soni",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 200,
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
    },
  ];
  const columnsMinistry: ColumnsType<IUniverList> = [
    {
      title: "Taʼlim muassasasi nomi",
      dataIndex: "eduName",
      key: "eduName",
      render: (_, item) => (
        <Link
          to={`/ministry/regions/universities/directions?page=1&eduId=${item.eduId}`}
          onClick={() => LastPage()}
        >
          {item.eduName}
        </Link>
      ),
    },
    {
      title: "Ma'sul shaxs",
      dataIndex: "fullName",
      key: "fullName",
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
      title: "Resurslar soni",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 200,
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
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
            setUserID(+item.key);
            setIsModalOpen(true);
            setEduID(+item.eduId);
          }}
        />
      ),
    },
  ];

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const setPage = (val: any) => {
    setCurrent(val.current);
    handleMakeParams("page", val.current);
    isManagment() ? GetMyDirections() : GetMinistryDirection();
    window.scrollTo(0, 0);
  };
  const setSearch = (val: any) => {
    // set page 1
    setCurrent(1);
    handleMakeParams("page", 1);

    // set search
    setSearh(val);
    handleMakeParams("search", val);
    isManagment() ? GetMyDirections() : GetMinistryDirection();
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
      const { data } = await AddTMAdminConfig({
        pinfl,
        id: userID,
        eduId: eduID,
        phoneNumber: PrettyPhone(phoneNumber),
        givenDate: given_date?.format("YYYY-MM-DD"),
      });

      message.success(data?.message);
      setIsModalOpen(false);
      form.resetFields();
      setEduID(0);
      setUserID(0);
      setUser({});
      getByRole();
    } catch (error) {
      CatchError(error);
    }
  };

  const GetStats = async () => {
    try {
      const { data } = await GetManagmentStatConfig();
      let array = resourceType;
      array.forEach((item: any) => {
        item.count = data.find((el: any) => el.type === item.type)?.count || 0;
      });
      setStats(array);
    } catch (error) {
      CatchError(error);
    }
  };
  const GetMyDirections = async () => {
    setLoading(true);
    try {
      const { data } = await GetMyCollegesConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

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
  const GetMinistryDirection = async () => {
    setLoading(true);
    try {
      const { data } = await GetUniversitiesConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

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

  // Get requests by role
  const getByRole = () => {
    if (isManagment()) {
      GetStats();
      GetMyDirections();
    } else {
      GetMinistryDirection();
    }
  };

  useEffect(() => {
    getByRole();
  }, []);

  return (
    <div className="flex">
      {isManagment() && (
        <div className="college__info">
          {stats.length > 0 ? (
            stats?.map((item: any, index: number) => (
              <div className="flex" key={index}>
                <span>{item?.type}</span>
                <h4>{item?.count}</h4>
              </div>
            ))
          ) : (
            <h3 style={{ fontWeight: 500, fontSize: 17 }}>
              Hech qanday resurs yuklanmagan !
            </h3>
          )}
        </div>
      )}

      <div className="college__directions">
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Input.Search
            allowClear
            onSearch={setSearch}
            defaultValue={search}
            style={{ width: 400 }}
            placeholder="Talim muassasaning nomini kiriting !"
          />
        </div>
        <Table
          pagination={{
            total: total,
            pageSize: 10,
            current: +current,
            showSizeChanger: false,
          }}
          onChange={setPage}
          loading={loading}
          dataSource={directions}
          columns={isManagment() ? columns : columnsMinistry}
        />
      </div>

      <Modal
        width={600}
        title="Ta'lim muassasa adminini tahrirlash"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEduID(0);
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
                setEduID(0);
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

export default BoshqarmaUniversities;
