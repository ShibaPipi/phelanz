import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import MDEditor from '@uiw/react-md-editor';
import { Form, Input, Select, Switch } from 'antd';
import { FileUploadForm } from 'components';
import { useMemo } from 'react';

export const CmsAboutStore = () => {
  const { id } = useParsed();
  const { form, formProps, saveButtonProps, formLoading, queryResult } =
    useForm({});
  const { selectProps: typesSelectProps } = useSelect({
    resource: 'cms_abouts/types',
  });

  const Wrapper = useMemo(() => (id ? Edit : Create), [id]);

  return (
    <Wrapper saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={'Title'}
          name={['title']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <FileUploadForm
          initialValues={
            queryResult?.data?.data.image_src
              ? [queryResult?.data?.data.image_src]
              : []
          }
          label={'Image'}
          name={['image']}
          onSuccess={(info) =>
            form.setFieldValue('image', info.file.response?.path)
          }
          onRemove={() => form.setFieldValue('image', '')}
        />
        <Form.Item
          label={'Content'}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label={'SEO'} name={['seo']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={'Type'}
          name={['type']}
          initialValue={formProps.initialValues?.status || 'ABOUT'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...typesSelectProps} />
        </Form.Item>
        <Form.Item
          label={'Status'}
          name={['status']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
