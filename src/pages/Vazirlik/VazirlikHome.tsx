import { Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { IBoshqarmaList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { CatchError, LastPage } from "src/utils/index";
import { GetBoshqarmalarConfig } from "src/server/config/Urls";

const VazirlikHome: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState<IBoshqarmaList[]>([]);

  const columns: ColumnsType<IBoshqarmaList> = [
    {
      title: "Boshqarma nomi",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Link
          to={`/ministry/regions/universities?page=1&managementId=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.name}
        </Link>
      ),
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
      title: "Viloyat",
      dataIndex: "region",
      key: "region",
      align: "center",
      width: 160,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: 500,
    },
  ];

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
          dataSource={directions}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default VazirlikHome;
