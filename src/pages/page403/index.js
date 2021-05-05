import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const page403 = () => {
  const history = useHistory();
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="没有权限访问，请联系管理员"
        extra={<Button type="primary" onClick={() => history.push('/')} />}
      />

    </div>
  );
};
export default page403;