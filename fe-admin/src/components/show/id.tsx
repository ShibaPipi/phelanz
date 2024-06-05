import { FC } from 'react';
import { Typography } from 'antd';
import { NumberField } from '@refinedev/antd';
import { BaseKey } from '@refinedev/core';

interface Props {
  value?: BaseKey;
}

export const ShowId: FC<Props> = ({ value }) => {
  return (
    <>
      <Typography.Title level={5}>{'ID'}</Typography.Title>
      <NumberField value={value ?? ''} />
    </>
  );
};
