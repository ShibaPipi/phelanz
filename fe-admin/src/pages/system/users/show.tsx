import { NumberField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

export const SystemUserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>{'Email'}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
    </Show>
  );
};
