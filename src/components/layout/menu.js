import React from "react";
import {
  PieChartOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const useMenuList = () => {
  const { t } = useTranslation();

  const menuList = [
    {
      key: "/workBench",
      title: t("home:technology"),
      icon: <PieChartOutlined />,
      auth: ["admin", "user"],
    },
    {
      key: "/user",
      title: "用户",
      icon: <UserOutlined />,
      auth: ["admin"],
    },
    {
      key: "/article",
      title: "文章列表",
      icon: <AppstoreOutlined />,
      auth: ["admin", "user"],
      children: [
        {
          key: "/article/list",
          title: "列表",
          icon: <AppstoreOutlined />,
          auth: ["admin", "user"],
        },
      ],
    },
  ];
  return menuList;
};

export default useMenuList;
