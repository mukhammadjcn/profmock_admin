import React from "react";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Badge, Button, Table, Tabs } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const Subject: React.FC = () => {
  interface DataType {
    key: string;
    name: string;
    status: boolean;
    theme_number: number;
    resurs_number: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Fan nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link to={`/college/direction/subject/theme?themeID=${item.key}`}>
          {item.name}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (_, item) =>
        item.status ? (
          <Badge status="success" text="File yuklangan" />
        ) : (
          <Badge status="error" text="File yuklanmagan" />
        ),
    },
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
      key: "resurs_number",
      align: "center",
      width: 180,
      render: (_, item) => (
        <div className="flex" style={{ justifyContent: "center" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => alert(item.key)}
          />
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => alert(item.key)}
          />
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Axborot texnologiyalariningdasturiy ta’minoti",
      status: true,
      theme_number: 32,
      resurs_number: 32,
    },
    {
      key: "2",
      name: "Axborot texnologiyalariningdasturiy ta’minoti",
      status: false,
      theme_number: 32,
      resurs_number: 32,
    },
  ];

  return (
    <div className="subject">
      <div className="subject__tab">
        <Tabs
          defaultActiveKey="1"
          onChange={(item: any) => console.log(item)}
          items={[
            {
              label: `1-semestr`,
              key: "1",
            },
            {
              label: `2-semestr`,
              key: "2",
            },
            {
              label: `3-semestr`,
              key: "3",
            },
            {
              label: `4-semestr`,
              key: "4",
            },
            {
              label: `5-semestr`,
              key: "5",
            },
            {
              label: `6-semestr`,
              key: "6",
            },
            {
              label: `7-semestr`,
              key: "7",
            },
            {
              label: `8-semestr`,
              key: "8",
            },
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Fan qo'shish
        </Button>
      </div>

      <div className="subject__table">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Subject;
