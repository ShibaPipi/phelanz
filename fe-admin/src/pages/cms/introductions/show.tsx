import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import {
  ShowDescription,
  ShowId,
  ShowImage,
  ShowStatusBoolean,
  ShowTitle,
} from 'components';

export const CmsIntroductionShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <ShowId value={record?.id ?? ''} />
      <ShowImage src={record?.image_src} height={360} />
      <ShowTitle value={record?.title} />
      <ShowDescription value={record?.description} />
      <ShowStatusBoolean value={record?.status} />
    </Show>
  );
};
