import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { ShowId, ShowName, ShowType } from 'components';

export const FitRecipeShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowName value={record?.name} />
      <ShowType value={record?.type} />
    </Show>
  );
};
