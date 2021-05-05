import React from 'react';
import { Layout } from 'antd';
import styles from './index.module.less';
import LeftHeader from './leftHeader';
import RightHeader from './rightHeader';

const { Header } = Layout;

const header = () => (
  <Header
    style={{ background: '#fff', padding: '0px 12px' }}
  >
    <div className={styles.navHeader}>
      <div>
        <LeftHeader />
      </div>
      <div><RightHeader /></div>
    </div>
  </Header>
);

export default header;