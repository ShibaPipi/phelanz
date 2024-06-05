import { Show } from '@refinedev/antd';
import { useOne, useShow } from '@refinedev/core';
import {
  ShowCategory,
  ShowContent,
  ShowDate,
  ShowId,
  ShowStatus,
  ShowTitle,
} from 'components';

export const CmsContentShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: 'categories',
    id: record?.category?.id || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowTitle value={record?.title} />
      <ShowContent value={record?.content} />
      <ShowCategory
        value={
          categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>
        }
      />
      <ShowStatus value={record?.status} />
      <ShowDate label={'Created At'} value={record?.createdAt} />
    </Show>
  );
};
