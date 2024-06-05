import { FC } from 'react';
import { Typography } from 'antd';
import { MarkdownField } from '@refinedev/antd';

interface Props {
  label?: string;
  value?: string;
}

export const ShowContent: FC<Props> = ({ label = 'Content', value }) => {
  return (
    <>
      <Typography.Title level={5}>{label}</Typography.Title>
      <MarkdownField value={value} />
    </>
  );
};
