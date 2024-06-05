import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';
import { ShowDescription, ShowId, ShowName } from 'components';

const { Title } = Typography;

export const SystemAppShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowName value={record?.name} />
      <Title level={5}>{'Description'}</Title>
      <ShowDescription value={record?.description} />
    </Show>
  );
};
