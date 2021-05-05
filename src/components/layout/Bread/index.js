import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, matchPath } from 'react-router-dom';

const bread = ({ menuList }) => {
  const { pathname } = useLocation();
  const getBreadcrumb = (list) => (
    <>
      {
        list.map((r) => {
          const match = matchPath(pathname, { path: r.key });
          if (match) {
            return (
              <Fragment key={r.key}>
                <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                {r.children && getBreadcrumb(r.children)}
              </Fragment>
            );
          }
          return null;
        })
      }
    </>
  );
  return (
    <Breadcrumb>
      {getBreadcrumb(menuList)}
    </Breadcrumb>
  );
};

export default bread;