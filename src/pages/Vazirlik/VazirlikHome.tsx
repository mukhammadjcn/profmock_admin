import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBoshqarmaList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { CatchError, LastPage } from "src/utils/index";
import { Link } from "react-router-dom";
import {
  GetManagmentStatConfig,
  GetBoshqarmalarConfig,
} from "src/server/config/Urls";
import { resourceType } from "src/assets/data";

const VazirlikHome: React.FC = () => {
  const [stats, setStats] = useState<any>([]);
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

  useEffect(() => {
    // GetStats();
    GetMyBoshqarma();
  }, []);

  return (
    <div className="flex">
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
