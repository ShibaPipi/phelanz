import { Create, Edit, useForm } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, Switch } from 'antd';
import { FileUploadForm } from 'components';
import { useMemo } from 'react';

export const CmsIntroductionStore = () => {
  const { id } = useParsed();
  const { form, queryResult, formProps, saveButtonProps } = useForm({});

  const Wrapper = useMemo(() => (id ? Edit : Create), [id]);

  return (
    <Wrapper saveButtonProps={saveButtonProps}>
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
          label={'Description'}
          name={['description']}
          rules={[{ required: true }]}
        >
          <Input />
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
