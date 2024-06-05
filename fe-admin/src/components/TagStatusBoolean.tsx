import { Tag } from 'antd';
import { FC } from 'react';

interface Props {
  value: boolean;
}

export const TagStatusBoolean: FC<Props> = ({ value }) => {
  return <Tag color={value ? 'green' : 'orange'}>{value ? 'ON' : 'OFF'}</Tag>;
};
