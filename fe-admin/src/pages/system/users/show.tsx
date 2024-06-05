import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { ShowEmail, ShowId, ShowName } from 'components';

export const SystemUserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowEmail value={record?.email} />
      <ShowName value={record?.name} />
    </Show>
  );
};
