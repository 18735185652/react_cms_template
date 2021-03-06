import Login from "../pages/login";
import User from "../pages/user";
import List from "../pages/list";
import Page404 from "../pages/page404";
import Page403 from "../pages/page403";

import Article from "../pages/article";
import WorkBench from "../pages/workBench";
import Layout from "../components/layout";

// 菜单相关路由
export const menus = [
  {
    path: "/",
    exact: true,
    redirect: "/workBench",
    auth: ["admin", "user"],
  },
  {
    path: "/workBench",
    name: "工作台",
    component: WorkBench,
    auth: ["admin", "user"],
  },
  {
    path: "/user",
    name: "用户",
    component: User,
    auth: ["admin"],
  },
  {
    path: "/article",
    name: "文章",
    auth: ["admin", "user"],
    component: List,
    routes: [
      {
        path: "/article",
        exact: true,
        redirect: "/article/list",
        auth: ["admin", "user"],
      },
      {
        path: "/article/list",
        name: "文章列表",
        component: Article,
        auth: ["admin", "user"],
      },
    ],
  },
  {
    path: "/page403",
    name: "403",
    auth: ["admin", "user"],
    component: Page403,
  },
  {
    path: "*",
    name: "404",
    auth: ["admin", "user"],
    component: Page404,
  },
];
// 登录、首页、404路由
export const main = [
  {
    path: "/",
    name: "首页",
    component: Layout,
    routes: menus,
    auth: ["admin", "user"],
  },
  {
    path: "/login",
    exact: true,
    name: "登录",
    component: Login,
    auth: ["admin", "user"],
  },
];

export const routerExport = {
  main,
  menus,
};
