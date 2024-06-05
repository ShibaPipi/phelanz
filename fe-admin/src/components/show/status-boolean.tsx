import { FC } from 'react';
import { Typography } from 'antd';
import { TagStatusBoolean } from 'components';

interface Props {
  value: boolean;
}

export const ShowStatusBoolean: FC<Props> = ({ value }) => {
  return (
    <>
      <Typography.Title level={5}>{'Status'}</Typography.Title>
      <TagStatusBoolean value={value} />
    </>
  );
};
