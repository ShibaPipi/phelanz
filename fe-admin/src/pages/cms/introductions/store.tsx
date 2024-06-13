import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, Radio, Select, Switch } from 'antd';
import { FileUploadForm } from 'components';
import { useMemo } from 'react';

export const CmsIntroductionStore = () => {
  const { id } = useParsed();
  const { form, queryResult, formProps, saveButtonProps } = useForm({});
  const { selectProps: buttonTargetSelectProps } = useSelect({
    resource: 'cms_introductions/buttonTargets',
  });
  const button = Form.useWatch('button', form);

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
          label={'Button'}
          name={['button']}
          initialValue={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
        {button && (
          <>
            {' '}
            <Form.Item
              label={'Button Href'}
              name={['buttonHref']}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={'Button Target'}
              name={['buttonTarget']}
              initialValue={formProps.initialValues?.buttonTarget || 'SELF'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...buttonTargetSelectProps} />
            </Form.Item>
            <Form.Item
              label={'Button Text'}
              name={['buttonText']}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item label={'Tag'} name={['tag']}>
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
