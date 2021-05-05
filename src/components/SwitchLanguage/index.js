import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './index.less';

/**
 * 其它组件
 */
const SwitchLanguage = () => {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const MenuList = (
    <Menu onClick={handleToggleLanguage} style={{ minWidth: '100px' }}>
      <Menu.Item key="zhCN">{t('zhCN')}</Menu.Item>
      <Menu.Item key="enUS">{t('enUS')}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={MenuList} placement="bottomRight">
      <div className="components-switch-language" style={{ cursor: 'pointer' }}>
        <span style={{ marginRight: '6px' }}>{t(i18n.language)}</span>
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default SwitchLanguage;
