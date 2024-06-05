import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import MDEditor from '@uiw/react-md-editor';
import { Form, Input, InputNumber, Select } from 'antd';
import { FileUploadForm } from 'components';
import { useMemo } from 'react';

export const CmsContentStore = () => {
  const { id } = useParsed();
  const { form, formProps, saveButtonProps, formLoading, queryResult } =
    useForm({});
  const { selectProps: categorySelectProps } = useSelect({
    resource: 'cms_content_categories?parentId=0',
    optionLabel: 'name',
  });
  const { selectProps: statusesSelectProps } = useSelect({
    resource: 'cms_contents/statuses',
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
          required={false}
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
        <Form.Item
          label={'Display Order'}
          name={['displayOrder']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={'Category'}
          name={['contentCategoryId']}
          initialValue={formProps?.initialValues?.category?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={'Status'}
          name={['status']}
          initialValue={formProps.initialValues?.status || 'DRAFT'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...statusesSelectProps} />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
