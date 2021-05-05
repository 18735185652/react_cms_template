import React from 'react';
import {
  PieChartOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const menuList = [
  {
    key: '/workBench',
    title: '工作台',
    icon: <PieChartOutlined />,
  },
  {
    key: '/user',
    title: '用户',
    icon: <UserOutlined />,
  },
  {
    key: '/article',
    title: '文章列表',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '/article/list',
        title: '列表',
        icon: <AppstoreOutlined />,
      },

    ],
  },
];

export default menuList;