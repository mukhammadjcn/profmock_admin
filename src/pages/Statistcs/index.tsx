import React, { useEffect, useState } from "react";
import {
  Pie,
  Column,
  Line,
  Area,
  TinyArea,
  Gauge,
  GaugeConfig,
} from "@ant-design/plots";

const Statistcs: React.FC = () => {
  const [dataArea, setDataArea] = useState([]);

  const dataPie = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const configPie = {
    appendPadding: 10,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
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

  const dataLine = [
    {
      year: "1991",
      value: 3,
    },
    {
      year: "1992",
      value: 4,
    },
    {
      year: "1993",
      value: 3.5,
    },
    {
      year: "1994",
      value: 5,
    },
    {
      year: "1995",
      value: 4.9,
    },
    {
      year: "1996",
      value: 6,
    },
    {
      year: "1997",
      value: 7,
    },
    {
      year: "1998",
      value: 9,
    },
    {
      year: "1999",
      value: 13,
    },
  ];
  const configLine = {
    xField: "year",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
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
    statistic: {
      content: {
        formatter: ({ percent }: any) => `Rate: ${(percent * 100).toFixed(0)}%`,
        style: {
          color: "rgba(0,0,0,0.65)",
          fontSize: "48",
        },
      },
    },
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <div>
      <h1>Statistcs</h1>

      <Pie data={dataPie} {...configPie} />

      <Column data={dataPlot} {...configPlot} />

      <Line data={dataLine} {...configLine} />

      <Area data={dataArea} {...configArea} />

      <TinyArea data={data} {...config} />

      <Gauge {...configGuage} />
    </div>
  );
};

export default Statistcs;
