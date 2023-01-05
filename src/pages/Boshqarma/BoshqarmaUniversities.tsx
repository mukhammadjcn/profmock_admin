import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUniverList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { CatchError, LastPage } from "src/utils/index";
import { Link, useSearchParams } from "react-router-dom";
import { GetMyCollegesConfig } from "src/server/config/Urls";

const BoshqarmaUniversities: React.FC = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [directions, setDirections] = useState<IUniverList[]>([]);

  // For pagination
  const [total, setTotal] = useState(0);
  const currentPage = searchParams.get("page");
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);

  const columns: ColumnsType<IUniverList> = [
    {
      title: "Taʼlim muassasasi nomi",
      dataIndex: "eduName",
      key: "eduName",
      render: (_, item) => (
        <Link
          to={`/administration/universities/directions?page=1&eduId=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.eduName}
        </Link>
      ),
    },
    {
      title: "Tuman",
      dataIndex: "district",
      key: "district",
      align: "center",
      width: 200,
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

  useEffect(() => {
    GetMyDirections();
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
          onChange={setPage}
          pagination={{
            total: total,
            pageSize: 10,
            current: +current,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default BoshqarmaUniversities;