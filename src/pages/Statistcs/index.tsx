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

const Statistcs: React.FC = () => {
  const [dataArea, setDataArea] = useState([]);

  const dataPie = [
    {
      type: "salom1",
      value: 27,
    },
    {
      type: "salom2",
      value: 25,
    },
    {
      type: "salom3",
      value: 18,
    },
    {
      type: "salom4",
      value: 15,
    },
    {
      type: "salom5",
      value: 10,
    },
    {
      type: "salom6",
      value: 5,
    },
  ];
  const configPie: PieConfig = {
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    legend: {
      layout: "horizontal",
      position: "bottom",
    },
    data: dataPie,
  };

  const dataPlot = [
    {
      type: "salom1",
      "Sotuvlar-soni": 38,
    },
    {
      type: "salom2",
      "Sotuvlar-soni": 52,
    },
    {
      type: "salom3",
      "Sotuvlar-soni": 61,
    },
    {
      type: "salom4",
      "Sotuvlar-soni": 145,
    },
    {
      type: "salom5",
      "Sotuvlar-soni": 48,
    },
    {
      type: "salom6",
      "Sotuvlar-soni": 38,
    },
    {
      type: "salom7",
      "Sotuvlar-soni": 38,
    },
    {
      type: "salom8",
      "Sotuvlar-soni": 38,
    },
  ];
  const configPlot = {
    xField: "type",
    yField: "Sotuvlar-soni",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const configArea = {
    xField: "Date",
    yField: "scales",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };
  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setDataArea(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
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
    percent: 0.75,
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

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <div className="statistcs">
      <div className=" statistcs__top">
        <div>
          <div className="flex">
            <span>Resurs yuklagan ta’lim muassasalari soni: </span>
            <h4>8,846 ta</h4>
          </div>
          <TinyArea data={data} {...config} className="chart" />
        </div>
        <div>
          <div className="flex">
            <span>Jami yuklangan resurslar soni:</span>
            <h4>6560 ta</h4>
          </div>
          <Column data={dataPlot} {...configPlot} className="chart" />
        </div>
        <div>
          <div className="flex">
            <span>Jami yuklab olingan resurslar</span>
            <h4>78%</h4>
          </div>

          <Gauge {...configGuage} className="chart" />
        </div>
      </div>

      <div className="statistcs__bottom">
        <div>
          <h3>Yuklab olishlarni vaqt bo‘yicha statistikasi</h3>
          <Area data={dataArea} {...configArea} className="chart" />
        </div>
        <div>
          <h3>Resurs turlari bo‘yicha statistika</h3>
          <Pie {...configPie} className="chart" />
        </div>
      </div>
    </div>
  );
};

export default Statistcs;
