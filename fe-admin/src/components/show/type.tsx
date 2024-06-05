import { FC, ReactNode } from 'react';
import { Typography } from 'antd';
import { TextField } from '@refinedev/antd';

interface Props {
  value?: ReactNode;
}

export const ShowType: FC<Props> = ({ value }) => {
  return (
    <>
      <Typography.Title level={5}>{'Type'}</Typography.Title>
      <TextField value={value} />
    </>
  );
};
