import React from "react";
import Lottie from "react-lottie";
import { noDataAlert } from "src/assets/animations";

function NoData() {
  return (
    <div className="nodata-anim">
      <Lottie options={noDataAlert} height={400} width={500} />
      <h4>Hechqanday ma'lumot topilmadi )</h4>
    </div>
  );
}

export default NoData;
