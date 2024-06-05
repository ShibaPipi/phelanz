import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Image, Typography } from 'antd';

const { Title } = Typography;

export const CmsAboutShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>{'Title'}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{'Image'}</Title>
      <Image src={record?.image_src} height={360} />
      <Title level={5}>{'Content'}</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>{'Type'}</Title>
      <TextField value={record?.type} />
      <Title level={5}>{'Status'}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
