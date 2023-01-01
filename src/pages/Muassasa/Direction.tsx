import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { CatchError, LastPage } from "src/utils/index";
import { IList, IDirections } from "src/types/index";
import {
  DelDirectionConfig,
  PostDirectionConfig,
  GetUniverStatConfig,
  GetDirectionsConfig,
  GetMyDirectionsConfig,
  GetUniverDirectionsConfig,
} from "src/server/config/Urls";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Table, Form, Select, SelectProps, message } from "antd";
import { role } from "src/server/Host";

const Direaction: React.FC = () => {
  const [form] = Form.useForm();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [directions, setDirections] = useState<IDirections[]>([]);
  const [directionsList, setDirectionsList] = useState<IList[]>([]);

  // For pagination
  const [total, setTotal] = useState(0);
  const currentPage = searchParams.get("page");
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);

  const columns: ColumnsType<IDirections> = [
    {
      title: "Mutaxassislik nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link
          to={`/college/direction/subject?semesterId=1&directionEduId=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.name}
        </Link>
      ),
    },
    {
      title: "Fanlar soni",
      dataIndex: "subject_number",
      key: "subject_number",
      align: "center",
      width: 200,
    },
    {
      title: "Amallar",
      key: "actions",
      align: "center",
      width: 80,
      render: (_, item) => (
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          disabled={item.subject_number > 0}
          onClick={() => DeleteDirection(+item.key)}
        />
      ),
    },
  ];
  const columnsBoshqarma: ColumnsType<IDirections> = [
    {
      title: "Mutaxassislik nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link
          to={`/administration/universities/directions/subject?semesterId=1&directionEduId=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.name}
        </Link>
      ),
    },
    {
      title: "Fanlar soni",
      dataIndex: "subject_number",
      key: "subject_number",
      align: "center",
      width: 200,
    },
  ];
  const selectProps: SelectProps = {
    mode: "multiple",
    showSearch: true,
    options: directionsList,
    style: { width: "100%" },
    maxTagCount: "responsive",
    placeholder: "Yonalishlarni tanlang !",
    filterOption: (input, option) =>
      (option?.label?.toString().toLowerCase() ?? "").includes(input),
    filterSort: (optionA, optionB) =>
      (optionA?.label?.toString() ?? "")
        .toLowerCase()
        .localeCompare((optionB?.label?.toString() ?? "").toLowerCase()),
  };

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
    role == "ROLE_EDUADMIN" ? GetMyDirections() : GetDirectionListManagment();
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

  // For edu admin
  const GetDirectionsList = async () => {
    try {
      const { data } = await GetDirectionsConfig();
      setDirectionsList(
        data.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              value: next?.id,
              label: `${next?.code} - ${next?.name}`,
            },
          ],
          []
        )
      );
    } catch (error) {
      CatchError(error);
    }
  };
  const SendDirections = async ({
    directionIds,
  }: {
    directionIds: string[];
  }) => {
    try {
      await PostDirectionConfig({ directionIds });
      await GetMyDirections();
      message.success("Muvofaqqiyatli yuborildi !");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      CatchError(error);
    }
  };
  const GetMyDirections = async () => {
    setLoading(true);
    try {
      const { data } = await GetMyDirectionsConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

      // Set Data
      setDirections(
        data?.content.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              key: next?.directionEduId,
              name: `${next?.code} - ${next?.name}`,
              subject_number: next?.subjectCount ?? 0,
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
  const DeleteDirection = async (id: number) => {
    Modal.confirm({
      title: "Haqiqatdan ham bu yo'nalishni o'chirasizmi ?",
      icon: <ExclamationCircleFilled />,
      content: "Keyinchalik bu yo'nalishni qayta qo'shib olishingiz mumkin ",
      async onOk() {
        try {
          await DelDirectionConfig(id);
          message.success("Muvofaqqiyatli o'chirildi )");
          GetMyDirections();
        } catch (error) {
          CatchError(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const GetStats = async () => {
    try {
      const { data } = await GetUniverStatConfig();
      setStats(data);
    } catch (error) {
      CatchError(error);
    }
  };

  // For Managment admin
  const GetDirectionListManagment = async () => {
    setLoading(true);
    try {
      const { data } = await GetUniverDirectionsConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

      // Set Data
      setDirections(
        data?.content.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              key: next?.directionEduId,
              name: `${next?.code} - ${next?.name}`,
              subject_number: next?.subjectCount ?? 0,
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

  // Get functions by role
  const getByRole = () => {
    if (role == "ROLE_EDUADMIN") {
      GetStats();
      GetMyDirections();
      GetDirectionsList();
    } else {
      GetDirectionListManagment();
    }
  };

  useEffect(() => {
    getByRole();
  }, []);

  return (
    <div className="flex">
      {role == "ROLE_EDUADMIN" && (
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
        {role == "ROLE_EDUADMIN" && (
          <div className="flex">
            <h4>Ta'lim muassasaning mutaxasisliklari ro'yhati</h4>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Yo'nalish qoshish
            </Button>
          </div>
        )}

        <Table
          columns={role == "ROLE_EDUADMIN" ? columns : columnsBoshqarma}
          dataSource={directions}
          loading={loading}
          onChange={setPage}
          pagination={{
            total: total,
            pageSize: 10,
            current: +current,
          }}
        />
      </div>

      <Modal
        title="Yo'nalish qo'shish"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
      >
        <Form onFinish={SendDirections} layout="vertical" form={form}>
          <Form.Item
            name="directionIds"
            label="Yonalishlar"
            rules={[
              {
                required: true,
                message: "Kamida bitta yo'nalish tanlash kerak",
              },
            ]}
          >
            <Select {...selectProps} />
          </Form.Item>

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

export default Direaction;
