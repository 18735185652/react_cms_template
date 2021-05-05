import React from 'react';

import { useTranslation } from 'react-i18next';

const workBench = () => {
  const { t } = useTranslation();
  console.log('t: ', t);
  return (
    <div>{t('home:technology')}</div>
  );
};

export default workBench;