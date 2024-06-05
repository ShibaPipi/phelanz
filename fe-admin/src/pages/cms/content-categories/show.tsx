import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import {
  ShowDisplayOrder,
  ShowId,
  ShowName,
  ShowStatusBoolean,
} from 'components';

export const CmsContentCategoryShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowName value={record?.name} />
      <ShowDisplayOrder value={record?.displayOrder} />
      <ShowStatusBoolean value={record?.status} />
    </Show>
  );
};
