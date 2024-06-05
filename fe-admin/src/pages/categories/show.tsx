import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { ShowId, ShowTitle } from 'components';

export const CategoryShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id} />
      <ShowTitle value={record?.title} />
    </Show>
  );
};
