import { NumberField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Image, Typography } from 'antd';

const { Title } = Typography;

export const CmsBannerShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>{'Image'}</Title>
      <Image src={record?.image_src} height={360} />
      <Title level={5}>{'Title'}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{'Description'}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{'Status'}</Title>
      <TextField value={record?.status} />
    </Show>
  );
};
