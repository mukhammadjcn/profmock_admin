import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IList, ISubject } from "src/types/index";
import { ColumnsType } from "antd/es/table";
import {
  Tabs,
  Form,
  Badge,
  Modal,
  Table,
  Button,
  Select,
  message,
  SelectProps,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { CatchError, LastPage } from "src/utils/index";
import {
  GetSubjectsConfig,
  PostSubjectConfig,
  DelDirectionConfig,
  GetMySubjectsConfig,
  DelSubjectConfig,
} from "src/server/config/Urls";

const Subject: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [subjectsList, setSubjectsList] = useState<IList[]>([]);

  // For pagination
  const [total, setTotal] = useState(0);
  const currentPage = searchParams.get("page");
  const currentSemester = searchParams.get("semesterId");
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);
  const [currentSem, setCurrentSem] = useState(
    currentSemester ? currentSemester : 1
  );

  const columns: ColumnsType<ISubject> = [
    {
      title: "Fan nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link
          to={`/college/direction/subject/theme?themeID=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.name}
        </Link>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 180,
    //   render: (_, item) =>
    //     item.status ? (
    //       <Badge status="success" text="File yuklangan" />
    //     ) : (
    //       <Badge status="error" text="File yuklanmagan" />
    //     ),
    // },
    {
      title: "Mavzular soni",
      dataIndex: "theme_number",
      key: "theme_number",
      align: "center",
      width: 150,
    },
    {
      title: "Resurslar soni",
      dataIndex: "resurs_number",
      key: "resurs_number",
      align: "center",
      width: 150,
    },
    {
      title: "Amallar",
      key: "actions",
      align: "center",
      width: 80,
      render: (_, item) => (
        <div className="flex" style={{ justifyContent: "center" }}>
          {/* <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => alert(item.key)}
          /> */}
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            disabled={item.resurs_number > 0}
            onClick={() => DeleteDirection(+item.key)}
          />
        </div>
      ),
    },
  ];
  const selectProps: SelectProps = {
    mode: "multiple",
    showSearch: true,
    options: subjectsList,
    style: { width: "100%" },
    maxTagCount: "responsive",
    placeholder: "Fanlarni tanlang !",
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
  const setSemester = (val: any) => {
    setCurrentSem(val);
    handleMakeParams("semesterId", val);
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

  const GetSubjectsList = async () => {
    try {
      const { data } = await GetSubjectsConfig();
      setSubjectsList(
        data.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              value: next?.id,
              label: next?.name,
            },
          ],
          []
        )
      );
    } catch (error) {
      CatchError(error);
    }
  };
  const SendSubjects = async ({ subjectId }: { subjectId: string[] }) => {
    try {
      await PostSubjectConfig({
        subjectId,
        semesterId: searchParams.get("semesterId") || 1,
        directionId: searchParams.get("directionEduId"),
      });
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
      const { data } = await GetMySubjectsConfig(urlMaker());

      // Set pagination data
      setTotal(data.totalElements);

      // Set Data
      setSubjects(
        data?.content.reduce(
          (prev: any, next: any) => [
            ...prev,
            {
              key: next?.subjectDirectionEduId,
              name: next?.name,
              theme_number: next?.subjectCount ?? 0,
              resurs_number: next?.subjectCount ?? 0,
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
      title: "Haqiqatdan ham bu fanni o'chirasizmi ?",
      icon: <ExclamationCircleFilled />,
      content: "Keyinchalik bu yo'nalishni qayta qo'shib olishingiz mumkin ",
      async onOk() {
        try {
          await DelSubjectConfig(id);
          message.success("Muvofaqqiyatli o'chirildi )");
          GetMyDirections();
        } catch (error) {
          CatchError(error);
        }
      },
    });
  };

  useEffect(() => {
    GetMyDirections();
    GetSubjectsList();
  }, []);

  return (
    <div className="subject">
      <div className="subject__tab">
        <Tabs
          onChange={setSemester}
          defaultActiveKey={currentSem.toString()}
          items={[
            {
              label: `1-semester`,
              key: "1",
            },
            {
              label: `2-semester`,
              key: "2",
            },
            {
              label: `3-semester`,
              key: "3",
            },
            {
              label: `4-semester`,
              key: "4",
            },
            {
              label: `5-semester`,
              key: "5",
            },
            {
              label: `6-semester`,
              key: "6",
            },
            {
              label: `7-semester`,
              key: "7",
            },
            {
              label: `8-semester`,
              key: "8",
            },
          ]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Fan qo'shish
        </Button>
      </div>

      <div className="subject__table">
        <Table
          columns={columns}
          dataSource={subjects}
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
        width={800}
        title="Fanlar qo'shish"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
      >
        <Form onFinish={SendSubjects} layout="vertical" form={form}>
          <Form.Item
            name="subjectId"
            label="Fanlar"
            rules={[
              {
                required: true,
                message: "Kamida bitta fan tanlash kerak",
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

export default Subject;
