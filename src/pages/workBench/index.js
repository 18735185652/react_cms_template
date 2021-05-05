import React from 'react';
import { useRequest } from 'ahooks';
import { useTranslation } from 'react-i18next';
import api from '../../api/common';

const workBench = () => {
  const { data } = useRequest(api.getList);
  console.log('data: ', data);

  const { t } = useTranslation();

  return (
    <div style={{ height: '500px' }}>
      {t('home:technology')}
    </div>

  );
};

export default workBench;