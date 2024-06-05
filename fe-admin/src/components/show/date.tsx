import { ComponentProps, FC } from 'react';
import { Typography } from 'antd';
import { DateField } from '@refinedev/antd';

interface Props {
  label?: string;
  value?: ComponentProps<typeof DateField>['value'];
}

export const ShowDate: FC<Props> = ({ label = 'Date', value }) => {
  return (
    <>
      <Typography.Title level={5}>{label}</Typography.Title>
      <DateField value={value} />
    </>
  );
};
