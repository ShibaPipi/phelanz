import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import {
  ShowDate,
  ShowDisplayOrder,
  ShowId,
  ShowName,
  ShowStatusBoolean,
  ShowType,
} from 'components';

export const SystemMenuShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowName value={record?.name} />
      <ShowDisplayOrder value={record?.displayOrder} />
      <ShowType value={record?.type} />
      <ShowStatusBoolean value={record?.status} />
      <ShowDate label={'Created At'} value={record?.createdAt} />
    </Show>
  );
};
