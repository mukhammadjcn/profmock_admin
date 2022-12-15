import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Notfound: React.FC = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sahifa topilmadi, 404 !"
        style={{ marginTop: 50, paddingTop: 120 }}
        extra={
          <Link to="/">
            <Button type="primary">Bosh sahifaga qaytish</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Notfound;
