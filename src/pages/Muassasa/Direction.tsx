import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { CatchError } from "src/utils/index";
import { IDirectionList, IDirections } from "src/types/index";
import {
  PostDirectionConfig,
  GetDirectionsConfig,
  GetMyDirectionsConfig,
  DelDirectionConfig,
} from "src/server/config/Urls";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Table, Form, Select, SelectProps, message } from "antd";

const Direaction: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [directions, setDirections] = useState<IDirections[]>([]);
  const [directionsList, setDirectionsList] = useState<IDirectionList[]>([]);

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
        <Link to={`/college/direction/subject?subjectID=${item.key}`}>
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
    GetMyDirections();
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

  useEffect(() => {
    GetMyDirections();
    GetDirectionsList();
  }, []);

  return (
    <div className="flex">
      <div className="college__info">
        <ul>
          <li>
            <span>Viloyat:</span>
            <h4>Buxoro</h4>
          </li>
          <li>
            <span>Manzil:</span>
            <h4>Buxoro</h4>
          </li>
          <li>
            <span>Telfon raqami:</span>
            <h4>+998901232334</h4>
          </li>
          <li>
            <span>Direktor:</span>
            <h4>Askarov Abror Akmal o‘g’li</h4>
          </li>
        </ul>

        <div className="flex">
          <span>Fan (amaliyot) haqida</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Videodarslar</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Taqdimot (prezentatsiya)</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Nazariy (maʼruza) qismi uchun matnlar</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Maʼruzalar boʻyicha test savollari</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Oraliq baholash uchun test savollari</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Amaliy mashgʻulotlar uchun qoʻllanmalar</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Amaliy mashgʻulotlar uchun nazorat topshiriqlari</span>
          <h4>34</h4>
        </div>
        <div className="flex">
          <span>Elektron manbalarga havolalar</span>
          <h4>34</h4>
        </div>
      </div>

      <div className="college__directions">
        <div className="flex">
          <h4>Ta'lim muassasaning mutaxasisliklari ro'yhati</h4>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Yo'nalish qoshish
          </Button>
        </div>
        <Table
          columns={columns}
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
