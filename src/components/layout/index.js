import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import useMenuList from './menu';
import HeaderBar from './Header';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const Auth = 'user';

const Index = ({ children }) => {
  const menuList = useMenuList();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('/workBench');
  const [openKeys, setOpenKeys] = useState([]);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setActiveKey('/workBench');
    } else {
      setActiveKey(pathname);
    }
    const pathArr = pathname.slice(1).split('/');
    if (pathArr.length > 0) {
      const newPath = pathArr.slice(0, pathArr.length - 1);
      let split = '';
      const openKeys = newPath.map((item) => {
        const newStr = `/${item}`;
        split = split ? split + newStr : newStr;
        return split;
      });
      setOpenKeys(openKeys);
    }
    return () => {
      setOpenKeys([]);
    };
  }, [pathname]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  const renderMenu = (menus = []) => menus.map((item) => {
    if (item.auth.indexOf(Auth) === -1) return null;
    if (item.children) {
      return (
        <SubMenu key={item.key} title={item.title} icon={item.icon}>
          {renderMenu(item.children)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key} title={item.title} icon={item.icon}>
        <Link to={item.key}>
          {item.title}
        </Link>
      </Menu.Item>
    );
  });
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth={30}
      >
        <div
          className="logo"
          style={{
            height: 60,
            fontSize: '14px',
            paddingLeft: 24,
            paddingTop: 28,
            paddingRight: 23,
          }}
        >
          {/* cms后台管理 */}
        </div>
        <Menu
          theme="light"
          mode="inline"
          theme="light"
          selectedKeys={activeKey}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onSelect={(e) => {
            setActiveKey(e.key);
          }}
        >
          {renderMenu(menuList)}

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <HeaderBar />

        <Content style={{ margin: '16px 16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Index;
