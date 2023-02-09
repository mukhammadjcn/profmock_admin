import React, { useEffect, useState } from "react";
import {
  Pie,
  Area,
  Gauge,
  Column,
  TinyArea,
  PieConfig,
  GaugeConfig,
} from "@ant-design/plots";
import "src/styles/statistcs.scss";
import { isAdmin, isManagment, isMinistry } from "src/server/Host";
import { CatchError } from "src/utils/index";
import { resourceType } from "src/assets/data";
import {
  GetUniverStatConfig,
  GetBoshqarmalarConfig,
  GetMinistryStatConfig,
  GetManagmentStatConfig,
  GetMyCollegesListConfig,
  GetPerfectDownloadConfig,
  GetPerfectDownloadRegionConfig,
  GetDownloadResourceByDateConfig,
  GetPerfectDownloadMinistryConfig,
  GetDownloadResourceByDateRegionConfig,
  GetDownloadResourceByDateMinistryConfig,
} from "src/server/config/Urls";
import { useSearchParams } from "react-router-dom";
import { Select, Spin } from "antd";

const Statistcs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // For edu id
  const currentCollege = searchParams.get("eduId");
  const [collegeId, setCollegeId] = useState(
    currentCollege ? currentCollege : 0
  );

  const [all, setAll] = useState(0);
  const [percent, setPercent] = useState(0);
  const [barChat, setBarChart] = useState<any>([]);
  const [lineChat, setLineChart] = useState<any>([]);
  const [list, setList] = useState<{ value: string; label: string }[]>([]);

  // Config for charts-------------------

  const configPie: PieConfig = {
    angleField: "count",
    colorField: "type",
    radius: 0.8,
    data: barChat,
    legend: {
      layout: "vertical",
      position: "right",
      maxItemWidth: 200,
      offsetX: -60,
    },
  };

  const configPlot = {
    xField: "type",
    yField: "count",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: "white",
          opacity: 0.6,
          fontSize: 1,
        },
      },
      legend: false,
    },
    data: barChat,
    meta: {
      count: {
        alias: "Yuklanganlar soni",
      },
    },
  };

  const configArea = {
    xField: "sana",
    yField: "count",
    xAxis: {
      range: [0, 1],
      tickCount: 10,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#7ec2f350 0.5:#7ec2f3 1:#1890ff",
      };
    },
    data: lineChat,
    meta: {
      count: {
        alias: "Yuklab olishlar soni",
      },
    },
  };

  const data = [
    24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ];
  const config = {
    height: 60,
    autoFit: true,
    smooth: true,
    areaStyle: {
      fill: "#d6e3fd",
    },
  };

  const configGuage: GaugeConfig = {
    percent: percent,
    range: {
      color: "#30BF78",
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
      },
    },
  };

  // functions for Slect university
  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const setCollege = (val: any) => {
    setCollegeId(val);
    handleMakeParams("eduId", val);
    isManagment() ? getStatsManagment() : getStatsMinistry();
    window.scrollTo(0, 0);
  };
  const urlMaker = () => {
    let url = "?";
    for (let key of searchParams.keys()) {
      let value = searchParams.get(key);
      url = url + `${url.length < 2 ? "" : "&"}${key}=${value}`;
    }
    return url.length > 2 ? url : "";
  };

  const getStatsEdu = async () => {
    setLoading(true);

    try {
      const { data } = await GetUniverStatConfig();
      let array = resourceType;
      array.forEach((item: any) => {
        item.count = data.find((el: any) => el.type === item.type)?.count || 0;
      });
      setAll(
        data.reduce((all: any, current: any) => (all += current?.count), 0)
      );
      setBarChart(array);

      const dateStat = await GetDownloadResourceByDateConfig();
      setLineChart(
        dateStat.data.sort(
          (a: any, b: any) =>
            new Date(a?.sana).getTime() - new Date(b?.sana).getTime()
        )
      );

      const percentStat = await GetPerfectDownloadConfig();
      setPercent((Number(percentStat.data?.jami) || 0) / 100);
    } catch (error) {
      CatchError(error);
    }
    setLoading(false);
  };
  const getStatsManagment = async () => {
    setLoading(true);
    try {
      // Universities list
      const list = await GetMyCollegesListConfig();
      setList(
        list.data.content.reduce(
          (all: any, current: any) => [
            ...all,
            { value: +current?.eduId, label: current?.eduName },
          ],
          []
        )
      );

      // Percent stats
      const percentStat = await GetPerfectDownloadRegionConfig(urlMaker());
      setPercent((Number(percentStat.data?.jami) || 0) / 100);

      // Stats in file types
      const { data } = await GetManagmentStatConfig(urlMaker());
      let array = resourceType;
      array.forEach((item: any) => {
        item.count = data.find((el: any) => el.type === item.type)?.count || 0;
      });
      setAll(
        data.reduce((all: any, current: any) => (all += current?.count), 0)
      );
      setBarChart(array);

      // Daily download stats
      const dateStat = await GetDownloadResourceByDateRegionConfig(urlMaker());
      setLineChart(
        dateStat.data.sort(
          (a: any, b: any) =>
            new Date(a?.sana).getTime() - new Date(b?.sana).getTime()
        )
      );
    } catch (error) {
      CatchError(error);
    }
    setLoading(false);
  };
  const getStatsMinistry = async () => {
    setLoading(true);
    try {
      // Universities list
      const list = await GetBoshqarmalarConfig();
      setList(
        list.data.content.reduce(
          (all: any, current: any) => [
            ...all,
            { value: +current?.regionId, label: current?.address },
          ],
          []
        )
      );

      // Percent stats
      const percentStat = await GetPerfectDownloadMinistryConfig(urlMaker());
      setPercent((Number(percentStat.data?.jami) || 0) / 100);

      // Stats in file types
      const { data } = await GetMinistryStatConfig(urlMaker());
      let array = resourceType;
      array.forEach((item: any) => {
        item.count = data.find((el: any) => el.type === item.type)?.count || 0;
      });
      setAll(
        data.reduce((all: any, current: any) => (all += current?.count), 0)
      );
      setBarChart(array);

      // Daily download stats
      const dateStat = await GetDownloadResourceByDateMinistryConfig(
        urlMaker()
      );
      setLineChart(
        dateStat.data.sort(
          (a: any, b: any) =>
            new Date(a?.sana).getTime() - new Date(b?.sana).getTime()
        )
      );
    } catch (error) {
      CatchError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    isAdmin()
      ? getStatsEdu()
      : isManagment()
      ? getStatsManagment()
      : getStatsMinistry();
  }, []);

  return (
    <Spin tip="Yuklanmaoqda..." spinning={loading}>
      <div className="statistcs">
        {(isManagment() || isMinistry()) && (
          <div className="flex" style={{ marginBottom: 16 }}>
            <h3>
              {isManagment()
                ? `Ma'lum bir ta'lim muassasasining ma'lumotlarini ko'rish uchun uni
                ro'yhatdan tanlang !`
                : `Ma'lum bir boshqarmaning ma'lumotlarini ko'rish uchun uni
                ro'yhatdan tanlang !`}
            </h3>
            <Select
              showSearch
              allowClear
              style={{ width: 600 }}
              placeholder="Qidirish"
              defaultValue={+collegeId == 0 ? null : +collegeId}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={list}
              onChange={setCollege}
            />
          </div>
        )}

        <div className=" statistcs__top">
          {/* {isManagment() && (
            <div>
              <div className="flex">
                <span>Resurs yuklagan ta’lim muassasalari soni: </span>
                <h4>8,846 ta</h4>
              </div>
              <TinyArea data={data} {...config} className="chart" />
            </div>
          )} */}
          <div>
            <div className="flex">
              <span>Jami yuklangan resurslar soni:</span>
              <h4>{all} ta</h4>
            </div>
            <Column {...configPlot} className="chart" />
          </div>
          <div>
            <div className="flex">
              <span>Jami yuklab olingan resurslar</span>
              <h4>{Number(percent * 100).toFixed()}%</h4>
            </div>

            <Gauge {...configGuage} className="chart" />
          </div>
        </div>

        <div className="statistcs__bottom">
          <div>
            <h3>Yuklab olishlarni vaqt bo‘yicha statistikasi</h3>
            <Area {...configArea} className="chart" />
          </div>
          <div style={{ width: 700 }}>
            <h3>Resurs turlari bo‘yicha yuklanganlar soni</h3>
            <Pie {...configPie} className="chart" />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Statistcs;
