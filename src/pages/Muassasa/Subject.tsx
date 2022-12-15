import React from "react";
import { Link } from "react-router-dom";

const Subject: React.FC = () => {
  return (
    <div>
      <h1>Subject</h1>

      <h2>
        <Link to={"/college/direction/subject/theme?id=10120&subjectID=12"}>
          10 - Bir balo fan
        </Link>
      </h2>
      <h2>
        <Link to={"/college/direction/subject/theme?id=10122&subjectID=10"}>
          12 - Bir balo fan
        </Link>
      </h2>
    </div>
  );
};

export default Subject;
