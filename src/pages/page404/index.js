import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const page404 = () => {
  const history = useHistory();
  return (
    <div className="zs">
      <Result
        status="404"
        title="404"
        subTitle="页面不存在"
        extra={<Button type="primary" onClick={() => history.push("/")} />}
      />
      ,
    </div>
  );
};
export default page404;
