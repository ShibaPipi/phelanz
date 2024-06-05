import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import {
  ShowContent,
  ShowDate,
  ShowId,
  ShowImage,
  ShowStatusBoolean,
  ShowTitle,
  ShowType,
} from 'components';

export const CmsAboutShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowTitle value={record?.title} />
      <ShowImage src={record?.image_src} height={360} />
      <ShowContent value={record?.content} />
      <ShowType value={record?.type} />
      <ShowStatusBoolean value={record?.status} />
      <ShowDate label={'Created At'} value={record?.createdAt} />
    </Show>
  );
};
