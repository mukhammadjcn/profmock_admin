import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

const Direaction: React.FC = () => {
  interface DataType {
    key: string;
    mutaxasis: string;
    subject_number: number;
    resurs_number: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Mutaxassislik nomi",
      dataIndex: "mutaxasis",
      key: "mutaxasis",
      render: (_, item) => (
        <Link to={`#item${item.key}`}>{item.mutaxasis}</Link>
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
      title: "Resurslar soni",
      dataIndex: "resurs_number",
      key: "resurs_number",
      align: "center",
      width: 200,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      mutaxasis: "Axborot texnologiyalariningdasturiy ta’minoti",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "2",
      mutaxasis: "Kiberxavfsizlik va kriminalistika",
      subject_number: 42,
      resurs_number: 42,
    },
    {
      key: "3",
      mutaxasis: "Audiovizual texnologiyalar",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "11",
      mutaxasis: "Axborot texnologiyalariningdasturiy ta’minoti",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "12",
      mutaxasis: "Kiberxavfsizlik va kriminalistika",
      subject_number: 42,
      resurs_number: 42,
    },
    {
      key: "13",
      mutaxasis: "Audiovizual texnologiyalar",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "21",
      mutaxasis: "Axborot texnologiyalariningdasturiy ta’minoti",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "22",
      mutaxasis: "Kiberxavfsizlik va kriminalistika",
      subject_number: 42,
      resurs_number: 42,
    },
    {
      key: "23",
      mutaxasis: "Audiovizual texnologiyalar",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "31",
      mutaxasis: "Axborot texnologiyalariningdasturiy ta’minoti",
      subject_number: 32,
      resurs_number: 32,
    },
    {
      key: "32",
      mutaxasis: "Kiberxavfsizlik va kriminalistika",
      subject_number: 42,
      resurs_number: 42,
    },
    {
      key: "33",
      mutaxasis: "Audiovizual texnologiyalar",
      subject_number: 32,
      resurs_number: 32,
    },
  ];

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
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Direaction;
