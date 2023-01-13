import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUniverList } from "src/types/index";
import React, { useEffect, useState } from "react";
import { CatchError, LastPage } from "src/utils/index";
import { Link, useSearchParams } from "react-router-dom";
import {
  GetMyCollegesConfig,
  GetManagmentStatConfig,
  GetUniversitiesConfig,
} from "src/server/config/Urls";
import { resourceType } from "src/assets/data";
import { isManagment } from "src/server/Host";

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
      title: "Resurslar soni",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 200,
    },
    {
      title: "Viloyat",
      dataIndex: "region",
      key: "region",
      align: "center",
      width: 200,
    },
    {
      title: "Tuman",
      dataIndex: "district",
      key: "district",
      align: "center",
      width: 200,
    },
  ];
  const columnsMinistry: ColumnsType<IUniverList> = [
    {
      title: "Taʼlim muassasasi nomi",
      dataIndex: "eduName",
      key: "eduName",
      render: (_, item) => (
        <Link
          to={`/ministry/regions/universities/directions?page=1&eduId=${item.key}`}
          onClick={() => LastPage()}
        >
          {item.eduName}
        </Link>
      ),
    },
    {
      title: "Resurslar soni",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 200,
    },
    {
      title: "Viloyat",
      dataIndex: "region",
      key: "region",
      align: "center",
      width: 200,
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
    </div>
  );
};

export default BoshqarmaUniversities;
