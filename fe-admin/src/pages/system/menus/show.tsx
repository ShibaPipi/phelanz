import { NumberField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

export const SystemMenuShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{'Display Order'}</Title>
      <TextField value={record?.displayOrder} />
      <Title level={5}>{'Type'}</Title>
      <TextField value={record?.type} />
      <Title level={5}>{'Status'}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{'Created At'}</Title>
      <TextField value={record?.createdAt} />
    </Show>
  );
};
