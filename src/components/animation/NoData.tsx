import React from "react";
import Lottie from "react-lottie";
import { noDataAlert } from "src/assets/animations";

function NoData({ title = "Arizalar mavjud emas" }) {
  return (
    <div className="nodata-anim" style={{ width: "100%" }}>
      <Lottie options={noDataAlert} height={300} width={300} />
      <h2 style={{ textAlign: "center", marginTop: -72 }}>{title}</h2>
    </div>
  );
}

export default NoData;
